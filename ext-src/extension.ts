import * as path from 'path';
import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('react-webview.start', () => {
		ReactPanel.createOrShow(context.extensionPath);
	})); 
}

/**
 * Manages react webview panels
 */
class ReactPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: ReactPanel | undefined;

	private static readonly viewType = 'react';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionPath: string) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		// If we already have a panel, show it.
		// Otherwise, create a new panel.
		if (ReactPanel.currentPanel) {
			ReactPanel.currentPanel._panel.reveal(column);
		} else {
			ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.One);
		}
	}

	private constructor(extensionPath: string, column: vscode.ViewColumn) {
		this._extensionPath = extensionPath;

		// Create and show a new webview panel
		this._panel = vscode.window.createWebviewPanel(ReactPanel.viewType, "React", column, {
			// Enable javascript in the webview
			enableScripts: true,

			// And restric the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [
				vscode.Uri.file(path.join(this._extensionPath, 'build'))
			]
		});
		
		// Set the webview's initial html content 
		this._panel.webview.html = this._getHtmlForWebview();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'options':
					vscode.window.showErrorMessage(message.text);
					return;
				case "newoption":
					vscode.window.showInformationMessage(message.data.msg);
					return;
				case "viewinitialized":
					vscode.window.showInformationMessage(message.data.msg);
					return;
			}
			console.log('Got a message from the webview');
		}, null, this._disposables);

		this._panel.webview.postMessage({ type: 'fromextensions', dirs: 'none found' });
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: 'refactor' });
	}

	public dispose() {
		ReactPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}
 
	private _getHtmlForWebview() {
		const manifest = require(path.join(this._extensionPath, 'build', 'asset-manifest.json'));
		const mainScript = manifest['main.js'];
		const loaderScript = 'loader.js';
		const mainStyle = manifest['main.css'];

		const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainScript));
		const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainStyle));
		const loaderPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', 'src', loaderScript));

		// The following are used via string template replacement for the html file read from disk
		const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' }); // Used in string template replacement
		const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' }); // Used in string template replacement
		const loaderUri = loaderPathOnDisk.with({ scheme: 'vscode-resource' }); // Used in string template replacement
		const nonce = getNonce(); // Use a nonce to whitelist which scripts can be run

		const onDiskPath = vscode.Uri.file(path.join(this._extensionPath, 'build', 'wvindex.html'));
		// Hack to avoid compile errors due to variables not be referenced outside of the string template
		// being read from disk.
		if (nonce && loaderUri && styleUri && scriptUri) {
			const html = fs.readFileSync(onDiskPath.with( { scheme: 'vscode-resource'} ).fsPath).toString();
			return eval('`' + html + '`');
		}
	}
}

function getNonce() {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
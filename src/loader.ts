"use strict"
declare var acquireVsCodeApi: any;

// tslint:disable-next-line:no-console
console.log('running the inline script');
(window as any)['vscode'] = acquireVsCodeApi();
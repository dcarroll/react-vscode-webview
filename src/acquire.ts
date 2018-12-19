export default class AcquireVSCode {
    
    public acquired: boolean = false;
    private originalPostMessage = window.parent ? window.parent.postMessage.bind(window.parent) : window.postMessage.bind(window);;
    private state: any = undefined;

    constructor() {
        this.acquired = true;
    }
    
    public getState() {
        return this.state;
    }
    public postMessage(msg: any) {
        return this.originalPostMessage({ command: "onmessage", data: msg }, "*");
    }
    public setState(newState: any) {
        this.state = newState;
        this.originalPostMessage(
        { command: "do-update-state", data: JSON.stringify(newState) },
        "*"
        );
        return newState;
    }
}
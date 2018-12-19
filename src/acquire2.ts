function acquireVsCodeApi() {
    const originalPostMessage = window.parent.postMessage.bind(window.parent);
    let acquired = false;;
  
    let state: {};
  
    return () => {
      if (acquired) {
        /* throw new Error(
          "An instance of the VS Code API has already been acquired"
        ); */
      }
      acquired = true;
      return Object.freeze({
        getState() {
          return state;
        },
        postMessage(msg: {}) {
          return originalPostMessage({ command: "onmessage", data: msg }, "*");
        },
        setState(newState: {}) {
          state = newState;
          originalPostMessage(
            { command: "do-update-state", data: JSON.stringify(newState) },
            "*"
          );
          return newState;
        }
      });
    };
  }

  export default acquireVsCodeApi;
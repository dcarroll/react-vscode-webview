"use strict";

export default acquireVsCodeApi = (function() {
  const originalPostMessage = window.parent ? window.parent.postMessage.bind(window.parent) : window.postMessage.bind(window);;
  let acquired = false;

  let state = undefined;

  return () => {
    if (acquired) {
      throw new Error(
        "An instance of the VS Code API has already been acquired"
      );
    }
    acquired = true;
    return Object.freeze({
      getState: function() {
        return state;
      },
      postMessage: function(msg) {
        return originalPostMessage({ command: "onmessage", data: msg }, "*");
      },
      setState: function(newState) {
        state = newState;
        originalPostMessage(
          { command: "do-update-state", data: JSON.stringify(newState) },
          "*"
        );
        return newState;
      }
    });
  };
})();
exports.dopost = acquireVsCodeApi();
delete window.parent;
delete window.top;
delete window.frameElement;

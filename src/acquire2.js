export const acquireVsCodeApi = (function() {
  const originalPostMessage = window.postMessage.bind(window);
  let acquired = false;

  let state = undefined;

  return () => {
   
    acquired = true;
    return Object({
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
      },
      getState: function() {
        return state;
      }
    });
  };
});
delete window.parent;
delete window.top;
delete window.frameElement;

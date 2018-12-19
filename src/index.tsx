import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './index.css';
/* let state: any;
interface IVSC {
  getState(): any;
  postMessage(msg: any): void;
  setState(newState: any): any;
} */

/*function acquireVsCodeApi() {
  const originalPostMessage = window.parent ? window.parent.postMessage.bind(window.parent) : window.postMessage.bind(window);
  let acquired = false;

  let state: any;

    if (acquired) {
      throw new Error(
        "An instance of the VS Code API has already been acquired"
      );
    }
    acquired = true;
    const i = ({
      getState() {
        return state;
      },
      postMessage(msg: any) {
        return originalPostMessage({ command: "onmessage", data: msg }, "*");
      },
      setState(newState: any) {
        state = newState;
        originalPostMessage(
          { command: "do-update-state", data: JSON.stringify(newState) },
          "*"
        );
        return newState;
      }
    });
    return i;
};*/

ReactDOM.render( 
  <App framework="test" />,
  document.getElementById('root') as HTMLElement,
  (() => {
    // vscode.postMessage({ command: 'status', data: 'All loaded up...'});
    // tslint:disable-next-line:no-console
    console.log('React element has rendered.');
    
  })
);

addEventListener('message', (ev) => {
  ev.preventDefault();
  
  // const x = window.acquireVsCodeApi();
  // if (x) {
    // tslint:disable-next-line:no-console
  // console.log('got x');
    // x.postMessage({ command: 'options', data: 'do the x thing'});
  // }
   // vscode.postMessage({ msg: { command: 'options', data: 'testing three'} });
  // tslint:disable-next-line:no-console
  console.log('got message in index.tsx\n' + JSON.stringify(ev));
  // tslint:disable-next-line:no-string-literal
  (window as any)['vscode'].postMessage({ command: 'viewinitialized', data: { msg: 'Got notification on index.ts' } });
});

// tslint:disable-next-line:no-var-keyword


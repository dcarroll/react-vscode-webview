import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './index.css';

ReactDOM.render( 
  <App framework="test" />,
  document.getElementById('root') as HTMLElement,
  (() => {
    // tslint:disable-next-line:no-console
    console.log('React element has rendered.');
    
  })
);

addEventListener('message', (ev) => {
  ev.preventDefault();
  
 // tslint:disable-next-line:no-console
  console.log('got message in index.tsx\n' + JSON.stringify(ev));
  // tslint:disable-next-line:no-string-literal
  (window as any)['vscode'].postMessage({ command: 'viewinitialized', data: { msg: 'Got notification on index.ts' } });
});


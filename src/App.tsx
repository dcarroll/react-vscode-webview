import { Checkbox, Icon, MediaObject, PageHeader } from '@salesforce/design-system-react';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import * as React from 'react';
import '../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css';

// import '../node_modules/react-widgets/dist/css/react-widgets.css'

// import AcquireVSCode from './acquire';
import './App.css';

// tslint:disable-next-line:no-var-requires
const logo = require('./logo.svg') as string;

interface IAppProps { compiler?: object, framework?: string; }

class App extends React.Component<IAppProps, {}> {

  public colors = ['orange', 'red', 'blue', 'purple']
  // private vsc = new AcquireVSCode();

  public componentDidMount() {
    window.addEventListener('message', (ev) => {
      // 
      // tslint:disable-next-line:no-console
      console.log('Got message in App.tsx');
       
    });
  };


  public render() {

    const contentRight = (
      <div className="slds-grid">
        <div className="slds-col">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="slds-col">
          <h1 className="App-title">Welcome to React</h1>
        </div>
      </div>
    )
  
  
    return (
      <IconSettings iconPath="./static/assets/icons">
      <PageHeader
          contentRight={contentRight}
					title="Contacts (will truncate)"
					variant="objectHome"
					truncate={false}
          info="10 items • sorted by name"
          className="slds-theme_inverse"
				/>
        <div className="App">
          <div className="slds-media__body sldx-theme-inverser slds-m-top_x-small">
            <div className="slds-media">
              <div className="slds-setup-assistant__step-summary-content slds-media__body" >
                <h3 className="slds-setup-assistant__step-summary-title slds-text-heading_small">
                    Create A New Lightning Web Component
                </h3>
                <div className="slds-form-element">
                    <label className="slds-form-element__label">Enter a name for your web component</label>
                    <div className="slds-form-element__control">
                        <input id="lwcname" className="slds-input" type="text" value="" />
                    </div>
                </div>
              </div>
            </div>
          </div>

				  <MediaObject
				  	body="Select the containers that can host your web component."
					  figure={<Icon category="standard" name="user" size="small" />}
				  />
          <article className="slds-setup-assistant__step">
          <div className="slds-col">
              <div className="slds-setup-assistant__step-summary">
                  <div className="slds-media">
                      <div className="slds-media__body slds-m-top_x-small">
                          <div className="slds-media">
                              <div className="slds-setup-assistant__step-summary-content slds-media__body">
                                  <h3 className="slds-setup-assistant__step-summary-title slds-text-heading_small">Select the tags to create for your component</h3>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="slds-media__figure slds-media__figure_reverse">
                <Checkbox
                  label="Enable a component to be used on a Lightning page of type Record"
                  id="lightning__RecordHome"
                  variant="toggle"
                  // tslint:disable-next-line:jsx-no-lambda
                  onChange={(e: {}) => {
                    // tslint:disable-next-line:no-console
                    console.log('onChange ', e);
                    // tslint:disable-next-line:no-string-literal
                    (window as any)['vscode'].postMessage({ command: 'newoption', data: {msg: 'lighning_RecordHome is set to ' + e }});
                  }}
                />
                <Checkbox
                  label="Enable component to be used on a Lightning page of type App Home"
                  id="lightning__AppHome"
                  variant="toggle"
                  // tslint:disable-next-line:jsx-no-lambda
                  onChange={(e: {}) => {
                    // tslint:disable-next-line:no-console
                    console.log('onChange ', e);
                    // tslint:disable-next-line:no-string-literal
                    (window as any)['vscode'].postMessage({ command: 'newoption', data: {msg: 'lightning__AppHome is set to ' + e }});
                  }}
                />
                <Checkbox
                  label="Enable component to be used on a Lightning page of type Home"
                  id="lightning__Home"
                  variant="toggle"
                  // tslint:disable-next-line:jsx-no-lambda
                  onChange={(e: {}) => {
                    // tslint:disable-next-line:no-console
                    console.log('onChange ', e);
                    // tslint:disable-next-line:no-string-literal
                    (window as any)['vscode'].postMessage({ command: 'newoption', data: {msg: 'lightning__Home is set to ' + e }});
                  }}
                />
                <Checkbox
                  label="Enable component to be assigned the ID of the current record"
                  id="lightning__HasRecordId"
                  variant="toggle"
                  // tslint:disable-next-line:jsx-no-lambda
                  onChange={(e: {}) => {
                    // tslint:disable-next-line:no-console
                    console.log('onChange ', e);
                    // tslint:disable-next-line:no-string-literal
                    (window as any)['vscode'].postMessage({ command: 'newoption', data: {msg: 'lightning__HasRecordId is set to ' + e }});
                  }}
                />
              </div>
            </div>
            <div className="slds-col">
                  <span />
            </div>
            </article>
          <p>Hello... baby</p>
        </div>
      </IconSettings>
    );

  }

  /* private handleChange(event){
    // tslint:disable-next-line:no-console
    console.log('Value changed');
      // tslint:disable-next-line:no-string-literal
      window['vscode'].postMessage( { command: 'newoption', data: { msg: 'New value is ' + event } });
  }*/


}

export default App;

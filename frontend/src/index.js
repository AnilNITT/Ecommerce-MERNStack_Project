import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import {persistor} from "./store";
import AlertTemplate from "react-alert-template-basic";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import { PersistGate } from 'redux-persist/integration/react';


const options={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.SCALE,
};


ReactDOM.render( 
  <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
          <PersistGate persistor={persistor}>
              <App>{{}}</App>
          </PersistGate>
      </AlertProvider>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();

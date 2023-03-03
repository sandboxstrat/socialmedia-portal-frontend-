import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react"

ReactDOM.render(
  <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={process.env.REACT_APP_DOMAIN+"/admin"}
      audience={process.env.REACT_APP_AUTH0_DOMAIN+"/api/v2/"}
      scope="read:current_user"
      cacheLocation="localstorage"
      useRefreshTokens={true}
      ignoreCache ={false}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);
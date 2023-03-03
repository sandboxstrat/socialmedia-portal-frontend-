import React from 'react'

const ProcessingContext = React.createContext()

const UserInfoContext = React.createContext()

const ProsAuthContext = React.createContext({
    login:process.env.REACT_APP_SABER_PROS_AUTH_ENDPOINT+
        "?client_id="+process.env.REACT_APP_SABER_PROS_CLIENT_ID+
        "&redirect_uri="+process.env.REACT_APP_SABER_PROS_REDIRECT_URI+
        "&scope=openid offline_access&response_type=code&response_mode=query",
    logout:process.env.REACT_APP_SABER_PROS_LOGOUT_ENDPOINT
})

export { ProcessingContext, UserInfoContext, ProsAuthContext }
import React from 'react'
import {useAuth0} from '@auth0/auth0-react'

//HOC to add Login function to component

const WithLogin = (props) => {
        const {loginWithRedirect}=useAuth0();
        const domain = process.env.REACT_APP_DOMAIN
    
        return(
            <div onClick={()=>loginWithRedirect({
                redirectUri:`${domain}/admin`,
                scope:'read:current_user'
            })}>
                {props.originalComponent}
            </div>
        )
}

export default WithLogin
import React from 'react'
import {useAuth0} from '@auth0/auth0-react'

//HOC to add Login function to component

const WithLogout = (props) => {
        
    const {logout}=useAuth0();
    const domain = process.env.REACT_APP_DOMAIN

    return(
        <div onClick={()=>logout(`${domain}/logout`)}>
            {props.originalComponent}
        </div>
    )
}

export default WithLogout
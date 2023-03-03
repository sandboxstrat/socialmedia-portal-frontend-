import React from 'react'
import { getAllUsers } from 'adapters/auth0ManagementApi'
import { useOutletContext } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const  Management = (props) =>{

    const { getAccessTokenSilently } = useAuth0()
    const [ lumenAccessToken, setLumenAccessToken ] = React.useState(null)
    const [currentPage, setCurrentPage] = useOutletContext()
    React.useEffect(() => {
        setCurrentPage("Management")
    })

     //retrieves token for lumen
     React.useEffect(()=>{
        async function getLumenAccessToken(){
           
            const accessToken = await getAccessTokenSilently()
            setLumenAccessToken(accessToken)
        }
        getLumenAccessToken()
    },[getAccessTokenSilently])

    React.useEffect(()=>{
        if(lumenAccessToken!==null){
            getAllUsers(lumenAccessToken)
        }
    },[lumenAccessToken])

    return(
        <div>
            management
        </div>
    )
}

export default Management

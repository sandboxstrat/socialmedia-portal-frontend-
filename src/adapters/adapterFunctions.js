async function fetchResponse (url,method,authenticationToken=null,body=null) {
    try{

        let requestOptions = {
            method:method,
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authenticationToken}`
            }
        }
        if(body!==null){
            requestOptions = {
                ...requestOptions,
                body:JSON.stringify(body)
            }
        } 

        const response = await fetch( url, requestOptions )

        if(response.status===200||response.status===201){
            //returns json if json exist otherwise returns true
            try{
                const json = await response.json()
                return json
            }catch(e){
                return true
            }
            
        }else if(response.status===400){
            try{
                const json = await response.json()
                return json
            }catch(e){
                return false
            }
            
        }else{
            return false
        }

    }catch(e){
        //console.log(e)
    }
}

function convertPostData(data){
    //Convert game data to format needed for post
    let postData=[]    
    
    for(const[key,value] of Object.entries(data)){
            postData.push(`${key}=${value}`)
    }

    postData=postData.join('&')

    return postData
}

const domain = process.env.REACT_APP_SERVER_DOMAIN

export { fetchResponse, convertPostData, domain }
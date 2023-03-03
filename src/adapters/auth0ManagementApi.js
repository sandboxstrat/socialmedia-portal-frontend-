import { fetchResponse, convertPostData, domain } from 'adapters/adapterFunctions'

async function getAllUsers(accessToken){

    const postUrl = `${domain}/admin/users`

    return await fetchResponse(postUrl,"GET",accessToken)
}

async function getUser(accessToken,id){

    const postUrl = `${domain}/admin/users/${id}`

    return await fetchResponse(postUrl,"GET",accessToken)

}

async function createUser(userInfo, accessToken){
    
    const postData = convertPostData(userInfo)

    const postUrl = `${domain}/admin/users?${postData}`

    return await fetchResponse(postUrl,"POST",accessToken)
}

async function updateUser(userInfo, accessToken){
    
    const postData = convertPostData(userInfo)

    const postUrl = `${domain}/admin/feedback?${postData}`

    return await fetchResponse(postUrl,"PUT",accessToken)
}

export { getAllUsers, getUser, createUser, updateUser }


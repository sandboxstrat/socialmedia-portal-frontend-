import { fetchResponse, convertPostData, domain } from 'adapters/adapterFunctions'

async function addTracker(trackerData,accessToken){

    const postData = convertPostData(trackerData)
   
    const postUrl = `${domain}/admin/trackers?${postData}`

    return await fetchResponse(postUrl,"POST",accessToken)
}

async function getTracker(trackerId, accessToken){

    const postUrl = `${domain}/admin/trackers/${trackerId}`

    return await fetchResponse(postUrl,"GET",accessToken)
}

async function getAllTrackers(accessToken){

    const postUrl = `${domain}/admin/trackers`

    return await fetchResponse(postUrl,"GET",accessToken)

}

async function updateTracker(trackerData, accessToken){
    
    const postUrl = `${domain}/admin/trackers/${trackerData.id}`

    return await fetchResponse(postUrl,"PUT",accessToken,trackerData)
}

async function deleteTracker(trackerId, accessToken){
    
    const postUrl = `${domain}/admin/trackers/${trackerId}`

    return await fetchResponse(postUrl,"DELETE",accessToken,trackerId)
}

export { addTracker, getTracker, getAllTrackers, updateTracker, deleteTracker, }
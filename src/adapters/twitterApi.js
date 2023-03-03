import { fetchResponse, convertPostData, domain } from 'adapters/adapterFunctions'

async function searchTwitter(accessToken,searchTerm,startDate=null,endDate=null){

    //search term must be an array

    const searchData = {
        'searchTerm':JSON.stringify(searchTerm),
        'startDate':startDate,
        'endDate':endDate
    }

    const postData = convertPostData(searchData)

    let url = `${domain}/admin/twitter/search?${postData}`

    return await fetchResponse(url,"POST",accessToken)
}

async function getTweets( accessToken, trackerId=null, startDate=null, endDate=null ){

    let url = `${domain}/admin/twitter/tracker`
    url = trackerId!==null?url+`/${trackerId}`:url+'/null'
    url = startDate!==null?url+'/'+encodeURIComponent(startDate):url
    url = endDate!==null?url+'/'+encodeURIComponent(endDate):url


    return await fetchResponse(url,"GET",accessToken)

}

async function getTweetCount( accessToken, trackerId=null, startDate=null, endDate=null ){

    let url = `${domain}/admin/twitter/count`
    url = trackerId!==null?url+`/${trackerId}`:url+'/null'
    url = startDate!==null?url+'/'+encodeURIComponent(startDate):url
    url = endDate!==null?url+'/'+encodeURIComponent(endDate):url

    return await fetchResponse(url,"GET",accessToken)

}

export { searchTwitter, getTweets, getTweetCount }
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

    const postData = convertPostData({
        'tracker_id':trackerId,
        'start_date':startDate,
        'end_date':endDate
    })

    let url = `${domain}/admin/twitter/tracker?${postData}`

    return await fetchResponse(url,"POST",accessToken)

}

async function getTweetCount( accessToken, trackerId=null, startDate=null, endDate=null ){

    const postData = convertPostData({
        'tracker_id':trackerId,
        'start_date':startDate,
        'end_date':endDate
    })

    let url = `${domain}/admin/twitter/count?${postData}`

    return await fetchResponse(url,"POST",accessToken)

}

export { searchTwitter, getTweets, getTweetCount }
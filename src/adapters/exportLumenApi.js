import { domain } from 'adapters/adapterFunctions'

async function exportCsv(feedbackData, accessToken, fileName){

    const postUrl = `${domain}/admin/export`

    try{

        let requestOptions = {
            method:"POST",
            mode:'cors',
            headers:{
                'Content-Type': 'application/csv',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        requestOptions = {
            ...requestOptions,
            body:JSON.stringify(feedbackData)
        }

        const response = await fetch( postUrl, requestOptions )

        //generates blob for download
        const csvBlob = await response.blob()

        //creates link to blob, clicks link then deletes it
        const url = window.URL.createObjectURL(csvBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    
    }catch(e){

    }
}

export { exportCsv }
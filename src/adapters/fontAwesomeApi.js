async function fetchIcons (searchTerm) {
    try{
        const query = JSON.stringify({
            query: `query {search(version:"6.0.0", query:"${searchTerm}",first: 9){id}}`
        })
        const response = await fetch("https://api.fontawesome.com",
        {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: query
        })

        if(response.status===200||response.status===201){
            //returns json if json exist otherwise returns true
            try{
                const json = await response.json()
                return json.data.search
            }catch(e){
                return []
            }
            
        }else{
            return []
        }

    }catch(e){
        //console.log(e)
    }
}

export { fetchIcons }
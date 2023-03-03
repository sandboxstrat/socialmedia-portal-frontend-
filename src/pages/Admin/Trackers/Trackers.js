import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Loading from 'components/Admin/ui/Loading'
import { Grid, Box } from '@mui/material'
import { useNavigate, useOutletContext } from 'react-router-dom'
import MUIDataTable from 'mui-datatables'
import { Check } from '@mui/icons-material'
import { getAllTrackers } from 'adapters/trackersLumenApi'
import { AddTrackerButton } from 'components/Admin/Trackers/AddTrackerButton'

const Trackers = () => {

    const [ currentPage, setCurrentPage ] = useOutletContext()
    const [ trackerData, setTrackerData ]   = React.useState(null)
    const [ lumenAccessToken, setLumenAccessToken ] = React.useState()
    const { getAccessTokenSilently } = useAuth0()
    let navigate = useNavigate()

    //Retrieves tracker data from database
    React.useEffect(()=>{

        async function getTrackerData() {
            
            try{
                const apiAccessToken = await getAccessTokenSilently()
                setTrackerData( await getAllTrackers(apiAccessToken) )
                
            }catch(e){

            }
        }
        getTrackerData()

    },[getAccessTokenSilently])

    React.useEffect(()=>{
        setCurrentPage("Trackers")
    })
    
    if(trackerData===null){
        return <Loading/>
    }
    
    
    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
        onRowClick:(rowData, rowMeta, rowIndex)=>{
            const link="/admin/trackers/"+rowData[0]
            navigate(link)
        },
        download: false,
        print: false,
    }

    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display:"excluded"
                
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "active",
            label: "Active",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value,tableMeta,updateValue)=>{
                    if(value===true||value===1){
                        return(
                                <Check />
                        )
                    }else{
                        return null
                    }
                }
            }
        },{
            name: "updated_at",
            label: "Last Updated",
            options: {
             filter: false,
             sort: true,
             customBodyRender: (value,tableMeta)=>{
                const timestampArray=value.split("T")
                const timeArray=timestampArray[1].split(".")
                const dateTime = timestampArray[0]+" "+timeArray[0]
                return(dateTime)

            }
            }
           },
       ];

    return(
        <>
            <Grid
                    container
                    spacing={5}
                    direction="row"
                    alignItems="top"
                    height="100%"
                >
                <Grid item xs={ 12 }>
                    < AddTrackerButton />
                </Grid>
                <Grid item xs={ 12 }>
                    <Box sx={ { width: '100%' } }>
                        <MUIDataTable
                            title = { "Trackers" }
                            data = { trackerData }
                            columns = { columns }
                            options = { options }
                        />
                    </Box> 
                </Grid>   
            </Grid>
        </>
    )

}

export default Trackers
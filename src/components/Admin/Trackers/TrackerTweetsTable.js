import React from 'react'
import { Grid, Box, formLabelClasses,Button } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { ProcessingContext } from 'contexts/Contexts'
import SelectedRowsToolbar from 'components/SelectedRowsToolbar'

const TrackerTweetsTable = (props) => {
    
    const options = {
        filterType: 'checkbox',
        selectableRows: 'multiple',
        download: false,
        print: false,
        customToolbarSelect: (selectedRows, data) =>
          <SelectedRowsToolbar
            selectedRows={selectedRows}
            data={data}
            columns={columns}
            datatableTitle={props.datatableTitle}
        />,    
    }

    const columns = [
        {
            name: "username",
            label: "User Name",
            options: {
                filter: false,
                sort: true,                
            }
        },{
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display:"excluded"
                
            }
        },
        {
            name: "text",
            label: "Tweet",
            options: {
                filter: false,
                sort: true,
            }
        },{
            name: "retweet_count",
            label: "Retweets",
            options: {
                filter: false,
                sort: true,
            }
        },{
            name: "reply_count",
            label: "Replies",
            options: {
                filter: false,
                sort: true,
            }
        },{
            name: "like_count",
            label: "Likes",
            options: {
                filter: false,
                sort: true,
            }
        },{
            name: "quote_count",
            label: "Quotes",
            options: {
                filter: false,
                sort: true,
            }
        },{
            name: "impression_count",
            label: "Impressions",
            options: {
                filter: false,
                sort: true,
            }
        },{
            name: "created_at",
            label: "Created",
            options: {
                sort: true,
                filter:true,
                customBodyRender: (value)=>{
                    let valueArray = value.split(" ")
                    return valueArray[0]
                }
            }
        },{
            name: "tracker_name",
            label: "Tracker",
            options: {
                filter: false,
                display:"excluded"
                
            }
        }
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
                    <MUIDataTable
                        title = { "Twitter Data" }
                        data = { props.tweetsData }
                        columns = { columns }
                        options = { options }
                    />

                </Grid>  
            </Grid>
        </>
    )

}

export { TrackerTweetsTable }
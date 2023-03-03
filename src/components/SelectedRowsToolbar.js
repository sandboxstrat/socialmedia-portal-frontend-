import React from 'react'
import { ProcessingContext } from 'contexts/Contexts'
import { useAuth0 } from '@auth0/auth0-react'
import { exportCsv } from 'adapters/exportLumenApi'
import { IconButton } from '@mui/material'
import { CloudDownload } from '@mui/icons-material'

const SelectedRowsToolbar = ( props ) => {

    const [ processing, setProcessing ] = React.useContext(ProcessingContext)
    const { getAccessTokenSilently } = useAuth0();

    async function downloadRowsAsCSV(rows, columns, fileName){

        setProcessing(true)
        const csvString = formatCsvData(columns, rows)
        const accessToken = await getAccessTokenSilently()
        await exportCsv(csvString,accessToken,`${fileName} Export.csv`)
        setProcessing(false)

    }

    //process data and returns properly formatted array
    const formatCsvData = (columns, data) => {
        let exportData = {header:[],data:[]}

        // maps through the columns array and generates the csv header
        exportData.header = columns.map(column => column.label)

        // maps through each row and adds a new line so the next row can be generated
        exportData.data=(data.map(
            row => row.map(
                function(cell){
                    if(cell!==null){
                        //if cell is a link returns href
                        if(typeof cell === 'object'){
                            return cell.props.href
                        }else{
                            return cell
                        }
                    }else{
                        return ""
                    }
                }
        )))
        
        return exportData
    }

    // gets from all the data the selected rows
    const getRowsToBeDownloaded = (selectedRows, data) => {
        return data.filter(row => selectedRows.data.some(selected => selected.dataIndex === row.dataIndex)).map(row => row.data);
    }


    return (
    <div>
        <IconButton onClick={() => downloadRowsAsCSV(getRowsToBeDownloaded(props.selectedRows, props.data), props.columns, props.datatableTitle)}>
            <CloudDownload />
        </IconButton>
    </div>
    );
}

export default SelectedRowsToolbar
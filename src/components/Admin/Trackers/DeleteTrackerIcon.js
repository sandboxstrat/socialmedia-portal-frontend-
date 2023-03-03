import React from 'react'
import { Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material'
import DeleteTrackerDialog from './DeleteTrackerDialog';

const DeleteTrackerIcon = (props) =>{
    const [ open, setOpen ] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = (value) => {
      setOpen(false);
    }
  
    return(
        <>
            <Tooltip title="Delete Tracker">
                <Delete onClick={handleClickOpen}/>
            </Tooltip>
            <DeleteTrackerDialog
                open={open}
                handleClose={ handleClose }
                onClose={ handleClose }
                maxWidth="md"
                trackerId = { props.trackerId }
                trackerName = { props.trackerName }
            />
        </>
        
    )
}

export default DeleteTrackerIcon

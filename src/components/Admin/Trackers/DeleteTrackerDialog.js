import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,  Button, TextField } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react'
import { ProcessingContext } from 'contexts/Contexts'
import { deleteTracker} from 'adapters/trackersLumenApi'
import { useNavigate } from 'react-router-dom'
import { UserInfoContext } from 'contexts/Contexts'

function DeleteTrackerDialog(props) {

    const [ processing, setProcessing ] = React.useContext(ProcessingContext)
    const userInfo = React.useContext(UserInfoContext)
    const { getAccessTokenSilently } = useAuth0()
    let navigate = useNavigate()
    
    async function handleDeleteTracker(){
        setProcessing(true)

        const accessToken = await getAccessTokenSilently()
        const response = await deleteTracker( props.trackerId, accessToken )
        
        navigate("/admin/trackers")
        setProcessing(false)

    }
  
    return (
      <Dialog open={ props.open }>
        <DialogTitle>Add New Tracker</DialogTitle>
        <DialogContent sx={{width:"400px"}}>
            <DialogContentText>
                Do you want to delete tracker "{props.trackerName}"? Deleting this tracker will delete all associated data. 
            </DialogContentText>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteTracker}>DELETE TRACKER</Button>
        </DialogActions>
      </Dialog>
    );
  }

  export default DeleteTrackerDialog
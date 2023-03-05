import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,  Button } from '@mui/material';

import { useNavigate } from 'react-router-dom'

const TrackerInitializingDialog = (props) => {

    let navigate = useNavigate()
    
    async function handleReturnClick(){  
        navigate("/admin/trackers")
    }
  
    return (
      <Dialog open={ props.open }>
        <DialogTitle>Tracker Initializing</DialogTitle>
        <DialogContent sx={{width:"400px"}}>
            <DialogContentText>
                This tracker is currently retreiving the latest data. Please check back in 5 to 10 minutes.
            </DialogContentText>
        
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleReturnClick}>Return to tracker selection</Button>
        </DialogActions>
      </Dialog>
    );
  }

  export default TrackerInitializingDialog
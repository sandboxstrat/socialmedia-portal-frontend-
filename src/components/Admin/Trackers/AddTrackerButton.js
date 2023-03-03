import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,  Button, TextField } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react'
import { ProcessingContext } from 'contexts/Contexts'
import { addTracker } from 'adapters/trackersLumenApi'
import { useNavigate } from 'react-router-dom'
import { UserInfoContext } from 'contexts/Contexts'

function AddTrackerDialog(props) {

    const [ formData, setFormData ] = React.useState()
    const [ lumenAccessToken, setLumenAccessToken ] = React.useState()
    const [ processing, setProcessing ] = React.useContext(ProcessingContext)
    const userInfo = React.useContext(UserInfoContext)
    const { getAccessTokenSilently } = useAuth0()
    let navigate = useNavigate()

     //retrieves token for lumen
     React.useEffect(()=>{
        async function getLumenAccessToken(){
          
            const accessToken = await getAccessTokenSilently()
            setLumenAccessToken(accessToken)
        }
        getLumenAccessToken()
    },[getAccessTokenSilently])
    
    function handleFormChange(event){
      setFormData(prevFormData =>{
          return{
              ...prevFormData,
              [event.target.name]:event.target.value
          }
      })
    }

    async function saveFormData(){
        setProcessing(true)
        formData.name = formData.name.trim()

        formData.active=1
        formData.created_by = userInfo.user_id
        formData.last_edited_by = userInfo.user_id

        const response = await addTracker(formData, lumenAccessToken)
        
        setProcessing(false)

        if("id" in response){
          
          navigate(response.id)
        }

    }
  
    return (
      <Dialog open={ props.open }>
        <DialogTitle>Add New Tracker</DialogTitle>
        <DialogContent sx={{width:"400px"}}>
        <DialogContentText>
            Please enter a name for the tracker
          </DialogContentText>
          <br/>
          <TextField
              label="Tracker Name"
              name="name" 
              fullWidth={true}
              onChange = {handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button onClick={saveFormData}>Add Tracker</Button>
        </DialogActions>
      </Dialog>
    );
  }

const AddTrackerButton = () =>{
    const [ open, setOpen ] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = (value) => {
      setOpen(false);
    }
  
    return(
        <>
            <Button variant="contained" className="trackers--addtracker" onClick={handleClickOpen}>
                Add New Tracker
            </Button>
            <AddTrackerDialog
                open={open}
                handleClose={handleClose}
                onClose={handleClose}
                maxWidth="md"
            />
        </>
        
    )
}

export { AddTrackerButton }
import React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

const PopoverHandler = (props) => {

    const anchor = document.getElementById("root")

    const handleClose = () => {
        props.setPopoverData({status:false})
    }

    const id = props.status ? 'Response Popover' : undefined;

    let backgroundColor

    switch(props.type){
        case "success":
        backgroundColor="#AAF2D1"
        break
    case "error":
        backgroundColor="#D9534F"
        break
    default:
        backgroundColor="FFF"
        break
    }

  return (
    <div>
      <Popover
        id={id}
        open={props.status}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        PaperProps={{
          style: { backgroundColor:backgroundColor },
        }}
      >
        <Typography sx={{ p: 2 }}>{props.text}</Typography>
      </Popover>
    </div>
  );
}

export default PopoverHandler
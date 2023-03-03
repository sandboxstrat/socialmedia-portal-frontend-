import React from 'react';
import { useLocation } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText, Typography }from '@mui/material';
import { Dashboard as DashboardIcon, SportsEsports as GameIcon, Feedback as FeedbackIcon , Logout as LogoutIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import WithLogout from 'components/Admin/Authentication/WithLogout'

const sideBarItemsArray = [
  {
    link:"/admin",
    icon:<DashboardIcon/>,
    text:"Dashboard",
    authentication:false,
    authenticationType:""
  },
  {
    link:"trackers",
    icon:<GameIcon/>,
    text:"Trackers",
    authentication:false,
    authenticationType:""
  },
  {
    icon:<LogoutIcon/>,
    text:"Logout",
    authentication:true,
    authenticationType:"logout"
  },
]

const SideBarItems = (props) => {
  return(
    <>
        {sideBarItemsArray.map((sideBarItem)=>{
          const active = (props.currentPage===sideBarItem.text)?"active":"inactive"
          const listItem = 
            <ListItem button className={active}>
              <ListItemIcon>
              {sideBarItem.icon}
              </ListItemIcon>
              <ListItemText primary={sideBarItem.text} />
          </ListItem>

          const listItemWithLink = 
              <Link to={sideBarItem.link}>
              
              <Typography component={'span'} sx={{color:"#000"}}>{listItem}</Typography>
            </Link>
      
          if(sideBarItem.link){
            return <React.Fragment key={sideBarItem.text}>{listItemWithLink}</React.Fragment>
          }else if(sideBarItem.authentication){
            return <React.Fragment key={sideBarItem.text}><WithLogout originalComponent={listItem}/></React.Fragment>
          }else{
            return <React.Fragment key={sideBarItem.text}>{listItem}</React.Fragment>
          }
        })}
    </>
)}

export default SideBarItems
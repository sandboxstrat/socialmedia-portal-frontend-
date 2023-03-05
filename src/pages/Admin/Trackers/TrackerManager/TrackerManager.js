import React from 'react'
import { Paper, Tabs, Tab, Box, Button, Grid, TextField, Typography, Select, MenuItem } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useOutletContext, useParams } from 'react-router-dom'
import Loading from 'components/Admin/ui/Loading'
import {  getTracker, updateTracker } from 'adapters/trackersLumenApi'
import PopoverHandler from 'components/Admin/ui/PopoverHandler'
import { ProcessingContext } from 'contexts/Contexts'
import { UserInfoContext } from 'contexts/Contexts'
import DeleteTrackerIcon from 'components/Admin/Trackers/DeleteTrackerIcon'
import "assets/style.css"
import { getTweets, getTweetCount } from 'adapters/twitterApi'
import { TrackerTweetsTable } from 'components/Admin/Trackers/TrackerTweetsTable'
import Chart from 'components/Admin/Chart';
import { SelectChangeEvent } from '@mui/material/Select';
import TrackerInitializingDialog from 'components/Admin/Trackers/TrackerInitializingDialog'


function TabPanel(props) {
    const { children, value, index, ...other } = props
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
            )}
        </div>
    );
}

const TrackerManager = () => {

    const [ currentPage, setCurrentPage ] = useOutletContext()
    const [ processing, setProcessing ] = React.useContext(ProcessingContext)
    const [ tabValue, setTabValue ] = React.useState(0);
    const [ params, setParams ] = React.useState(useParams())
    const { getAccessTokenSilently } = useAuth0();
    const [ currentTracker, setCurrentTracker ] = React.useState(null)
    const [ formData, setFormData ] = React.useState(null)
    const userInfo = React.useContext(UserInfoContext)
    const [ tweetsData, setTweetsData ] = React.useState(null)
    const [ tweetCount, setTweetCount ] = React.useState(null)
    const [ lookbackPeriod, setlookbackPeriod ] = React.useState(30)
    const [ trackerInitializingDialogOpen, setTrackerInitializingDialogOpen ] = React.useState(false)
    const [ popoverData, setPopoverData ] = React.useState(
    {
        text:'',
        type:'',
        status:false
    })

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    //Loads tracker data
    React.useEffect(()=>{

        setCurrentPage("Tracker Manager")

        async function getTrackerData( trackerId ){

            setProcessing(true)

            let startDate = null

            if(lookbackPeriod!==0){
                const today = new Date()
                const date = new Date(today)
                date.setDate(date.getDate() - lookbackPeriod)
                startDate = date.toLocaleDateString()
            }

            const accessToken = await getAccessTokenSilently()

            const trackerData = await getTracker( trackerId , accessToken )

            setCurrentTracker( trackerData )

            const twitterTrackerData = await getTweets(  accessToken, trackerData.id, startDate )

            setTweetsData( twitterTrackerData )

            const TweetsByDayData = await getTweetCount(  accessToken, trackerData.id, startDate )

            setTweetCount( TweetsByDayData )

            setFormData({
                id:trackerData.id,
                name:trackerData.name,
                search_terms:trackerData.search_terms,
                last_edited_by:trackerData.last_edited_by,
            })

            setProcessing(false)

        }
        getTrackerData( params.trackerId )

        

    },[lookbackPeriod])

    React.useEffect(()=>{

        //turns on warning if there are search terms but tracker has not initilized
        if(currentTracker!==null){
            if(currentTracker.search_terms!==null&&currentTracker.search_terms!==""&&currentTracker.twitter_initialized==false){

               setTrackerInitializingDialogOpen(true)
                
            }
        }
        
    },[currentTracker,setTrackerInitializingDialogOpen])

    const handleFormChange = (event) => {
        
        setFormData(prevFormData =>{
            return{
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })

    }

    async function saveFormData(){
        setProcessing(true)
        const accessToken = await getAccessTokenSilently()
        const trackerUpdateInfo = await updateTracker( formData, accessToken )
        setPopoverData({
            text: "Tracker Updated",
            type:"success",
            status: true
        })
        setProcessing(false)
        setCurrentTracker( trackerUpdateInfo )
    }

    async function updateTrackerName(event){
        const accessToken = await getAccessTokenSilently()
        if(currentTracker.name !== event.target.value){
            setProcessing(true)
            const newTrackerData = {
                id:currentTracker.id,
                name:event.target.value
            }
            await updateTracker(newTrackerData, accessToken )
            setProcessing(false)
        }
    }

    const handleDateSelectorChange = (event: SelectChangeEvent) => {
        setlookbackPeriod(event.target.value);
    };

    if(formData===null){
        return(
            <></>
        )
    }
    
    return(
        <Box sx={{ width: '100%' }}>
            <PopoverHandler
                status = {popoverData.status}
                setPopoverData = {setPopoverData}
                text={popoverData.text}
                type={popoverData.type}
            />
            <TrackerInitializingDialog
                    open = {trackerInitializingDialogOpen}
            />
            <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                >
                <Grid item xs={11}>
                    <TextField
                        label="Tracker Name"
                        name="name"
                        id="trackermanager--name"
                        fullWidth={true} 
                        defaultValue={currentTracker.name}
                        onBlur = {updateTrackerName}
                        sx={{fontSize:"3rem"}}
                    />
                </Grid>
                <Grid item xs={1} >
                    <DeleteTrackerIcon
                        sx={{paddingTop:'auto',paddingBottom:'auto'}}
                        trackerId = {currentTracker.id}
                        trackerName = {currentTracker.name}
                    />
                </Grid>
            </Grid>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Tracker Results"  />
                <Tab label="Edit Tracker" />
                </Tabs>
            </Box>
{/*Tracker Results Section*/}   
            <TabPanel value={tabValue} index={0}>
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{display:'inline-flex', flexDirection: 'row'}}>
                            <Typography variant="h5" component="h2">
                                Updates from&nbsp; 
                            </Typography>
                        </Box>
                        <Box sx={{display:'inline-flex', flexDirection: 'row'}}>
                            <Select
                                id="date-selector"
                                value={lookbackPeriod}
                                label="Age"
                                onChange= {handleDateSelectorChange}
                            >
                                <MenuItem value={1}><Typography variant="h5" component="h2">past day</Typography></MenuItem>
                                <MenuItem value={3}><Typography variant="h5" component="h2">past three days</Typography></MenuItem>
                                <MenuItem value={7}><Typography variant="h5" component="h2">past week</Typography></MenuItem>
                                <MenuItem value={30}><Typography variant="h5" component="h2">past 30 days</Typography></MenuItem>
                                <MenuItem value={0}><Typography variant="h5" component="h2">all days</Typography></MenuItem>
                            </Select>
                        </Box>

                    </Grid>
                    {/* Chart */}
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                            }}
                        >
                            <Chart 
                                data = { tweetCount }
                                x = "date"
                                y = "count"
                                xlabel="Updates"
                                chartTitle="Recent Updates"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <TrackerTweetsTable 
                            tweetsData = { tweetsData }
                            datatableTitle = { currentTracker.name }
                        />
                    </Grid>
                </Grid>
                
            </TabPanel>
{/*Edit Tracker Section*/}            
            <TabPanel value={tabValue} index={1}>
                <Grid
                    container
                    direction="row"
                    spacing={3}
                >
                    <Grid item lg={12}>
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                        >
                            <Grid item lg={12}>
                            <TextField
                                label="Search Terms"
                                name="search_terms"
                                sx={{width:"100%"}}
                                placeholder="Enter search terms"
                                defaultValue={formData.search_terms}
                                multiline
                                minRows={5}
                                maxRows={10}
                                onChange = { handleFormChange }
                            />
                            </Grid>
                           
                            <Grid item lg={12}>
                                <Button variant="contained" onClick={()=>{saveFormData()}}>Save</Button>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
            </TabPanel>
        </Box>
    )
}

export default TrackerManager
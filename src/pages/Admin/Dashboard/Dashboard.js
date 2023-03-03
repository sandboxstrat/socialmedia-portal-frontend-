import { Paper, Box, Grid, Typography, Select, MenuItem } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import { ProcessingContext } from 'contexts/Contexts'
import Loading from 'components/Admin/ui/Loading'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { getTweets, getTweetCount } from 'adapters/twitterApi'
import TrackerTweetsTableDashboard from 'components/Admin/TweetsTrackerTableDashboard'
import Chart from 'components/Admin/Chart';
import { SelectChangeEvent } from '@mui/material/Select';


const Dashboard = (props) => {

    const [currentPage, setCurrentPage] = useOutletContext()
    const { getAccessTokenSilently } = useAuth0()
    const [ tweetsData, setTweetsData ] = React.useState(null)
    const [ tweetCount, setTweetCount ] = React.useState(null)
    const [ lookbackPeriod, setlookbackPeriod ] = React.useState(7)
    const [ processing, setProcessing ] = React.useContext(ProcessingContext)

    const handleDateSelectorChange = (event: SelectChangeEvent) => {
        setlookbackPeriod(event.target.value);
    };

    React.useEffect(()=>{

        setCurrentPage("Dashboard")

        async function getRecentData(){

            setProcessing(true)

            let startDate = null

            if(lookbackPeriod!==0){
                const today = new Date()
                const date = new Date(today)
                date.setDate(date.getDate() - lookbackPeriod)
                startDate = date.toLocaleDateString()
            }

            const accessToken = await getAccessTokenSilently()

            const twitterTrackerData = await getTweets(  accessToken, null, startDate )

            setTweetsData( twitterTrackerData )

            const TweetsByDayData = await getTweetCount(  accessToken, null, startDate )

            setTweetCount( TweetsByDayData )

            setProcessing(false)
        }
        getRecentData()

    },[lookbackPeriod])

    if(tweetsData===null){
        return(
            <></>
        )
    }

    return(
        <>
            
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
                                <MenuItem value={14}><Typography variant="h5" component="h2">past two weeks</Typography></MenuItem>
                                <MenuItem value={30}><Typography variant="h5" component="h2">past 30 days</Typography></MenuItem>
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
                        <TrackerTweetsTableDashboard 
                            tweetsData = { tweetsData }
                            datatableTitle = { "Recent Tweets" }
                        />
                    </Grid>
                </Grid>
        </>
    )
}

export default Dashboard
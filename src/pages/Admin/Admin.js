import React from 'react'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, CssBaseline, Container, Toolbar } from '@mui/material'
import SideBar from 'components/Admin/ui/SideBar'
import Header from 'components/Admin/ui/Header'
import { Outlet } from "react-router-dom"
import { UserInfoContext,TrackersContext, ProcessingContext, LatestFeedbackContext, LatestFeedbackChartContext } from 'contexts/Contexts'
import Loading from 'components/Admin/ui/Loading'
import Processing from 'components/Admin/ui/Processing'


const theme = createTheme()

const Admin = () => {

    const { user, getAccessTokenSilently } = useAuth0();
    const [ userMetadata, setUserMetadata ] = React.useState(null);
    const [ currentPage, setCurrentPage ] = React.useState("Dashboard")
    const [ games, setGames ] = React.useState({gamesById:null,gamesByUrl:null})
    const [ processing, setProcessing ] = React.useState(false)
    const [ latestFeedbackData, setLatestFeedbackData ] = React.useState([])
    const [ latestFeedbackTableData, setLatestFeedbackTableData] = React.useState([])

    //pulls user info
    React.useEffect(() => {

        const getUserMetadata = async () => {

            try {
                
                //Retrieves token for user metadata, not valid for lumen
                const token = await getAccessTokenSilently()

                //URL for user details
                const userDetailsByIdUrl = `${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`

                //retreives user details and stores in state
                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const metadata = await metadataResponse.json();
                setUserMetadata(metadata)   

            } catch (e) {

            }
        }

        getUserMetadata()
    
    }, [getAccessTokenSilently, user?.sub]);

    //sets the state for the sideBar
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [drawerWidth]=React.useState(240);



    return (
        //Stores user data in UserInfo Context
        <UserInfoContext.Provider value={userMetadata}>
            <TrackersContext.Provider value="">
                <LatestFeedbackContext.Provider value={[ latestFeedbackData, setLatestFeedbackData ]}>
                    <LatestFeedbackChartContext.Provider value={[latestFeedbackTableData, setLatestFeedbackTableData]}>
                        <ProcessingContext.Provider value={[processing, setProcessing]}>
                            <ThemeProvider theme={theme}>
                                <Processing visible={processing}/>
                                <Box sx={{ display: 'flex' }}>
                                    <CssBaseline />
                                    <Header open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} currentPage={currentPage}/>
                                    <SideBar open={open} toggleDrawer={toggleDrawer}drawerWidth={drawerWidth} currentPage={currentPage}/>
                                    <Box
                                        component="main"
                                        sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                            ? theme.palette.grey[100]
                                            : theme.palette.grey[900],
                                        flexGrow: 1,
                                        height: '100vh',
                                        overflow: 'auto',
                                        }}
                                    >
                                        <Toolbar />
                                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                                            {/*this is where the main part of the website is displayed*/}
                                            <Outlet context={[currentPage,setCurrentPage]}/>

                                        </Container>
                                    </Box>
                                </Box>
                            </ThemeProvider>
                        </ProcessingContext.Provider>
                    </LatestFeedbackChartContext.Provider>
                </LatestFeedbackContext.Provider>    
            </TrackersContext.Provider>
        </UserInfoContext.Provider>
    )
}

export default withAuthenticationRequired(Admin,{
    returnTo:''
})
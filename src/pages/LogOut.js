import React from 'react'
import WithLogin from 'components/Admin/Authentication/WithLogin'
import { Button, CssBaseline, Paper, Grid, Typography} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import images from 'contexts/images'

const theme = createTheme();

const LogOut = () =>{

    const loginButton = 
        <Button 
            variant="contained"
            fullWidth
            sx={{marginTop:"15px", width:"100%"}}
        >
            Sign In
        </Button>

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${images('./Logout_background.png')})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item>
                            <Typography component="h1" variant="h5">
                                You've sucessfully signed out
                            </Typography>
                            <WithLogin originalComponent={loginButton}/>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default LogOut
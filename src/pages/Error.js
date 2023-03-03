import React from 'react'
import { Container, Typography, Grid, Button, Box } from '@mui/material'

const Error = () =>{
    return(
        <Container className="processing" sx={{ 
            minWidth: "100vw", 
            minHeight: "100vh", 
            backgroundColor:"rgba(0, 0, 0, 0.9)",  
            zIndex:9999, 
            position:"fixed",
            top:0,
            left:0
        }}>
        <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
        >
            <Grid item height="100%" xs={12}>
                <Typography variant="h2" sx={{color:'white', marginBottom:"30px"}} align="center">Sorry, something went wrong</Typography>
                <Box textAlign='center'>
                    <Button href={process.env.REACT_APP_SABER_WEBSITE}>Return to Saber Interactive Website</Button>
                </Box>
                
            </Grid>
        </Grid>
    </Container>
    )
}

export default Error
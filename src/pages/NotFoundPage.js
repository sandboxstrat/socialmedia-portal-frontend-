import React from 'react'
import { Container, Typography, Grid, Button } from '@mui/material'

const NotFoundPage = () =>{
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
                <Typography variant="h1" sx={{color:'white'}} align="center">404</Typography>
                <Typography sx={{color:'white', marginBottom:"30px"}} align="center">Page Not Found</Typography>
                <Button href="https://saber3d.com">Return to Saber Interactive Website</Button>
            </Grid>
        </Grid>
    </Container>
    )
}

export default NotFoundPage
import React from 'react'
import { Container, Grid, CircularProgress } from '@mui/material'

const Processing = (props) => {

    const display=(props.visible)?"block":"none"

    return(
        <Container className="processing" sx={{ 
                minWidth: "100vw", 
                minHeight: "100vh", 
                backgroundColor:"rgba(0, 0, 0, 0.7)",  
                display:{display}, 
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
                    <CircularProgress />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Processing
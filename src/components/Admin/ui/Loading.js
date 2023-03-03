import React from 'react'
import { Container, Grid, CircularProgress } from '@mui/material'

const Loading = () => {
    return(
        <Container sx={{ width: "100vh", height: "100vh"}}>
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

export default Loading
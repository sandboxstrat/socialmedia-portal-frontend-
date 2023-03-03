import React from 'react'
import AppRouter from './routes/AppRouter'
import "assets/style.css"
import {Helmet} from 'react-helmet'

const App = () => {

    return(
        <div className="App">
            <Helmet>
                <script src={ process.env.REACT_APP_FONTAWESOME_KIT } crossorigin="anonymous"></script>
            </Helmet>
            <AppRouter />
        </div>
    )
}

export default App
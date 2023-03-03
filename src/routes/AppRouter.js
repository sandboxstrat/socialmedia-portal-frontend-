/*This stores the main route that <App> uses*/

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Admin from 'pages/Admin/Admin'
import Dashboard from 'pages/Admin/Dashboard/Dashboard'
import Trackers from 'pages/Admin/Trackers/Trackers'
import Management from 'pages/Admin/Management/Management'
import NotFoundPage from 'pages/NotFoundPage'
import TrackerManager from 'pages/Admin/Trackers/TrackerManager/TrackerManager'

////<Route path = "games/:gameUrl" element={<GameManager/>}/>

const AppRouter = () => {
    return(
        <Routes>
            <Route path = "/admin" element = {<Admin />}>
                <Route index element = {<Dashboard/>}/>
                <Route path = "trackers" element = {<Trackers/>}/>
                <Route path = "trackers/:trackerId" element = {<TrackerManager/>}/>
                <Route path = "management" element = {<Management/>}/>
            </Route>
            <Route path="404" element={ <NotFoundPage/> } />
            <Route path="/" element={ <Navigate to="/admin" replace />} />
        </Routes>
    )
}

export default AppRouter


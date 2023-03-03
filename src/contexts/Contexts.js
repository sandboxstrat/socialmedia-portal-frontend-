import React from 'react'

const UserInfoContext = React.createContext({
    user:null,
    setUser: ()=>{}
})

const images = require.context('../assets/images', true);

const TrackersContext = React.createContext(null)

const ProcessingContext = React.createContext()

const LatestFeedbackContext = React.createContext()

const LatestFeedbackChartContext = React.createContext()

export { UserInfoContext, images, TrackersContext, ProcessingContext, LatestFeedbackContext, LatestFeedbackChartContext }
import ReactGA from 'react-ga4'

export const trackPageview = (page: string) => {
    ReactGA.send({
        hitType: 'pageview', 
        page: page,
    })
}

export const trackEvent = (category: string, action: string) => {
    ReactGA.event({
        category: category,
        action: action
    })
}
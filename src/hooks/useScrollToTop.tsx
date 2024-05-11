import { useEffect } from "react"

const useScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        scrollToTop()
    })

    return scrollToTop
}

export default useScrollToTop
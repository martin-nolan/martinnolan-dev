import * as React from "react"
import { MOBILE_BREAKPOINT } from "@/lib/constants"

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Throttle function to limit calls
    let timeoutId: NodeJS.Timeout
    const throttledOnChange = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }, 200)
    }
    
    mql.addEventListener("change", throttledOnChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    return () => {
      mql.removeEventListener("change", throttledOnChange)
      clearTimeout(timeoutId)
    }
  }, [])

  return !!isMobile
}

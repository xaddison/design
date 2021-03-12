import React, {useMemo} from 'react'
import {PortalContext} from './portalContext'
import {PortalContextValue} from './types'

/**
 * @public
 */
export interface PortalProviderProps {
  children?: React.ReactNode
  element: HTMLElement | null
}

const __BROWSER__ = typeof window !== 'undefined'

/**
 * @public
 */
export function PortalProvider(props: PortalProviderProps): React.ReactElement {
  const {children, element} = props

  const value: PortalContextValue = useMemo(() => {
    return {
      version: 0.0,
      element: element || (__BROWSER__ && document.body) || null,
    }
  }, [element])

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

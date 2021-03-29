import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {useMediaIndex, useResponsiveProp} from '../../hooks'
import {LayerContext} from './layerContext'
import {LayerContextValue} from './types'

/**
 * @public
 */
export function LayerProvider(props: {
  children?: React.ReactNode
  zOffset?: number | number[]
}): React.ReactElement {
  const {children, zOffset: zOffsetProp = 0} = props
  const parent = useContext(LayerContext)
  const zOffset = useResponsiveProp(zOffsetProp)
  const maxMediaIndex = zOffset.length - 1
  const mediaIndex = Math.min(useMediaIndex(), maxMediaIndex)
  const zIndex = parent ? parent.zIndex + zOffset[mediaIndex] : zOffset[mediaIndex]
  const [size, setSize] = useState(0)

  const registerChild = useCallback(() => {
    setSize((v) => v + 1)

    return () => setSize((v) => v - 1)
  }, [])

  const parentRegisterChild = parent?.registerChild

  useEffect(() => {
    if (!parentRegisterChild) return

    return parentRegisterChild()
  }, [parentRegisterChild])

  const value: LayerContextValue = useMemo(
    () => ({version: 0.0, isTopLayer: size === 0, registerChild, size, zIndex}),
    [size, registerChild, zIndex]
  )

  return <LayerContext.Provider value={value}>{children}</LayerContext.Provider>
}

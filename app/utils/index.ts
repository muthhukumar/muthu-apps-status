import * as React from 'react'

const isServerEnvironment: () => boolean = () => typeof window === 'undefined'

function useWindowDimensions() {
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 })

  const handleResize = () => {
    const { innerWidth: width, innerHeight: height } = window
    setDimensions({ width, height })
  }

  React.useLayoutEffect(() => {
    handleResize()
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { width: dimensions.width, height: dimensions.height }
}

function getCellBorderStyles({
  width,
  index,
  size,
}: {
  width: number
  index: number
  size: number
}) {
  if (width > 768) {
    return [
      {
        'border-l-0': index % 2 !== 0,
        'border-r': index % 2 !== 0 && size % 2 === 0 && index === size - 1,
        'border-t-0': index > 1,
      },
    ]
  }

  return [{ 'border-t-0': index > 0 }]
}

export { isServerEnvironment, useWindowDimensions, getCellBorderStyles }

import React from 'react'

import { Status } from '../constants/status'
import { Data } from '../constants/api'

export const useFetch = (url: string, options: RequestInit = {}) => {
  const [data, setData] = React.useState<Data | null>(null)
  const [status, setStatus] = React.useState<Status>(Status.Idle)
  const [error, setError] = React.useState(null)
  const controller = React.useRef<AbortController>()

  React.useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      setStatus(Status.Loading)
      setData(null)
      setError(null)

      try {
        controller.current = new AbortController()
        const { signal } = controller.current

        const res = await fetch(url, { ...options, signal })
        const json = await res.json()
        setData(json)
        setStatus(Status.Success)
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          setStatus(Status.Error)
          setData(null)
          setError(null)
        }
      }
    }

    void fetchData()

    return () => {
      controller.current?.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return { data, error, status }
}

import React from 'react'

import { Autocomplete } from './components/Autocomplete'
import { API_URL } from './constants/environment'
import { useFetch } from './hooks/useFetch'
import { useDebounce } from './hooks/useDebounce'
import { Status } from './constants/status'
import styles from './App.module.css'

function App() {
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 300)
  const { data, error, status } = useFetch(
    `${API_URL}/character?name=${debouncedQuery}`,
  )

  const handleChange = (value: string) => setQuery(value)

  return (
    <main className={styles.app}>
      <Autocomplete
        query={query}
        onChange={handleChange}
        isLoading={status === Status.Loading}
        error={error}
        items={data?.results ?? []}
      />
    </main>
  )
}

export default App

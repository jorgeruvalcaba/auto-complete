import React, { useEffect } from 'react'

import { AutocompleteInput } from '../AutocompleteInput'
import { Suggestion } from '../../constants/api'
import { AutocompleteList } from '../AutocompleteList'
import styles from './Autocomplete.module.css'

type AutocompleteProps = {
  query: string
  onChange: (value: string) => void
  isLoading: boolean
  error?: string | null
  items?: Suggestion[] | null
}

export const Autocomplete = ({
  onChange,
  isLoading,
  error,
  items,
}: AutocompleteProps) => {
  const [showItems, setShowItems] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const inputRef = React.createRef<HTMLInputElement>()
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(
    -1,
  )

  useEffect(() => {
    if (!query) setHighlightedIndex(null)
  }, [query])

  const handleSelect = (value: string) => {
    setQuery(value)
    onChange(value)
    setShowItems(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setQuery(newValue)
    onChange(newValue)
  }

  const handleFocus = () => {
    if (Array.isArray(items)) setShowItems(true)
    setHighlightedIndex(0)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.relatedTarget) setShowItems(false)
  }

  const handleKeyUp = (key: string) => {
    switch (key) {
      case 'Escape':
        inputRef.current?.blur()
        setQuery('')
        onChange('')
        break

      case 'Enter':
        if (highlightedIndex) {
          inputRef.current?.blur()
          setQuery((items && items[highlightedIndex].name) ?? '')
          onChange((items && items[highlightedIndex].name) ?? '')
        }
        break

      default:
        break
    }
  }

  const handleKeyDown = (key: string) => {
    switch (key) {
      case 'ArrowUp':
        if (!showItems) return
        setHighlightedIndex(Math.max(0, (highlightedIndex || 0) - 1))
        break

      case 'ArrowDown':
        if (!showItems) return
        if (highlightedIndex === null) setHighlightedIndex(0)
        if (items)
          setHighlightedIndex(
            Math.min(items?.length - 1, (highlightedIndex || 0) + 1),
          )
        break

      default:
        break
    }
  }

  return (
    <div className={styles.autocomplete}>
      <label htmlFor="rickyMorty" className={styles.label}>
        Ricky & Morty's characters
      </label>
      <AutocompleteInput
        id="rickyMorty"
        name="autocomplete"
        ref={inputRef}
        value={query}
        onChange={handleChange}
        isLoading={isLoading}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={event => handleKeyUp(event.key)}
        placeholder="Rick Sanchez"
        onKeyDown={event => handleKeyDown(event.key)}
      />

      {showItems ? (
        <AutocompleteList
          items={query ? items : null}
          query={query}
          onSelect={handleSelect}
          highlightedIndex={highlightedIndex}
        />
      ) : null}

      {error ? <div className={styles.noResults}>{error}</div> : null}
    </div>
  )
}

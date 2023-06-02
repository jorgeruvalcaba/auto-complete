import React from 'react'

import { Spinner } from '../Spinner'
import styles from './AutocompleteInput.module.css'

interface AutocompleteInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading: boolean
}

export const AutocompleteInput = React.forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(({ isLoading = false, value = '', ...props }, ref) => (
  <div className={styles.container} data-testid="autocompleteInput">
    <input
      ref={ref}
      className={styles.autocompleteInput}
      type="text"
      value={value}
      {...props}
    />
    {isLoading ? <Spinner /> : null}
  </div>
))

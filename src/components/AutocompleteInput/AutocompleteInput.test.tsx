import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { AutocompleteInput } from './index'

describe('<AutocompleteInput />', () => {
  it('renders input element', () => {
    render(<AutocompleteInput isLoading={false} readOnly />)

    const inputElement = screen.getByTestId('autocompleteInput')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement.tagName).toBe('DIV')
  })

  it('renders Spinner when isLoading is true', () => {
    render(<AutocompleteInput isLoading={true} readOnly />)

    const spinnerElement = screen.getByTestId('spinner')
    expect(spinnerElement).toBeInTheDocument()
  })

  it('does not render Spinner when isLoading is false', () => {
    render(<AutocompleteInput isLoading={false} readOnly />)

    const spinnerElement = screen.queryByTestId('spinner')
    expect(spinnerElement).not.toBeInTheDocument()
  })

  it('passes input value correctly', async () => {
    const handleChange = vi.fn()
    render(
      <AutocompleteInput
        value="example"
        placeholder="morty"
        onChange={handleChange}
        isLoading={false}
      />,
    )

    const inputElement = screen.getByPlaceholderText(
      'morty',
    ) as HTMLInputElement
    expect(inputElement.value).toBe('example')

    await userEvent.type(inputElement, '123')
    expect(handleChange).toHaveBeenCalledTimes(3)
  })

  it('focuses on input when Tab key is pressed', async () => {
    render(<AutocompleteInput isLoading={false} placeholder="morty" readOnly />)

    const inputElement = screen.getByPlaceholderText(
      'morty',
    ) as HTMLInputElement
    expect(document.body).toHaveFocus()

    userEvent.tab()

    await waitFor(() => {
      expect(inputElement).toHaveFocus()
    })
  })
})

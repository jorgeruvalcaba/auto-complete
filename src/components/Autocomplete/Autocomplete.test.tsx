import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Autocomplete } from './'
import { mockData } from './mockData'

describe('AutoComplete', () => {
  test('should render correctly', () => {
    const onChange = vi.fn()
    render(
      <Autocomplete
        query={mockData.query}
        onChange={onChange}
        isLoading={mockData.isLoading}
        error={mockData.error}
        items={mockData.items}
      />,
    )
    expect(screen.getByText(/ricky & morty/i)).toBeInTheDocument()
  })

  test('should open AutoComplete list on focus', async () => {
    const onChange = vi.fn()
    render(
      <Autocomplete
        query={mockData.query}
        onChange={onChange}
        isLoading={mockData.isLoading}
        error={mockData.error}
        items={mockData.items}
      />,
    )
    expect(screen.getByText(/ricky & morty/i)).toBeInTheDocument()

    await userEvent.type(
      screen.getByRole('textbox', { name: /ricky & morty's characters/i }),
      'a',
    )

    expect(screen.getByRole('button', { name: /rick s/i })).toBeInTheDocument()
  })
})

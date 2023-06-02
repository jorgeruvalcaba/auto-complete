import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { AutocompleteList } from '.'
import { mockData } from './mockData'

describe('<AutocompleteList />', () => {
  const mockOnSelect = vi.fn()

  beforeEach(() => {
    vitest.clearAllMocks()
  })

  it('renders the list items correctly', () => {
    render(
      <AutocompleteList
        onSelect={mockOnSelect}
        items={mockData.populatedItems}
        query="a"
        highlightedIndex={1}
      />,
    )

    const listItemElements = screen.getAllByRole('button')

    expect(listItemElements).toHaveLength(20)
    expect(listItemElements[0]).toHaveTextContent(/rick sanchez/i)
    expect(listItemElements[1]).toHaveTextContent(/Abadango Cluster Princess/i)
    expect(listItemElements[2]).toHaveTextContent(/Abradolf Lincler/i)
  })

  it('renders "No character to display" when there are no items', () => {
    render(
      <AutocompleteList
        onSelect={mockData.onSelect}
        items={mockData.items}
        query={mockData.query}
        highlightedIndex={mockData.highlightedIndex}
      />,
    )

    expect(screen.getByText(/No character to display/i)).toBeInTheDocument()
  })

  it('calls onSelect with the selected name', async () => {
    render(
      <AutocompleteList
        onSelect={mockOnSelect}
        items={mockData.populatedItems}
        query=""
        highlightedIndex={0}
      />,
    )

    const listItemElements = screen.getAllByRole('button')
    await userEvent.click(listItemElements[1])

    expect(mockOnSelect).toHaveBeenCalledTimes(1)
    expect(mockOnSelect).toHaveBeenCalledWith('Abadango Cluster Princess')
  })
})

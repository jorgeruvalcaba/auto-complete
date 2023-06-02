import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('should render App correctly', () => {
    render(<App />)
    expect(screen.getByText(/ricky & morty's characters/i)).toBeInTheDocument()
  })
})

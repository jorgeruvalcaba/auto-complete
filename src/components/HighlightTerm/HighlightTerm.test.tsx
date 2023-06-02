import { render, screen } from '@testing-library/react'

import { HighLightTerm } from './'

describe('HighLightTerm', () => {
  it('renders correctly without highlight', () => {
    const text = 'This is a sample text'
    const highlight = ''

    render(<HighLightTerm text={text} highlight={highlight} />)

    expect(screen.queryByText('T')).toBeInTheDocument()
  })

  it('renders correctly with highlight', () => {
    const text = 'This is a sample text'
    const highlight = 'sample'

    render(<HighLightTerm text={text} highlight={highlight} />)

    const highlightedText = screen.getByText(highlight)
    expect(highlightedText).toBeInTheDocument()
    expect(highlightedText.textContent).toEqual(highlight)
  })
})

import { render, screen } from '@testing-library/react'
import Version from '../index'

vi.mock('@/config', () => ({
  envConfig: {
    GITHUB_RELEASE_URL: 'https://github.com/test/releases',
    VERSION_NO: '1.0.0',
  },
}))

vi.mock('@/constant/appEnv', () => ({
  getReleaseType: () => 'dev',
}))

describe('Version', () => {
  it('renders a link to GitHub releases', () => {
    render(<Version />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://github.com/test/releases')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('displays the version number', () => {
    render(<Version />)
    expect(screen.getByText('v1.0.0')).toBeInTheDocument()
  })

  it('displays the release type', () => {
    render(<Version />)
    expect(screen.getByText('dev')).toBeInTheDocument()
  })
})

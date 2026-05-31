import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageSwitcher from '../LanguageSwitcher'

const mockChangeLanguage = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}))

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockChangeLanguage.mockClear()
  })

  it('renders the switch language button', () => {
    render(<LanguageSwitcher />)
    expect(screen.getByLabelText('Switch language')).toBeInTheDocument()
  })

  it('displays the current language label', () => {
    render(<LanguageSwitcher />)
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    await user.click(screen.getByLabelText('Switch language'))

    expect(screen.getByText('繁體中文')).toBeInTheDocument()
    expect(screen.getByText('日本語')).toBeInTheDocument()
    expect(screen.getByText('العربية')).toBeInTheDocument()
  })

  it('calls changeLanguage when a language is selected', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    await user.click(screen.getByLabelText('Switch language'))
    await user.click(screen.getByText('日本語'))

    expect(mockChangeLanguage).toHaveBeenCalledWith('ja')
  })

  it('closes dropdown after selecting a language', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    await user.click(screen.getByLabelText('Switch language'))
    await user.click(screen.getByText('繁體中文'))

    expect(screen.queryByText('日本語')).not.toBeInTheDocument()
  })
})

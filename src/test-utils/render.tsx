import { render as rtlRender } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'

// Update the mock to include more router functionality
jest.mock("next/navigation", () => ({
    useRouter: () => ({
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn()
      },
      isFallback: false
    }),
    useSearchParams: () => ({
      get: () => {},
    }),
    usePathname: () => ({
      pathname: "",
    }),
  }));

const render = (ui: React.ReactElement, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <SessionProvider>{children}</SessionProvider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
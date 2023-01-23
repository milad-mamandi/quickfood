import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/auth-context'
import { UserContextProvider } from '../context/user-context'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Toaster />
        <Component {...pageProps} />
      </UserContextProvider>
    </AuthContextProvider >
  )
}

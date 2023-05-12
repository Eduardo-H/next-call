import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'

import { globalStyles } from '../styles/global'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  dayjs.extend(advancedFormat)

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

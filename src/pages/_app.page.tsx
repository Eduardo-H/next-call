import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayjs from 'dayjs'

import { globalStyles } from '../styles/global'

import { queryClient } from '@/lib/react-query'
import { DefaultSeo } from 'next-seo'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  dayjs.extend(advancedFormat)

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'us',
            url: 'https://www.next-call.xunito.com.br',
            siteName: 'Next Call',
          }}
        />

        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}

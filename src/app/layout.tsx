import localFont from 'next/font/local'
import './globals.css'

import { ProfileSetup } from './(auth)/explore/_components/ProfileSetup/ProfileSetup'
import { Providers } from './providers'

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/pretendard/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <Providers>
          {children}
          <ProfileSetup />
        </Providers>
      </body>
    </html>
  )
}

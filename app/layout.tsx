import { Analytics } from '@vercel/analytics/next'
import { Cairo } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' })

export const metadata: Metadata = {
  title: 'Cafetero Specialty Coffee | El Mokattam, Cairo',
  description: 'Specialty coffee, work and study spot, free Wi-Fi and match nights at ChillOut El Kafrawy.',
  generator: 'v0.app',
  openGraph: { title: 'Cafetero Specialty Coffee', description: 'Your daily spot to work, sip and chill.', type: 'website' },
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#fbf6ee', userScalable: true }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${cairo.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }

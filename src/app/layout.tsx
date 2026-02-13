import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: "Happy Valentine 💖",
  description: "A special Valentine's Day wish for my darling",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000'),
  openGraph: {
    title: "Happy Valentine 💖",
    description: "A special Valentine's Day wish for my darling",
    images: [{ url: '/img/thumbnail.jpeg', width: 1200, height: 630, alt: "Happy Valentine" }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Happy Valentine 💖",
    description: "A special Valentine's Day wish for my darling!",
    images: ['/img/thumbnail.jpeg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="image/png" href="/img/heart.svg" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

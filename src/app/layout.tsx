import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MuDauTruongSS1.Net - Mu Online Season 1",
  description: "Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Cộng đồng game thủ Việt Nam hàng đầu.",
  keywords: ["Mu Online", "Season 1", "Game", "Vietnam", "Server", "Gaming"],
  authors: [{ name: "MuDauTruongSS1 Team" }],
  creator: "MuDauTruongSS1.Net",
  publisher: "MuDauTruongSS1.Net",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mudautruongss1.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "MuDauTruongSS1.Net - Mu Online Season 1",
    description: "Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Cộng đồng game thủ Việt Nam hàng đầu.",
    url: 'https://mudautruongss1.net',
    siteName: 'MuDauTruongSS1.Net',
    images: [
      {
        url: '/icon.jpg',
        width: 1200,
        height: 630,
        alt: 'MuDauTruongSS1.Net - Mu Online Season 1',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MuDauTruongSS1.Net - Mu Online Season 1",
    description: "Server Mu Online Season 1 với tỷ lệ exp cao, drop rate tốt. Cộng đồng game thủ Việt Nam hàng đầu.",
    images: ['/icon.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'MU',
    statusBarStyle: 'default',
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import { MainProvider } from '@/providers/MainProvider'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Tandem',
	description: 'Tandem. Together is easier',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<script src='https://telegram.org/js/telegram-web-app.js'></script>
			</head>
			<body className={`${geistSans.variable}`}>
				<MainProvider>
					<>{children}</>
					<Toaster theme='dark' position='top-center' duration={1000} />
				</MainProvider>
			</body>
		</html>
	)
}

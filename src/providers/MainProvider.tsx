'use client'

'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { FC, PropsWithChildren } from 'react'

const manifestUrl = 'https://yury08.github.io/torch-metadata/manifest.json'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<TonConnectUIProvider manifestUrl={manifestUrl}>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</TonConnectUIProvider>
	)
}

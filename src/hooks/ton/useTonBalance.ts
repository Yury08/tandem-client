import { getHttpEndpoint } from '@orbs-network/ton-access'
import { Address } from '@ton/core'
import { TonClient } from '@ton/ton'
import { CHAIN } from '@tonconnect/protocol'
import { useEffect, useState } from 'react'

export function useTonBalance(address?: string, network?: string) {
	const [balance, setBalance] = useState<number | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!address) {
			setBalance(null)
			return
		}
		let cancelled = false
		setLoading(true)
		setError(null)
		;(async () => {
			try {
				const endpoint = await getHttpEndpoint({
					network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
				})
				const client = new TonClient({ endpoint })
				const bal = await client.getBalance(Address.parse(address))
				if (!cancelled) setBalance(Number(bal) / 1e9)
			} catch (e: any) {
				if (!cancelled) setError(e.message)
			} finally {
				if (!cancelled) setLoading(false)
			}
		})()
		return () => {
			cancelled = true
		}
	}, [address, network])

	return { balance, loading, error }
}

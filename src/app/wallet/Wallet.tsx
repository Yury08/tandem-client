'use client'
import TonConnect from '@tonconnect/sdk'

import { userService } from '@/services/user.service'
import { ICreateWalletData } from '@/types/user.type'
import { useMutation } from '@tanstack/react-query'
import {
	isWalletInfoCurrentlyEmbedded,
	isWalletInfoCurrentlyInjected,
	WalletInfoCurrentlyEmbedded,
	WalletInfoCurrentlyInjected,
} from '@tonconnect/sdk'

import {
	ArrowDownLeft,
	ArrowUpRight,
	ChevronDown,
	Loader2,
	LogOut,
	Sparkles,
	WalletIcon,
	XCircle,
} from 'lucide-react'
import Image from 'next/image'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import ton_logo from '../../../public/ton-logo.png'
import { useTonBalance } from '../../hooks/ton/useTonBalance'
import { TonConnectLocalStorage } from '../../services/wallet_sdk.service'
import styles from './Wallet.module.css'

const mockTxs = [
	{
		type: 'in',
		amount: 5.2,
		title: 'From Split Pool: "Weekend Trip"',
		status: 'success',
		time: '14 Jun, 18:30',
	},
	{
		type: 'out',
		amount: -12,
		title: 'Invested in Pool: "Gift for Alex"',
		status: 'pending',
		time: '13 Jun, 12:10',
	},
	{
		type: 'in',
		amount: 2.1,
		title: 'From Main Pool',
		status: 'success',
		time: '12 Jun, 09:44',
	},
	{
		type: 'out',
		amount: -3.5,
		title: 'Split: "Coffee Fund"',
		status: 'failed',
		time: '11 Jun, 21:00',
	},
]

const manifestUrl = 'https://yury08.github.io/tandem-metadata/manifest.json'
const storage = new TonConnectLocalStorage()

const connector = new TonConnect({
	manifestUrl,
	storage,
})

export default function Wallet() {
	const [connected, setConnected] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [embeddedWallet, setEmbeddedWallet] =
		useState<WalletInfoCurrentlyEmbedded>()
	const [injectedWallet, setInjectedWallet] =
		useState<WalletInfoCurrentlyInjected>()

	const [showWalletsModal, setShowWalletsModal] = useState(false)
	const [wallets, setWallets] = useState<any[]>([])
	const [loadingWallets, setLoadingWallets] = useState(false)
	const [showQRModal, setShowQRModal] = useState(false)
	const [qrUrl, setQrUrl] = useState<string | null>(null)
	const [pendingAddress, setPendingAddress] = useState<string | undefined>()
	const [chain, setChain] = useState<string | undefined>()
	const [showConnectTypeModal, setShowConnectTypeModal] = useState(false)
	const [connectionLink, setConnectionLink] = useState<string | null>(null)

	const telegramId =
		typeof window !== 'undefined'
			? window?.Telegram?.WebApp?.initDataUnsafe?.user?.id
			: 1468774138

	const {
		balance,
		loading: balanceLoading,
		error: balanceError,
	} = useTonBalance(pendingAddress, chain)

	const { mutate: createWallet } = useMutation({
		mutationKey: ['createWallet'],
		mutationFn: (data: ICreateWalletData) => userService.createWallet(data),
	})

	const formatAddress = (address?: string) => {
		if (!address) return ''
		return address.slice(0, 6) + '...' + address.slice(-4)
	}

	const handleDisconnect = async () => {
		await connector.disconnect()
		setConnected(false)
		setShowModal(false)
		setPendingAddress(undefined)
		setChain(undefined)
	}

	const handleConnectClick = async () => {
		setLoadingWallets(true)
		try {
			const walletsList = await connector.getWallets()
			const embeddedWallet = walletsList.find(isWalletInfoCurrentlyEmbedded)
			const injectedWallet = walletsList.find(isWalletInfoCurrentlyInjected)
			setWallets(walletsList)
			setEmbeddedWallet(embeddedWallet)
			setInjectedWallet(injectedWallet)
		} catch (e) {
			setWallets([])
		} finally {
			setLoadingWallets(false)
			setShowWalletsModal(true)
		}
	}

	const handleWalletSelect = async (wallet: any) => {
		if (embeddedWallet) {
			await connector.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey })
			setShowWalletsModal(false)
		} else if (injectedWallet) {
			await connector.connect({ jsBridgeKey: injectedWallet.jsBridgeKey })
			setShowWalletsModal(false)
		} else if (wallet && wallet.universalLink && wallet.bridgeUrl) {
			const link = connector.connect({
				universalLink: wallet.universalLink,
				bridgeUrl: wallet.bridgeUrl,
			})
			setConnectionLink(link)
			setShowWalletsModal(false)
			setShowConnectTypeModal(true)
		}
	}

	const handleConnectType = (type: 'qr' | 'link') => {
		if (type === 'qr' && connectionLink) {
			QRCode.toDataURL(connectionLink).then((url: string) => {
				setQrUrl(url)
				setShowConnectTypeModal(false)
				setShowQRModal(true)
			})
		} else if (type === 'link' && connectionLink) {
			window.open(connectionLink, '_blank')
			setShowConnectTypeModal(false)
			setShowWalletsModal(false)
			setShowQRModal(false)
		}
	}

	useEffect(() => {
		const unsub = connector.onStatusChange(
			(wallet: any) => {
				if (wallet) {
					const address = String(wallet.account.address)
					setConnected(true)
					setShowModal(false)
					setShowWalletsModal(false)
					setShowQRModal(false)
					setPendingAddress(address)
					setChain(wallet.account.chain)

					const saved = localStorage.getItem(`wallet_saved_${address}`)
					if (!saved) {
						createWallet({ telegramId, walletAddress: address })
						localStorage.setItem(`wallet_saved_${address}`, '1')
					}
				} else {
					setConnected(false)
					setPendingAddress(undefined)
					setChain(undefined)
				}
			},
			err => {
				console.error('Ошибка подключения:', err)
				alert(`Ошибка подключения: ${err.message}`)
			}
		)

		connector.restoreConnection().catch(console.error)
		return () => {
			unsub()
		}
	}, [])

	return (
		<div className={styles.walletPage}>
			<div className={styles.animatedBg}>
				{/* animated background via CSS */}
			</div>
			<div className={styles.heroSection}>
				{!connected ? (
					<>
						<button className={styles.connectBtn} onClick={handleConnectClick}>
							<WalletIcon size={22} /> Connect Wallet
						</button>
						<p className={styles.connectHint}>
							Connect your TON Wallet
							<br />
							To view your balance and activity in Tandem.
						</p>
					</>
				) : (
					<>
						<div className={styles.walletInfo}>
							<span className={styles.walletLabel}>Your wallet:</span>
							<span
								className={styles.walletAddress}
								onClick={() => setShowModal(true)}
								style={{
									cursor: 'pointer',
									display: 'inline-flex',
									alignItems: 'center',
									gap: '0.3rem',
								}}
								title='Click to manage wallet'
							>
								{formatAddress(pendingAddress)}
								<ChevronDown size={18} color='#7a5cff' />
							</span>
						</div>
						<div className={styles.balanceBlock}>
							<Image
								src={ton_logo}
								alt='TON'
								width={28}
								height={28}
								className={styles.tonLogo}
							/>
							<span className={styles.balance}>
								{balanceLoading
									? '...'
									: balance !== null
									? `${balance.toLocaleString('en-US', {
											maximumFractionDigits: 4,
									  })} TON`
									: balanceError
									? 'Ошибка'
									: '...'}
							</span>
						</div>
					</>
				)}
			</div>
			<div className={styles.activitySection}>
				<div className={styles.activityBadge}>
					<Sparkles size={16} /> Your activity in Tandem
				</div>
				<div className={styles.txList}>
					{connected ? (
						mockTxs.map((tx, i) => (
							<div className={styles.txCard} key={i}>
								<span className={styles.txIcon}>
									{tx.type === 'in' ? (
										<ArrowDownLeft color='#007aff' size={20} />
									) : (
										<ArrowUpRight color='#FF4B4B' size={20} />
									)}
								</span>
								<span className={styles.txAmount}>
									{tx.amount > 0 ? '+' : ''}
									{tx.amount} TON
								</span>
								<span className={styles.txTitle}>{tx.title}</span>
								<span className={styles.txStatus} data-status={tx.status}>
									{tx.status === 'success' && 'Success'}
									{tx.status === 'pending' && (
										<>
											<Loader2 size={14} className={styles.txPendingSpin} />{' '}
											Pending
										</>
									)}
									{tx.status === 'failed' && (
										<>
											<XCircle size={14} /> Failed
										</>
									)}
								</span>
								<span className={styles.txTime}>{tx.time}</span>
							</div>
						))
					) : (
						<div className={styles.txPlaceholder}>
							Connect your wallet to see recent activity.
						</div>
					)}
				</div>
			</div>

			{/* Modal for disconnect */}
			{showModal && (
				<div
					className={styles.modalOverlay}
					onClick={() => setShowModal(false)}
				>
					<div className={styles.modalSheet} onClick={e => e.stopPropagation()}>
						<div className={styles.modalHandle} />
						<div className={styles.modalTitle}>Wallet actions</div>
						<button className={styles.disconnectBtn} onClick={handleDisconnect}>
							<LogOut size={18} /> Disconnect wallet
						</button>
						<button
							className={styles.cancelBtn}
							onClick={() => setShowModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* Modal for wallet selection */}
			{showWalletsModal && (
				<div
					className={styles.modalOverlay}
					onClick={() => setShowWalletsModal(false)}
				>
					<div className={styles.modalSheet} onClick={e => e.stopPropagation()}>
						<div className={styles.modalHandle} />
						<div className={styles.modalTitle}>Select wallet</div>
						{loadingWallets ? (
							<div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
								<Loader2 size={28} className={styles.txPendingSpin} />
							</div>
						) : wallets.length === 0 ? (
							<div
								style={{
									textAlign: 'center',
									color: '#7a5cff',
									padding: '1.5rem 0',
								}}
							>
								No wallets found
							</div>
						) : (
							<div className={styles.walletsList}>
								{wallets.map((w, i) => (
									<button
										key={w.name + w.address + i}
										className={styles.walletItem}
										onClick={() => handleWalletSelect(w)}
									>
										{w.icon && (
											<img
												src={w.icon}
												alt={w.name}
												className={styles.walletItemIcon}
											/>
										)}
										<span className={styles.walletItemName}>{w.name}</span>
										<span className={styles.walletItemAddr}>
											{w.address?.slice(0, 6)}...{w.address?.slice(-4)}
										</span>
									</button>
								))}
							</div>
						)}
						<button
							className={styles.cancelBtn}
							onClick={() => setShowWalletsModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* Modal for connect type selection */}
			{showConnectTypeModal && (
				<div
					className={styles.modalOverlay}
					onClick={() => setShowConnectTypeModal(false)}
				>
					<div className={styles.modalSheet} onClick={e => e.stopPropagation()}>
						<div className={styles.modalHandle} />
						<div className={styles.modalTitle}>How do you want to connect?</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1.1rem',
								margin: '1.2rem 0',
							}}
						>
							<button
								className={styles.connectBtn}
								style={{ justifyContent: 'center' }}
								onClick={() => handleConnectType('qr')}
							>
								Scan QR code
							</button>
							<button
								className={styles.connectBtn}
								style={{
									justifyContent: 'center',
									background:
										'linear-gradient(90deg, #a259ff 0%, #007aff 100%)',
								}}
								onClick={() => handleConnectType('link')}
							>
								Open in wallet app
							</button>
						</div>
						<button
							className={styles.cancelBtn}
							onClick={() => setShowConnectTypeModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* Modal for QR code */}
			{showQRModal && (
				<div
					className={styles.modalOverlay}
					onClick={() => setShowQRModal(false)}
				>
					<div className={styles.modalSheet} onClick={e => e.stopPropagation()}>
						<div className={styles.modalHandle} />
						<div className={styles.modalTitle}>Scan QR to connect</div>
						{qrUrl ? (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: '1.1rem',
									padding: '1.2rem 0',
								}}
							>
								<img
									src={qrUrl}
									alt='TON Connect QR'
									style={{
										width: 180,
										height: 180,
										borderRadius: '1.1rem',
										background: '#fff',
										boxShadow: '0 2px 12px 0 #a259ff22',
									}}
								/>
								<div
									style={{
										color: '#7a5cff',
										fontWeight: 600,
										fontSize: '1.07rem',
										textAlign: 'center',
									}}
								>
									Open your wallet app and scan the QR code
								</div>
							</div>
						) : (
							<div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
								<Loader2 size={28} className={styles.txPendingSpin} />
							</div>
						)}
						<button
							className={styles.cancelBtn}
							onClick={() => setShowQRModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

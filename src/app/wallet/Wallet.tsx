'use client'
import {
	ArrowDownLeft,
	ArrowUpRight,
	ChevronDown,
	Loader2,
	LogOut,
	Sparkles,
	Wallet as WalletIcon,
	XCircle,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ton_logo from '../../../public/ton-logo.png'
import styles from './Wallet.module.css'

const mockAddress = 'EQB3...abc'
const mockBalance = 123.456
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

export default function Wallet() {
	const [connected, setConnected] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const handleDisconnect = () => {
		setConnected(false)
		setShowModal(false)
	}

	return (
		<div className={styles.walletPage}>
			<div className={styles.animatedBg}>
				{/* animated background via CSS */}
			</div>
			<div className={styles.heroSection}>
				{!connected ? (
					<>
						<button
							className={styles.connectBtn}
							onClick={() => setConnected(true)}
						>
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
								{mockAddress}
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
							<span className={styles.balance}>{mockBalance} TON</span>
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
		</div>
	)
}

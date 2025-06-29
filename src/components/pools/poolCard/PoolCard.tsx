import { Coins, User } from 'lucide-react'
import React from 'react'
import styles from './PoolCard.module.css'

export type PoolCardProps = {
	name: string
	participants: number
	amount: number
	status: 'Open' | 'Closed'
	onAction: () => void
	actionLabel: string
	avatars?: string[]
	progress?: number
	address?: string
}

const PoolCard: React.FC<PoolCardProps> = ({
	name,
	participants,
	amount,
	status,
	onAction,
	actionLabel,
	avatars = [],
	progress = 60,
	address = 'EQC...TON',
}) => {
	return (
		<div className={styles.card} data-status={status}>
			<div className={styles.header}>
				<Coins size={20} strokeWidth={2} />
				{name}
				<div className={styles.avatarGroup}>
					{avatars.slice(0, 3).map((src, i) => (
						<img key={i} src={src} className={styles.avatar} alt='avatar' />
					))}
					{avatars.length > 3 && (
						<span className={styles.avatar}>+{avatars.length - 3}</span>
					)}
				</div>
			</div>
			<div className={styles.address}>
				Адрес: <span>{address}</span>
			</div>
			<div className={styles.infoRow}>
				<span className={styles.label}>
					<User size={16} /> {participants}
				</span>
				<span className={styles.value}>
					<Coins size={16} /> {amount} TON
				</span>
			</div>
			<div className={styles.progressBar}>
				<div className={styles.progress} style={{ width: `${progress}%` }} />
			</div>
			<div className={styles.status + ' ' + styles[status.toLowerCase()]}>
				Статус: {status === 'Open' ? 'Открыт' : 'Закрыт'}
			</div>
			<button className={styles.actionBtn} onClick={onAction}>
				{actionLabel}
			</button>
		</div>
	)
}

export default PoolCard

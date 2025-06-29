import { Info } from 'lucide-react'
import React from 'react'
import { MainPoolCardProps } from '../../../types/pool.types'
import styles from './MainPoolCard.module.css'

const MainPoolCard: React.FC<MainPoolCardProps> = ({
	participants,
	amount,
	onJoin,
	address = 'EQC...TON',
	onHowItWorks,
}) => {
	return (
		<div className={styles.card}>
			<div className={styles.headerRow}>
				<div className={styles.header}>Main Pool</div>
				<button
					className={styles.howBtn}
					onClick={onHowItWorks}
					title='Как работает?'
				>
					<Info size={18} /> Как работает?
				</button>
			</div>
			<div className={styles.address}>
				Адрес: <span>{address}</span>
			</div>
			<div className={styles.infoRow}>
				<span className={styles.label}>Участники:</span>
				<span className={styles.value}>{participants}</span>
			</div>
			<div className={styles.infoRow}>
				<span className={styles.label}>Сумма (TON):</span>
				<span className={styles.value}>{amount}</span>
			</div>
			<button className={styles.joinBtn} onClick={onJoin}>
				Вступить
			</button>
		</div>
	)
}

export default MainPoolCard

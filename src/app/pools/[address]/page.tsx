import { ArrowLeft, Coins, User, Users } from 'lucide-react'
import Link from 'next/link'
import styles from './PoolPage.module.css'

const mockPool = {
	name: 'TON Friends',
	address: 'EQC1...FRIENDS',
	status: 'Open',
	amount: 1500,
	participants: 12,
	avatars: [
		'https://randomuser.me/api/portraits/men/32.jpg',
		'https://randomuser.me/api/portraits/women/44.jpg',
		'https://randomuser.me/api/portraits/men/45.jpg',
		'https://randomuser.me/api/portraits/women/46.jpg',
	],
	progress: 80,
	isMember: false,
	txs: [
		{
			id: 1,
			type: 'join',
			user: '0:abc...123',
			amount: 100,
			date: '2024-06-25',
			status: 'success',
		},
		{
			id: 2,
			type: 'deposit',
			user: '0:def...456',
			amount: 200,
			date: '2024-06-24',
			status: 'success',
		},
		{
			id: 3,
			type: 'leave',
			user: '0:ghi...789',
			amount: 50,
			date: '2024-06-23',
			status: 'pending',
		},
	],
}

export default function PoolPage() {
	return (
		<div className={styles.wrapper}>
			<Link href='/pools' className={styles.back}>
				<ArrowLeft size={22} /> Назад
			</Link>
			<div className={styles.card}>
				<div className={styles.headerRow}>
					<div className={styles.header}>
						<Coins size={22} /> {mockPool.name}
					</div>
					<div
						className={
							styles.status + ' ' + styles[mockPool.status.toLowerCase()]
						}
					>
						{mockPool.status === 'Open' ? 'Открыт' : 'Закрыт'}
					</div>
				</div>
				<div className={styles.address}>
					Адрес: <span>{mockPool.address}</span>
				</div>
				<div className={styles.infoRow}>
					<span className={styles.label}>
						<Users size={16} /> {mockPool.participants}
					</span>
					<span className={styles.value}>
						<Coins size={16} /> {mockPool.amount} TON
					</span>
				</div>
				<div className={styles.avatarGroup}>
					{mockPool.avatars.map((src, i) => (
						<img key={i} src={src} className={styles.avatar} alt='avatar' />
					))}
				</div>
				<div className={styles.progressBar}>
					<div
						className={styles.progress}
						style={{ width: `${mockPool.progress}%` }}
					/>
				</div>
				<button className={styles.actionBtn}>
					{mockPool.isMember ? 'Выйти из пула' : 'Вступить в пул'}
				</button>
			</div>
			<div className={styles.txsBlock}>
				<div className={styles.txsTitle}>История операций</div>
				<ul className={styles.txList}>
					{mockPool.txs.map(tx => (
						<li key={tx.id} className={styles.txCard}>
							<div className={styles.txType}>
								{tx.type === 'join'
									? 'Вступление'
									: tx.type === 'leave'
									? 'Выход'
									: 'Депозит'}
							</div>
							<div className={styles.txInfo}>
								<User size={14} /> {tx.user}
							</div>
							<div className={styles.txAmount}>{tx.amount} TON</div>
							<div className={styles.txDate}>{tx.date}</div>
							<div className={styles.txStatus + ' ' + styles[tx.status]}>
								{tx.status === 'success'
									? 'Успешно'
									: tx.status === 'pending'
									? 'В ожидании'
									: 'Ошибка'}
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

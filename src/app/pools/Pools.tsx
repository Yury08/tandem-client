'use client'

import { Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import MainPoolCard from '../../components/pools/mainPoolCard/MainPoolCard'
import PoolList from '../../components/pools/poolList/PoolList'
import PoolTabs from '../../components/pools/poolTabs/PoolTabs'
import styles from './Pools.module.css'

const mockPublicPools = [
	{
		id: '1',
		name: 'TON Friends',
		participants: 12,
		amount: 1500,
		status: 'Open' as const,
		onAction: () => alert('More about TON Friends'),
		actionLabel: 'Details',
		avatars: [
			'https://randomuser.me/api/portraits/men/32.jpg',
			'https://randomuser.me/api/portraits/women/44.jpg',
			'https://randomuser.me/api/portraits/men/45.jpg',
			'https://randomuser.me/api/portraits/women/46.jpg',
		],
		progress: 80,
		address: 'EQC1...FRIENDS',
	},
	{
		id: '2',
		name: 'Crypto Club',
		participants: 8,
		amount: 900,
		status: 'Closed' as const,
		onAction: () => alert('More about Crypto Club'),
		actionLabel: 'Details',
		avatars: [
			'https://randomuser.me/api/portraits/men/47.jpg',
			'https://randomuser.me/api/portraits/women/48.jpg',
		],
		progress: 40,
		address: 'EQC2...CLUB',
	},
]
const mockMyPools = [
	{
		id: '3',
		name: 'My Private Pool',
		participants: 3,
		amount: 300,
		status: 'Open' as const,
		onAction: () => alert('More about My Private Pool'),
		actionLabel: 'Details',
		avatars: [
			'https://randomuser.me/api/portraits/men/49.jpg',
			'https://randomuser.me/api/portraits/women/50.jpg',
		],
		progress: 60,
		address: 'EQC3...PRIVATE',
	},
]

export default function Pools() {
	const [tab, setTab] = useState<'public' | 'my'>('public')

	return (
		<div className={styles.wrapper}>
			<div className={styles.animatedBg} />
			<MainPoolCard
				participants={24}
				amount={3200}
				onJoin={() => alert('Join Main Pool')}
				address={'EQC0...MAIN'}
				onHowItWorks={() =>
					alert('Here will be an explanation of how the pool works!')
				}
			/>
			<PoolTabs value={tab} onChange={setTab} />
			<PoolList
				pools={tab === 'public' ? mockPublicPools : mockMyPools}
				emptyText={
					tab === 'public' ? 'No public pools yet' : 'You have no pools'
				}
				emptyIcon={<Users size={40} strokeWidth={1.5} />}
				className={styles.poolGrid}
				onPoolClick={id => (window.location.href = `/pools/${id}`)}
			/>
			<Link
				href='/pools/create-pool'
				className={styles.createBtn}
				style={{ textAlign: 'center' }}
			>
				Create Pool
			</Link>
		</div>
	)
}

import React from 'react'
import type { PoolCardProps } from '../poolCard/PoolCard'
import PoolCard from '../poolCard/PoolCard'
import styles from './PoolList.module.css'

interface PoolListProps {
	pools: PoolCardProps[]
	emptyText: string
	emptyIcon?: React.ReactNode
	className?: string
	onPoolClick?: (address: string) => void
}

const PoolList: React.FC<PoolListProps> = ({
	pools,
	emptyText,
	emptyIcon,
	className,
	onPoolClick,
}) => {
	if (!pools.length) {
		return (
			<div className={styles.list + (className ? ' ' + className : '')}>
				<div className={styles.emptyState}>
					{emptyIcon && <div className={styles.icon}>{emptyIcon}</div>}
					<div className={styles.text}>{emptyText}</div>
				</div>
			</div>
		)
	}
	return (
		<div className={styles.list + (className ? ' ' + className : '')}>
			{pools.map((pool, idx) => (
				<div
					key={pool.name + idx}
					style={{ cursor: onPoolClick ? 'pointer' : undefined }}
					onClick={() =>
						onPoolClick && pool.address && onPoolClick(pool.address)
					}
				>
					<PoolCard {...pool} />
				</div>
			))}
		</div>
	)
}

export default PoolList

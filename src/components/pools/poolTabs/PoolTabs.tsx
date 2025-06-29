import React from 'react'
import styles from './PoolTabs.module.css'

interface PoolTabsProps {
	value: 'public' | 'my'
	onChange: (val: 'public' | 'my') => void
}

const PoolTabs: React.FC<PoolTabsProps> = ({ value, onChange }) => {
	return (
		<div className={styles.tabs}>
			<button
				className={value === 'public' ? styles.active : ''}
				onClick={() => onChange('public')}
			>
				Public Pools
			</button>
			<button
				className={value === 'my' ? styles.active : ''}
				onClick={() => onChange('my')}
			>
				My Pools
			</button>
		</div>
	)
}

export default PoolTabs

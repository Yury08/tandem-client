'use client'
import { Home as HomeIcon, Layers, Split, Wallet } from 'lucide-react'
import Link from 'next/link'
import styles from './Nav.module.css'

export default function Nav() {
	return (
		<nav className={styles.navBar}>
			<Link href='/splits' className={styles.navItem}>
				<span className={styles.icon}>
					<Split />
				</span>
				Splits
			</Link>
			<Link href='/pools' className={styles.navItem}>
				<span className={styles.icon}>
					<Layers />
				</span>
				Pools
			</Link>
			<Link href='/' className={styles.navItem}>
				<span className={styles.icon}>
					<HomeIcon />
				</span>
				Home
			</Link>
			<Link href='/wallet' className={styles.navItem}>
				<span className={styles.icon}>
					<Wallet />
				</span>
				Wallet
			</Link>
		</nav>
	)
}

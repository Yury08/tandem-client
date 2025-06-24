'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Hourglass, Package, Users, Wallet } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import ton_logo from '../../../public/ton-logo.png'

const howIcons = [Users, Wallet, CheckCircle]

export default function Home() {
	const howItWorksRef = useRef<HTMLDivElement>(null)

	const scrollToHowItWorks = () => {
		howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<main>
			{/* Hero Section */}
			<motion.section
				className='hero'
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className='hero-bg' />
				{/* Animated shapes */}
				<motion.div
					className='hero-shape hero-shape-1'
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 0.18 }}
					transition={{ delay: 0.3, duration: 1.2, type: 'spring' }}
				/>
				<motion.div
					className='hero-shape hero-shape-2'
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 0.13 }}
					transition={{ delay: 0.7, duration: 1.3, type: 'spring' }}
				/>
				<h1 className='hero-title'>Tandem</h1>
				<p className='hero-subtitle'>
					Pool money. Split bills. Earn TON together.
				</p>
				<motion.button
					className='hero-btn'
					onClick={scrollToHowItWorks}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.97 }}
				>
					How it works
					<motion.span
						className='hero-btn-arrow'
						initial={{ x: 0 }}
						animate={{ x: [0, 8, 0] }}
						transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
					>
						→
					</motion.span>
				</motion.button>
			</motion.section>

			{/* Features Section */}
			<motion.section
				className='features'
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.3 }}
				variants={{
					hidden: {},
					visible: { transition: { staggerChildren: 0.18 } },
				}}
			>
				{[
					{
						icon: <Package size={32} color='#7a5cff' strokeWidth={2.2} />,
						title: 'Join or create a pool',
						desc: 'Start saving or splitting payments together.',
					},
					{
						icon: <Hourglass size={32} color='#007aff' strokeWidth={2.2} />,
						title: 'Invest TON in Split',
						desc: 'Support purchases and earn from every transaction.',
					},
					{
						icon: <Users size={32} color='#00b2ff' strokeWidth={2.2} />,
						title: 'Get your share of rewards',
						desc: 'Earn passively as pools and Split deals complete.',
					},
				].map((feature, i) => (
					<motion.div
						className='feature-card'
						key={feature.title}
						initial={{ opacity: 0, y: 30, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.6, delay: i * 0.15 }}
						viewport={{ once: true }}
						whileHover={{
							scale: 1.04,
							boxShadow: '0 4px 24px 0 rgba(100,100,255,0.18)',
						}}
					>
						<span className='feature-icon'>{feature.icon}</span>
						<p className='feature-title'>{feature.title}</p>
						<p className='feature-desc'>{feature.desc}</p>
					</motion.div>
				))}
			</motion.section>

			{/* How it works Section */}
			<motion.section
				className='how-it-works'
				ref={howItWorksRef}
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true, amount: 0.3 }}
			>
				<h2 className='how-title'>How does it work?</h2>
				<div className='how-steps'>
					{['Join a pool', 'Deposit TON', 'Get your share'].map((step, i) => {
						const Icon = howIcons[i]
						return (
							<motion.div
								className='how-step'
								key={step}
								initial={{ opacity: 0, x: 40 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: i * 0.2 }}
								viewport={{ once: true }}
							>
								<span className='how-step-num'>{i + 1}</span>
								<Icon
									size={28}
									color='#7a5cff'
									strokeWidth={2.1}
									className='how-step-icon'
								/>
								<span className='how-step-text'>{step}</span>
							</motion.div>
						)
					})}
				</div>
			</motion.section>

			{/* Security Section */}
			<motion.section
				className='security'
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true, amount: 0.3 }}
			>
				<div className='security-content'>
					<div className='security-logo'>
						<Image src={ton_logo} alt='TON' width={40} height={40} />
					</div>
					<p className='security-text'>
						Your funds are protected by smart contracts — not by us, but on the
						TON blockchain.
					</p>
					<div className='security-tags'>
						<motion.span
							className='security-tag security-tag-shimmer'
							initial={{ opacity: 0.7 }}
							animate={{ opacity: [0.7, 1, 0.7] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							create pool
						</motion.span>
						<motion.span
							className='security-tag security-tag-shimmer'
							initial={{ opacity: 0.7 }}
							animate={{ opacity: [0.7, 1, 0.7] }}
							transition={{ duration: 2, repeat: Infinity, delay: 1 }}
						>
							take a split
						</motion.span>
					</div>
				</div>
			</motion.section>
		</main>
	)
}

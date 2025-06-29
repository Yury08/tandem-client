'use client'

import { Coins, Lock, Users } from 'lucide-react'
import React, { useState } from 'react'
import styles from './CreatePool.module.css'

export default function CreatePoolPage() {
	const [name, setName] = useState('')
	const [amount, setAmount] = useState('')
	const [isPrivate, setIsPrivate] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		alert('Пул создан!')
	}

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Создать пул</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label className={styles.label}>
					<span>
						<Coins size={18} /> Название пула
					</span>
					<input
						className={styles.input}
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Введите название'
						required
						maxLength={32}
					/>
				</label>
				<label className={styles.label}>
					<span>
						<Users size={18} /> Минимальная сумма (TON)
					</span>
					<input
						className={styles.input}
						type='number'
						min={1}
						step={0.01}
						value={amount}
						onChange={e => setAmount(e.target.value)}
						placeholder='Например, 100'
						required
					/>
				</label>
				<label className={styles.checkboxLabel}>
					<input
						type='checkbox'
						checked={isPrivate}
						onChange={e => setIsPrivate(e.target.checked)}
					/>
					<span>
						<Lock size={16} /> Приватный пул
					</span>
				</label>
				<button className={styles.submitBtn} type='submit'>
					Создать пул
				</button>
			</form>
		</div>
	)
}

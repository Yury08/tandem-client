export interface MainPoolCardProps {
	participants: number
	amount: number
	onJoin: () => void
	address?: string
	onHowItWorks?: () => void
}

export interface PoolCardProps {
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

export interface PoolListProps {
	pools: PoolCardProps[]
	emptyText: string
	emptyIcon?: React.ReactNode
	className?: string
}

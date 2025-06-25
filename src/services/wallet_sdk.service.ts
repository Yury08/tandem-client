import { IStorage } from '@tonconnect/sdk'

export class TonConnectLocalStorage implements IStorage {
	async setItem(key: string, value: string): Promise<void> {
		localStorage.setItem(key, value)
	}

	async getItem(key: string): Promise<string | null> {
		return localStorage.getItem(key)
	}

	async removeItem(key: string): Promise<void> {
		localStorage.removeItem(key)
	}
}

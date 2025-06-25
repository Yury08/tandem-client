import { axiosTelegram } from '@/api/interceptors'
import { ICreateWalletData } from '@/types/user.type'

class UserService {
	private URL = '/user'

	async createWallet(data: ICreateWalletData) {
		try {
			const res = await axiosTelegram.post(`${this.URL}/wallet_create`, data)
			return res.data
		} catch (error) {
			console.error('error when saving the wallet in the database', error)
			throw error
		}
	}
}

export const userService = new UserService()

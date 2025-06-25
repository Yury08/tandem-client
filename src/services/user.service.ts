import { axiosTelegram } from '@/api/interceptors'
import { ICreateWalletData } from '@/types/user.type'

class UserService {
	private URL = '/user'

	createWallet(data: ICreateWalletData) {
		try {
			const res = axiosTelegram.post(`${this.URL}/wallet_create`, data)
			return res
		} catch (error) {
			console.error('error when saving the wallet in the database', error)
			throw error
		}
	}
}

export const userService = new UserService()

import axios, { type CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: 'https://tandem-server-production.up.railway.app',
	withCredentials: true,
}

const axiosTelegram = axios.create(options)

axiosTelegram.interceptors.response.use(
	response => response,
	error => {
		console.error('API Error:', error)
		return Promise.reject(error)
	}
)

export { axiosTelegram }

import { Platform, NativeModules } from 'react-native'

const iOS = Platform.OS === 'ios'

const Pay = {
	onAliPay,
	onWxPay,
}

async function onAliPay(url = '') {
	const orderString = url
	let res = null
	if (!url) return Promise.reject('请输入正确的连接')
	try {
		res = await NativeModules.RNWxAliPay.onAliPay(iOS ? { orderString } : url)
		return Promise.resolve(res)
	} catch (err) {
		return Promise.reject(err)
	}
}

async function onWxPay(wxObj) {
	let res = null
	try {
		res = await NativeModules.RNWxAliPay.onWxPay(wxObj)
	} catch (err) {
		res = { code: 401, msg: err }
	}
	return res	
}

export default Pay

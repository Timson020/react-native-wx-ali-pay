import { Platform, NativeModules } from 'react-native'

const iOS = Platform.OS === 'ios'

const Pay = {
	onAliPay,
	onWxPay,
}

async function onAliPay(url) {
	const orderString = url
	let res = null
	if (!url) return Promise.resolve({ code: 400, msg: 'illegal string' })
	try {
		res = await NativeModules.RNWxAliPay.onAliPay(iOS ? { orderString } : url)
		return Promise.resolve({ code: 200, data: res })
	} catch (err) {
		return Promise.resolve({ code: 400, msg: err })
	}
}

async function onWxPay(wxObj) {
	let res = null
	if (!wxObj) Promise.resolve({ code: 400, data: 'illegal object' })
	iOS ? null : (typeof wxObj.timestamp != 'string' ? wxObj.timestamp.toString() : null )
	try {
		res = await NativeModules.RNWxAliPay.onWxPay(wxObj)
		return Promise.resolve({ code: 200, data: res })
	} catch (err) {
		return Promise.resolve({ code: 401, msg: err })
	}
}

export default Pay

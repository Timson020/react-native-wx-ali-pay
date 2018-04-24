import { Platform, NativeModules } from 'react-native'

const iOS = Platform.OS === 'ios'

const Pay = {
	onAliPay,
	onWxPay,
}

function onAliPay(url) {
	const orderString = url
	let res = null
	if (!url) return Promise.resolve({ code: 400, msg: 'illegal string' })
	return new Promise((resolve) => {
		NativeModules.RNWxAliPay.onAliPay(iOS ? { orderString } : url).then(() => {
			resolve({ code: 200, data: res })
		}).catch((err) => {
			resolve({ code: 400, msg: err })
		})
	})
}

function onWxPay(wxObj) {
	let res = null
	if (!wxObj) return Promise.resolve({ code: 400, data: 'illegal object' })
	iOS ? null : (typeof wxObj.timestamp != 'string' ? wxObj.timestamp.toString() : null)
	return new Promise((resolve) => {
		NativeModules.RNWxAliPay.onWxPay(wxObj).then(d => {
			resolve({ code: 200, data: d })
		}).catch(err => {
			resolve({ code: 400, msg: err })
		})
	})
}

export default Pay

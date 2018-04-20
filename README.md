# react-native-wx-ali-pay
> react-native版 微信支付，支付宝 插件
> 本插件基于 [xiaozhicheng/react-native-pay](https://github.com/xiaozhicheng/react-native-pay) 做了bug修补

# Link

## CMD
```
react-native link react-native-wx-ali-pay
```

##  Android
>none

## iOS
### Step1
在工程target的```General``` -> ```Link Frameworks and Libraries``` -> 加入```libsqlite3.tbd, libc++.tbd, libz.tbd```

### Step2
在工程target的```General``` -> ```Link Frameworks and Libraries``` -> 加入```AlipaySDK.framework，CoreMotion.framework```(注意: 加入的AlipaySDK.framework需要是插件支付宝文件里的AlipaySDK.framework)

### Step3
在工程target的```Build Settings```-> ```Frameworks Search Paths``` -> 加入```"$(SRCROOT)/../node_modules/react-native-wx-ali-pay/ios/PaySdk/支付宝"```

### Step4
在工程target的```Build Settings```-> ```Header Search Paths``` -> 加入```"$(SRCROOT)/../node_modules/react-native-wx-ali-pay/ios/PaySdk"```,并将状态修改为```recursive```
#### AppDegelate.m
>添加文件添加内容

```
#import <WXApi.h>
#import <WXApiManager.h>

// 支持所有iOS系统
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
//6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
if (!result) {
// 其他如支付等SDK的回调
if ([url.host isEqualToString:@"safepay"]) {
//支付宝回调 ...
//添加回调方法
return YES;
}
else {
//微信回调
return [WXApi handleOpenURL:url delegate:[WXApiManager sharedManager]];
}
}
return result;
}
```

# Useage
```
import Pay from 'react-native-wx-ali-pay'

const wxObj = {
	appid: 'wxc838755f42580832',
	partnerid: '1494834082',
	noncestr: 'b8mcefmi0kf38a5g3',
	timestamp: '1521906649',
	prepayid: 'wx20180324235049f7cc4eb6260442375925',
	package: 'Sign=WXPay',
	sign: '227FF067FE26CA8F8538260D26D9F435',
}

const aliObj = {
	orderString: ''
}

Pay.onWxPay(wxObj).then(e => console.info(e)).catch(err => alert(err))

Pay.onAliPay(aliObj).then(e => console.info(e)).catch(err => alert(err))
```

#  Contributor
[OYWeijian](https://github.com/OYWeijian)
<!-- This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md). -->
<!-- ![](https://avatars3.githubusercontent.com/u/15721842?s=460&v=4 OYWeijian) -->

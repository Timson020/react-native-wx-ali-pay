# react-native-wx-ali-pay
> react-native版 微信支付，支付宝 插件
> 本插件基于 [xiaozhicheng/react-native-pay](https://github.com/xiaozhicheng/react-native-pay) 做了bug修补

# Link

## CMD
```
react-native link react-native-wx-ali-pay
```

##  Android

### Step1
在```android/app/src/main/java/com/xx/ ```下创建```wxapi```文件夹

### Step2
新建文件 ```WXPayEntryActivity.java```
```
package com.xxx.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.timson.react_native_wx_ali_pay.wxpay.WXPay;

public class WXPayEntryActivity extends Activity{
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WXPay.handlerIntent(getIntent());
        finish();
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        WXPay.handlerIntent(intent);
    }
}
```

### Step3
在```AndroidManifest.xml``` 加上
```
<activity
	android:name=".MainActivity"
....
</activity>
<activity
	android:name=".wxapi.WXPayEntryActivity"
	android:exported="true"
	android:launchMode="singleTop" />
```

## iOS
### Step1
在工程target的```General``` -> ```Link Frameworks and Libraries``` -> 加入```libsqlite3.tbd, libc++.tbd, libz.tbd```

### Step2
在工程target的```General``` -> ```Link Frameworks and Libraries``` -> 加入```AlipaySDK.framework，CoreMotion.framework```(注意: 加入的AlipaySDK.framework需要是插件支付宝文件里的AlipaySDK.framework)

### Step3
在工程target的```Build Settings```-> ```Frameworks Search Paths``` -> 加入```"$(SRCROOT)/../node_modules/react-native-wx-ali-pay/ios/PaySdk/支付宝"```

### Step4
在工程target的```Build Settings```-> ```Header Search Paths``` -> 加入```"$(SRCROOT)/../node_modules/react-native-wx-ali-pay/ios/PaySdk"```,并将状态修改为```recursive```

### Step5
在工程target的```Info```-> ```URL Types``` -> 点左下角'+'新增一项并将```URL Schemes"```修改为```testWXPay```

#### AppDegelate.m
>添加文件添加内容 --- 下面的减函数

```
#import <WXApi.h>
#import <WXApiManager.h>
#import <AlipaySDK/AlipaySDK.h>

// 支持所有iOS系统
// 支持所有iOS系统
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  if ([url.host isEqualToString:@"safepay"]) {
    //支付宝回调 ...
    //添加回调方法
    [[AlipaySDK defaultService]processOrderWithPaymentResult:url standbyCallback:^(NSDictionary *resultDic) {
      [[NSNotificationCenter defaultCenter]postNotificationName:@"aliPayReslut" object:nil userInfo:resultDic];
    }];
      return YES;
  } else {
    //微信回调
    return [WXApi handleOpenURL:url delegate:[WXApiManager sharedManager]];
  }
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

//
//  RNWxAliPay.m
//  RNWxAliPay
//
//  Created by 朱浩锋 on 2018/3/5.
//  Copyright © 2018年 朱浩锋. All rights reserved.
//

#import "RNWxAliPay.h"
#import <AlipaySDK/AlipaySDK.h>
#import "WXApi.h"
#import "WXPay.h"

@implementation RNWxAliPay

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(onAliPay:(NSDictionary *)orderString  resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    
    NSString *orderStr = orderString[@"orderString"];
    NSLog(@"%@", orderStr);
    // NOTE: 调用支付结果开始支付
    if (orderStr != nil)    {
        
        NSString *appScheme = @"testWXPay"; // app中独立的scheme，用于支付宝返回的结果正确跳回商户app
        
        [[AlipaySDK defaultService] payOrder:orderStr fromScheme:appScheme callback:^(NSDictionary *resultDic) {
            //支付回调
            NSString *resultStatus = [resultDic objectForKey:@"resultStatus"];
            if ([resultStatus isEqualToString:@"9000"]){ //订单支付成功
                resolve(@"支付成功");
            }else if([resultStatus isEqualToString:@"6002"]){//网络错误
                reject(resultStatus,@"网络错误",nil);
            }else if([resultStatus isEqualToString:@"6001"]){//中途取消
                reject(resultStatus,@"取消支付",nil);
            }else{//处理失败
                reject(resultStatus,@"支付失败",nil);
            }
        }];
    }
}

RCT_EXPORT_METHOD(onWxPay:(NSDictionary *)info resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    
    if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"weixin://"]] || [[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"wechat://"]]) {
        NSLog(@"OK weixin://");
    } else {
        reject(@"-1", @"请先安装微信客户端", nil);
        return;
    }
    
    
    
    [WXApi registerApp:[info objectForKey:@"appid"];
    
    [WXPay pay:info success:^(NSDictionary *resultDic, NSString *message) {
        resolve(@"支付成功");
    } failure:^(NSDictionary *resultDic, NSString *message) {
        reject(@"", message,nil);
    }];
}

@end

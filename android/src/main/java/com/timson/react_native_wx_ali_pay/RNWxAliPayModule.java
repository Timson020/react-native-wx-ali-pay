package com.timson.react_native_wx_ali_pay;

import android.text.TextUtils;
import android.util.Log;

import com.timson.react_native_wx_ali_pay.alipay.AliPay;
import com.timson.react_native_wx_ali_pay.wxpay.WXPay;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import com.tencent.mm.opensdk.modelpay.PayReq;


/**
 * @auth Timson
 */
public class RNWxAliPayModule extends ReactContextBaseJavaModule{


    public RNWxAliPayModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @ReactMethod
    public void onAliPay(String orderInfo, final Promise promise){

        Log.i("onAliPay","onAliPay-->"+orderInfo);
        if(!TextUtils.isEmpty(orderInfo)){
            AliPay aliPay = new AliPay(getCurrentActivity());
            aliPay.pay(orderInfo,new RNWxAliPayListener() {
                @Override
                public void onPaySuccess(String resultInfo) {
                    promise.resolve("支付成功");
                }
                @Override
                public void onPayFail(String code,String resultInfo) {
                    promise.reject(code,"支付失败");
                }
                @Override
                public void onPayConfirm(String resultInfo) {}
            });
        }
    }


    @ReactMethod
    public void onWxPay(ReadableMap readableMap, final Promise promise){
        if(readableMap==null){
            promise.reject("-1","支付失败");
        }else {
            PayReq req=new PayReq();
            req.appId = readableMap.getString(Constants.APPID);
            req.partnerId = readableMap.getString(Constants.PARTNERID);
            req.prepayId = readableMap.getString(Constants.PREPAYID);
            req.packageValue = readableMap.getString(Constants.PACKAGEVALUE);
            req.nonceStr = readableMap.getString(Constants.NONCESTR);
            req.timeStamp = readableMap.getString(Constants.TIMESTAMP);
            req.sign = readableMap.getString(Constants.SIGN);
            WXPay.newInstance().registerWxApi(getCurrentActivity(),req.appId)
                    .pay(new RNWxAliPayListener() {
                             @Override
                             public void onPaySuccess(String resultInfo) {
                                 promise.resolve("支付成功");
                             }
                             @Override
                             public void onPayFail(String code,String resultInfo) {
                                 promise.reject(code,resultInfo);
                             }
                             @Override
                             public void onPayConfirm(String resultInfo) {}
                         }
                            ,req);
        }
    }


    @Override
    public String getName() {
        return "RNWxAliPay";
    }
}



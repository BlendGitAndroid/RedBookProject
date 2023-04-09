package com.redbookproject.rn;

import android.text.TextUtils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.redbookproject.BuildConfig;
import com.redbookproject.utils.DeviceUtil;

public class AppModule extends ReactContextBaseJavaModule {

    public AppModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "jsToApp";
    }

    @ReactMethod
    public void openGallery() {
        if (getCurrentActivity() == null) {
            return;
        }
        DeviceUtil.openGallery(getCurrentActivity());
    }

    //这是一个异步的过程,所有要用Promise
    @ReactMethod
    public void getVersionName(Promise promise) {
        String versionName = BuildConfig.VERSION_NAME;
        if (TextUtils.isEmpty(versionName)) {
            promise.reject(new Throwable("获取版本失败"));
        } else {
            promise.resolve(versionName);
        }
    }
}

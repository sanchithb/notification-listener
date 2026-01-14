package com.cmfnavigate

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NotificationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    override fun getName() = "NotificationModule"

    @ReactMethod
    fun triggerLocalNotification(title: String, body: String) {
        NotificationService.instance?.sendLocalNotification(title, body)
    }
}
// package com.cmfnavigate

// import android.app.Application
// import com.facebook.react.PackageList
// import com.facebook.react.ReactApplication
// import com.facebook.react.ReactHost
// import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
// import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

// class MainApplication : Application(), ReactApplication {

//   override val reactHost: ReactHost by lazy {
//     getDefaultReactHost(
//       context = applicationContext,
//       packageList =
//         PackageList(this).packages.apply {
//           // Packages that cannot be autolinked yet can be added manually here, for example:
//           // add(MyReactNativePackage())
//         },
//     )
//   }

//   override fun onCreate() {
//     super.onCreate()
//     loadReactNative(this)
//   }
// }

// 

package com.cmfnavigate

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.bridge.ReactContext
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

    companion object {
        private var instance: MainApplication? = null

        fun getReactContext(): ReactContext? {
            return instance?.reactHost?.currentReactContext
        }
    }

    override val reactHost: ReactHost by lazy {
        val packages = PackageList(this).packages.toMutableList()
        packages.add(NotificationPackage())

        getDefaultReactHost(
            context = applicationContext,
            packageList = packages
        )
    }

    override fun onCreate() {
        super.onCreate()
        instance = this
        loadReactNative(this)
    }
}
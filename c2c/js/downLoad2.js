require(["jquery","utils","dot","downloadAppPlugIn_imk2"],function(a,b,c){"use strict";var d={downAppURl:"//paipai.m.jd.com/c2c/appDown.html",downAppIos:"",downWeixin:"",downIpad:"",inteneUrl:"openapp.paipai://pushToHome/app",inteneUrlParams:{},sourceType:"JSHOP_SOURCE_TYPE",sourceValue:"JSHOP_SOURCE_VALUE",M_sourceFrom:"mxz",NoJumpDownLoadPage:!0,universalLinksUrl:"openapp.paipai://pushToHome/app"},e=document.getElementById("downLoad"),f={init:function(){1==b.getDevicesType()?e.setAttribute("href","//storage.360buyimg.com/ershou.paipai.com/app/android/paipai.apk"):2==b.getDevicesType()&&e.setAttribute("href","//itunes.apple.com/cn/app/id1267714436"),"jd"==b.getAppType()?1==b.getDevicesType()?a.downloadAppPlugInOpenApp(d):2==b.getDevicesType():1==b.getDevicesType()?a.downloadAppPlugInOpenApp(d):2==b.getDevicesType()&&a.downloadAppPlugInOpenApp(d)}};f.init()});
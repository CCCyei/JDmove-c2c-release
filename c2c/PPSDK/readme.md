# 拍拍sdk使用说明
## 目的
统一拍拍二手应用对接接口，组件化，便于对接和扩展，提高开放能力。使用只只需要引入组件，直接调用封装好的方法即可，无需关注代码的实现和二手app的对外协议是什么。如果协议有更新需要paipaiSDK.js代码升级就可以，使用着无感知，组件向后兼容
## 使用方法
```
  <script type="text/javascript"src="//m.paipai.com/PPSDK/js/paipaiSDK.js"></script>
```
## 代码说明
对完提供一个对象paipaiSDK
```
paipaiSDK ={

//基本属性
info:{
    version, //版本号
    ua, // ua
    devicesType //设备类型1，android，2，ios,3，其他
  },

//工具类
utils:{
    isPPAPP， //  返回是否为拍拍app内加载页面
    isJDAPP，//  返回是否京东app内使用
    getDevicesType， //  获得使用平台
    ...
  },

//唤起协议，只用于唤起原生页面。部分可以在浏览器内使用，唤起原生，可以做到如果已安装app唤起原生app，否则唤起H5页面。
call:{
  checkPhone, // 唤起手机原生检测
  reCheckPhone， // 唤起重新检测
  openAppHomePage， // 打开app首页
  openMyHomePage， // 打开我的首页
  ...
  },

//回调协议，调用app原生的能力，获得一些信息，只能在app内使用。例如经纬度，图片上传，二维码扫码
get:{
  openScan, // 扫码二维码，获得扫码结果
  openLocation，  //打开定位， 获得定位坐标
  openShare， // 唤起分享，获得分享接口，是否分享成功
  ...
  },

//设置协议，webview中调用协议，设置原生的app的属性，提高体验
set:{
  setTitle, // 设置webview顶部bar显示标题
  setTopBarShare， // 设置webview顶部显示分享按钮，并初始化分享内容
  setTopBarSearch // 设置webview顶部显示搜索按钮，并初始化搜索内容
  }

}
```

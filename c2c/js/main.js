var config={
    getType:function(){
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/jdappershou_ios/)) {
            return 2;
        } else if (ua.match(/jdappershou_android/) && ua.match(/android/)) {
            return 1;
        } else {
            return 3;
        }
    },
    getDongDong:function(){
        return true
    },
    getDongClass:function(){
        if(this.getType()==3){
            return 'ui-hide'
        }else{
            return ''
        }
    }
}
requirejs.config({
    baseUrl: 'js',
    waitSeconds: 0,
    paths: {
        //公共类库
        jquery: 'components/jquery',
        jweixin: 'components/jweixin',
        utils: 'components/utils',
        ext: 'components/ext',
        upreport: 'components/upreport',
        dot: 'components/doT',
        fastclick: 'components/fastclick',
        swipe: 'components/swipe',
        vue: 'components/vue',
        uploadShowLocalPic: 'components/uploadShowLocalPic',
        qqShare: 'components/qqShare',
        uploadShowLocalPic_setHead: 'components/uploadShowLocalPic_setHead',//修改个人头像
        'vueresource': 'components/vue-resource',
        'jquery.lazyload': 'components/jquery.lazyload',
        'circle-progress': 'components/circle-progress',
        exif: 'components/exif',
        md5: 'components/md5-min',//Md5加密
        //aes: 'components/aes',//电话加密解密
        aes: 'components/aes-min',//电话加密解密

        //业务相关类库
        share: 'widget/share',
        common: 'widget/common',
        downloadAppPlugIn_imk2: 'components/downloadAppPlugIn_imk2',//唤起APP组件
        paipaiSDK:'widget/paipaiSDK',//唤起paipai原生协议
        JSSDK:'widget/jssdk',
        //业务相关js
        demo: 'demo',
        showMap: 'showMap',
        cart: 'cart',
        confirmOrder: 'confirmOrder',
        courierNumber: 'courierNumber',
        orderDetail: 'orderDetail',//订单详情
        bindWallet: 'bindWallet',//关联绑定
        category: 'category',//商品分类
        whiteCredit: 'whiteCredit',//商品分类
        paySuccess: 'paySuccess',//支付结果页面
        test: 'test',//唤起协议测试
        evaDetail: 'evaDetail',//评价详情
        refundDetail: 'refundDetail',//协商退款
        buyerPost: 'buyerPost',//寄回地址
        deliverGoods: 'deliverGoods',//我要发货
        test2: 'test2',//登录态测试
        channelPage: 'channelPage',// 频道页面
        channelPageExt: 'channelPageExt'// 频道页面二级页面
    },
    shim: {
        'jquery.lazyload': ['jquery']
    },
    urlArgs: "t=20181115072601"
});
define(function (require) {
    var $ = require('jquery');
    $(function () {
        var pathname = window.location.pathname,
            regex = /(.*)+\//,
            filename = pathname.replace(regex, '');
        if (filename.indexOf("/") != -1) {
            filename = filename.replace("/", "");
        }
        if (filename.indexOf("c2c/") != -1) {
            filename = filename.replace("c2c/", "");
        }
        switch (filename) {
            case '':
            case 'showMap.html':
                require(['showMap']);
                break;
            case 'demo.html':
                require(['demo']);
                break;
            case 'home.html':
                require(['home']);
                break;
            case 'addrManger.html':
                require(['addrManger', 'utils']);
                break;
            case 'deliveryGoods.html':
                require(['deliveryGoods', 'utils']);
                break;
            case 'deliverGoods.html': //我要发货
                require(['deliverGoods']);
                break;
            case 'editAddr.html':
                require(['editAddr', 'utils']);
                break;
            case 'newAddr.html':
                require(['newAddr', 'utils']);
                break;
            case 'confirmOrder.html':
                require(['confirmOrder']);
                break;
            case 'category.html':
                require(['category']);
                break;
            case 'myBuy.html':
                require(['myBuy']);
                break;
            case 'mySell.html':
                require(['mySell']);
                break;
            case 'reverse-demo.html':
                require(['reverse', 'utils']);
                break;
            case 'goodsDetail.html':
                require(['goodsDetail']);
                break;
            case 'courierNumber.html':
                require(['courierNumber', 'utils']);
                break;
            case 'orderDetail.html':
                require(['orderDetail']);
                break;
            case 'bindWallet.html':
                require(['bindWallet']);
                break;
            case 'userSetting.html':
                require(['userSetting', 'utils']);
                break;
            case 'userNickSetting.html':
                console.log("昵称设置")
                require(['userNickSetting', 'utils']);
                break;
            case 'paySuccess.html'://支付成功
                require(['paySuccess']);
                break;
            case 'orderTrack.html'://物流信息
                require(['orderTrack', 'utils']);
                break;
            case 'payFail.html'://支付失败
                require(['jquery', 'utils']);
                break;
            case 'applyRefund.html'://逆向-申请退款 买家
                require(['applyRefund', 'utils', 'exif']);
                break;
            case 'refundDetail.html'://逆向-协商退款 买家
                require(['refundDetail', 'utils']);
                break;
            case 'applyAward.html'://逆向-申请仲裁 买家
                require(['applyAward', 'utils', 'exif']);
                break;
            case 'proof.html'://逆向-举证 买家
                require(['proof', 'utils', 'exif']);
                break;
            case 'refuseRefund.html'://逆向-拒绝退款 卖家
                require(['refuseRefund', 'utils', 'exif']);
                break;
            case 'buyerPost.html'://逆向-寄回地址 卖家
                require(['buyerPost', 'utils']);
                break;
            case 'myCollect.html'://我收藏的
                require(['myCollect', 'utils']);
                break;
            case 'myPublish.html'://我发布的
                require(['myPublish', 'utils']);
                break;
            case 'shelvesList.html'://下架列表
                require(['shelvesList', 'utils']);
                break;
            case 'personalSet.html'://个人设置主頁
                require(['personalSet', 'utils']);
                break;
            case 'personalCenter.html'://个人中心
                require(['personalCenter', 'utils']);
                break;
            case 'resellList.html'://一键转卖
                require(['resellList', 'utils']);
                break;
            case 'WXresellList.html'://卖了换钱主站
                require(['WXresellList', 'utils']);
                break;
            case 'WXresellListPulish.html'://卖了换钱发布中间页主站
                require(['WXresellListPulish', 'utils','md5']);
                break;
            case 'tickit.html'://发票页面
                require(['tickit', 'utils']);
                break;
            case 'assessEdit.html'://发布评价编辑页
                require(['assessEdit', 'utils', 'exif']);
                break;
            case 'assessAdd.html'://追加评价编辑页
                require(['assessAdd', 'utils', 'exif']);
                break;
            case 'circleList.html'://圈子列表
                require(['circleList', 'utils']);
                break;
            case 'circleDetail.html'://圈子详情
                require(['circleDetail', 'utils']);
                break;
            case 'report.html'://商品详情举报
                require(['report', 'utils']);
                break;
            case 'whiteCredit.html'://小白信用
                require(['whiteCredit']);
                break;
            case 'changePrice.html'://修改价格
                require(['changePrice', 'utils']);
                break;
            case 'test.html'://唤起协议测试
                require(['test']);
                break;
            case 'userAgreement.html'://拍拍用户协议
                require(['jquery', 'utils']);
                break;
            case 'evaDetail.html'://评价详情
                require(['evaDetail']);
                break;
            case 'test2.html'://登录态测试
                require(['test2']);
                break;
            case 'search-c2c.html'://搜索页列表c2c
                require(['search-c2c']);
                break;
            case 'search-b2c.html'://搜索页列表b2c
                require(['search-b2c2']);
                break;
            case 'search.html'://搜索框页
                require(['search']);
                break;
            case 'helpCenter.html'://帮助中心
                require(['helpCenter']);
                break;
            case 'helpDetail.html'://帮助中心详情
                require(['helpDetail']);
                break;
            case 'channelPage.html'://频道页面
                require(['channelPage']);
                break;
            case 'channelPageExt.html':// 频道页面二级页面
                require(['channelPageExt']);
                break;
            case 'secondsKill.html':// 秒杀频道
                require(['secondsKill']);
                break;
            case 'deliverTel.html':// 快递列表
                require(['deliverTel', 'utils']);
                break;
            case 'message.html':// 咚咚客服列表
                require(['message', 'utils']);
                break;
            case 'classifyDetails1.html':// 分类详情
                require(['classifyDetails1', 'utils']);
                break;
            case 'classifyDetails2.html':// 分类详情
                require(['classifyDetails2', 'utils']);
                break;
            case 'downLoad.html':// 分类详情
                require(['downLoad', 'utils']);
                break;
            case 'personalIdle.html':// 分类详情
                require(['personalIdle', 'utils']);
                break;
            case 'appDown.html':// 下载落地页
                require(['downLoad', 'utils']);
                break;
            case 'nearGoods.html':// 附近好物
                require(['nearGoods', 'utils']);
                break;
            case 'warn.html':// 温馨提示
                require(['warn', 'utils']);
                break;
            case 'yearSale.html':// 年会甩卖活动
                require(['yearSale', 'utils']);
                break;
            case 'incomedetail.html':// 收入明细
                require(['incomedetail', 'utils','paipaiSDK']);
                break;
            case 'testPost.html':// 测试用
                require(['testPost', 'utils']);
                break;
            case 'searchbox.html':// 测试用
                require(['searchbox', 'utils']);
                break;
            case 'lookResell.html':// 卖了换钱介绍页
                require(['lookResell', 'utils',]);
                break;
            case 'goodsPoolTest.html':// 商品池测试
                require(['goodsPoolTest', 'utils']);
                break;
            case 'error.html':// 错误页
                require(['error', 'utils']);
                break;
            case 'meet.html':// 回收闲置宣传图
                require(['meet', 'utils']);
                break;
            case 'unused.html':// 回收闲置H5宣传图
                require(['unused', 'utils']);
                break;
            case 'secret.html':// 用户隐私协议
                require(['jquery', 'utils']);
                break;
            case 'payWelcome.html':// 用户隐私协议
                require(['payWelcome', 'utils']);
                break;
            case 'sdkDemo.html':// paipaiSDK协议demo
                require(['sdkDemo','jquery', 'utils','paipaiSDK']);
                break;
            case 'downLoadForPay.html':// 微信扫描-面对面交易-下载落地页
                require(['downLoadForPay', 'utils']);
                break;
        }
    });


});

var rd = require('rd');
var fs = require('fs');
// // 同步遍历目录下的所有js文件
// rd.eachFileFilterSync('./scripts/', /\.js$/, function (f, s) {
//     console.log(f);
// });


// 同步遍历目录下的所有文件
// rd.eachSync('./', function (f, s) {
//     // 每找到一个文件都会调用一次此函数
//     // 参数s是通过 fs.stat() 获取到的文件属性值
//     console.log('file: %s', f);
// });

// 同步遍历目录下的所有js文件
// rd.eachFileFilterSync('./apps/m/', /\.html$/, function (f, s) {
//    //  var data1 = fs.readFileSync(f);
//    //  var res = data1.match(/<script[\s]+(?:[^>]+=[\s]*[^>]+)*(?:src[\s]*=[\s]*['"]([^>]+(?:\.js))['"])><\/script>/g);
//    // console.log(res);
//
//      var data1 = fs.readFileSync(f).toString();
//      var baseTag='//paipai.m.jd.com/c2c/'
//     if(f.indexOf('/m/')!=-1){
//         baseTag=baseTag+'m/';
//     }else if(f.indexOf('/mine/')!=-1){
//         baseTag=baseTag+'mine/';
//     }else if(f.indexOf('/market/')!=-1) {
//         baseTag=baseTag+'market/';
//     }else if(f.indexOf('/c2c/')!=-1) {
//         baseTag=baseTag+'resell/';
//     }
//     // var res = data1.match(/<script[\s]+(?:[^>]+=[\s]*[^>]+)[\s\S]*?<\/script>/g); //使用g选项，全局匹配
//     var res = data1.match(/<script[\s]type=text\/javascript+(?:[^>]+=[\s]*[^>]+)[\s\S]*?<\/script>/g); //使用g选项，全局匹配
//     if(res!=null){
//         res.forEach(function (item) {
//             var result=item.match(/src=[^"][^>]*/)
//             if(result!=null){
//                 console.log("https:"+result[0].replace('src=static/',baseTag));
//                console.log("http:"+result[0].replace('src=static/',baseTag));
//                // console.log(result[0].replace('src=m/','http://paipai.m.jd.com/c2c/m/'));
//                // console.log(result[0].replace('src=mine/','http://paipai.m.jd.com/c2c/mine/'));
//                // console.log(result[0].replace('src=market/','http://paipai.m.jd.com/c2c/market/'));
//             }
//         })
//     }
// });

// 同步遍历目录下的所有文件
// rd.eachFileFilterSync('./', /\.js/, function (f, s) {
//     // 每找到一个文件都会调用一次此函数
//     // 参数s是通过 fs.stat() 获取到的文件属性值
//     var baseTag = '//paipai.m.jd.com/c2c/';
//     f = f.replace(/\\/g, '/');
//     if (f.indexOf('/m/') != -1 || f.indexOf('/mine/') != -1 ||f.indexOf('/market/') != -1 ||f.indexOf('/resell/') != -1) {
//         if (f.indexOf('/m/') != -1) {
//             baseTag = baseTag + 'm/static/';
//         } else if (f.indexOf('/mine/') != -1) {
//             baseTag = baseTag + 'mine/static/';
//         } else if (f.indexOf('/market/') != -1) {
//             baseTag = baseTag + 'market/static/';
//         } else if (f.indexOf('/resell/') != -1) {
//             baseTag = baseTag + 'resell/static/';
//         }
//         var result = f.match(/static+[\S]*/g); //使用g选项，全局匹配
//         if (result != null) {
//             console.log(result[0].replace('static/', baseTag));
//         }
//     }
// });

// C2C 文件
// rd.eachFileFilterSync('./c2c/js', /\.js/, function (f, s) {
//     // 每找到一个文件都会调用一次此函数
//     // 参数s是通过 fs.stat() 获取到的文件属性值
//     var baseTag = '//paipai.m.jd.com/c2c/';
//     var last = '?t=20180628035124'
//     f = f.replace(/\\/g, '/');
//
//     var result = f.match(/js+[\S]*/g); //使用g选项，全局匹配
//     if (result != null) {
//         if (f.indexOf('/widget/') != -1) {
//             baseTag = baseTag + 'js/widget/';
//             console.log(result[0].replace('js/widget/', baseTag)+last);
//         } else if (f.indexOf('/components/') != -1) {
//             baseTag = baseTag + 'js/components/';
//             console.log(result[0].replace('js/components/', baseTag)+last);
//         } else {
//             baseTag = baseTag + 'js/';
//             console.log(result[0].replace('js/', baseTag)+last);
//         }
//     }
// });

// C2C 文件
rd.eachFileFilterSync('./c2c', /\.*/, function (f, s) {
    // 每找到一个文件都会调用一次此函数
    // 参数s是通过 fs.stat() 获取到的文件属性值
    var baseTag = '//paipai.m.jd.com/c2c/';
    var last = '?t=20180628035124'
    f = f.replace(/\\/g, '/');
    if (f.indexOf('/image/') != -1 || f.indexOf('/js/') != -1 || f.indexOf('/css/') != -1) {
        var myTag = '';
        if (f.indexOf('/image/') != -1) {
            baseTag = baseTag + 'image/';
            myTag = 'image/';
        } else if (f.indexOf('/js/') != -1) {
            baseTag = baseTag + 'js/';
            myTag = 'js/';
        } else if (f.indexOf('/css/') != -1) {
            baseTag = baseTag + 'css/';
            myTag = 'css/';
        }
        var reg = /(image|js|css)+[\S]*/g
        var result = f.match(reg); //使用g选项，全局匹配
        if (result != null) {
            console.log(result[0].replace(myTag, baseTag) + last);

        }
    }
});

// // C2C 文件
// rd.eachFileFilterSync('./c2c/js', /\.js/, function (f, s) {
//     // 每找到一个文件都会调用一次此函数
//     // 参数s是通过 fs.stat() 获取到的文件属性值
//     var baseTag = '//paipai.m.jd.com/c2c/';
//     var last = '?t=20180628035124'
//     f = f.replace(/\\/g, '/');
//
//     var result = f.match(/js+[\S]*/g); //使用g选项，全局匹配
//     if (result != null) {
//         if (f.indexOf('/widget/') != -1) {
//             baseTag = baseTag + 'js/widget/';
//             console.log(result[0].replace('js/widget/', baseTag)+last);
//         } else if (f.indexOf('/components/') != -1) {
//             baseTag = baseTag + 'js/components/';
//             console.log(result[0].replace('js/components/', baseTag)+last);
//         } else {
//             baseTag = baseTag + 'js/';
//             console.log(result[0].replace('js/', baseTag)+last);
//         }
//     }
// });



/*工具类*/
define('upreport', ['utils', 'md5'], function($utils, $md5) {
    //记录浏览器接口
    var report = {

        init: function(str) {
            this.report(str);
        },
        report: function(str) {

            var sign = location.hostname + location.pathname;
            if($utils.isNotEmpty(str)){
                sign=sign+str;
            }
            var req = {
                url: $utils.getHost() + '/pv/browse',
                data: {
                    sign: hex_md5(sign)
                },
                checkLogin:false
            };
            $utils.load(req).then(function(response) {

            }, function(error) {

            });
        }
    };
    return report;
});

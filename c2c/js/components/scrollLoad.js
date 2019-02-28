define(['zepto', 'common', 'dot'], function (Z, C, D) {

    function init(dom) {
        /**
         * scroll-load
         * url,pageSize,templateId,threshold,pageSizePropName,pageIndexPropName,totalPropName
         *
         */
        var node = dom || document.querySelector('[scroll-load]'), timer,
            url = node.getAttribute('data-url'),
            pageSize = node.getAttribute('data-pagesize') || 15,
            templateId = node.getAttribute('data-template'),//模板id
            threshold = node.getAttribute('data-threshold') || 50,
        //send
            pageSizePropName = node.getAttribute('data-pagesize') || 'pageSize',//发送页容量参数名
            pageIndexPropName = node.getAttribute('data-indexpropname') || 'pageNo',//发送页序数参数名
        //receive
            totalPropName = node.getAttribute('data-totalpropname') || 'total',//返回总数参数名
            currentIndex = 0,//实际页序号
            total;//返回总数

        //加载
        function load() {
            //最后一页
            if (total != undefined && Math.ceil(total / pageSize) <= currentIndex) {
                window.removeEventListener('scroll', scroll);
                return;
            }
            var data = {};
            data[pageIndexPropName] = ++currentIndex;
            data[pageSizePropName] = pageSize;
            C.req({
                url: url,
                method: 'get',
                data: data
            }).then(render);
        }

        //展现
        function render(response) {
            console.log(response);
            total = response[totalPropName];
            if (response.list) {
                var tmpl = Z(templateId).html(),
                    doTtmpl = D.template(tmpl),
                    h = doTtmpl(response.list);
                if (currentIndex > 1 && response.list.length == 0) {

                } else {
                    Z(node).append(h);
                }
                E.render();
            }
        }

        //滚动处理
        function scroll() {
            clearTimeout(timer);
            timer = setTimeout(function () {
                var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
                    scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
                if ((scrollTop + window.innerHeight) >= scrollHeight - threshold) {
                    load();
                }
            }, 40);
        }

        window.addEventListener('scroll', scroll);

        load();
    }

    // E.init(node);
    return init;
});
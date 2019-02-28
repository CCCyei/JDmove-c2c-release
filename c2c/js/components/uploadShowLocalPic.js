// 上传图片初始化
window.imgObj = {};

function lightToast(text) {
    $('.toast-light').remove();
    var $div = $('<div class="toast-light">' + text + '</div>');
    $('body').append($div);
    if (!$div.hasClass('show')) {
        setTimeout(function () {
            $div.addClass('show');
        }, 0);
        setTimeout(function () {
            $div.removeClass('show')
        }, 2000);
    }
};

function UploadPic() {
    this.sw = 0;
    this.sh = 0;
    this.tw = 0;
    this.th = 0;
    this.scale = 0;
    this.maxWidth = 0;
    this.maxHeight = 0;
    this.maxSize = 0;
    this.fileSize = 0;
    this.fileDate = null;
    this.fileType = '';
    this.fileName = '';
    this.input = null;
    this.canvas = null;
    this.mime = {};
    this.type = '';
    this.callback = function () {
    };
    this.loading = function () {
    };
}

UploadPic.prototype.init = function (options) {
    this.maxWidth = options.maxWidth || 2000;
    this.maxHeight = options.maxHeight || 2000;
    this.maxSize = options.maxSize || 5 * 1024 * 1024;
    this.input = options.input;
    this.mime = {
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'bmp': 'image/bmp'
    };
    this.callback = options.callback || function () {
    };
    this.loading = options.loading || function () {
    };

    this._addEvent();
};

/**
 * @description 绑定事件
 * @param {Object} elm 元素
 * @param {Function} fn 绑定函数
 */
UploadPic.prototype._addEvent = function () {
    var _this = this;

    function tmpSelectFile(ev) {
        _this._handelSelectFile(ev);
    }

    this.input.addEventListener('change', tmpSelectFile, false);
};

/**
 * @description 绑定事件
 * @param {Object} elm 元素
 * @param {Function} fn 绑定函数
 */
UploadPic.prototype._handelSelectFile = function (ev) {
    var length = ev.target.files.length;
    if (length > 5 || (length + Object.getOwnPropertyNames(imgObj).length) > 5) {
        lightToast('上传图片不超过5张');
        return;
    }
    for (var i = 0; i < length; i++) {
        var file = ev.target.files[i];

        this.type = file.type

        // 如果没有文件类型，则通过后缀名判断（解决微信及360浏览器无法获取图片类型问题）
        if (!this.type) {
            this.type = this.mime[file.name.match(/\.([^\.]+)$/i)[1]];
        }
        if (!/image\/(png|jpg|jpeg|bmp)/.test(this.type)) {
            lightToast('选择的文件类型不是图片');
            return;
        }
        if (file.size > this.maxSize) {
            lightToast('选择文件大于' + this.maxSize / 1024 / 1024 + 'M，请重新选择');
            return;
        }

        this.fileName = file.name;
        this.fileSize = file.size;
        this.fileType = this.type;
        this.fileDate = file.lastModifiedDate;

        this._readImage(file);
    }
};

/**
 * @description 读取图片文件
 * @param {Object} image 图片文件
 */
UploadPic.prototype._readImage = function (file) {
    var _this = this;
    EXIF.getData(file, function () {
        EXIF.getAllTags(this);
        _this.Orientation = EXIF.getTag(this, 'Orientation');
    });

    function tmpCreateImage(uri) {
        _this._createImage(uri);
    }

    this.loading();

    this._getURI(file, tmpCreateImage);
};

/**
 * @description 通过文件获得URI
 * @param {Object} file 文件
 * @param {Function} callback 回调函数，返回文件对应URI
 * return {Bool} 返回false
 */
UploadPic.prototype._getURI = function (file, callback) {
    var reader = new FileReader();
    var _this = this;

    function tmpLoad() {
        // 头不带图片格式，需填写格式
        var re = /^data:base64,/;
        var ret = this.result + '';

        if (re.test(ret)) ret = ret.replace(re, 'data:' + _this.mime[_this.fileType] + ';base64,');

        callback && callback(ret);
    }

    reader.onload = tmpLoad;

    reader.readAsDataURL(file);

    return false;
};

/**
 * @description 创建图片
 * @param {Object} image 图片文件
 */
UploadPic.prototype._createImage = function (uri) {
    var img = new Image();
    var _this = this;

    function tmpLoad() {
        _this._drawImage(this);
    }

    img.onload = tmpLoad;

    img.src = uri;
    img.Orientation = _this.Orientation;
};

/**
 * @description 创建Canvas将图片画至其中，并获得压缩后的文件
 * @param {Object} img 图片文件
 * @param {Number} width 图片最大宽度
 * @param {Number} height 图片最大高度
 * @param {Function} callback 回调函数，参数为图片base64编码
 * return {Object} 返回压缩后的图片
 */
UploadPic.prototype._drawImage = function (img, callback) {
    var base64 = null;
    this.sw = img.width;
    this.sh = img.height;
    this.tw = img.width;
    this.th = img.height;
    this.Orientation = img.Orientation;


    this.scale = (this.tw / this.th).toFixed(2);

    if (this.sw > this.maxWidth) {
        this.sw = this.maxWidth;
        this.sh = Math.round(this.sw / this.scale);
    }

    if (this.sh > this.maxHeight) {
        this.sh = this.maxHeight;
        this.sw = Math.round(this.sh * this.scale);
    }

    this.canvas = document.createElement('canvas');
    var ctx = this.canvas.getContext('2d');

    this.canvas.width = this.sw;
    this.canvas.height = this.sh;

    var xpos = this.canvas.width;
    var ypos = this.canvas.height;

    // navigator.userAgent.match(/iphone/i) || navigator.userAgent.match(/NMF26X/i)) 之前的判断逻辑
    if (this.Orientation !== '' && this.Orientation !== 1) {
        // 修复ios other获取图片旋转角度数
        switch (this.Orientation) {
            case 3: // 需要180度旋转
                ctx.translate(this.canvas.width, this.canvas.height);
                ctx.rotate(Math.PI);
                break;
            case 6: // 需要顺时针（向左）90度旋转
                this.canvas.width = ypos;
                this.canvas.height = xpos;
                ctx.translate(this.canvas.width, 0);
                ctx.rotate(0.5 * Math.PI);
                break;
            case 8: // 需要逆时针（向右）90度旋转
                this.canvas.width = ypos;
                this.canvas.height = xpos;
                ctx.translate(0, this.canvas.height);
                ctx.rotate(-0.5 * Math.PI);
                break;
            default:
        }
    }

    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.sw, this.sh);
    base64 = this.canvas.toDataURL('image/jpeg', 0.92);

    this.callback(base64);

    ctx.clearRect(0, 0, this.tw, this.th);
    this.canvas.width = 0;
    this.canvas.height = 0;
    this.canvas = null;
};

var u = new UploadPic();
u.init({
    input: document.querySelector('#imageUpload'),
    callback: function (base64) {
        var imgObjLen = Object.getOwnPropertyNames(imgObj).length;
        if (imgObjLen >= 5) {
            lightToast('上传图片不超过5张');
            return;
        }
        var nowKey = new Date().getTime();
        $('.imgUploadForm input[name="nameSuffix"]').val(nowKey);
        imgObj[nowKey] = base64;

        if (Object.getOwnPropertyNames(imgObj).length == 5) {
            $('.reverse-upload-imgs #uploadImg').hide();
        }


        var str = '<div class="reverse-upload-img" data-key="' + nowKey + '">' +
            '<div class="reverse-upload-loading"><i></i></div>' +
            '<div class="reverse-upload-remove"></div><img src="' + base64 + '">' +
            '</div>';
        var ie = (navigator.appVersion.indexOf("MSIE") != -1);
        var file = ("#imageUpload");
        if (ie) {
            var file2 = file.cloneNode(false);
            file2.onchange = file.onchange;
            file.parentNode.replaceChild(file2, file);
        } else {
            $(file).val("");
        }
        $('input[name="data"]').val(base64);

        var formData = new FormData();

        formData.append('data', base64);
        formData.append('imageIndex', 1);
        formData.append('nameSuffix', nowKey);
        formData.append('protocol', location.protocol.indexOf('https') > -1 ?
            2 : 1);

        formData.append('isReCode', false);
        formData.append('isRePrefix', false); // 图片地址不带前缀
        var form = new FormData($('form')[0]);


        // 新建请求
        var xhr = new XMLHttpRequest();

        xhr.timeout = 30000;


        xhr.open('POST', '//bizgw.jd.com/image/imageUploadH5', true);
        xhr.send(formData);
        xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 304) {
                var result = JSON.parse(xhr.responseText);
                if (result.code == 0) {
                    var data = result.data;
                    var imagePath = data.key || '';
                    var nameSuffix = data.nameSuffix || '';
                    // var imageIndex = data.imageIndex || 1;
                    // var qqUrl = data.qqUrl || '';
                    if (imagePath) {
                        if (!imgObj[nameSuffix]) {
                            return;
                        }
                        var dom = $('.reverse-upload-imgs .reverse-upload-img[data-key=' + nameSuffix + ']');
                        dom.find('.reverse-upload-loading').remove();
                        imgObj[nameSuffix] = imagePath;
                    } else {
                        var data = result.data;
                        var nameSuffix = data.nameSuffix || '';
                        failUpload(nameSuffix);
                    }
                } else {
                    failUpload(nowKey);
                }
            }else{
                failUpload(nowKey);
                lightToast('网络问题，请稍后再试！');
            }
        };
        xhr.ontimeout = () => {
            lightToast('发送图片超时！');
            failUpload(nowKey);
        };
        xhr.onerror = () => {
            lightToast('网络问题，请稍后再试！');
            failUpload(nowKey);
        };
        $('.reverse-upload-imgs #uploadImg').before(str);
    }
});
function reloadImage(key) {
    var base64;
    if(imgObj && Object.getOwnPropertyNames(imgObj).length>0){
        base64=imgObj[key];
    }else{
        return;
    }
    var formData = new FormData();

    formData.append('data', base64);
    formData.append('imageIndex', 1);
    formData.append('nameSuffix', key);
    formData.append('protocol', location.protocol.indexOf('https') > -1 ?
        2 : 1);

    formData.append('isReCode', false);
    formData.append('isRePrefix', false); // 图片地址不带前缀

    // 新建请求
    var xhr = new XMLHttpRequest();

    xhr.timeout = 30000;


    xhr.open('POST', '//bizgw.jd.com/image/imageUploadH5', true);
    xhr.send(formData);
    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 304) {
            var result = JSON.parse(xhr.responseText);
            if (result.code == 0) {
                var data = result.data;
                var imagePath = data.key || '';
                var nameSuffix = data.nameSuffix || '';

                if (imagePath) {
                    if (!imgObj[nameSuffix]) {
                        return;
                    }

                    var dom = $('.reverse-upload-imgs .reverse-upload-btn[data-key=' + nameSuffix + ']');
                    dom.find('.reverse-upload-loading').remove();
                    var str = '<div class="reverse-upload-remove"></div><img src="' + base64 + '">';
                    imgObj[nameSuffix] = imagePath;
                    dom.html(str);
                    dom.removeClass('reverse-upload-btn').addClass('reverse-upload-img');
                } else {
                    var data = result.data;
                    var nameSuffix = data.nameSuffix || '';
                    // failUpload(key,1);
                }
            } else {
                // failUpload(key,1);
            }
        }else{
            // failUpload(key,1);
            lightToast('网络问题，请稍后再试！');
        }
    };
    xhr.ontimeout = () => {
        lightToast('发送图片超时！');
        // failUpload(nowKey,1);
    };
    xhr.onerror = () => {
        lightToast('网络问题，请稍后再试！');
        // failUpload(nowKey,1);
    };
}
// function imageLoad_pic1(nameSuffix, imageIndex, imagePath, code) {
// }
function failUpload(nameSuffix,type) {
    if(type!=1){
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/jdappershou_ios/) && ua.match(/iphone/) || ua.match(/jdappershou_android/) && ua.match(/android/)) {
            delete imgObj[nameSuffix];
        }
        var str = '<div class="reverse-upload-btn failUpload" data-key="'+nameSuffix+'"><div class="reverse-upload-remove"></div><img src="data:image/png;base64,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">' +
            '<div class="red">重新上传</div>' +
            '</div>';
        $('.reverse-upload-imgs .reverse-upload-img[data-key=' + nameSuffix + ']').remove();
        $('.reverse-upload-imgs #uploadImg').before(str);
    }else{
        // 这里是重新上传
    }
}

$(function () {
    $('.reverse-upload').delegate('.reverse-upload-btn', 'click', function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('jdappershou') != -1) {
            if ($(this).hasClass('failUpload')) {
                $(this).remove();
                var key = $(this).attr('data-key');
                renderPhotos(key, imgObj[key]);
                // ios协议需传key1 字段
                var tempJson = {
                    key: key
                };
                var url = "openapp.paipai://reuploadPhoto/app?param=" + encodeURIComponent(JSON.stringify(tempJson));
                location.href = url;
            } else {
                // ios协议需传key1 字段
                var tempJson = {
                    num: (5 - Object.getOwnPropertyNames(imgObj).length)
                };
                var url = "openapp.paipai://takePhotos/app?param=" + encodeURIComponent(JSON.stringify(tempJson));
                location.href = url;
            }
        } else {
            if ($(this).hasClass('failUpload')) {
                console.log("图片上传失败");
                var key = $(this).attr('data-key');
                reloadImage(key);
            } else {
                $("#imageUpload").trigger("click");
            }
        }
    });
    $('.reverse-upload-imgs').delegate('.reverse-upload-remove', 'click', function (e) {
        $('.reverse-dialog-panel-btns #success').attr('data-key', $(this).parent().attr('data-key'));
        $('.reverse-dialog').show();
        e.stopPropagation();
    });
    $('.reverse-dialog').delegate('.reverse-dialog-panel-btns > div', 'click', function () {
        var key = $(this).attr('data-key');
        if (key) {
            delete imgObj[key];
            $('.reverse-upload-imgs .reverse-upload-img[data-key="' + key + '"]').remove();
            $('.reverse-upload-imgs .reverse-upload-btn[data-key="' + key + '"]').remove();

            if (Object.getOwnPropertyNames(imgObj).length < 5) {
                $('.reverse-upload-imgs #uploadImg').show();
            }
        }
        $('.reverse-dialog').hide();
    });

    // 调原生相机上传图片
    window.renderPhotos = function (key, value) {
        imgObj[key] = value;
        if (Object.getOwnPropertyNames(imgObj).length >= 5) {
            $('.reverse-upload-imgs #uploadImg').hide();
        }
        var str = '<div class="reverse-upload-img" data-key="' + key + '">' +
            '<div class="reverse-upload-loading"><i></i></div>' +
            '<div class="reverse-upload-remove"></div><img style="width:100%;" src="data:image/jpeg;base64,' + value + '">' +
            '</div>';
        $('.reverse-upload-imgs #uploadImg').before(str);

    }

    window.uploadPhotoSuccess = function (key, code) {
        if (!imgObj[key]) {
            return;
        }
        var dom = $('.reverse-upload-imgs .reverse-upload-img[data-key=' + key + ']');
        dom.find('.reverse-upload-loading').remove();
        imgObj[key] = code;
    }
    window.uploadPhotoFail = function (key) {
        if (!imgObj[key]) {
            return;
        }
        var str = '<div class="reverse-upload-btn failUpload" data-key="' + key + '"><div class="reverse-upload-remove"></div><img src="image/reverse/group3@2x.png">' +
            '<div class="red">重新上传</div>' +
            '</div>';

        $('.reverse-upload-imgs .reverse-upload-img[data-key=' + key + ']').remove();
        $('.reverse-upload-imgs #uploadImg').before(str);
    }
});

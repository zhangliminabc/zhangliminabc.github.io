;
(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]'); // 获取名为viewport的mate标签
    var flexibleEl = doc.querySelector('meta[name="flexible"]'); // 获取名为flexible的mate标签
    var dpr = 0; // dpr （设备像素比）初始化置为0
    var scale = 0; // scale (缩放比例)
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    // 如果名为viewport的mate标签存在var match = metaEl.getAttribute('content').match(/initial-scale=([d.]+)/);  
    // 将name=viewport的mate标签里的，content属性里的initial-scale（初始缩放比）属性处理成数组
    if (metaEl) {
        if (match) {
            scale = parseFloat(match[1]); // 获得了页面的初始缩放比例
            dpr = parseInt(1 / scale); // 得到设备像素比
        }
    } else if (flexibleEl) { // 
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial-dpr=([d.]+)/);
            var maximumDpr = content.match(/maximum-dpr=([d.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) { // 当上面条件都不满足时
        var isAndroid = win.navigator.appVersion.match(/android/gi); // 安卓机
        var isIPhone = win.navigator.appVersion.match(/iphone/gi); // IOS机
        var devicePixelRatio = win.devicePixelRatio; // 获取window对象的 devicePixelRatio属性值，这个属性值就是我们所说的设备像素比，简称dpr
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3; // 
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr); // 给页面根元素设置自定义属性data-dpr，值为前面已经赋值好的dpr
    if (!metaEl) {
        // 当name=viewport的mate标签不存在时，就给页面添加一个，各元素值为前面计算好的scale，并不允许用户拖动缩放
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) { // 对于逻辑像素大于540的设备，其宽度就设置为设备像素比乘以540
            width = 540 * dpr;
        }
        var rem = width / 10; // 将屏幕宽度分成10份，每一份为1rem 所以整个屏幕的完整宽度为10rem
        docEl.style.fontSize = rem + 'px'; // 设置根元素字体大小为计算所得的值
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }


    refreshRem();　　 // 后面这段代码是将rem单位值转换成px的和将px单位的值换算成rem单位的值
    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));
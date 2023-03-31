//判斷是否行動裝置第一種
function checkserAgent() {
    var uA = navigator.userAgent;
    var flag = false;
    if (uA.match(/iPod/) || uA.match(/iPad/) || uA.match(/iPhone/) || !!uA.match(/Macintosh/) || uA.match(/Android/) || uA.match(/Windows Phone/)) {
        flag = true;
    }
    return flag;
}

//偵測是否行動裝置第二種
function isMobile() {
    try {
        document.createEvent("TouchEvent"); return true;
    } catch(e) {
        return false; 
    }
}

//偵測判斷是否IOS
function checkIos() {
    var uA = navigator.userAgent;
    var flag = false;
    if (uA.match(/iPod/) || uA.match(/iPad/) || uA.match(/iPhone/) || !!uA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || !!uA.match(/Macintosh/)) {
        flag = true;
    }
    return flag;
}

//判段裝置名稱-小寫
function getUrlParamLower(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).toLowerCase().match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

//判段裝置名稱
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

//獲取裝置寬
function windowWidth() {
    var we = document.documentElement;
    return self.innerWidth || (we && we.clientWidth) || document.body.clientWidth;
}

//獲取裝置高
function windowHeight() {
    var de = document.documentElement;
    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}

//瀏覽器狀態切換改變
function getHiddenProp() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    if ('hidden' in document) return 'hidden';
    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'Hidden') in document)
            return prefixes[i] + 'Hidden';
    }
    return null;
}

function getVisibilityState() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    if ('visibilityState' in document) return 'visibilityState';
    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document)
            return prefixes[i] + 'VisibilityState';
    }
    return null;
}

function isHidden() {
    var prop = getHiddenProp();
    if (!prop) return false;
    return document[prop];
}

var visProp = getHiddenProp();


//現在時間取得
async function getServerDate(){
    return await fetch(location.href).then(data => data.headers.get('Date'))
}

async function getNowDate() {
    return await getServerDate().then((data)=> {
        var getNow = new Date(data);
        var getY = getNow.getFullYear();
        var getM = (getNow.getMonth() + 1 < 10 ? '0' : '') + (getNow.getMonth() + 1);
        var getD = (getNow.getDate() < 10 ? '0' : '') + getNow.getDate();
        var getH = (getNow.getHours() < 10 ? '0' : '') + getNow.getHours();
        var getAll = getY + getM + getD + getH;
        return parseInt(getAll);
    })
}

//時間取得-埋點紀錄
async function getSetEventDate(){
    return await getServerDate().then((data)=> {
        var getNow = new Date(data);
        var getY = getNow.getFullYear();
        var getM = (getNow.getMonth() + 1 < 10 ? '0' : '') + (getNow.getMonth() + 1);
        var getD = (getNow.getDate() < 10 ? '0' : '') + getNow.getDate();
        var getH = (getNow.getHours() < 10 ? '0' : '') + getNow.getHours();
        var getMin = (getNow.getMinutes() < 10 ? '0' : '') + getNow.getMinutes();
        var getS = (getNow.getSeconds() < 10 ? '0' : '') + getNow.getSeconds();
        var getAll = getY + getM + getD + getH + getMin + getS;
        return parseInt(getAll);
    })
}

//轉換時間格式
function getDate(date){
    var getNow = new Date(date);
    var getY = getNow.getFullYear();
    var getM = (getNow.getMonth() + 1 < 10 ? '0' : '') + (getNow.getMonth()+1);
    var getD = (getNow.getDate() < 10 ? '0' : '') + getNow.getDate();
    var getH = (getNow.getHours() < 10 ? '0' : '') + getNow.getHours();
    var getAll = getY + getM + getD + getH;
    return parseInt(getAll);
}

function changeTimeFormat(time) {   //改變時間格式
    var d = Math.floor(time / (24 * 3600));
    var h = Math.floor((time % (24 * 3600)) / 3600);
    var m = Math.floor((time % 3600) / (60));
    var s = Math.floor(time % 60);
    h = (h < 10 ? '0' : '') + h;
    m = (m < 10 ? '0' : '') + m;
    s = (s < 10 ? '0' : '') + s;
    str = d + '天 ' + h + ':' + m + ':' + s;
    return str;
}

function changeTimeFormatII(time) {   //改變時間格式-無天顯示
    var d = Math.floor(time / (24 * 3600));
    var h = Math.floor((time % (24 * 3600)) / 3600);
    var m = Math.floor((time % 3600) / (60));
    var s = Math.floor(time % 60);
    h = (h < 10 ? '0' : '') + h;
    m = (m < 10 ? '0' : '') + m;
    s = (s < 10 ? '0' : '') + s;
    if(d > 0) {
        str = d + '天 ' + h + ':' + m + ':' + s;
    } else {
        str = h + ':' + m + ':' + s;
    }
    
    return str;
}


/*===========loading新增狀態===========*/
function loadingAdd(id) {
    try {
        if(id) {
            document.getElementById(id).querySelector('.loader-inner').innerHTML = addDivs(8).join('');
        } else {
            document.querySelectorAll('.loader-inner').forEach(function (item) {
                item.innerHTML = addDivs(8).join('');
            })
        }
    } catch(e) {
        console.log(e);
    }
}

/*===== 增加DIV =====*/
function addDivs(n) {
    var arr = [];
    for (i = 1; i <= n; i++) {
        arr.push('<div></div>');
    }
    return arr;
}


var timeShow ;
self.onmessage = function (e) {
    
    //setTimeOut 方式
    var start = true;
    var stop = false;
    var interval = 1000;
    var str = 0;
    var count = 0;
    var startTime = new Date().getTime();
    var showMS = e.data * 1000;
    if (showMS > 0) {
        clearTimeout(timeShow);
        timeShow = setTimeout(update, interval);
    } else {
        //執行倒數計時完畢動作
        postMessage(str);
    }

    function update() {
        count++;
        var offset = new Date().getTime() - (startTime + count * interval);
        if (start) { 
            stopTime = interval + showMS; 
            start = false; 
        } else { 
            if (showMS <= 0) {
                stop = true; 
                clearTimeout(timeShow);
            }
        }
        var nextTime = interval - offset;
        showMS -= interval;
        if (showMS > 0) {
            var d = Math.floor((showMS / 1000) / (24 * 3600));
            var h = Math.floor(((showMS / 1000) % (24 * 3600)) / 3600);
            var m = Math.floor(((showMS / 1000) % 3600) / (60));
            var s = Math.floor((showMS / 1000) % 60);
            h = (h < 10 ? '0' : '') + h;
            m = (m < 10 ? '0' : '') + m;
            s = (s < 10 ? '0' : '') + s;
            if (d > 0) {
                str = d + '天' + h + ':' + m + ':' + s;
            } else {
                str = h + ':' + m + ':' + s;
            }
        } else {
            str = 0;
        }
        postMessage(str);

        if (!stop) {
            timeShow = setTimeout(update, nextTime);
        }
    }
}

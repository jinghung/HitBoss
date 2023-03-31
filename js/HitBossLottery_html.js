const {ref, watch, reactive, onBeforeMount, onBeforeUnmount, nextTick, onMounted, watchEffect, toRefs} = Vue;
const forecast = {
    setup() {
        const isLoading = ref(true),                                //是否顯示Loading中，預設true
            isFirstLoading = ref(true),                             //是否初始loading，判斷當前主API第一次打
            isWebPlat = ref(false),                                 //是否WEB平台
            iphoneHome = ref(false),                                //IOS是否有虛擬HOME鍵
            platName = ref(null),                                   //平台名稱
            isClick = ref(false),                                   //是否點擊中
            contentObj = ref(null),                                 //content物件
            contentMidObj = ref(null),                              //content中間物件
            maskRangeObj = ref(null),                               //maskRangeObj物件
            popMsgBoxObj = ref(null),                               //氣泡框訊息物件
            getRewardObj = ref(null),                               //獲獎訊息物件
            pageInfoPos = ref('1%'),                                //活動說明位移值
            pageInfoTab = ref(1),                                   //活動說明頁籤值
            selectRankTime = ref(0),                                //攻擊排行-時間選擇
            currentBoss = ref(0),                                   //當前的王，預設0
            tenLottryFlag = ref(false),                             //是否十連抽，預設false
            tenBtnPos = ref('57%'),                                 //十連抽移動位置
            attackCost = ref([1,10,100]),                           //攻擊使用的武器券
            getInfoData = ref({}),                                  //活動資訊API
            popType = ref(null),                                    //彈窗參數
            popMsgType = ref(null),                                 //訊息彈窗參數
            bubbleTop = ref({}),                                    //氣泡框位置
            bigPrizeFlag = ref(0),                                  //大獎演藝參數
            lotteryFlag = ref(false),                               //打抽獎API的狀態
            selectCost = ref(0),                                    //選擇要扣的武器券
            attackHurt = ref([]),                                   //傷害數值陣列顯示
            popMsg = ref({title:null,msg:null});                    //popMsg訊息內容

        onBeforeMount(()=> {    //綁定前
            if(!checkserAgent()) {
                isWebPlat.value = true;
            }
            
            if(window.webkit) {
                if(screen.height / screen.width > 2) {
                    iphoneHome.value = true;
                }
            }
        })

        onMounted(() => {       //掛載完成
            //loading效果DIV新增
            loadingAdd();
            addEventListener('resize', sizeDevice, false);    //resize時執行自適應

            try {
                PageMethods.GetInfo(getInfo, onError);   //活動資訊API
            } catch (e) {
                console.log(e);
                getInfo();
            }
            // PageMethods.GetInfo(getInfo, onError);   //活動資訊API
            


            //暫時存放-當前載入完成時更改
            isLoading.value = 0;
            sizeDevice();

            // resultCode(9999);

            bigPrizeFlag.value = 5
        })

        //偵測值-popType切換判斷
        watch(popType, (newValue, oldValue) => {    //偵測彈窗type狀態
            isClick.value = true;
            if(newValue) {
                sizeDevice(1);
            }
            switch(newValue) {
                case 1:         //活動說明
                    pageInfoTab.value = 1;
                    maskRangeObj.value.querySelector('#page_info').querySelector('.page_info_con_range').scrollTop = 0
                    break;
                case 2:         //活動紀錄
                    maskRangeObj.value.querySelector('#page_record').querySelector('.record_list').scrollTop = 0
                    break;
                case 3:         //任務拿武器
                    let isWebLobby = '';
                    if(webLobbyFlag) {
                        isWebLobby = '&webLobby=1'
                    }
                    document.getElementById('iframeTask').src = getDomainUrl('op') + '/MonthTask/MonthTask.aspx?notfull=1&onlytask=1&iniframe=1' + isWebLobby;
                    if(getInfoData.value.TaskRed) {
                        getInfoData.value.TaskRed = false;
                    }
                    break;
                case 4:         //攻擊排行
                    // maskRangeObj.value.querySelector('#page_record').querySelector('.record_list').scrollTop = 0
                    break;
                case 5:         //累儲送券
                    maskRangeObj.value.querySelector('#page_store').querySelector('.store_list_content').scrollTop = 0
                    break;
                case 6: 
                    if(getInfoData.value.LotteryRed) {
                        getInfoData.value.LotteryRed = false;
                    }
                    break;
            }
            
            if(newValue == null && oldValue == 3) { 
                //任務拿武器彈窗關閉，要重打武器券數API
                document.getElementById('iframeTask').src = '';
            }
            if(newValue) {
                setTimeout(()=> {
                    isClick.value = false;
                },500)
            } else {
                setTimeout(()=> {
                    isClick.value = false;
                },100)
            }
            
        })

        //偵測值-popType切換判斷
        watch(popMsgType, (newValue, oldValue) => {    //偵測彈窗type狀態
            if(newValue) {
                nextTick(()=> {
                    sizeDevice(2);
                })
            }
            if(oldValue == 2 && !lotteryFlag.value) {   //判斷取消抽獎則消耗數值歸0
                selectCost.value = 0;
            }
            if(oldValue == 2 && lotteryFlag.value) {   //判斷確定抽獎則打API
                console.log('執行抽獎API');
                attackHurtValue();
            }
            setTimeout(()=> {
                if(!lotteryFlag.value) {
                    isClick.value = false;
                }
            },100)
        })

        //偵測值-活動說明頁籤切換判斷
        watch(pageInfoTab, (newValue, oldValue) => {    //偵測彈窗type狀態
            isClick.value = true;
            maskRangeObj.value.querySelector('#page_info').querySelector('.page_info_con_range').scrollTop = 0
            if(newValue == 1) {
                pageInfoPos.value = '1%'
            } else if(newValue == 2) {
                pageInfoPos.value = '34%'
            } else if(newValue == 3) {
                pageInfoPos.value = '68%'
            }
            setTimeout(()=> {
                isClick.value = false;
            },500)
        })

        //偵測值-王顯示資料
        watch(currentBoss, (newValue, oldValue) => {
            isClick.value = true;
            if(newValue == true) {
            } else {
            }
            setTimeout(()=> {
                isClick.value = false;
            },500)
        })

        //偵測值-十連抽
        watch(tenLottryFlag, (newValue, oldValue) => {
            isClick.value = true;
            if(newValue == true) {
                tenBtnPos.value = '0%';
                attackCost.value = [10,100,1000];
            } else {
                tenBtnPos.value = '57%';
                attackCost.value = [1,10,100];
            }
            setTimeout(()=> {
                isClick.value = false;
            },300)
        })


        //偵測值-大獎動畫
        watch(bigPrizeFlag, (newValue, oldValue) => {
            if(newValue == 1) {
                setTimeout(()=> {
                    bigPrizeFlag.value = 2;
                },100)
            }
            if(newValue == 2) {
                setTimeout(()=> {
                    bigPrizeFlag.value = 3;
                },1900)
            }
            if(newValue == 3) {
                setTimeout(()=> {
                    bigPrizeFlag.value = 4;
                },2000)
            }
            if(newValue == 4) {
                setTimeout(()=> {
                    bigPrizeFlag.value = 5;
                },900)
            }
        })

        /*========================================================= API回傳 =========================================================*/
        //活動資訊
        function getInfo(receiveData) {
            // var statusCode = resultCode(receiveData.ResultCode);
            // if (statusCode == 1) {
            //     getInfoData.value = JSON.parse(receiveData.ResultData);
            // }

            getInfoData.value = {IsFirst:false,IsFirstOpenEvent:true,CloseTime:99999};
            //是否首次登入活動頁
            if (getInfoData.value.IsFirst) {
                if(!isFirstLoading.value) return;
                popType.value = 1;
            }
            //判斷是否當天第一次登入
            if(getInfoData.value.IsFirstOpenEvent) {
                getInfoData.value.LotteryRed = true;
                getInfoData.value.TaskRed = true;
            }

            //判斷是否第一次打API
            if(isFirstLoading.value) {
                isFirstLoading.value = false;

                startWorker(getInfoData.value)   //活動倒數計時
            }
        }

        //傷害抽獎
        function attackHurtValue(receiveData) {
            // var statusCode = resultCode(receiveData.ResultCode);
            // if (statusCode == 1) {
            //     getInfoData.value = JSON.parse(receiveData.ResultData);
            // }

            var hurtList = [10,11,12,13,15];
            attackHurt.value = [];
            hurtList.forEach((item,idx) =>{
                const time = idx * 200
                setTimeout(()=> {
                    attackHurt.value.push(item);
                    if(idx == (hurtList.length - 1)) {
                        setTimeout(()=> {
                            lotteryFlag.value = false;
                            popMsgType.value = 3;
                            attackHurt.value = [];
                        },800)
                    }
                },time)
            })
        }


        /*========================================================= 功能 =========================================================*/
        function resultCode(resultCode, type) {
            if (resultCode == 0) { //活動關閉
                eventStop('/images/comingsoon.jpg');
                sizeDevice();
                isLoading.value = 0;
            } else if (resultCode == 999) { //活動維護中
                eventStop('/images/maintain.jpg');
                sizeDevice();
                isLoading.value = 0;
            } else if (resultCode == -1) { //玩家未登入
                if(!type) {
                    eventLogin();
                } else {
                    return -1;
                }
            } else if (resultCode == 1) {
                return 1;
            } else if (resultCode == -2) { //手機未驗證
                return -2;
            } else if (resultCode == 9999) {//出錯
                popMsg.value.title = '';
                popMsg.value.msg = '網路異常，請稍後再試。';
                popMsgType.value = 1;
            }
        }
        //判斷瀏覽器狀態切換
        if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
            document.addEventListener(evtname, function () {
                if (isHidden()) {
                } else {
                } 
            }, false);
        }

        //打埋點紀錄
        function setEventFn(val) {
            if(!memberAccount) {
                memberAccount = 'guest' + getSetEventDate();
            }
            const dataObj = {
                MemberAccount: memberAccount,
                Event: 'HitBossLottery-' + val
            }
            PageMethods.SetEvent(JSON.stringify(dataObj), setEvent, onError);//打紀錄
        }

        function btnClick(type,val,event,data) { //按鈕點擊動畫
            if(isClick.value) return;
            isClick.value = true;
            var Flag = true;
            if(event) {
                event.target.classList.add('btnClick');
                event.target.addEventListener('animationend', () => {
                    if(Flag) {
                        Flag = false;
                        event.target.classList.remove('btnClick');
                        if(data == 'attack') {//判斷要抽獎
                            lotteryFlag.value = true;
                        }
                        if(type) {
                            if(type == 'btnAttack') {
                                checkLottery(data)
                            } else {
                                eval(type).value = val; 
                            }
                            
                        }
                        
                    }
                })
            } else {
                if(type) {
                    eval(type).value = val; 
                }
            }
            
        }

        function popClose(event) {  //關閉彈窗

            if(event.target.id == 'maskWrap') {
                popType.value = null;
            }
        }

        //關閉彈窗
        function closeMask(type,event) {
            if(type == 1) { //內容彈窗
                if(event.target.id == 'maskWrap') {
                    popType.value = null
                }
            }
            if(type == 2) { //訊息彈窗
                if(event == 0 || event.target.id == 'maskMsgWrap' || event.target.classList.contains('popMsgBox')) {   
                    popMsgType.value = null;
                }
            }
        }

        //判斷抽獎
        function checkLottery(idx) {
            if(tenLottryFlag.value) {
                popMsg.value.msg = `確認執行10次攻擊<br>共消耗 ${attackCost.value[idx]}張武器券<br>使用小刀 攻擊 秦始皇？`
            } else {
                popMsg.value.msg = `確認消耗 ${attackCost.value[idx]}張武器券<br>使用小刀 攻擊 秦始皇？`
            }

            selectCost.value = attackCost.value[idx];
            popMsgType.value = 2;
        }

        function receiveBonus(type, event) {    //累儲送券領取獎勵
            if(type) {
                if(isClick.value) return;
                isClick.value = true;
            }
            console.log('receiveBonus');
            if(type) {
                nextTick(()=> {
                    isClick.value = false;
                })
            } else {
                popMsgType.value = 4;
            }
        }

        function goStore() {    //前往儲值
            try {
                if (checkserAgent()) {
                    if(window.MobileApp || window.webkit) {
                        if(window.webkit) {
                            window.webkit.messageHandlers.webToSys_ChangePage.postMessage(6);
                        } else {
                            window.MobileApp.webToSys_ChangePage(6);
                        }
                    } else {
                        location.href = getDomainUrl() + '/Mvc/DynamicPages/MobileApp/Bank/PointBuyType?Platform=Web&ProductName=Web';
                    }
                } else {
                    window.open(getDomainUrl() + '/MVC/NewWebsite/Bank/Web/PointBuyOnline', '_blank');
                }
            } catch(e) {
                console.log(e);
            }
            setTimeout(()=> {
                isClick.value = false;
            },500)
        }

        /*===== 倒數計時器 =====*/
        function startWorker(data) {
            var worker;
            if (typeof (Worker) !== "undefined") {
                if (typeof (worker) != "undefined") {
                    worker.terminate();
                }
                worker = new Worker("../../js/worker.js");
                worker.postMessage(data.CloseTime);
                data.CloseTime = changeTimeFormat(data.CloseTime)
                worker.onmessage = function (event) {
                    if (event.data <= 0) {
                        worker.terminate();
                        location.reload();
                    } 
                    data.CloseTime = event.data

                };
            }
        }

        /* 移除Class參數 */
        function removeClass(event, val) {
            if(event && event.target) {
                event.target.classList.remove(val);
            }
        }

        /*========================================================= 尺寸Size =========================================================*/
        //裝置寬高、字型初始化
        function sizeDevice(idx) {
            if(!checkserAgent()) {
                isWebPlat.value = true;
            } else {
                isWebPlat.value = false;
            }
            const deviceHeight = windowHeight();    //取裝置高
            if(!idx || typeof idx == 'object') {
                let wrapWidth = 720;    //wrap寬預設720
                const deviceWidth = windowWidth();  //取裝置寬
                if(wrapWidth > deviceWidth) {   //裝置寬大於wrap寬時
                    wrapWidth = deviceWidth;
                }
                
                if(wrapWidth * 1.5 > deviceHeight) {    //wrap寬*1.2大於裝置高時
                    wrapWidth = parseInt(deviceHeight / 1.5);
                }
                document.getElementById('wrapper').style.width = wrapWidth + 'px';  //更改wrap寬

                //判斷是否常高度，是則小瑪莉固定content高置中，否則自動高度
                /*if(wrapWidth * 1.7  < deviceHeight) {
                    contentObj.value.style.height = (wrapWidth * 1.6) + 'px';
                    maskRangeObj.value.style.height = parseInt(wrapWidth * 1.6 * 0.9) + 'px';
                } else {
                    contentObj.value.style.height = '';
                    maskRangeObj.value.style.height = '';
                }*/

                //判斷基本字型大小
                const defualtSize = wrapWidth * (1 / 28);
                document.documentElement.style.fontSize = parseInt(defualtSize) + 'px';

                //計算content中間高度
                const headerH = document.getElementById('content_header').getBoundingClientRect().height;
                const footerH = document.getElementById('content_foot').getBoundingClientRect().height;
                const addFootPartH = document.getElementById('content_foot_play').getBoundingClientRect().height * 0.3;
                const contentH = contentObj.value.getBoundingClientRect().height;
                const contentMidH = parseInt(contentH - headerH - footerH + addFootPartH);
                contentMidObj.value.style.height = contentMidH + 'px';      //content高度
                // const contentMidObj 
                // const headerH = headerObj.value.getBoundingClientRect().height;
                // const footerH = footerObj.value.getBoundingClientRect().height;
                // const contentDiv = contentObj.value;
                // const contentH = parseInt(deviceHeight - headerH - footerH);  
                // contentDiv.style.height = contentH + 'px';      //content高度
            }

            if(idx == 1) {  //更改彈窗的高
                const fontSizeH = parseInt(document.documentElement.style.fontSize);
                const maskObj = maskRangeObj.value; 
                const popTopH = parseInt(maskObj.querySelector('.page_top').getBoundingClientRect().height);
                const popFotH = parseInt(maskObj.querySelector('.page_fot').getBoundingClientRect().height);
                const popMidH = parseInt(maskObj.getBoundingClientRect().height) - popTopH - popFotH;
                maskObj.querySelector('.page_mid').style.height = popMidH + 'px';
                if(popType.value == 1) {    //活動說明
                    const pageInfoH = popMidH + parseInt(popFotH * 0.3);
                    maskObj.querySelector('#page_info').style.height = pageInfoH + 'px';
                    maskObj.querySelector('#page_info').style.top = popTopH + 'px';
                    const pageMenuH = parseInt(maskObj.querySelector('#page_info').querySelector('.page_menu').getBoundingClientRect().height);
                    const pageInfoConH = pageInfoH - pageMenuH - fontSizeH;
                    maskObj.querySelector('#page_info').querySelector('.page_info_con').style.height = pageInfoConH + 'px';
                }
                if(popType.value == 2) {    //活動紀錄
                    const pageRecordH = popMidH + parseInt(popFotH * 0.7);
                    maskObj.querySelector('#page_record').style.height = pageRecordH + 'px';
                    maskObj.querySelector('#page_record').style.top = popTopH + 'px';
                    const pageNoticeH = parseInt(maskObj.querySelector('#page_record').querySelector('.page_notice').getBoundingClientRect().height);
                    const pageRecordConH = pageRecordH - pageNoticeH;
                    maskObj.querySelector('#page_record').querySelector('.page_record_con').style.height = pageRecordConH + 'px';
                }
                if(popType.value == 3) {    //任務拿武器
                    const pageTaskH = popMidH + parseInt(popFotH * 0.3);
                    maskObj.querySelector('#page_task').style.height = pageTaskH + 'px';
                    maskObj.querySelector('#page_task').style.top = popTopH + 'px';
                }
                if(popType.value == 4) {    //攻擊排行
                    const pageRankH = popMidH + parseInt(popFotH * 0.7);
                    maskObj.querySelector('#page_rank').style.height = pageRankH + 'px';
                    maskObj.querySelector('#page_rank').style.top = popTopH + 'px';
                    const selectH = parseInt(maskObj.querySelector('#page_rank').querySelector('.rank_select_wrap').getBoundingClientRect().height);
                    const selfInfoH = parseInt(maskObj.querySelector('#page_rank').querySelector('.rank_selfInfo').getBoundingClientRect().height);
                    const countdownH = parseInt(maskObj.querySelector('#page_rank').querySelector('.rank_countdown').getBoundingClientRect().height);
                    const rankListH = pageRankH - selectH - selfInfoH - countdownH + parseInt(selfInfoH * 0.25);
                    maskObj.querySelector('#page_rank').querySelector('.rank_list').style.height = rankListH + 'px';
                    maskObj.querySelector('#page_rank').querySelector('#listSpaceH').style.height = parseInt(selfInfoH * 0.1) + 'px';
                }
                if(popType.value == 5) {    //累儲送券
                    maskObj.querySelector('#page_store').style.height = popMidH + 'px';
                    maskObj.querySelector('#page_store').style.top = popTopH + 'px';
                    const storeHeaderH = parseInt(maskObj.querySelector('#page_store').querySelector('.store_header').getBoundingClientRect().height);
                    const storeListHeaderH = parseInt(maskObj.querySelector('#page_store').querySelector('.store_list_header').getBoundingClientRect().height);
                    const storeListFooterH = parseInt(maskObj.querySelector('#page_store').querySelector('.store_list_footer').getBoundingClientRect().height);
                    const storeListContentH = popMidH - storeHeaderH - storeListHeaderH - storeListFooterH + parseInt(storeListHeaderH * 0.15) + parseInt(storeListFooterH * 0.15);
                    maskObj.querySelector('#page_store').querySelector('.store_list_content').style.height = storeListContentH + 'px';
                    maskObj.querySelector('#page_store').querySelector('.store_list_content').style.top = `-${parseInt(storeListHeaderH) * 0.15}px`;
                }

                if(popType.value == 6) {    //雙週抽獎項
                    const pageLotteryH = popMidH + parseInt(popFotH * 0.3);
                    maskObj.querySelector('#page_lottery').style.height = pageLotteryH + 'px';
                    maskObj.querySelector('#page_lottery').style.top = popTopH + 'px';
                    const lotteryWeekHeaderH = parseInt(maskObj.querySelector('#page_lottery').querySelector('.lotteryWeekHeader').getBoundingClientRect().height);
                    const lotteryWeekContentH = pageLotteryH - lotteryWeekHeaderH - parseInt(fontSizeH / 2);
                    maskObj.querySelector('#page_lottery').querySelector('.lotteryWeekContent').style.height = lotteryWeekContentH + 'px';
                }
            }

            if(idx == 2) {  //更改訊息彈窗位置
                if(popMsgType.value == 3) { //獲獎彈窗
                    const getReward = getRewardObj.value;
                    const getRewardH = parseInt(getReward.getBoundingClientRect().height);
                    const getRewardTitleH = parseInt(getReward.querySelector('.getRewardTitle').getBoundingClientRect().height);
                    const getRewardBtnH = parseInt(getReward.querySelector('.getRewardBtn').getBoundingClientRect().height);
                    const getRewardContentH = getRewardH - getRewardTitleH - getRewardBtnH;
                    getReward.querySelector('.getRewardContent').style.maxHeight = `${getRewardContentH}px`;
                }
                if([4,5,6,7].includes(popMsgType.value)) {   //氣泡框訊息
                    const fontSizeH = parseInt(document.documentElement.style.fontSize);
                    const popMsgBox = popMsgBoxObj.value;
                    if(popMsgType.value == 4) {   //一鍵領取位置
                        const goStoreH = parseInt(popMsgBox.querySelector('.goStore').getBoundingClientRect().height);
                        const btnReceiveTop = parseInt(maskRangeObj.value.querySelector('#page_store').querySelector('.btnReceive').getBoundingClientRect().top)

                        const goStoreTop = btnReceiveTop - goStoreH - parseInt(fontSizeH * 0.7)
                        bubbleTop.value.goStore = `${goStoreTop}px`;
                    }

                    if(popMsgType.value == 5) {   //累儲訊息說明
                        const bubbleStoreInfoH = parseInt(popMsgBox.querySelector('.storeInfo').getBoundingClientRect().height);
                        const storeInfoTop = parseInt(maskRangeObj.value.querySelector('#page_store').querySelector('.store_info').getBoundingClientRect().top);

                        const bubbleStoreInfoTop = storeInfoTop + parseInt(bubbleStoreInfoH / 2);
                        bubbleTop.value.storeInfo = `${bubbleStoreInfoTop}px`;
                    }

                    if(popMsgType.value == 6) {   //持有武器券說明
                        const bubbleTicketH = parseInt(popMsgBox.querySelector('.ticketInfo').getBoundingClientRect().height);
                        const btnTicketInfoTop = parseInt(document.getElementById('content_foot_play').querySelector('.btn_ticket_info').getBoundingClientRect().top);

                        const bubbleTicketTop = btnTicketInfoTop - bubbleTicketH - parseInt(fontSizeH * 0.7);
                        bubbleTop.value.ticketInfo = `${bubbleTicketTop}px`;
                    }

                    if(popMsgType.value == 7) {   //Boss指定獎項說明
                        const bubblebossPrizeH = parseInt(popMsgBox.querySelector('.bossPrize').getBoundingClientRect().height);
                        const btnPrizeBoxTop = parseInt(document.getElementById('content_foot_top').querySelector('.prize_box').getBoundingClientRect().top);

                        const bubblebossPrizeTop = btnPrizeBoxTop - bubblebossPrizeH - parseInt(fontSizeH * 0.7);
                        bubbleTop.value.bossPrize = `${bubblebossPrizeTop}px`;

                        console.log('bubblebossPrizeH = ' + bubblebossPrizeH);
                        console.log('btnPrizeBoxTop = ' + btnPrizeBoxTop);
                    }
                }

            }

            /*if(idx == 1) {  //更改彈窗的高
                const wrapWidth = document.getElementById('wrapper').getBoundingClientRect().width;
                if(popType.value == 1) {    //活動說明
                    const infoObj = maskInfoObj.value;
                    const popContentH = parseInt(infoObj.querySelector('.popContent').getBoundingClientRect().height);
                    const navH = parseInt(infoObj.querySelector('.nav_menu').getBoundingClientRect().height);
                    const gapH = parseInt(infoObj.querySelector('.gapBox').getBoundingClientRect().height);
                    const pageContentH = popContentH - navH - gapH;
                    infoObj.querySelector('.pageContent').style.height = pageContentH + 'px';
                }
                
            }*/
        }


        return {isLoading, isFirstLoading, isWebPlat, platName, isClick, contentObj, contentMidObj, maskRangeObj, popMsgBoxObj, getRewardObj, pageInfoPos, pageInfoTab, selectRankTime, currentBoss, tenLottryFlag, tenBtnPos, attackCost, popType, popMsgType, popMsg, bubbleTop, bigPrizeFlag, attackHurt, getInfoData, btnClick, sizeDevice, popClose, closeMask, receiveBonus, goStore, removeClass, selectCost}
    }
}

var vm = Vue.createApp(forecast).mount('#wrapper');
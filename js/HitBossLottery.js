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
            selectRankTime = ref(0),                                //每日排行-時間選擇
            currentBoss = ref(0),                                   //當前的王，預設0
            tenLottryFlag = ref(false),                             //是否十連抽，預設false
            tenBtnPos = ref('57%'),                                 //十連抽移動位置
            attackCost = ref([1,10,100]),                           //攻擊使用的武器券
            getInfoData = ref({}),                                  //活動資訊API
            hitBossData = ref({}),                                  //武器攻擊API
            getRecordData = ref({}),                                //活動紀錄API
            getRankListData = ref({}),                              //每日排行API
            getStoredData = ref({}),                                //累儲送券API
            getEventDescData = ref({}),                             //活動說明API
            popType = ref(null),                                    //彈窗參數
            popMsgType = ref(null),                                 //訊息彈窗參數
            bubbleTop = ref({}),                                    //氣泡框位置
            bigPrizeFlag = ref(0),                                  //大獎演藝參數
            selectCost = ref(0),                                    //選擇要扣的武器券
            selectWeaponType = ref(0),                              //選擇要使用的武器類型
            weaponStyle = ref(null),                                //武器效果Style
            attackHurt = ref([]),                                   //傷害數值陣列顯示
            isAttackShow = ref(0),                                  //武器攻擊傷害王動畫，預設關0
            prizeGetList = ref([]),                                 //獎勵獲得陣列
            lotteryName = ref(['Sliver','Gold','Black']),           //抽獎券名稱
            firstOpenOrder = ref(0),                                //開啟活動頁時顯示順序
            countdown = ref({CloseTime:null,ts_EndDate:[]}),        //活動相關倒數時間存取
            rankPhaseList = ref([]),                                //每日排行檔期列表
            isReceiveGet = ref(false),                              //是否可一鍵領取
            isStoreEnd = ref(false),                                //是否儲值結束
            popMsg = ref({title:null,msg:null});                    //popMsg訊息內容

        const testFlag = ref(false);                                //測試用

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
                getInfo(PageMethods('getInfo'));    //活動資訊API
            } catch (e) {
                console.log(e);
            }
            
            sizeDevice();
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
                    document.getElementById('iframeTask').src = ''
                    if(getInfoData.value.TaskRed) {
                        getInfoData.value.TaskRed = false;
                    }
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
            
            if(oldValue == 1 && getInfoData.value.IsFirst) {
                getInfoData.value.IsFirst = 0;
                firstOpenOrder.value = 2;
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
            
            if(newValue == 3) {
                document.getElementById('maskMsgWrap').querySelector('.getRewardContent').scrollTop = 0
            }

            if(oldValue == 1 && getInfoData.value.EndTimeShow) {
                getInfoData.value.EndTimeShow = 0;
                firstOpenOrder.value = 3;
            }
            setTimeout(()=> {
                isClick.value = false;
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
            attackCost.value = []
            var times = 1;
            if(tenLottryFlag.value) {
                times = 10
            }
            getInfoData.value.BossList[newValue].WeaponList.forEach(item => {
                attackCost.value.push(item.NeedRaffle * times)
            })

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
                },1000)
            }
            if(newValue == 3) {
                setTimeout(()=> {
                    bigPrizeFlag.value = 4;
                },600)
            }
            if(newValue == 4) {
                setTimeout(()=> {
                    bigPrizeFlag.value = 5;
                },600)
            }
        })

        //偵測值-開啟活動頁時顯示順序
        watch(firstOpenOrder, (newValue, oldValue) => {
            switch(newValue) {
                case 1:             //判斷開啟活動說明
                    //是否首次登入活動頁
                    if (getInfoData.value.IsFirst) {
                        popType.value = 1;
                    } else  {
                        //不是首次就進入下一階段判斷是否拿券時間結束
                        firstOpenOrder.value = 2;
                    }
                    break;
                case 2:             //判斷是否拿券時間已結束
                    if (getInfoData.value.EndTime < 1) {
                        popMsg.value.msg = `押注、儲值拿券時間已結束，<br>請盡速使用武器券`;
                        popMsgType.value = 1;
                        getInfoData.value.EndTimeShow = 1;
                    } else {
                        firstOpenOrder.value = 3;
                    }
                    break;
                case 3:             //判斷是否當天第一次進入
                    //判斷是否當天第一次登入
                    if(getInfoData.value.IsFirstOpenEvent) {
                        bigPrizeFlag.value = 1;
                    }
                    break;
            }
        })

        //偵測值-判斷排行榜選擇日期
        watch(selectRankTime, (newValue,oldValue) => {
            if(popType.value == 4 && oldValue != 0) {
                isLoading.value = true;
                getRankListData.value.RankData = [];
                const apiData = {
                    EventID: getInfoData.value.EventID,
                    PhaseID: newValue.PhaseID
                }
                getRankList(PageMethods('getRankList',apiData));    //打每日排行API
            }
        })
        

        /*========================================================= API回傳 =========================================================*/
        //活動資訊
        function getInfo(receiveData) {
            var statusCode = resultCode(receiveData.ResultCode);
            if (statusCode == 1) {
                getInfoData.value = JSON.parse(receiveData.ResultData);

                


                //判斷是否當天第一次登入
                if(getInfoData.value.IsFirstOpenEvent) {
                    getInfoData.value.LotteryRed = true;
                    getInfoData.value.TaskRed = true;
                } else {
                    bigPrizeFlag.value = 5;
                }

                //判斷王是否有第二支-時間改成未開始
                if(getInfoData.value.BossList.length > 1) {
                    getInfoData.value.BossList[1].ts_EndDate = '--:--:--'
                }

                //每日排行檔期列表榜定
                if(getInfoData.value.PhaseDataList.length) {
                    selectRankTime.value = getInfoData.value.PhaseDataList[0];
                    rankPhaseList.value = getInfoData.value.PhaseDataList;
                }

                if(getInfoData.value.EndTime <= 0) {
                    isStoreEnd.value = true;
                }

                //判斷是否第一次打API
                if(isFirstLoading.value) {
                    try {
                        getEventDesc(PageMethods('getEventDesc'));    //活動資訊API
                    } catch (e) {
                        console.log(e);
                    }
                    isFirstLoading.value = false;
                    firstOpenOrder.value = 1;                   //判斷進入活動頁流程-說明
                    startWorker(getInfoData.value)              //活動倒數計時
                    countdown.value.ts_EndDate = [];
                    getInfoData.value.BossList.forEach((item,idx) => {
                        countdown.value.ts_EndDate.push(item.ts_EndDate);
                    })
                    if(getInfoData.value.BossList[0]) {
                        startWorkerBoss(getInfoData.value.BossList[0])  //當日Boss擊殺倒數時間
                        //BOSS受到傷害圖
                        createImage(getInfoData.value.BossList[0].BossHitPic);
                        //武器特效圖
                        getInfoData.value.BossList[0].WeaponList.forEach(item => {
                            const imgUrl = item.EffectPic;
                            createImage(imgUrl);
                        })
                        //大獎動畫圖
                        createImage(getInfoData.value.LotteryGif2);
                        //大獎動畫圖
                        createImage(getInfoData.value.LotteryGif1);
                    }
                    nextTick(()=>{
                        isLoading.value = 0;
                    })
                }

                
            }
        }

        //傷害抽獎
        function hitBoss(receiveData) {
            var statusCode = resultCode(receiveData.ResultCode);
            if (statusCode == 1) {
                hitBossData.value = JSON.parse(receiveData.ResultData);
                isLoading.value = false;
                if(hitBossData.value.HitBossData.HitPointData.length) {
                    isAttackShow.value = 1;
                    attackHurt.value = [];
                    prizeGetList.value = hitBossData.value.HitBossData.GiftData;
                    const hurtList = hitBossData.value.HitBossData.HitPointData;
                    setTimeout(()=> {
                        isAttackShow.value = 2;
                        hurtList.forEach((item,idx) =>{
                            const time = idx * 50
                            setTimeout(()=> {
                                attackHurt.value.push(item);
                                if(idx == (hurtList.length - 1)) {
                                    setTimeout(()=> {
                                        popMsgType.value = 3;
                                        attackHurt.value = [];
                                        isAttackShow.value = 0;
                                    },600)
                                }
                            },time)
                        })
                    },100)
                    
                } else {
                    popMsg.value.msg = `您的武器券不足`;
                    popMsgType.value = 1;
                }
            }
        }

        function getMemberHitBossRecord(receiveData) {  //活動紀錄API回傳
            var statusCode = resultCode(receiveData.ResultCode);
            if (statusCode == 1) {
                getRecordData.value = JSON.parse(receiveData.ResultData);
                nextTick(()=> {
                    isLoading.value = false;
                    popType.value = 2;
                })
            }
        }

        function getRankList(receiveData) {             //每日排行API回傳
            var statusCode = resultCode(receiveData.ResultCode);
            if (statusCode == 1) {
                getRankListData.value = JSON.parse(receiveData.ResultData).RankInfo;

                //判斷該檔期的時間小於等於0為過去檔期，則時間改成null當判斷
                if(getRankListData.value.ts_EndDate <= 0) {
                    getRankListData.value.ts_EndDate = null;
                }
                nextTick(()=> {
                    isLoading.value = false;
                    popType.value = 4;
                })
            }
        }

        function getStoredTaskList(receiveData) {             //累儲送券API回傳
            var statusCode = resultCode(receiveData.ResultCode);
            if (statusCode == 1) {
                getStoredData.value = JSON.parse(receiveData.ResultData);

                getStoredData.value.StoredList = [];
                const {TotalStored, VIP_Level} = getStoredData.value;
                getStoredData.value.StoredGoalList.forEach((item,idx, arr) => {
                    const obj = {};
                    //轉換萬字
                    if(item < 10000) {
                        obj.Amount = item.toLocaleString();
                    } else {
                        const unit = parseInt(item / 10000);
                        obj.Amount = unit.toLocaleString() + '萬'
                    }
                    //判斷進度條顯示
                    if(TotalStored > item) {
                        obj.Progress = '100%';
                    } else if(TotalStored == item) {
                        obj.Progress = '50%';
                    } else {
                        obj.Progress = '0%'; 
                        //判斷箭頭顯示
                        if(idx > 0 && TotalStored > arr[idx - 1]) {
                            obj.IsArror = 1;
                        }
                        if (idx == 0 && TotalStored) {  //第一門檻另外判定
                            obj.Progress = '5%';
                            obj.IsArror = 1;
                        }
                    }

                    getStoredData.value.StoredList.push(obj);
                })

                var scrollPos = -1;    //一開始進來的位置
                getStoredData.value.StoredTaskList.forEach(item => {
                    if(item.TypeID == 2 && VIP_Level < 3) { //判斷第二階未達金卡
                        item.IsLock = 1;
                    }
                    if(item.TypeID == 3 && VIP_Level < 5) { //判斷第三階未達鑽石卡
                        item.IsLock = 1;
                    }
                    
                    //判斷是否有可以領的券-一鍵領取顯示判斷用
                    if(!item.IsLock) {
                        item.StoredTaskDetail.forEach((list,listIdx) => {
                            if(list.ItemValue > 0 && list.CompleteType == 2) {
                                if(scrollPos == -1) {
                                    scrollPos = listIdx;
                                }
                                isReceiveGet.value = true;
                            }
                        })
                    }
                })

                if(!isReceiveGet.value) {
                    scrollPos = getStoredData.value.StoredGoalList.findIndex(item => item >= TotalStored);
                }
                

                nextTick(()=> {
                    isLoading.value = false;
                    popType.value = 5;
                    nextTick(()=> {
                        //判斷要移動的位置
                        if(scrollPos > 0) {
                            const storeListContent = maskRangeObj.value.querySelector('#page_store').querySelector('.store_list_content')
                            const listH = storeListContent.querySelector('.level_list').getBoundingClientRect().height;
                            storeListContent.scrollTo(0,listH * scrollPos);
                        }
                    })
                })
            }
        }


        function getEventDesc(receiveData) {    //活動說明API回傳
            var statusCode = resultCode(receiveData.ResultCode);
            if (statusCode == 1) {
                getEventDescData.value = JSON.parse(receiveData.ResultData);
                if(getEventDescData.value.EndDate) {
                    const storeEndDate = new Date(getEventDescData.value.EndDate)
                    getEventDescData.value.StoreEnd = (storeEndDate.getMonth() + 1 < 10 ? '0' + (storeEndDate.getMonth() + 1) : storeEndDate.getMonth() + 1) + '/' + (storeEndDate.getDate() < 10 ? '0' + storeEndDate.getDate() : storeEndDate.getDate()) + ' ' + storeEndDate.getHours() + ':' + storeEndDate.getMinutes()
                }
            }
        }


        function onError(error) {
            if (error != null) {
                console.log(error.get_message());
            }
            isClick.value = false;
            resultCode(0)
        }

        /*========================================================= 功能 =========================================================*/
        function resultCode(resultCode, type) {
            if (resultCode == 1) {
                return 1;
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
                        if(type) {
                            if(type == 'btnAttack') {
                                checkLottery(data)
                            } else {
                                if(type == 'popType') {
                                    switch(val) {
                                        case 2:
                                            getMemberHitBossRecord(PageMethods('getMemberHitBossRecord'));    //打紀錄API
                                            isLoading.value = true;
                                            return;
                                            break;
                                        case 4:
                                            selectRankTime.value = getInfoData.value.PhaseDataList[0];
                                            const apiData = {
                                                EventID: getInfoData.value.EventID,
                                                PhaseID: selectRankTime.value.PhaseID
                                            }
                                            getRankList(PageMethods('getRankList',apiData));    //打每日排行API
                                            isLoading.value = true;
                                            return;
                                            break;
                                        case 5:
                                            getStoredTaskList(PageMethods('getStoredTaskList'));    //累儲送券API
                                            isLoading.value = true;
                                            return;
                                            break;
                                    }
                                }
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
            if(getInfoData.value.FreeRaffle < attackCost.value[idx]) {
                popMsg.value.msg = `您的武器券不足`;
                popMsgType.value = 1;
                return;
            }

            const bossData = getInfoData.value.BossList[0];
            const weaponData = bossData.WeaponList[idx];
            selectCost.value = attackCost.value[idx];
            selectWeaponType.value = weaponData.WeaponType;
            weaponStyle.value = `background:url('${getInfoData.value.BossList[0].WeaponList[idx].EffectPic}') 500% 100% no-repeat`;

            getInfoData.value.FreeRaffle = getInfoData.value.FreeRaffle - selectCost.value;
            if(getInfoData.value.FreeRaffle < 0) {
                getInfoData.value.FreeRaffle = 0;
            }
            const apiData = {
                times: tenLottryFlag.value ? 10: 1,
                WeaponType: selectWeaponType.value
            }
            isLoading.value = true;
            try {
                hitBoss(PageMethods('hitBoss',apiData));    //活動資訊API
            } catch (e) {
                console.log(e);
            }
            
        }

        function receiveBonus(state, cardType, type, listIdx) {    //累儲送券領取獎勵
            const threshold = [1,3,5];
            if(type == -1) {    //一鍵領取判斷
                if(isReceiveGet.value) {    
                    //可領取
                    isLoading.value = true;
                } else {
                    //不可領取    
                    popMsgType.value = 4;
                }
            } else if(type == 0) {  //累儲上方卡別鎖頭
                if(cardType > 0) {
                    const diff = getStoredData.value.VIPGoalStoredList[cardType - 1];
                    popMsg.value.msg = `<h3>您的卡別未達此階級</h3>`;
                    popMsgType.value = 8;
                } else {
                    isClick.value = false;
                }
            } else if(type == 1) {  //累儲獎勵點擊
                if(isClick.value) return;
                isClick.value = true;
                if(state == 2) {    //可領取打領取API
                    isLoading.value = true;
                } else if(state == 0) { //無法領取
                    const card = threshold[cardType];
                    const diff = getStoredData.value.VIPGoalStoredList[cardType - 1];
                    if(getStoredData.value.StoredTaskList[cardType].IsLock) {
                        popMsg.value.msg = `<h3>您的卡別未達此階級</h3>`;
                    } else {
                        //判斷無鎖頭表示未達門檻
                        popMsg.value.msg = `<div>您的累積儲值額未滿 <strong class="color02">${getStoredData.value.StoredGoalList[listIdx].toLocaleString()}</strong> 元</div>請前往銀行消費累積`;
                    }
                    popMsgType.value = 8;
                } else {    //已領取
                    isClick.value = false;
                }
            }
        }

        function goStore() {    //前往儲值
            setTimeout(()=> {
                isClick.value = false;
            },500)
        }

        /*===== 倒數計時器-活動 =====*/
        function startWorker(data) {
            var worker;
            if (typeof (Worker) !== "undefined") {
                if (typeof (worker) != "undefined") {
                    worker.terminate();
                }
                worker = new Worker("js/worker.js");
                worker.postMessage(data.CloseTime);
                countdown.value.CloseTime = changeTimeFormat(data.CloseTime)
                worker.onmessage = function (event) {
                    if (event.data <= 0) {
                        worker.terminate();
                        location.reload();
                    } 
                    countdown.value.CloseTime = event.data

                };
            }
        }

        /*===== 倒數計時器-Boss =====*/
        function startWorkerBoss(data) {
            var worker;
            if (typeof (Worker) !== "undefined") {
                if (typeof (worker) != "undefined") {
                    worker.terminate();
                }
                worker = new Worker("js/worker.js");
                worker.postMessage(data.ts_EndDate);
                countdown.value.ts_EndDate[0] = changeTimeFormatII(data.ts_EndDate)
                worker.onmessage = function (event) {
                    if (event.data <= 0) {
                        worker.terminate();
                        location.reload();
                    } 
                    countdown.value.ts_EndDate[0] = event.data

                };
            }
        }

        /* 移除Class參數 */
        function removeClass(event, val, times) {
            if(event && event.target) {
                setTimeout(()=> {
                    event.target.classList.remove(val);
                },times)
            }
        }

        /* 預載建立圖片 */
        function createImage(url) {
            const img = new Image();
            img.src = url;
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
                
                if(wrapWidth * 1.6 > deviceHeight) {    //wrap寬*1.2大於裝置高時
                    wrapWidth = parseInt(deviceHeight / 1.6);
                }
                document.getElementById('wrapper').style.width = wrapWidth + 'px';  //更改wrap寬

                //判斷基本字型大小
                const defualtSize = wrapWidth * (1 / 28);
                document.documentElement.style.fontSize = parseInt(defualtSize) + 'px';

                //計算content中間高度
                if(document.getElementById('content_header')) {
                    const headerH = document.getElementById('content_header').getBoundingClientRect().height;
                    const footerH = document.getElementById('content_foot').getBoundingClientRect().height;
                    const addFootPartH = document.getElementById('content_foot_play').getBoundingClientRect().height * 0.3;
                    const contentH = contentObj.value.getBoundingClientRect().height;
                    const contentMidH = parseInt(contentH - headerH - footerH + addFootPartH);
                    contentMidObj.value.style.height = contentMidH + 'px';      //content高度
                }
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
                if(popType.value == 4) {    //每日排行
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
                    if(prizeGetList.value.length > 1) {
                        getReward.querySelector('.getRewardContent').style.height = `${getRewardContentH}px`;
                    } else {
                        getReward.querySelector('.getRewardContent').style.height = '';
                    }
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
                    }
                }

            }
        }


        return {isLoading, isFirstLoading, isWebPlat, platName, isClick, contentObj, contentMidObj, maskRangeObj, popMsgBoxObj, getRewardObj, pageInfoPos, pageInfoTab, selectRankTime, currentBoss, tenLottryFlag, tenBtnPos, attackCost, popType, popMsgType, popMsg, bubbleTop, bigPrizeFlag, weaponStyle, attackHurt, isAttackShow, prizeGetList, lotteryName, countdown, rankPhaseList, isReceiveGet, isStoreEnd, getInfoData, hitBossData, getRecordData, getRankListData, getStoredData, getEventDescData, btnClick, sizeDevice, popClose, closeMask, receiveBonus, goStore, removeClass, selectCost, testFlag}
    }
}

var vm = Vue.createApp(forecast).mount('#wrapper');

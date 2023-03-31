function PageMethods(type, data) {
    var receiveData = ''
    if(type == 'getInfo') {
        receiveData = {
            ResultCode: 1,
            ResultData: "{\"ResultCode\":0,\"EndTime\":780100,\"CloseTime\":801700,\"IsFirst\":false,\"IsFirstOpenEvent\":true,\"BossList\":[{\"StartDate\":\"2023/03/28\",\"EndDate\":\"2023/03/28\",\"BossName\":\"美女BOSS\",\"IsNow\":1,\"BossNormalPic\":\"images/temp/BOSS_2.jpg\",\"BossHitPic\":\"images/temp/BOSS_2_2.jpg\",\"ts_EndDate\":24099,\"ShowPrizePic\":\"images/temp/award_img.png\",\"WeaponList\":[{\"WeaponType\":1,\"NeedRaffle\":1,\"WeaponPic\":\"images/temp/attack_1.png\",\"WeaponName\":\"刀劍\",\"EffectPic\":\"images/temp/effect_1.png\"},{\"WeaponType\":2,\"NeedRaffle\":10,\"WeaponPic\":\"images/temp/attack_2.png\",\"WeaponName\":\"手槍\",\"EffectPic\":\"images/temp/effect_2.png\"},{\"WeaponType\":3,\"NeedRaffle\":100,\"WeaponPic\":\"images/temp/attack_3.png\",\"WeaponName\":\"砲彈\",\"EffectPic\":\"images/temp/effect_3.png\"}],\"BossBasePrizeList\":[{\"WeaponDesc\":\"手槍攻擊\",\"ItemName\":\"禮物*1\",\"ItemValue\":1},{\"WeaponDesc\":\"砲彈攻擊\",\"ItemName\":\"禮物*100\",\"ItemValue\":1}]},{\"StartDate\":\"2023/03/29\",\"EndDate\":\"2023/03/29\",\"BossName\":\"海盜船\",\"IsNow\":0,\"BossNormalPic\":\"images/temp/BOSS_3.jpg\",\"BossHitPic\":\"images/temp/BOSS_3_2.jpg\",\"ts_EndDate\":110499,\"ShowPrizePic\":\"images/temp/award_img.png\",\"WeaponList\":[{\"WeaponType\":1,\"NeedRaffle\":1,\"WeaponPic\":\"images/temp/attack_1.png\",\"WeaponName\":\"刀劍\",\"EffectPic\":\"images/temp/effect_1.png\"},{\"WeaponType\":2,\"NeedRaffle\":10,\"WeaponPic\":\"images/temp/attack_2.png\",\"WeaponName\":\"手槍\",\"EffectPic\":\"images/temp/effect_2.png\"},{\"WeaponType\":3,\"NeedRaffle\":100,\"WeaponPic\":\"images/temp/attack_3.png\",\"WeaponName\":\"砲彈\",\"EffectPic\":\"images/temp/effect_3.png\"}],\"BossBasePrizeList\":[{\"WeaponDesc\":\"手槍攻擊\",\"ItemName\":\"禮物*10\",\"ItemValue\":1},{\"WeaponDesc\":\"砲彈攻擊\",\"ItemName\":\"禮物*25\",\"ItemValue\":2}]}],\"Sliver\":77,\"Gold\":57,\"Black\":7,\"FreeRaffle\":9938,\"PhaseDataList\":[{\"PhaseID\":\"HB20230331_2\",\"StartDate\":\"04-01\"},{\"PhaseID\":\"HB20230331_1\",\"StartDate\":\"03-31\"}],\"EventID\":\"HB20230331\",\"StroedTaskFlag\":0,\"LotteryDate\":\"2023/04/18 18:30:00\",\"LotteryPicUrl\":\"images/temp/lottery.png\",\"LotteryGif1\":\"images/temp/g1.png\",\"LotteryGif2\":\"images/temp/g2.png\"}"
        }
    }
    if(type == 'getEventDesc') {
        receiveData = {
            "ResultCode": 1,
            "ResultData": "{\"StartDate\":\"2023/03/31 09:00:00\",\"EndDate\":\"2023/03/31 10:59:59\",\"CloseDate\":\"2023/03/31 12:59:59\",\"LotteryDate\":\"2023/03/31 13:05:00\",\"SetPrizeDate\":\"2023/04/01 18:00:00\",\"BossSchedule\":[{\"BossName\":\"美女BOSS\",\"BossDateString\":\"03/31\"}],\"DescPic\":\"images/temp/info.png\",\"BossPrizeDataForDesc\":[{\"BossName\":\"美女BOSS\",\"WeaponPrize\":[{\"WeaponDesc\":\"刀劍/1武器券\u003cbr/\u003e5~80傷害\",\"DesignatedPrizeData\":\"銀券x1\",\"RandomPrizeData\":\"兌換券x4\u003cbr/\u003e兌換券x8\u003cbr/\u003e3,000遊戲幣\"},{\"WeaponDesc\":\"手槍/10武器券\u003cbr/\u003e100~500傷害\",\"DesignatedPrizeData\":\"金券x1\u003cbr/\u003e遊戲幣x200\",\"RandomPrizeData\":\"100遊戲幣\u003cbr/\u003e400遊戲幣\u003cbr/\u003e15,000遊戲幣\"},{\"WeaponDesc\":\"砲彈/100武器券\u003cbr/\u003e1000~5000傷害\",\"DesignatedPrizeData\":\"鑽券x1\u003cbr/\u003e遊戲幣x2,000\",\"RandomPrizeData\":\"1,000遊戲幣\u003cbr/\u003e4,000遊戲幣\u003cbr/\u003e150,000遊戲幣\"}]}],\"LeaderboardPrizeData\":[{\"BossNameDesc\":\"全部\",\"LeaderboardPrizeDataDetail\":[{\"RowNo\":\"第1名\",\"PrizeDesc\":\"鑽券x10\u003cbr/\u003e1,000,000遊戲幣\"},{\"RowNo\":\"第2名\",\"PrizeDesc\":\"鑽券x8\u003cbr/\u003e800,000遊戲幣\"},{\"RowNo\":\"第3名\",\"PrizeDesc\":\"鑽券x6\u003cbr/\u003e500,000遊戲幣\"},{\"RowNo\":\"第4名\",\"PrizeDesc\":\"鑽券x4\u003cbr/\u003e300,000遊戲幣\"},{\"RowNo\":\"第5名\",\"PrizeDesc\":\"鑽券x2\u003cbr/\u003e200,000遊戲幣\"},{\"RowNo\":\"第6名\",\"PrizeDesc\":\"鑽券x1\u003cbr/\u003e100,000遊戲幣\"},{\"RowNo\":\"第7名\",\"PrizeDesc\":\"鑽券x1\u003cbr/\u003e80,000遊戲幣\"},{\"RowNo\":\"第8名\",\"PrizeDesc\":\"鑽券x1\u003cbr/\u003e50,000遊戲幣\"},{\"RowNo\":\"第9名\",\"PrizeDesc\":\"鑽券x1\u003cbr/\u003e30,000遊戲幣\"},{\"RowNo\":\"第10名\",\"PrizeDesc\":\"鑽券x2\u003cbr/\u003e10,000遊戲幣\"},{\"RowNo\":\"第11-50名\",\"PrizeDesc\":\"鑽券x1\"},{\"RowNo\":\"第51-100名\",\"PrizeDesc\":\"金券x3\"},{\"RowNo\":\"第101-500名\",\"PrizeDesc\":\"銀券x5\"}]}]}"
        }
    }

    if(type == 'hitBoss') {
        receiveData = {
            "ResultCode": 1,
            "ResultData": ""
        }

        if(data) {
            const times = data.times;
            const hitBossData = {HitBossData:{GiftData:[],HitPointData:[]}};
            const gift = {Gifts:[{GiftUrl: 'images/temp/gift.png',GiftDesc: '獎勵*1'}]}
            for(let i = 0; i < times; i++) {
                let num = 0;
                const hit = {}
                switch(data.WeaponType) {
                    case 1: //傷害10~100
                        num = Math.floor(Math.random()*91)+10
                        break;
                    case 2: //傷害100~1000
                        num = Math.floor(Math.random()*901)+100
                        break;
                    case 3: //傷害2000~3000
                        num = Math.floor(Math.random()*1001)+2000
                        break;
                }
                if(Math.random() < 0.1) {
                    num  = num * 1.5;
                    hit.IsEffects = 1;
                }
                hit.HitPoint = parseInt(num);

                hitBossData.HitBossData.GiftData.push(gift);
                hitBossData.HitBossData.HitPointData.push(hit);
            }

            receiveData.ResultData = JSON.stringify(hitBossData);
            
        }
    }

    if(type == 'getMemberHitBossRecord') {
        receiveData = {
        "ResultCode": 1,
        "ResultData": "{\"HitBossRecord\":[{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成62傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"3,000 遊戲幣\"}]},{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成71傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"3,000 遊戲幣\"}]},{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成53傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"3,000 遊戲幣\"}]},{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成27傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"3,000 遊戲幣\"}]},{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成53傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"3,000 遊戲幣\"}]},{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成29傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"3,000 遊戲幣\"}]},{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成69傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"3,000 遊戲幣\"}]},{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成17傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"4張 兌換券\"}]},{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成38傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"3,000 遊戲幣\"}]},{\"CreateDate\":\"2023/03/31 16:23:14\",\"recordDesc\":\"消耗1武器券使用刀劍\u003cbr\u003e攻擊 美女BOSS 造成17傷害\",\"Gifts\":[{\"GiftDesc\":\"1張 銀券\"},{\"GiftDesc\":\"4張 兌換券\"}]}]}"
    }
    }

    if(type == 'getRankList') {
        receiveData = {
            "ResultCode":1,
            "ResultData":""
        }

        let rankData = ''
        switch(data.PhaseID) {
            case 'HB20230331_1':
                rankData =  "{\"RankInfo\":{\"Current_Rowno\":\"500+\",\"Current_TotalHitPoint\":0,\"ts_EndDate\":0,\"RankData\":[{\"Rowno\":1,\"NickName\":\"玩家1號\",\"TotalHitPoint\":99,\"VIP_Level\":4,\"GiftDetail\":[{\"GiftDesc\":\"1,000,000遊戲幣\",\"GiftUrl\":\"images/temp/icon_coin.png\",\"ItemValue\":1},{\"GiftDesc\":\"鑽券x10\",\"GiftUrl\":\"images/temp/100_3.png\",\"ItemValue\":10}]}]}}"
                break;
            case 'HB20230331_2':
                rankData =  "{\"RankInfo\":{\"Current_Rowno\":\"500+\",\"Current_TotalHitPoint\":0,\"ts_EndDate\":24099,\"RankData\":[{\"Rowno\":1,\"NickName\":\"玩家1號\",\"TotalHitPoint\":2688,\"VIP_Level\":4,\"GiftDetail\":[{\"GiftDesc\":\"1,000,000遊戲幣\",\"GiftUrl\":\"images/temp/icon_coin.png\",\"ItemValue\":1},{\"GiftDesc\":\"鑽券x10\",\"GiftUrl\":\"images/temp/100_3.png\",\"ItemValue\":10}]},{\"Rowno\":2,\"NickName\":\"玩家2號\",\"TotalHitPoint\":999,\"VIP_Level\":4,\"GiftDetail\":[{\"GiftDesc\":\"1,000,000遊戲幣\",\"GiftUrl\":\"images/temp/icon_coin.png\",\"ItemValue\":1},{\"GiftDesc\":\"鑽券x10\",\"GiftUrl\":\"images/temp/100_3.png\",\"ItemValue\":10}]},{\"Rowno\":3,\"NickName\":\"玩家3號\",\"TotalHitPoint\":888,\"VIP_Level\":4,\"GiftDetail\":[{\"GiftDesc\":\"1,000,000遊戲幣\",\"GiftUrl\":\"images/temp/icon_coin.png\",\"ItemValue\":1},{\"GiftDesc\":\"鑽券x10\",\"GiftUrl\":\"images/temp/100_3.png\",\"ItemValue\":10}]},{\"Rowno\":4,\"NickName\":\"玩家4號\",\"TotalHitPoint\":50,\"VIP_Level\":4,\"GiftDetail\":[{\"GiftDesc\":\"1,000,000遊戲幣\",\"GiftUrl\":\"images/temp/icon_coin.png\",\"ItemValue\":1},{\"GiftDesc\":\"鑽券x10\",\"GiftUrl\":\"images/temp/100_3.png\",\"ItemValue\":10}]}]}}"
                break;
        }

        receiveData.ResultData = rankData;
    }

    if(type == 'getStoredTaskList') {
        receiveData =  {
            "ResultCode": 1,
            "ResultData": "{\"StoredGoalList\":[50,100,200,300,400,500,600,700,800,900,1000,1500,2000,2500,3000,4000,7000,10000,20000,30000,40000,50000,60000,80000,100000,300000,500000,800000,1000000,2000000],\"StoredTaskList\":[{\"TypeID\":1,\"StoredTaskDetail\":[{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":5,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_1.png\",\"CompleteType\":0}]},{\"TypeID\":2,\"StoredTaskDetail\":[{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0},{\"ItemValue\":0,\"ItemPicUrl\":\"images/temp/100_2.png\",\"CompleteType\":0}]},{\"TypeID\":3,\"StoredTaskDetail\":[{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":1,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":2,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":3,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":4,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":10,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0},{\"ItemValue\":10,\"ItemPicUrl\":\"images/temp/100_3.png\",\"CompleteType\":0}]}],\"VIP_Level\":4,\"TotalStored\":0.0,\"StoredEndDate\":\"03/31 18:59\",\"VIPGoalStoredList\":[0,0]}"
        }
    }

    return receiveData;
}
// index.js
let interstitialAd = null
Page({
    data:{
        red_score: 0,
        blue_score: 0,
        time:720,
        time_str:'12:00',
        stop:false,
        time_interval_id:null,
        img_src:'../images/start.png'
    },

    restart:function(){
        let that = this;
        clearInterval(that.data.time_interval_id);
        that.setData({
            img_src: '../images/start.png',
            time:720,
            stop:false,
            time_str:'12:00'
        });
    },

    clear_score:function(){
        let that = this;
        that.setData({
            red_score: 0,
            blue_score: 0
        });
    },
    //倒计时
    countdown:function(){
        var myDate = new Date();
        // console.log(myDate.getSeconds());
        let that = this;
        if(that.data.stop == true){
            that.setData({
                img_src: '../images/start.png',
                stop:false
            });
            clearInterval(that.data.time_interval_id);
            return ;
        }else{
            that.setData({
                img_src: '../images/stop.png',
                stop:true
            });
        }
        clearInterval(that.data.time_interval_id);
        that.setData({
            time_interval_id: setInterval(function(){
                let t = that.data.time - 1;
                if(t === 0){
                    that.setData({
                        time_str: '00:00'
                    });
                    clearInterval(that.data.time);
                    return ;
                }else{
                    let minute = parseInt(t / 60), second = t % 60, t_str = '';
                    //console.log(t);
                    if(minute < 10) t_str += '0' + minute;
                    else t_str += minute;
                    t_str += ':'
                    if(second < 10) t_str += '0' + second;
                    else t_str += second;
    
                    that.setData({
                        time_str: t_str,
                        time: t
                    });
                }
            }, 1000)
        })
        
    },

    addpoint:function(event){
        // console.log(event.currentTarget.dataset.team)
        // console.log(event.currentTarget.dataset.point) //测试成功
        let that = this;
        if(event.currentTarget.dataset.team === 'red'){
            that.setData({
                red_score: that.data.red_score + parseInt(event.currentTarget.dataset.point)
            })
            //red_score += parseInt(event.currentTarget.dataset.point);
        }else{
            that.setData({
                blue_score: that.data.blue_score + parseInt(event.currentTarget.dataset.point)
            })
        }
        // console.log(this.data.red_score + " ---- " + this.data.blue_score);
    },
    onLoad() {
        if(wx.createInterstitialAd){
          interstitialAd = wx.createInterstitialAd({ adUnitId: 'adunit-a23a89737b3dbd87' })
          interstitialAd.onLoad(() => {
            console.log('onLoad event emit')
          })
          interstitialAd.onError((err) => {
            console.log('onError event emit', err)
          })
          interstitialAd.onClose((res) => {
            console.log('onClose event emit', res)
          })
          interstitialAd.show().catch((err) => {
            console.error(err)
          })
        }
      }
      
})

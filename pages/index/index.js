//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    shakeDir: false,
    motto: '饿了！受不了',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'), 
    gotLocation: app.globalData.gotLocation,
    shakeSoundUrl: "https://yaochima.shanghaiwogeng.com/yaochima" + (Math.floor(Math.random() * 8) + 1) + ".mp3"
  },

  clickCat: function () {
    this.setData({
      shakeDir: true
    })
  },

  onLoad: function(options) {
  },

  listenerBtnGetLocation: function () {
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res)
        app.globalData.lat = latitude
        app.globalData.lng = longitude
      }
    })
    app.globalData.gotLocation = true;
    this.bindLocation();
  },

  bindLocation: function() {
    this.setData({
      gotLocation: app.globalData.gotLocation
    });
  },

  onLoad: function() {
    this.bindLocation();
    this.registerShake();
  },

  onShow: function() {
    this.bindLocation();
    this.registerShake();
  },

  registerShake: function() {
    let that = this;
    app.globalData.shakeManager.register(this, {
      allow: function() {
        return app.globalData.gotLocation
      },
      success: function (args) {
        // when shaked
        // console.log("Shaked!")
        that.GetRestaurantShake(args.done);
      }
    });
  },

  onUnload: function() {
    console.log("STOP SHAKE");
    app.globalData.shakeManager.unregister(this);
  },

  GetRestaurantShake: function (successCallback) {
    this.GoToRestaurant({
      success: function (res) {
        successCallback();
        console.log('success')
      }
    })
  },
    
  GoToRestaurant: function() {
    const that = this
    console.log('GoToRestaurant called');
    console.log(app.globalData);
    wx.request({
      url: 'https://yaochima.shanghaiwogeng.com/api/v1/shakes',
      method: 'post',
      data: {
        "lat": app.globalData.lat.toString(),
        "lng": app.globalData.lng.toString(),
        "exclusions": [],
        "rest_exclusions": []
        // 'uuid': app.globalData.uuid
      },
      success: function (res) {
        // console.log(res)
        // console.log("Patch success")
        // res.data = '1';
        console.log(res.data)
        console.log(app.globalData.lat.toString())
        console.log(app.globalData.lng.toString())
        if (res.data.status == "ok") {
          wx.navigateTo({
            url: "../restaurants/restaurant?id=" + res.data.restaurants.id
          })
          this.shakeSound = wx.createInnerAudioContext()
          console.log("AUDIO")
          console.log(that.data.shakeSoundUrl)
          this.shakeSound.src = that.data.shakeSoundUrl
          this.shakeSound.play()
          that.setData({
            shakeSoundUrl: "https://yaochima.shanghaiwogeng.com/yaochima" + (Math.floor(Math.random() * 8) + 1) + ".mp3"
          })
          console.log("res")
          console.log(res.data)
        } else if (res.data.status == "error") {
          wx.showModal({
            title: '哎哟妈呀',
            content: "附近没有餐厅，要不您换个地儿试试？",
            confirmText: "Ok",
            showCancel: false,
            success: function (res) {
              console.log('success modal')
            }
          })
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
  }
})
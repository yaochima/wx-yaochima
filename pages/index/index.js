//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: '饿了！受不了',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gotLocation: false,
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
    this.setData ({
      gotLocation: true,
    })
  },

  onLoad: function() {
    let that = this;
    app.globalData.shakeManager.register(this, function (args) {
      // when shaked
      // console.log("Shaked!")
      that.GetRestaurantShake(args.done);

    });
  },

  onUnload: function() {
    console.log("STOP SHAKE");
    app.globalData.shakeManager.unregister(this);
  },

  GetRestaurantShake: function (successCallback) {
    if (this.data.gotLocation == false){
      wx.showModal({
        title: 'We Need Your Location',
        content: 'to find places to eat near you!',
        confirmText: "Ok",
        showCancel: false,
        success: function (res) {
          console.log('success modal')
          

        }
      })
    } 
    else {
      
      this.GoToRestaurant ({
        success: function (res) {
          successCallback();
          console.log('success')
      }
      })
    }
  },
    
  GoToRestaurant: function() {
    console.log('GoToRestaurant called');
    console.log(app.globalData);
    wx.request({
      url: 'https://yaochima.shanghaiwogeng.com/api/v1/shakes',
      method: 'post',
      data: {
        "lat": app.globalData.lat.toString(),
        "lng": app.globalData.lng.toString(),
        "exclusions": []
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
          this.shakeSound = wx.createAudioContext("shakeSound")
          console.log("HAHAH")
          this.shakeSound.play()
          console.log("res")
          console.log(res.data)
        } else if (res.data.status == "error") {
          wx.showModal({
            title: 'Whoops!',
            content: "No restaurants near you: shake again!",
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
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '饿了！受不了',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
        // wx.setStorageSync('lat', latitude)
        // wx.setStorageSync('lng', longitude)
        console.log(res)
        app.globalData.lat = latitude
        app.globalData.lng = longitude
      }
    })
  },

  listenerBtnGetShake: function () {
    wx.request({
      url: 'https://yaochima.herokuapp.com/api/v1/shakes',
      method: 'post',
      data: {
        "lat": app.globalData.lat.toString(),
        "lng": app.globalData.lng.toString(),
        "exclusions": "[]"
        // 'uuid': app.globalData.uuid
      },
      success: function (res) {
        console.log(res)
        console.log("Patch success")
        console.log(res.data)
        console.log(app.globalData.lat.toString())
        console.log(app.globalData.lng.toString())
        wx.navigateTo({
          url: "../restaurants/restaurant?id=" + res.data
        })
        // this.setData({
        //   app.globalData.restaurantID: res
        // })
        console.log("res")
        console.log(res)
      }
    })
  }

    // viewRestaurant: function(e) {
    //   let data = e.currentRestaurant.dataset;
    //     wx.navigateTo({
    //     url: "../restaurants/restaurant"
    //     })
    // },
})
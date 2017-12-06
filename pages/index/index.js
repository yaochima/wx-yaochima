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

  wx.request({
    url: 'https://yaochima.herokuapp.com/api/v1/shakes',
      method: 'post',
      data: {
          "latitude": latitude,
          "longitude": longitude,
          "uuid" :uuid
      },
      success: function(res) {
      console.log(res)
      console.log("Patch success")
            console.log(res.data)
      }
    })
  // onPullDownRefresh: function () {
  //   wx.stopPullDownRefresh()
  // },
})
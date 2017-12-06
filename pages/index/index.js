//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
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
        console.log(res)
      }
    })
  }
  
})
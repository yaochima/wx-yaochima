//app.js
const shake = require('util/shake');

App({
  globalData: {
    uuid: null,
    auth_token: null, 
    lat: null,
    lng: null, 
    restaurantUrl: 'https://yaochima.herokuapp.com/api/v1/restaurants/',
    restaurantID: null, 
    guestUrl: 'https://yaochima.herokuapp.com/api/v1/guests',
    guestId: null,
    shakeManager: shake();
  },

  onLaunch: function() {
    this.ensureUUID();
    this.signInAsGuest();
  },

  signInAsGuest: function () {
    console.log("HELLO!")
    const uuid = this.globalData.uuid
    console.log(uuid)
    wx.request({
      url: 'https://yaochima.herokuapp.com/api/v1/guests',
      method: 'post',
      data: {
        'uuid': uuid
      },
      success: function(res) {
      console.log(res)
      console.log("Patch success")
            console.log(res.data)
      }
    })
  },

  ensureUUID: function() {
    const that = this
    // 展示本地存储能力
    const userUuid = wx.getStorageSync('uuid') || ""
    if (userUuid === "") {
      that.globalData.uuid = that.createUUID()
      wx.setStorageSync('uuid', that.globalData.uuid)
    } else {
      that.globalData.uuid = userUuid
    }
  },

  createUUID: function () {
    let s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    const uuid = s.join("");

    return uuid;
  } 
})  



  
    // wx.checkSession interface test whether the current user login status is valid.
    // wx.checkSession({
    //   success: function () {    //登录态未过期
    //   },
    //   fail: function () {    //登录态过期
    //     wx.login()
    //   }
    // })

    // 登录 Log in
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息 Get User Details 
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  
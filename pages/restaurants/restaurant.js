// pages/restaurants/restaurant.js
Page({

  toggleType: function (event) {
    // console.log(event)
    this.setData({
      typeLocked: !this.data.typeLocked
    });
  },

  togglePrice: function (event) {
    // console.log(event)
    this.setData({
      priceLocked: !this.data.priceLocked
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    typeLocked: false,
    priceLocked: false,
    restaurant: {
      name: 'haha'
    },
    name: 'nnname',
    price: 'ppprice', 
    type: 'tttttype',
}, 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },
  
  loadData: function () {
    wx.request ({
      url: 'https://yaochima.herokuapp.com/api/v1/restaurants/1',
      method: 'get',
      header: { },
      success: function (res) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
   
  }

})
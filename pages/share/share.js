// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restaurantId: null
  },
  onLoad: function (options) {
    console.log(options)
    console.log("restaurantoptions")
    console.log(options.id)
    this.setData({
      restaurantId: Number(options.id)
      // Number(options.id)
    });
    this.loadRestaurantData()

  },

  loadRestaurantData: function () {
    let restaurantId = this.data.restaurantId;
    console.log(restaurantId)
    wx.request({
      // url: 'https://yaochima.herokuapp.com/api/v1/restaurants/1',
      url: "https://yaochima.shanghaiwogeng.com/api/v1/restaurants/" + restaurantId,
      method: 'get',
      header: {},
      success: (res) => {
        console.log('successful!')
        console.log(res)
        console.log()
        this.setData({
          name: res.data.name,
          category: res.data.category,
          mainPhoto: res.data.profile_photo,
          rating: res.data.rating,
          price: res.data.price_per_person,
          phone: res.data.phone_number,
          address: res.data.address,
          currentCategory: res.data.category,
          currentPrice: res.data.price_per_person
        });
        
      },
    })
  },

  errorMessageToast: function () {
    wx.showToast({
      title: errorMessage,
      icon: 'loading',
      duration: 1500
    });
  },

  openMiniProgram: function (event) {
    console.log(event)
    wx.navigateToMiniProgram({
      appId: 'wx072e01448e574e63',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */


  

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
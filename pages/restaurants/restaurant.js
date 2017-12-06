// pages/restaurants/restaurant.js
Page({
  toggleType: function (event) {
    // console.log(event)
    this.setData({
      typeLocked: !this.data.typeLocked
    });
    console.log(this.data.typeLocked);
    // wx.setStorage({
    //   key: "toggleType",
    //   data: {
    //     typeLocked: this.data.typeLocked,
    //   }
    // })
  },

  togglePrice: function (event) {
    // console.log(event)
    this.setData({
      priceLocked: !this.data.priceLocked
    })
    console.log(this.data.priceLocked);
    // wx.setStorage({
    //   key: "togglePrice",
    //   data: {
    //     priceLocked: this.data.priceLocked,
    //   }
    // })
  },
  /**
   * 页面的初始数据
   */
  data: {
    typeLocked: false,
    priceLocked: false,
    currentType: null, 
    currentPrice: null,
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
      // url: app.globalData.restaurantUrl + '1',
      // 'app.globalData.restaurantId',
      method: 'get',
      header: { },
      success:  (res) => {
        console.log(res.data),
        this.setData({
          name: res.data.name,
          type: res.data.category,
          mainPhoto: res.data.profile_photo, 
          rating: res.rating, 
          price: res.data.price_range, 
          phone: res.data.phone_number, 
          address: res.data.address,
          currentType: res.data.category,
          currentPrice: res.data.price_range 
        });  
        
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
// petPackage/pages/petArr/petArr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pet:{},
    arriveDate:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pet = JSON.parse(options.pet)
    // console.log(JSON.parse(options.pet),111111);
    this.setData({
      pet
    })
  },
  // 时间输入值
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let {pet} = this.data
    let {value} = e.detail
    pet.arriveDate=value 
    this.setData({
      arriveDate: value
    })
  },
// 处理跳转下一步
handleNext(){
  wx.navigateTo({
    url: `/petPackage/pages/petWeight/petWeight?pet=${JSON.stringify(this.data.pet)}`,
  });
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
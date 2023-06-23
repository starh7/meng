// petPackage/pages/petType/petType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    pet:{},
    cat:"猫猫"

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
  // 处理跳转下一步
  handleNext(){
    wx.navigateTo({
      url: `/petPackage/pages/petBreed/petBreed?pet=${JSON.stringify(this.data.pet)}`,
    });
  },
// 选择类型
selecteType(e){
let {type} = e.currentTarget.dataset
// console.log(type);
let {pet} = this.data
pet.type = type
this.setData({
  type,
  pet
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
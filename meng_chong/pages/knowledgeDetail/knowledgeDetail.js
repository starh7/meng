import { request } from "../../utils/request"

// pages/knowledgeDetail/knowledgeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    contentList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      id: options.id
    })
    this.getContent(this.data.id)
  },
    
  
  // 获取content数据
  async getContent(id) {
    let result = await request({ url: '/content', method: "GET", data: { id } })
    // console.log(result, '111');
    this.setData({
      contentList: result.data
    })
    wx.setNavigationBarTitle({
      title: this.data.contentList.name
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
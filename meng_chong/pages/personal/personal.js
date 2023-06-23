// pages/personal/personal.js
import {request} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allIn:[],
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPet()

  },
  // 获取用户信息
  getUserInfo(){
    let that = this
    wx.getUserProfile({
      desc: '获取用户信息', 
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  async getPet() {
    const result = await request({ url: "/pet", method: "GET" })
    console.log(result.data,'dddddd');
    // console.log(this.handleTime(result.data[0].birth));
    let {allIn} = this.data
    // allIn["宠物"] = result.data.length
    allIn.push({"name":"宠物","num":result.data.length})
    let rel = 0
    let rml = 0
    result.data.forEach(item => {
      rel += item.recordList.length
      rml += item.remindList.length
    })
    // allIn["记录"] = rel
     // allIn["提醒"] = rml
    allIn.push({"name":"记录","num":rel})
    allIn.push({"name":"提醒","num":rml})
    this.setData({
      allIn
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
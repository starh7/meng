// pages/editor/editor.js
import { request } from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    icon:[],
    big:[],
    small:[],
    remind:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIcon(),
    this.getRemindIcon()
  },
   // 跳转提醒编辑页面
   goRemind(e){
    let {name} = e.currentTarget.dataset
    // console.log(name);
    wx.navigateTo({
      url: `/pages/remind/remind?name=${name}`,
    });
  },
  // 跳转记录编辑页面
  goRecord(e){
    let {name} = e.currentTarget.dataset
    // console.log(name);
    wx.navigateTo({
      url: `/pages/record/record?name=${name}`,
    });
  },
  // 获取记录提醒图标
  async getRemindIcon(){
    let result = await request({url:"/remindIcon",method:"GET",data:{remind:"remind"}})
    this.setData({
      remind:result.data,
    })
  },
  // 获取记录图标
  async getIcon(){
    let result = await request({url:"/recordIcon",method:"GET",data:{record:"record"}})
    this.setData({
      icon:result.data,
      big:result.data.slice(0,2),
      small:result.data.slice(2),

    })
  },
// 改变显示
handleChange(e){
  let {active} = e.currentTarget.dataset
  this.setData({
    active
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
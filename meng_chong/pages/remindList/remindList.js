// pages/remindList/remindList.js
import {request} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remindList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRemindList()
  },
  // 获取提醒列表
  async getRemindList(){
    let result = await request({url:"/remind",method:"GET"})
    // console.log(result);
      // let result1 = await request({url:"/one",method:"GET",data:{id:result.data.petId}})
      //  console.log(result1);
    
    this.setData({
      remindList:result.data
    })
  },
// 删除提醒
  deletRemind(e){
    let { id } = e.currentTarget.dataset
    let that = this
    wx.showModal({
      title: '你确认要删除这条提醒吗',
      // content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let result = request({url:"/deleteRemind",method:"GET",data:{id}})
          that.onReady()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
    this.getRemindList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");

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
// pages/myPet/myPet.js
import { request } from "../../utils/request"
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pet: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPet()
  },
  // 显示删除模态框
  showModal(e) {
    let that = this
    let {id} = e.currentTarget.dataset
    wx.showModal({
      title: '温馨提示',
      content: '删除时会同时删除该宠物的所有记录，不可恢复，确认删除吗？',
      async success(res) {
        if (res.confirm) {
         let result = await request({url:"/delete",method:"GET",data:{id}}) 
         that.onReady()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 添加宠物
  addPet() {
    wx.navigateTo({
      url: '/petPackage/pages/petName/petName'
    })
  },
  // 获取宠物信息
  async getPet() {
    let result = await request({ url: "/pet" })
    this.setData({
      pet: result.data
    })
  },
  // 跳转到id卡编辑页
  goIdInfo(e) {
    let { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/idinfo/idinfo?id=${id}`,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPet()
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
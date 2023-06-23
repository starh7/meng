import { request } from "../../utils/request"


// pages/searchList/searchList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    searchList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.key);
    this.setData({
      key:options.key
    })
    this.getSearchList(this.data.key)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 搜索
  goDetail(){
    let {searchVal} = this.data
    // console.log(searchVal);
    this.getSearchList(searchVal)
  },
  handleClear(e){
    // let {value} = e.detail
      this.setData({
        searchVal:""
      })
  },
  // 处理搜索词汇
  handelSearch(e){
    // console.log(e.detail.value);
    let {value} = e.detail
      this.setData({
        searchVal:value
      })
  },
  // 点击列表到详情页面
  goContentDetail(e){
    // console.log(e);
    let {id} = e.currentTarget.dataset
    wx.navigateTo({
      url:`/pages/knowledgeDetail/knowledgeDetail?id=${id}`
    })
  },
// 获取关键词搜索列表
async getSearchList(key){
let result = await request({url:"/search",method:"GET",data:{q:key}})
// console.log(result);
this.setData({
  searchList:result.data
})
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.goDetail()
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
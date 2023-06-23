import { request } from "../../utils/request"

// pages/hospital/hospital.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    knowledgeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转搜索页面
  goSearch(){
    wx.navigateTo({
      url:"/pages/search/search"
    })
  },
  // 切换tab栏
  handleTab(e) {
    let { index } = e.currentTarget.dataset
    console.log(e);
    this.setData({
      tabIndex: index
    })
  },
  // 去到内容的详情页
  goDetail(e){
    /* wx.navigateTo({
      url:'/pages/knowledgeDetail/knowledgeDetail?id=index'
    }) */
    let {index} = e.currentTarget.dataset
    // console.log(index);
    // console.log(e.currentTarget.dataset.index);
    wx.navigateTo({
      // url: '/pages/knowledgeDetail/knowledgeDetail?id='+index,
      url: `/pages/knowledgeDetail/knowledgeDetail?id=${index+1}`,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  // 获取科普文章数据
  async getKnowledgeList(){
    let result = await request({url:"/list",method:"GET"})
    this.setData({
      knowledgeList:result.data
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getKnowledgeList()
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
// pages/search/search.js
import {request} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList:[],
    searchVal:'',
    historySearch:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotSearch()
    this.setData({
      historySearch:wx.getStorageSync("historySearch")||[]
    })
  },
  // 处理热门搜索中的item到具体搜索页面
  handleTap(e){
    console.log(e);
    let {name} = e.currentTarget.dataset
    let {historySearch} = this.data
    historySearch.push(name)
      historySearch = Array.from(new Set(historySearch))
      this.setData({
        historySearch
      })
    wx.navigateTo({
      url:`/pages/searchList/searchList?key=${name}`
    })
  },
  // 清除所有历史搜索记录
  handleClearAll(){
    let that = this
    wx.showModal({
      title: '确认删除全部历史记录？',
      // content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          that.setData({
            historySearch:[]
          })
          wx.setStorageSync("historySearch",this.data.historySearch)
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  // 点击×清空搜索框
  handleClear(e){
    // let {value} = e.detail
      this.setData({
        searchVal:""
      })
  },
  // 搜索时处理的事件
  goDetail(){
    let {searchVal,historySearch} = this.data
    if(searchVal.trim()){
      historySearch.push(searchVal)
      historySearch = Array.from(new Set(historySearch))
    this.setData({
      historySearch
    })
    wx.setStorageSync('historySearch',this.data.historySearch )
    }
    // 去新的搜索列表
    wx.navigateTo({
      url:`/pages/searchList/searchList?key=${this.data.searchVal}`
    })
    
    // console.log(this.data.historySearch);
    /* wx.setStorageSync({
      key:"historySearch",
      data:this.data.historySearch
    }) */
    
    // wx.removeStorageSync('historySearch')
  },
  // 处理搜索词汇
  handelSearch(e){
    // console.log(e.detail.value);
    let {value} = e.detail
      this.setData({
        searchVal:value
      })
  },
// 获取热门搜索词
async getHotSearch(){
let result = await request({url:"/hot",method:"GET"})
this.setData({
  hotList: result.data
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
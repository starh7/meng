// pages/breed/breed.js
import {request} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal:'',
    type:'猫猫',
    serachList:[],
    BreedList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 处理搜索
  handelSearch(e){
    let {value} = e.detail

    this.setData({
      searchVal:value,
    })
    // console.log(value);

  },
  // 获取搜索列表
  async getSearchList(){
    let result = await request({url:'/breedSearch',method:"GET",data:{type:this.data.type,q:this.data.searchVal}})
    this.setData({
      serachList:result.data
    })
  },
  // 获取种类展示列表
  async getBreedList(){
    let result = await request({url:'/breed',method:"GET",data:{type:this.data.type}})
    this.setData({
      BreedList:result.data
    })
  },
  // 清空搜索框
  handleClear(e){
    // let {value} = e.detail
      this.setData({
        searchVal:""
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
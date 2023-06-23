// pages/idinfo/idinfo.js
import { request } from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    pet: {},
    record: [],
    type: [],
    // 第一行类型
    first: [],
    second: [],
    third: [],
    fouth: [],
    time: {},
    birth:{},
    // 导航条数据
    statusBarHeight: 0,
    navheight: 0,
    pagetop: 0,
    scrollTop: 0,
    numop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 导航条数据
    this.setData({
      // 状态栏的高度
      statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'] + 'px',
      // 胶囊的高度 也就是自定导航栏的高度
      navheight: wx.getMenuButtonBoundingClientRect()['height'] + 'px',
      // 状态栏加导航栏的高度 加上下的padding的高度 12
      pagetop: wx.getMenuButtonBoundingClientRect()['height'] + wx.getSystemInfoSync()['statusBarHeight'] + 12 + 'px',
    })

    console.log(options.id)
    this.setData({
      id: options.id
    })
    this.getPetInfo(this.data.id)
    // this.handleTime()
    this.getRecord()
    this.getRecordType()
  },
  // 获取记录的类型
  async getRecordType() {
    let result = await request({ url: "/recordIcon", method: "GET", data: { record: "record" } })
    this.setData({
      type: result.data,
      first: result.data.slice(0, 2),
      second: result.data.slice(2, 6),
      third: result.data.slice(6, 14),
      fouth: result.data.slice(14),
    })
  },
  // 获取记录
  async getRecord() {
    let result = await request({ url: "/petIdRecord", method: "GET", data: { id: this.data.id } })
    result.data.forEach(element => {
      // console.log(element.recordType);
      // let type = element.recordType
      this.data.time[element.recordType] = this.handlePassTime(element.recordTime)
    });
    this.setData({
      record: result.data,
      time: this.data.time
    })
  },
  // 计算过去的时间
  handlePassTime(time) {
    // let time = '2023-03-14'
    var new_date = new Date(); //新建一个日期对象，默认现在的时间
    var old_date = new Date(time); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期
    var difftime = (new_date - old_date) / 1000; //计算时间差,并把毫秒转换成秒
    var days = parseInt(difftime / 86400); // 天  24*60*60*1000 
    // console.log(days);
    return days
  },
  // 返回Index页面
  returnIndex() {
    wx.navigateBack({
      // delta: 2
    })
  },
  // 导航条
  onPageScroll(e) {//页面滚动就会触发
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  // 跳转宠物信息编辑页
  goEditorInfo(e) {
    // console.log(e);
    let { id } = e.currentTarget.dataset
    // console.log(id,'iiiidddd');
    wx.navigateTo({
      url: `/pages/petEdit/petEdit?id=${id}`
    })
  },
  // 获取宠物信息
  async getPetInfo(id) {
    let result = await request({ url: '/one', method: "GET", data: { id } })
    console.log(result.data)
    result.data["生日"] = this.handleTime(result.data.birth)
    result.data["到家日"] = this.handleTime(result.data.arriveDate)
    result.data.accompanyTime = this.calTime(result.data.arriveDate)
    result.data.age = this.calTime(result.data.birth)
    this.data.birth['age'] = Math.ceil(this.handlePassTime(result.data["生日"])/365)
    this.data.birth['day'] = 365 - this.handlePassTime(result.data["生日"])
    // console.log(this.data.birth['age'],1111);
    this.setData({
      pet: result.data,
      birth:this.data.birth
    })
  },
  calTime(time) {
    let result = Date.now() - time * 1000
    return Math.floor(result / (1000 * 60 * 60 * 24))
    // console.log(Math.floor(result/(1000 * 60 * 60 * 24)));
  },
  //处理时间
  handleTime(time) {
    let date = new Date(time * 1000)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = month > 10 ? month : `0${month}`
    day = day > 10 ? day : `0${day}`
    // console.log(month)
    // console.log(day)
    return `${year}-${month}-${day}`
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
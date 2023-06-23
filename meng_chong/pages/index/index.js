import { request, getBaseUrl,getwxLogin } from "../../utils/request"
import "../../lib/runtime/runtime"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pet: [],
    // baseUrl:""
    recordList: [],
    // age:0,
    // accompanyTime:0,
    remindList: [],
    swiperHeight: "",     // swiper的高度
    current: 0,
    index:-1,
    toggleRemind: [],
    myList:[]
  },
  // 一个测试函数
   nessageTest(){
    /* wx.login({
      success(res){
        console.log(res.code);
      }
    }) */
    /* let result = await getwxLogin()
    console.log(result);
    let code = result.code
    console.log(code);
    let result1 = await request({url:"/getOpenId",method:"GET",data:{code}}) */

    wx.requestSubscribeMessage({
      tmplIds: ['1up4WaWDVcRJ6uQLpMQGA3oFALy1243e2lTKEPoqHZQ'],
      async success (res) { 
        let result = await request({url:"/sendMsg",method:"GET"})
        console.log(res,"成功");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // request({url:"/pet",method:"GET"})
    // .then((result)=>{
    //   // const baseUrl = getBaseUrl()
    //   this.setData({
    //     pet: result,
    //     // baseUrl
    //   })
    // }
    // )
    this.getPet()
    this.getRecordList()
    this.getRemindList()
  },
  // 跳转到我的宠物页面
  goMyPet(){
    wx.navigateTo({
      url:'/pages/myPet/myPet'
    })
  },
  // 根据current重新渲染页面
  reshow(cur) {
    if (cur == 0) {
      // console.log('00000');
    } else {
      var that = this
      // console.log(this.data.pet[cur-1].name);
      this.getRemindList()
      let arr = []
      that.data.remindList.forEach(item => {
        console.log("1111", item.name)
        console.log("2222", that.data.pet[cur - 1].name)
        item.name == that.data.pet[cur - 1].name && arr.push(item)
      })
      that.data.remindList = []
      that.setData({
        toggleRemind: arr,
        remindList: arr,
        myList: arr
      })
      // console.log(arr);
    }

  },
  // 获取swipper的current
  handleSwiper(e) {
    var that = this
    that.setData({
      current: e.detail.current,
      index:--e.detail.current
    })
    // console.log(e.detail.current,'cur');
    // that.reshow(e.detail.current)
  },

  // 跳转宠物信息编辑页
  toPetEdit(e) {
    // console.log(e)
    let { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/idinfo/idinfo?id=${id}`,
    })
  },
  // 跳转记录提醒编辑页
  toEditor() {
    wx.navigateTo({
      url: '/pages/editor/editor',
    })
  },
  // 请求宠物数据
  async getPet() {
    const result = await request({ url: "/pet", method: "GET" })
    // console.log(this.handleTime(result.data[0].birth));
    result.data.forEach(item => {
      item.accompanyTime = this.handleTime(item.arriveDate)
      item.age = this.handleTime(item.birth)
    })
    this.setData({
      pet: result.data,
    })
  },
  // 请求记录数据
  async getRecordList() {
    const result = await request({ url: "/record", method: "GET" })
    result.data.forEach(item=>{
      item.year = this.getTime(item.recordTime)
    })
    this.setData({
      recordList: result.data,

    })
    
  },
  // 请求提醒参数
  async getRemindList() {
    const result = await request({ url: '/remind', method: "GET" })
    this.setData({
      remindList: result.data
    })
  },
  // 处理时间
  handleTime(time) {
    let result = Date.now() - time * 1000
    return Math.floor(result / (1000 * 60 * 60 * 24))
    // console.log(Math.floor(result/(1000 * 60 * 60 * 24)));
  },
  // 年月日取出来
  getTime(time){
    // let time = '2023-3-14'
    // let arr = []
    return time.split("-")
  //  console.log( time.split("-"));

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 轮播图自适应高度
  test() {
    let that = this;
    var query = wx.createSelectorQuery();
    query.select('.petScroll').boundingClientRect();
    query.exec(function (res) {
      //res就是 所有标签为v1的元素的信息 的数组
      // console.log(res, 'obj');
      //取高度
      // console.log(res[0].height, 'eee');
      var winWid = wx.getSystemInfoSync().windowWidth;
      // console.log(winWid,'winWid');      //获取当前屏幕的宽度
      var imgh = 200; //图片高度
      var imgw = res[0].width;
      var swiperH = winWid * imgh / imgw + "px"
      // console.log(winWid*imgh/imgw, 'hhh');          //等比设置swiper的高度。  
      //即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  -->  swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
      that.setData({
        swiperHeight: swiperH
      })
    })

  },
  // 跳转记录展示页面
  goRecordShow(e){
    let {record} = e.currentTarget.dataset
    console.log(e,'mmmmm');
    wx.navigateTo({
      url:`/pages/comment/comment?id=${JSON.stringify(record)}`
    })
  },
  onReady: function () {
    this.test(),
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
    this.getPet()
    this.getRecordList()
    this.getRemindList()
    this.reshow()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
    

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');

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
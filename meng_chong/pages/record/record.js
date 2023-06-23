// pages/record/record.js
import { request } from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    pet: [],
    record: {},
    dateNow: "",
    // data:"",
    isCheck: [],
    recordDescibe: "",
    petName: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { name } = options
    this.setData({
      name
    })
    this.getPet()
  },
  // 输入的内容
  describe(e) {
    let { value } = e.detail
    // console.log(value);
    this.setData({
      recordDescibe: value.trim()
    })
  },
  // 保存提交数据
  async saveMsg() {
    let { pet, isCheck, recordDescibe, dateNow, name } = this.data
    pet.forEach(item => {
      item.isCheck && isCheck.push({ petId: item.id,name:item.name, recordDescibe, recordTime: dateNow, recordType: name })
      // console.log(isCheck);
    })
    // console.log(isCheck);
    if (isCheck.length == 0) {
      console.log(111);
      isCheck.push({ petId: pet[0].id, recordDescibe, name:pet[0].name,recordTime: dateNow, recordType: name })
    }
    this.setData({
      isCheck
    })
      let record1 = {
        // id:111,
        // name:"momo",
        petId:4,
        recordDescibe:"test",
        recordTime:"2023-04-13",
        recordType:"事件",
      }
      // let result = await request({url:"/saveRecord",method:"POST",data:record1})
      // console.log(result);
      for(let i = 0 ;i<this.data.isCheck.length;i++){
        let result = await request({url:"/saveRecord",method:"POST",data:this.data.isCheck[i]})
        // console.log(result);
      }

      wx.switchTab({
        url: '/pages/index/index',
      })

  },
  // 选择时间
  bindDateChange(e) {
    this.setData({
      dateNow: e.detail.value
    })
  },
  // 请求宠物数据
  async getPet() {
    const result = await request({ url: "/pet", method: "GET" })
    result.data.forEach(item => {
      item.isCheck = false
    })
    this.setData({
      pet: result.data,
    })
  },
  // 点击出现底部弹出栏
  onButtom() {
    this.selectComponent('#bottomFrame').showFrame();
  },
  chooseItem: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      ['pet[' + index + '].isCheck']: !this.data.pet[index].isCheck
    })
    console.log("点击了:", this.data.pet[index].name)
  },

  //点击取消之后
  onCancel() {
    //恢复选中的数据
    wx.showToast({
      icon: "none",
      title: '点击了取消',
    })
  },
  //点击确定之后
  onConfirm() {
    let { pet, petName } = this.data
    pet.forEach(item => {
      item.isCheck && petName.push({ name: item.name })
      // console.log(isCheck);
    })
    this.setData({
      petName
    })
    /* wx.showToast({
        icon:"none",
        title: '点击了确定',
    }) */
  },
  getNowDate() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    // var hours = myDate.getHours(); //获取当前小时
    // var minutes = myDate.getMinutes(); //获取当前分钟
    // var seconds = myDate.getSeconds(); //获取当前秒
    year = year > 10 ? year : `0${year}`
    mon = mon > 10 ? mon : `0${mon}`
    date = date > 10 ? date : `0${date}`
    var now = year + "-" + mon + "-" + date;
    return now;
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
    let that = this
    that.setData({
      dateNow: that.getNowDate()

    })
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
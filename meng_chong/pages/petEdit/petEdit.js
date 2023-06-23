// pages/petEdit/petEdit.js
import { request } from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',//模态框标题
    pet: {},
    //初始化隐藏模态输入框
    hiddenmodalput: true,
    id: "",
    datebirth: '',
    datearr: '',
    breed: '',
    gendeer: -1,
    sterilization: -1,
    weight: "",
    introduce: '超可爱'

  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      datebirth: e.detail.value
    })
  },
  bindDateChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      datearr: e.detail.value
    })
  },
  modalinput: function () {
    this.setData({
      //注意到模态框的取消按钮也是绑定的这个函数，
      //所以这里直接取反hiddenmodalput，也是没有毛病
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  // 修改姓名
  bindinput(e) {
    this.data.pet.name = e.detail.value
    this.setData({
      pet: this.data.pet
    })
  },
  // 修改体重
  bindinputWeight(e) {
    this.data.pet.weight = e.detail.value
    this.setData({
      pet: this.data.pet
    })
  },
  // 修改自我介绍
  bindinputIntroduce(e) {
    this.data.pet[0].introduce = e.detail.value
    this.setData({
      pet: this.data.pet
    })
  },
  //确认
  confirm: function (res) {
    console.log(res, 'res');
    this.setData({
      hiddenmodalput: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      id: options.id
    })
    this.getPetInfo(this.data.id)
  },
  // 点击选择是否绝育
  changeSterilization(e){
    let {sterilization} = e.currentTarget.dataset
    // console.log(e);
    this.data.pet.sterilization = parseInt(sterilization)
    this.setData({
      pet:this.data.pet
    })
  },
  // 点击选择性别
  changeSex(e){
    let {gendeer} = e.currentTarget.dataset
    // consolelog(gendeer);
    this.data.pet.gendeer = parseInt(gendeer)
    this.setData({
      pet:this.data.pet
    })
  },
  // 发送修改信息到后台
  async sendMsg() {
    let that = this
    /*let pet1 = {
       arriveDate: "2023-03-26",
      birth: "2023-03-01",
      breed: "金渐层",
      gendeer: 1,
      id: 4,
      introduce: "地包天",
      name: "金条",
      photo: "5.jpg",
      sterilization: 1,
      type: "猫猫",
      weight: 8.99, 
      id:9,
      name:"mmmmmm",
      breed:1,
      gendeer:1,
      weight:"1",
      sterilization:1,
      type:"猫猫",
      birth:"2020-02-02",
      arriveDate:"2020-02-02",
      introduce:"1",
      photo:"1"
    }*/

    let { pet } = that.data
    pet.birth = this.data.datebirth
    pet.arriveDate = this.data.datearr
    // console.log(pet);
    
    // let result = await request({ url: '/update', method: 'POST', data: { pet: JSON.stringify(pet1) } })
    // let result = await request({ url: '/save', method: 'POST', data: { pet: JSON.stringify(pet1) } })
    let result = await request({ url: '/save', method: 'POST', data:  pet  })
    // console.log(result);
    // console.log(JSON.stringify(pet1));

    wx.switchTab({
      url: '/pages/index/index',
    })

  },
  // 处理修改
  handleEdite() {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 获取宠物信息
  async getPetInfo(id) {
    let result = await request({ url: '/one', method: "GET", data: { id } })
    // console.log(result)
    result.data["生日"] = this.handleTime(result.data.birth)
    result.data["到家日"] = this.handleTime(result.data.arriveDate)
    this.setData({
      pet: result.data,
      datebirth: result.data["生日"],
      datearr: result.data["到家日"],
    })
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
  // 去到种类选择
  goBreed() {
    wx.navigateTo({
      url: '/pages/breed/breed',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
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
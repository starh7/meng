// pages/remind/remind.js
import { request } from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pet:[],
    name:"驱虫",
    petName: [],
    dateNow:"",
    array:["单次计划","一天一次","一周一次","一月一次","三个月一次","半年一次","一年一次"],
    region: ['当天', '提前一天', '提前两天',"提前三天"],
    index:0,
    index1:0,
    time: '12:01',
    format:"",
    isCheck:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { name } = options
    this.setData({
      name
    })
    this.getPet(),
    // let that = this
    this.setData({
      dateNow: this.getNowDate(),
      format:this.handleDateNow(this.getNowDate())
    })

  },
  // 保存提交数据
  async saveMsg() {
    let { pet, isCheck, time, dateNow, name, array ,index} = this.data
    pet.forEach(item => {
      item.isCheck && isCheck.push({ petId: item.id,name:item.name, remindType:name, planTime: dateNow, cycleTime: array[index] ,remindTime:time+":00"})
      // console.log(isCheck);
    })
    // console.log(isCheck);
    if (isCheck.length == 0) {
      // console.log(111);
      isCheck.push({ petId: pet[0].id, name:pet[0].name,remindType:name, planTime: dateNow, cycleTime: array[index] ,remindTime:time+":00" })
    }
    this.setData({
      isCheck
    })
      /* let remind = {
        id:111,
        name:"momo",
        petId:4,
        remindType:"name", 
        planTime: "2023-03-03",
        cycleTime: "array[index]" ,
        remindTime:this.data.time+":00"
      }
      let result = await request({url:"/saveRemind",method:"POST",data:remind})
      console.log(result);  */
      for(let i = 0 ;i<this.data.isCheck.length;i++){
        let result = await request({url:"/saveRemind",method:"POST",data:this.data.isCheck[i]})
        // console.log(result);
      }

    // 一个测试函数
      // setTimeout(function(){
        wx.requestSubscribeMessage({
          tmplIds: ['1up4WaWDVcRJ6uQLpMQGA3oFALy1243e2lTKEPoqHZQ'],
          async success(res) {
            let result = await request({ url: "/sendMsg", method: "GET" })
            console.log(res, "成功");
          }
        })
      // },3000)
      

      wx.navigateTo({
        url: '/pages/remindList/remindList',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });

  },
  // 处理时间变成年月日
  handleDateNow(data){
    // let {dateNow} = this.data
    // console.log(dateNow.replace(/-/,"年").replace(/-/,"月"));
    return data.replace(/-/,"年").replace(/-/,"月")
  },
  // 选择周次
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 选择天
  bindPickerChangeDay(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
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
// 选择时间
bindDateChange(e) {
  this.setData({
    dateNow: e.detail.value
  })
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
bindTimeChange: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    time: e.detail.value
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
    /* let that = this
    that.setData({
      dateNow: that.getNowDate(),
    }) */
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
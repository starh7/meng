// pages/comment/comment.js
import { request} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // id:0,
    petId:0,
    record:{},
    photo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let record = JSON.parse(options.id)
    // console.log(record,'///')
    this.setData({
      record,
      // id:record.id,
      petId:record.petId
    })
    // this.getIdRecord()
    this.getIdPet()

  },
  // 获取宠物
  async getIdPet() {
    // console.log(this.data.petId, 'qqq')
    let id = parseInt(this.data.petId)
    // console.log(id, 'qqq')
    let result = await request({url:"/one",method:"GET",data:{id:this.data.petId}})
    // console.log(result,'qqq')
    this.setData({
      photo: result.data.photo
    })
  },
  // 获取记录
  // async getIdRecord(){
  //   let result = await request({ url:"/idRecord",method:"GET",data:{id:this.data.id}})
  //   this.setData({
  //     record:result.data,
  //     petId: parseInt(result.data.petId)
  //   })
  // },
  // 显示删除模态框
  showModal(e) {
    let that = this
    let { id } = e.currentTarget.dataset
    wx.showModal({
      title: '确认要删除这条记录吗',
      // content: '删除时会同时删除该宠物的所有记录，不可恢复，确认删除吗？',
      async success(res) {
        if (res.confirm) {
          let result = await request({ url: "/deleteRecord", method: "GET", data: { id } })
          // console.log(result);
          result.code == 0 && wx.switchTab({
            url: '/pages/index/index',
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    // this.getIdPet()
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
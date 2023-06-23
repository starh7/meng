// petPackage/pages/petName/petName.js
import { request } from "../../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: '',
    pet: {},
    // 存放微信图片地址
    workImg: [],
    imgSrc:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 修改图片
  uploadPhotos() {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        that.setData({
          workImg:tempFilePaths
        })
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            
            url: 'http://localhost:8080/uploadImage?fileName='+tempFilePaths[i][0],
            filePath: tempFilePaths[i],
            name: "file",
            header: {
              "content-type": "multipart/form-data"
            },
            success: function (res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: "上传成功",
                  icon: "none",
                  duration: 1500
                })
                console.log('res', JSON.parse(JSON.stringify(res.data)))
                that.data.workImg.push(JSON.parse(res.data))

                that.setData({
                  workImg: that.data.workImg,
                  // imgSrc:that.data.workImg[1].src
                })


              }
            },
            fail: function (err) {
              wx.showToast({
                title: "上传失败",
                icon: "none",
                duration: 2000
              })
            },
            complete: function (result) {
              console.log(result.errMsg,'ppppp')
            }
          })
        }
      }
    })
  },

  // 处理跳转下一步
  handleNext() {
    wx.navigateTo({
      url: `/petPackage/pages/petType/petType?pet=${JSON.stringify(this.data.pet)}`,
    });
  },
  // 处理输入内容
  handleInput(e) {
    // console.log(e);
    let { value } = e.detail
    let { pet ,workImg} = this.data
    pet.name = value.trim()
    pet.photo = workImg[1].data.src
    this.setData({
      inputVal: value.trim(),
      pet
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
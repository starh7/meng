

const baseUrl = "http://localhost:8080"
// 页面请求次数
let ajaxTimes = 0

// 获取基础地址
export const getBaseUrl = ()=>{
    return baseUrl
}

export const getwxLogin = ()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout:5000,
      success(res){
        // console.log(res.code);
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}

export const request = (parms)=>{

  // 模拟网络延迟加载
  let start = new Date().getTime()
  ajaxTimes++
  wx.showLoading({
    title: '加载中',
    mask:true
  })
  while(true){
    if(new Date().getTime()-start>1*100) break
  }

    return new Promise((resolve,reject)=>{
        wx.request({
          ...parms,
          url:baseUrl+parms.url,
          contentType:"application/json charset=UTF-8",
          dataType:'json',
          success:(result)=>{
            resolve(result.data)
          },
          fail:(err)=>{
            reject(err)
          },
          // 网络延迟加载关闭
          complete:()=>{
            ajaxTimes--
            if(ajaxTimes==0)
            wx.hideLoading()
          }
        })

    });
}
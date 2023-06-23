// components/SearchBar/SearchBar.js
import {request} from "../../utils/request"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchVal:'',
    // historySearch:[]
    searchList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 搜索
    goDetail(){
      let {searchVal} = this.data
      // console.log(searchVal);
      this.getSearchList(searchVal)
    },
    // 获取关键词搜索列表
async getSearchList(key){
  let result = await request({url:"/search",method:"GET",data:{q:key}})
  // console.log(result);
  this.setData({
    searchList:result.data
  })
  },
    handleClear(e){
      // let {value} = e.detail
        this.setData({
          searchVal:""
        })
    },
    // 处理搜索词汇
    handelSearch(e){
      // console.log(e.detail.value);
      let {value} = e.detail
        this.setData({
          searchVal:value
        })
    },
  }
})

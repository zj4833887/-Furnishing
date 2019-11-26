// pages/details/detail.js
let {_get}=require('../../utils/http.js')
let { IMGHOSTNAME}=require('../../utils/base.js')
Page({

  /**
   * 页面的初始数据
   */

    data: {
      id: 0,
      cate: [],
      good: [],
      cateId: 0,
      gid:0
    },
  query(id){
    wx.showLoading({
      title: '正在加载...',
    })
    _get('api/goods/'+id).then(res=>{
      if (res.code == 200) {
        let good = res.data
        let image = res.data.gbanner.split(',')
        let details = res.data.gdetail.split(',')
        image = image.map(ele => IMGHOSTNAME + ele.replace(/\\/, '/'))

        details = details.map(ele => IMGHOSTNAME + ele.replace(/\\/, '/'))
        this.setData({
          background: image,
          good: good,
          details: details
        })
      }
     wx.showToast({
       title: '数据加载成功',
     }) 
    }).finally(function(){
      wx.hideLoading();
    })
  },
  onShow:function(){
    this.query(this.data.id)
  },
  onLoad() {
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
  },
})
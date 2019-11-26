let { _get } = require('../../utils/http.js')
let { IMGHOSTNAME } = require('../../utils/base.js')
Page({
  data: {
    cate:[],
    good: [],
    cateId:0
  },
  categoryToggle:function(e){
    var index=e.target.dataset.id;
    this.getgoods(index);
    this.setData({
      cateId:index
    })
  },
  query() {
    wx.showLoading({
      title: '正在加载...',
    })
    _get('api/cate').then(res => {
      if (res.code == 200) {
        let cate = res.data
        cate = cate.map(ele => {
          ele.thumb = 'http://localhost' + ele.thumb.replace(/\\/g, '/');
          return ele;
        });
        this.setData({
          cate: cate,
          cateId: cate[0].id
        })
        this.getgoods(this.data.cateId)
      }
      wx.showToast({
        title: '数据加载成功',
      })
    }).finally(function () {
      wx.hideLoading();
    })
  },
  getgoods(cid) {
    wx.showLoading({
      title: '正在加载...',
    })
    _get('api/index/' + cid).then(res => {
      if (res.code == 200) {
        let goods = res.data
        console.log(goods)
        goods = goods.map(ele => {
          ele.thumb = 'http://localhost' + ele.thumb.replace(/\\/g, '/');
          return ele;
        });
        goods.thumb = goods
        console.log(goods)
        this.setData({
          good: goods
        })
      }
      wx.showToast({
        title: '数据加载成功',
      })
    }).finally(function () {
      wx.hideLoading();
    })
  },
  onLoad() {
    this.query();
  }
})

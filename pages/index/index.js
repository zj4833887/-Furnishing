let { _get } = require('../../utils/http.js')
let { IMGHOSTNAME } = require('../../utils/base.js')
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    background: [],
    good:[],
    good1:[],
    good2:[],
    good3:[],
    img:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  queryBanner() {
    wx.showLoading({
      title: '正在加载...',
    })
    _get('api/goodscate/130').then(res => {
      if (res.code == 200) {
        let good = res.data
        let image = res.data.gbanner.split(',')
        let img = res.data
        img = good.thumb.replace(/\\/, '/');
        good.thumb = img
        image = image.map(ele => IMGHOSTNAME + ele.replace(/\\/, '/'))
        this.setData({
          background: image,
          good: good,
          img: img
        })
      }
      wx.showToast({
        title: '数据加载成功',
      })
    }).finally(function () {
      wx.hideLoading();
    })
  },
  querynew() {
    wx.showLoading({
      title: '正在加载...',
    })
    _get('api/index').then(res => {
      if (res.code == 200) {
        let i = 0;
        let data = [];
        for (i = 0; i < res.data.length; i++) {
          let goods = res.data[i].goods
          goods = goods.map(ele => {
            ele.thumb = IMGHOSTNAME + ele.thumb.replace(/\\/g, '/');
            return ele;
          });
          data.push(goods)
        }
        this.setData({
          good1: data[0],
          good2: data[1],
          good3: data[2]
        })


      }
      wx.showToast({
        title: '数据加载成功',
      })
    }).finally(function () {
      wx.hideLoading();
    })
  },

  onLoad(){
    this.queryBanner();
    this.querynew();
  }
})
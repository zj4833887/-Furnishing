const { _post } = require('../../utils/http.js')
// pages/login/login.js
const app=getApp();
const globalData = app.globalData
Page({
  getUserInfo(e){
    if (e.detail.userInfo){
      let user = e.detail.userInfo
      let obj=Object.assign({},user,{
        openid:globalData.openid
      })
      _post('/api/wxlogin',obj).then(res=>{
        console.log(res)
      })
      globalData.userInfo = user
      wx.switchTab({
        url: '../index/index'
      })
    }else{
      wx.showModel({
        title:'授权失败',
        content:'授权失败，无法访问该应用',
      })
    }
  // }
  
  }
  
})
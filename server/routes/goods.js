var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/imoocmall');
mongoose.connection.on('connected',function () {
  console.log('connected');
})
mongoose.connection.on('error',function () {
  console.log('db connect error');
})
mongoose.connection.on('disconnected',function () {
  console.log('db disconnected');
})
router.get('/',function(req,res,next){
  var page = parseInt(req.params.page);
  var pageSize = parseInt(req.params.pageSize);
  var sort = req.params.sort;
  var skip = (page-1)*pageSize;
  let params = {};
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec({},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})
module.exports = router;

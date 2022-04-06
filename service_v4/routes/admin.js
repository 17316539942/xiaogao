//1.引入第三方模块
const express = require('express');
//2.需要用到mysql，要引入连接池模块
const pool = require('../pool.js');
//3.创建路由对象
const router = express.Router();
//以下为处理逻辑

//(1)管理员登录
//页面地址：http://127.0.0.1:8080/login.html
//请求方式：post
//路由地址: /admin/login
//接收传参的方法：req.body
router.post('/login',(req,res,next)=>{
  //查看前台传值是否已到
  let obj = req.body;
  // console.log(obj);
  //执行sql查询
  pool.query('select * from admin where a_names=? and a_pwd=?',[obj.aname,obj.apwd],(err,data)=>{
    //排错,处理错误
    if(err){next(err);
      return;}
    //查看数据库是否返回查询结果
    //[ RowDataPacket { a_id: 1, a_names: 'zhangsan', a_pwd: '123' } ]
    // console.log(data);
    //判断是否查询到数据
    if(data.length == 0){
      //没查到数据
      res.send({
        "code":0,
        "msg":"没找到数据"
      });
    }else {
      res.send({
        "code":1,
        "msg":"有该管理员信息"
      })
    }
  })

})

//(2)用户列表显示
//页面地址：http://127.0.0.1:8080/list.html
//请求方式:GET
//路由地址：/admin/list
//这个路由不用接收参数
router.get('/list',(req,res,next)=>{
  //查询的sql
  pool.query('select * from userinfo',(err,data)=>{
    //处理错误
    if(err){next(err);return;}
    //查看数据库返回的数据data
    // console.log(data);
    res.send({
      "code":1,
      "msg":"已查到所有数据",
      "data":data
    })
  })
})

//(3)删除用户（单个）
//页面地址：http://127.0.0.1:8080/list.html
//请求方式:DELETE
//路由地址：/admin/del传参方式注意！！！！！
//接收参数： /:uid  --> req.params
router.delete('/del/:uid',(req,res,next)=>{
  //获取数据
  let obj = req.params;
  pool.query('delete from userinfo where u_id=?',[obj.uid],(err,data)=>{
    //错误处理
    if(err){next(err);return;}
    //查看删除结果
    // console.log(data.affectedRows)
    //data.affectedRows 变化数据条数，删除成功就会有一条变化
    if(data.affectedRows == 0){
      res.send({
        "code":0,
        "msg":"删除失败"
      })
    }else {
       res.send({
        "code":1,
        "msg":"删除成功"
      })
    }
  })
})

//最后一步，导出（暴露）路由对象
module.exports = router;
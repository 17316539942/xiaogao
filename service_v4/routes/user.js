//1.引入第三方模块
const express = require('express');
//2.需要用到mysql，要引入连接池模块
const pool = require('../pool.js');
//3.创建路由对象
const router = express.Router();
//以下为处理逻辑
//(1)用户注册
//页面地址：http://127.0.0.1:8080/register.html
//请求方式:POST
//路由地址：/user/reg
//接收参数：req.body
router.post('/reg',(req,res,next)=>{
  let obj = req.body;
  // console.log(obj);
  pool.query('insert into userinfo set ?',[obj],(err,data)=>{
    if(err){next(err);return;}
    // console.log(data.affectedRows);
    if(data.affectedRows==1){
      res.send({
        "code":1,
        "msg":"注册成功"
      })
    }else {
      res.send({
        "code":0,
        "msg":"注册失败"
      })
    }
  })
})

//(2)用户修改个人信息
//页面地址：http://127.0.0.1:8080/edit.html
//请求方式:PUT
//路由地址：/user/edit
//接收参数：req.body
router.put('/edit',(req,res,next)=>{
  var obj = req.body;
  //console.log(obj)
  pool.query(`update userinfo set u_names="${obj.u_names}",u_phone="${obj.u_phone}",u_member="${obj.u_member}" where u_phone="${obj.oldphone}";`,(err,data)=>{
    if(err){next(err);return;}
	//console.log(data)
    if(data.affectedRows==1){
      res.send({
        "code":1,
        "msg":"修改成功"
      })
    }else {
      res.send({
        "code":0,
        "msg":"修改失败"
      })
    }
  })
})

//最后一步，导出（暴露）路由对象
module.exports = router;
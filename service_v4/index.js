//启动文件
//1.引入第三方express
const express = require('express');
const cors = require("cors");
//7.引入管理员路由
const adminRouter = require('./routes/admin.js');
//8.引入用户路由
const userRouter = require('./routes/user.js');
//2.创建web服务器
const app = express();

console.log("start 3000 ....")
app.use(cors({
	origin:['http://localhost:8848','http://127.0.0.1:8848',
	'http://localhost:5500','http://127.0.0.1:5500'],  //指定接收的地址
    methods:['GET','POST','DELETE','PUT'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}))


//3.设置端口
app.listen(3000);
//4.静态资源托管
app.use(express.static('./views'));
//5.解析url-encoded数据格式
app.use(express.urlencoded({
  extended: false
}));
//9.挂载路由
//路由配置之后接口地址要有这两个资源目录开始，再加入后面的资源目录 如：/admin/query
app.use('/admin',adminRouter);
app.use('/user',userRouter);
//6.处理错误中间件
app.use((err, req, res, next) => {
  //查看错误信息
  console.log(err);
  //响应500,返回相关信息
  res.status(500).send({
    code:500,
    msg:'服务器错误'
  });
});
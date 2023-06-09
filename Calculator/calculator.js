import express from "express";
import bodyParser from "body-parser";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app=express();
app.use(bodyParser.urlencoded({extended:true}));//通过使用bodyParser我们能得到http请求，urlencoded使我们能访问表单数据

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/",function(req,res){ //当我们从浏览器收到“/”路由地址，调用回调函数（当浏览器发出get请求时，且route为“/”）
    res.sendFile(__dirname + "/index.html");//使得主界面为index.html
})

app.post("/",function(req,res){//处理来自主路由（主页面）的请求
    var num1=Number(req.body.num1);//取回来的值的类型为text，转为数字
    var num2=Number(req.body.num2);
    var sum=num1+num2;
    res.send("The result is "+sum);
})

app.listen(3000,function(){
    console.log("hi");
})
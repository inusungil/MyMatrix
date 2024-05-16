const compression = require("compression");
const cors = require("cors");
const {indexRouter} = require("./src/router/indexRouter");

const {userRouter} = require("./src/router/userRouter");

const express = require("express");
const app = express();
const port = 3000;

/* express 미들웨어 설정 */

// 정적파일 제공
app.use(express.static("front"));

// cors 설정
app.use(cors());

// body json 파싱
app.use(express.json());

//HTTP 요청 압축
app.use(compression());

// 라우터분리
indexRouter(app);
userRouter(app);


// app.get("/user", (req,res)=>{
//    return res.send("hello world1234");
// });

// app.post("/user", (req,res)=>{
//   const name =req.body.name;
//   res.send(name);
// });


app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`)
});
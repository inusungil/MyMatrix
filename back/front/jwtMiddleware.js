const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secret");

exports.jwtMiddleware = async function (req, res, next) {
  // 헤더에서 토큰 꺼내기
  const token = req.headers["x-access-token"];

  // 토큰이 없는 경우
  if (!token) {
    return res.send({
      isSuccess: false,
      code: 403,
      message: "로그인이 되어 있지 않습니다.",
    });
  }

  // 토큰이 있는 경우, 토큰 검증
  try {
    const verifiedToken = jwt.verify(token, jwtSecret);   
    //  verify(token, jwtSecret) 토큰검증실패는 아래로 
    // 성공하면  리턴값은  userIdx  값 이 돌아옴
    req.verifiedToken = verifiedToken;
    next();
  } catch {
    return res.send({
      isSuccess: false,
      code: 403,
      message: "토큰 검증 실패",
    });
  }
};
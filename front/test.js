const jwt = require("jsonwebtoken");

const token = jwt.sign(
    {userIdx : 1},   //payload 정의   decoding 하면 볼수 있으므로 민감한 값은 넣지 않는다
    "a123"    // 서버 비밀키
    
);

console.log(token);           // jwt.io애서 디코딩 가능

const verifiedToken = jwt.verify(token,"a123");  
//  전달받은 token "a123"은 jwt 만들때 비밀키 임
// 리턴값은  userIdx : 1 일 돌아옴

console.log(verifiedToken);
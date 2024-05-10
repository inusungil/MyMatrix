const jwt = require("jsonwebtoken");

const token = jwt.sign(
    {userIdx : 1},   //payload 정의   decoding 하면 볼수 있으므로 민감한 값은 넣지 않는다
    "a123"    // 서버 비밀키
    
);

console.log(token);

const verifiedToken = jwt.verify(token,"a123");  //"a123"은 jwt 만들때 비밀키 임


console.log(verifiedToken);
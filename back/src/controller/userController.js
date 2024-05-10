const userDao = require("../dao/userDao");
const jwt = require("jsonwebtoken");
const {jwtSecret }= require ("../../secret");

exports.signup = async function (req, res){
    const {email, password, nickname} = req.body;

    if(!email || !password || !nickname){
        return res.send ({
            isSuccess : false,
            code : 400,
            message :"회원가입 입력값을 확인해 주세요"
        });
    }

    //js 정규표현식 이메일
    const isValidEmail =
     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

     if(!isValidEmail.test(email)){
        return res.send ({
            isSuccess : false,
            code : 400,
            message :"이메일 형식을 확인해 주세요.",
        });
     }

    const isValidPassword = 
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/; 
    //영문, 숫자, 특수문자 중 2가지 이상 조합하여 10~20자리 이내의 암호 정규식
    
    if(!isValidPassword.test(password)){
        return res.send ({
            isSuccess : false,
            code : 400,
            message :"패스워드 형식을 확인해 주세요. 영문, 숫자, 특수문자  10~20자리",
        });
     }

     if(nickname.length <2 || nickname.length >10){     //2글자 이상 10글자 미만
        return res.send ({
            isSuccess : false,
            code : 400,
            message :"닉네임 형식을 확인해 주세요.  2~10글자 ",
        });
     }

    // 중복 회원 검사
    const isDuplicatedEmail = await userDao.selectUserByEmail(email);
     if(isDuplicatedEmail.length > 0){
        return res.send ({
            isSuccess : false,
            code : 400,
            message :"이미 가입된 회원입니다.",
        });
     };


     // DB 입력
     const insertUserRow = await userDao.insertUser(email, password, nickname);


     if(!insertUserRow){
        return res.send ({
            isSuccess : false,
            code : 400,
            message :"회원가입 실패 . 관리자에게 문의하세요.",
        });
     }
     return res.send ({
        isSuccess : true,
        code : 200,
        message :"회원가입 성공.",
    });

};

exports.signin = async function(req, res) {
    const {email, password} = req.body;

    if(!email || !password){
        return res.send ({
            isSuccess : false,
            code : 400,
            message :"회원정보를 입력해주세요.",
        });
    }

    // 회원여부 검사
    const isValidUser = await userDao.selectUser(email, password);

    if(!isValidUser){
        return res.send ({
            isSuccess : false,
            code : 410,
            message :"DB 에러, 담당자에게 문의하세요.",
        });
    }

    if(isValidUser.length <1){
        return res.send ({
            isSuccess : false,
            code : 400,
            message :"존재하지 않은 회원입니다.",
        });
    }



    //jwt 토큰 발급
    const [userInfo]= isValidUser;
    const userIdx = userInfo.userIdx;

    const token = jwt.sign(
        {userIdx: userIdx} ,  //페이로드
        jwtSecret  // 시크릿 키

    );
    return res.send({
        result :{token, token},  // 토큰을 object형태로 보냄
        isSuccess : true,
        code : 200,
        message :"로그인 성공.",
    });

    
};

exports.getNicknameByToken = async function(req,res){
    const {userIdx} = req.verifiedToken;
    //console.log(userIdx);

    const [userInfo] = await userDao.selectNicknameByUserIdx(userIdx);

    const nickname = userInfo.nickname;
    console.log(nickname);

    return res.send({
        result :{nickname : nickname},  // 토큰을 object형태로 보냄
        isSuccess : true,
        code : 200,
        message :"토큰 검증 성공",
    });

};
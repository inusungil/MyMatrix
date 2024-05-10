const indexDao = require("../dao/indexDao");

exports.createTodo = async function(req, res){
    const {userIdx} = req.verifiedToken;   //userIdx를 토큰에서 찾음
    const { contents, type} = req.body;
    // console.log(userIdx, contents, type);

    if(!userIdx || !contents || !type){
        return res.send({
            isSuccess : false,
            code :400,
            message :"입력값이 누락됐습니다.",
        });
    }
    //contents 20글자 초과 불가
    if(contents.length >20){
        return res.send({
            isSuccess : false,
            code :400,
            message :"콘텐츠는 20글자 이하로 설정해 주세요.",
        });
    }
    //type : do, decide, delete, delegate  유효성확인
    const validTypes =["do", "decide", "delete","delegate"];
    if(!validTypes.includes(type)){
        return res.send({
            isSuccess : false,
            code :400,
            message :"유효한 타입이 아닙니다.",
        });
    }

    const insertTodoRow = await indexDao.insertTodo(userIdx, contents, type);

    if(!insertTodoRow){
        return res.send({
            isSuccess : false,
            code :403,
            message :"요청에 실패했습니다. 관리자에게 문의해주세요."
        });
    }

    return res.send({
        isSuccess : true,
        code :200,
        message :"일정 생성 성공"
    });
};  

exports.readTodo = async function (req, res){


    // 읽기
    const {userIdx} = req.verifiedToken;   //userIdx를 토큰에서 찾음
    
    // 타입별 할일 선택
        // 1. 할일들
        // 2. 타입별 구분
    const todos ={};
    const types =["do", "decide","delegate","delete"];
    
    for(let type of types){
        //const selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type);
        let selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type);

        if(!selectTodoByTypeRows) {
            return res.send({
                isSuccess : false,
                code :400,
                message :"일정 조회 실패 . 관리자에게 문의해 주세요",
            });
        }
        todos[type] =selectTodoByTypeRows;
    }

    //let type ="do";
    

    //return res.send(selectTodoByTypeRows);
    return res.send({
        result : todos,
        isSuccess : true,
        code : 200,
        message : "일정 조회 성공",
    });

};


// todo 수정
exports.updateTodo = async function(req, res){

    const {userIdx} = req.verifiedToken;          //userIdx를 토큰에서 찾음

    let {todoIdx, contents, status} =req.body;

    if(!userIdx || !todoIdx){
        return res.send({
            isSuccess : false,
            code : 400,
            message : "userIdx와 todoIdx를 보내주세요.",
        }); 
    }

    if(!contents){
        contents = null;
    }

    if(!status){
        status = null;
    }
    
    // 유효성 검사 요청과 응답
    const isValidTodoRow = await indexDao.selectValidTodo(userIdx, todoIdx);
    
    if(isValidTodoRow.length <1){
        return res.send({
            isSuccess : false,
            code : 400,
            message : " 유효한 요청이 아닙니다. userIdx와 todoIdx를 확인하세요.",
        }); 
    }

    // 수정 요청
    const updateTodo = await indexDao.updateTodo(userIdx, todoIdx, contents, status);

    if(!updateTodo){
        return res.send({
            isSuccess : false,
            code : 400,
            message : " 수정 실패. 관리자에게 문의해 주세요.",
        }); 
    }
    
    return res.send({
        isSuccess : true,
        code : 200,
        message : " 수정 성공",
    }); 
  
};

// todo 삭제
exports.deleteTodo = async function(req, res){
    const {userIdx} = req.verifiedToken;            //userIdx를 토큰에서 찾음
    const {todoIdx}= req.params;
    
    if(!userIdx || !todoIdx){
        return res.send({
            isSuccess : false,
            code : 400,
            message : "userIdx와 todoIdx를 보내주세요.",
        }); 
    }

    // 유효성 검사 요청과 응답
    const isValidTodoRow = await indexDao.selectValidTodo(userIdx, todoIdx);
    
    if(isValidTodoRow.length <1){
        return res.send({
            isSuccess : false,
            code : 400,
            message : " 유효한 요청이 아닙니다. userIdx와 todoIdx를 확인하세요.",
        }); 
    }
    const deleteTodo = await indexDao.deleteTodo(userIdx, todoIdx);

    if(!deleteTodo){
        return res.send({
            isSuccess : false,
            code : 400,
            message : " 삭제 실패. 관리자에게 문의해 주세요.",
        }); 
    }

    return res.send({
        isSuccess : true,
        code : 200,
        message : " 삭제 성공",
    });   
};
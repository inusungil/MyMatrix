readTodo();

async function readTodo(){
    // 토큰이 없으면 리턴
    const token = localStorage.getItem("x-access-token");
    if(!token){
        return;
    }

    // ###########    1. 일정 조회 API  호출   ################
    
    const config ={
        method : "get",
        url : url +"/todos",
        headers : { "x-access-token ": token},
        };
    try{
        const res = await axios(config);
       // console.log(res);

       if (res.data.code !==200){
            alert(res.data.message);
            return false;
       }

       const todoDataSet = res.data.result;
       //console.log(todoDataSet);

       for (let section in todoDataSet){
        //console.log(section);
  
        //console.log (document.querySelector(`#${section} ul`));  
        //index.html 에 ${section}  이 id로 delegate do delete로 설정되어있음

        // 각 섹션에 해당하는 ul 태그 선택
        const sectionUl = document.querySelector(`#${section} ul`);  
        // 각 섹션에 해당하는 데이터
        const arrayForEachSection = todoDataSet[section];
        //console.log(arrayForEachSection);

        let result ="";
        for(let todo of arrayForEachSection){
            let element =`
            <li class ="list-item" id=${todo.todoIdx}>
                <div class="done-text-container">
                    <input type="checkbox" class="todo-done" ${todo.status==="C" ? "checked" : ""}/>   
                    
                    <p class ="todo-text">
                        ${todo.contents}
                    </p>
                </div>
           
    
                <div class="update-delete-container">  
                    <i class="todo-update fas fa-pencil-alt"></i>
                    <i class="todo-delete fas fa-trash-alt"></i>
                </div>
            </li>
            `;
            result += element ;
    
        }
        sectionUl.innerHTML = result;
       }
        

    }catch (err) {
        console.log(err);
    }
}

// <li class ="list-item">
//                 <div class="done-text-container">
//                     <input type="checkbox" class="todo-done">
//                     <p class ="todo-text">산책가기3</p>
//                 </div>
//                 <!-- done-text-container -->

//                 <div class="update-delete-container">  <!--fontawesome -->
//                     <i class="todo-update fas fa-pencil-alt"></i>
//                     <i class="todo-delete fas fa-trash-alt"></i>
//                 </div>
//             </li>


// ##################   2. 일정 CUD    ##############

const matrixContainer = document.querySelector(".matrix-container");
//console.log(matrixContainer);
matrixContainer.addEventListener("keypress",cudController);
matrixContainer.addEventListener("click",cudController);

function cudController(event){
    const token = localStorage.getItem("x-access-token");
    if(!token){
        return;
    }
    //console.log(event);
    const target = event.target;
    const targetTagName = target.tagName;
    const eventType = event.type;
    const key = event.key;

    console.log(target, targetTagName, eventType, key);

    // ㄲ. create 이벤트 처리

    if(targetTagName ==="INPUT" && key === "Enter" ||
    targetTagName ==="INPUT" && key === "="  ){
        createTodo(event, token);
        return;
    }

    // ㄴ. update 이벤트 처리

        // 체크박스 업데이트
        // 클릭시  target.className 은 todo-done 임

    if( target.className === "todo-done" && eventType==="click"){
        updateTodoDone(event, token);
        return;
    }  

        // 콘텐츠 업데이트 (수정)
    const firstClassName = target.className.split(" ")[0]; 
        // split   공백으로 구별하기
    if(firstClassName === "todo-update" && eventType ==="click"){
        updateTodoContents(event, token);
        return;
    }
    // ㄷ. delete 이벤트 처리
    if(firstClassName === "todo-delete" && eventType ==="click"){
        deleteTodo(event, token);
        return;
    }
}

async function createTodo(event, token){
    const contents = event.target.value;
    const type = event.target.closest(".matrix-item").id;
    console.log(contents , type);

    if(!contents){
        alert ("내용을 입력해주세요");
        return false;
    }

    const  config={
        method :"post",
        url : url+ "/todo",
        headers :{"x-access-token":token},
        data:{
            contents : contents,
            type : type,
        },

    };
    try{
        const res = await axios(config);

        if(res.data.code !==200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        event.target.value="";
        return true;
    
    }catch(err){
        console.error(err);
        return false;
    }
}

async function updateTodoDone(event, token){
    console.log(event.target.checked);
    const status = event.target.checked ? "C" : "A" ;
    const todoIdx = event.target.closest(".list-item").id;
    console.log(event.target.checked);
    console.log(status);
    //console.log(todoIdx);
    const  config={
        method :"patch",
        url : url + "/todo",
        headers :{"x-access-token":token},
        data:{
            todoIdx : todoIdx,
            status : status,
        },

    };
    try{
        const res = await axios(config);

        if(res.data.code !==200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        // event.target.value="";
        // return true;
    
    }catch(err){
        console.error(err);
        return false;
    }
}

async function updateTodoContents(event, token){
    //console.log(event.target.checked);
    const contents = prompt("내용을 입력해 주세요");
    const todoIdx = event.target.closest(".list-item").id;

    //console.log(todoIdx);
    const  config={
        method :"patch",
        url : url + "/todo",
        headers :{"x-access-token":token},
        data:{
            todoIdx : todoIdx,
            contents : contents,
        },

    };
    try{
        const res = await axios(config);

        if(res.data.code !==200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        // event.target.value="";
        // return true;
    
    }catch(err){
        console.error(err);
        return false;
    }
}

async function deleteTodo(event, token){

    const isValidReq = confirm("삭제하세겠습니까 ? 삭제후에는 복구가 어렵습니다.");
    
    if(!isValidReq){
        return false;
    }

    
    const todoIdx = event.target.closest(".list-item").id;
    const  config={
        method :"delete",
        //url : url + "/todo/" + todoIdx,
        url : url + `/todo/${todoIdx}`,
        headers :{"x-access-token":token},
       

    };
    try{
        const res = await axios(config);

        if(res.data.code !==200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        // event.target.value="";
        // return true;
    
    }catch(err){
        console.error(err);
        return false;
    }
}

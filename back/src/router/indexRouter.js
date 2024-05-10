const indexController = require("../controller/indexController");
const {jwtMiddleware}= require("../../jwtMiddleware");

exports.indexRouter = function (app){

    //일정 CRUD  API
    app.post("/todo", jwtMiddleware, indexController.createTodo);  //create   
                                                       // indexController.createTodo 전에  jwtMiddleware 실행함 token 검증
    app.get("/todos", jwtMiddleware,indexController.readTodo) ; //read// 일번유저의 할일들      user/1/todos
    app.patch("/todo", jwtMiddleware,indexController.updateTodo) ;  // update
    app.delete("/todo/:todoIdx",jwtMiddleware,indexController.deleteTodo) // delete         user/1/todo/1



    app.get(
        "/dummy",
        function(req,res,next){
            console.log(1);
            next();
        },
        function(req,res,next){
            console.log(2);
            next();
        },
        function(req,res,next){
            console.log(3);
            next();
        }
    );
};
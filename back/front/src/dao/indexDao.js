const {pool} = require("../../database");

exports.getUserRows= async function(){
    try{
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            const selectUserQuery ="SELECT * FROM Users;";

            const [row] = await connection.query(selectUserQuery);
            connection.release();
            return row;

        } catch (err){
            console.error("### getUserRows Query error ###");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### getsUserRows DB error ####");
        return false;

    }
};


exports.insertTodo= async function(userIdx , contents, type){
    try{
        //DB 연결검사
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            //쿼리
            const insertTodoQuery ="insert into Todos (userIdx, contents, type) values (?,?,?);";
            const insertTodoParams =[userIdx , contents, type];

            const [row] = await connection.query(insertTodoQuery,insertTodoParams );
            connection.release();
            return row;

        } catch (err){
            console.error("### insertTodoQuery Query error ### \n ${err}");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### insertTodoQuery DB error #### \n ${err}");
        return false;

    }
};



exports.selectTodoByType = async function(userIdx,type){
    try{
        //DB 연결검사
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            //쿼리
            const selectTodoByTypeQuery =
             "select todoIdx, contents , status from  Todos where userIdx = ? and type = ? and not(status ='D');";
            const selectTodoByTypeParams =[userIdx ,type];

            const [row] = await connection.query(selectTodoByTypeQuery, selectTodoByTypeParams );
            connection.release();
            return row;

        } catch (err){
            console.error("### selectTodoByTypeQuery Query error ### \n ${err}");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### selectTodoByTypeQuery DB error #### \n ${err}");
        return false;

    }
};


// 유효성 검사
exports.selectValidTodo = async function(userIdx, todoIdx){
    try{
        //DB 연결검사
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            //쿼리
            const selectValidTodoQuery =
             "select * from Todos where userIdx = ? and todoIdx = ? and not(status ='D');";
            const selectValidTodoParams =[userIdx ,todoIdx];

            const [row] = await connection.query(
                selectValidTodoQuery, selectValidTodoParams
             );
            connection.release();
            return row;

        } catch (err){
            console.error("### selectValidTodo Query error ### \n ${err}");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### selectValidTodo DB error #### \n ${err}");
        return false;

    }

};


// 수정
exports.updateTodo = async function(userIdx, todoIdx, contents, status){
    try{
        //DB 연결검사
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            //쿼리
            const updateTodoQuery =
             "update Todos set contents = ifnull(?,contents) , status = ifnull(?,status) where userIdx = ? and todoIdx =?;";
            const updateTodoParams =[contents, status, userIdx, todoIdx];

            const [row] = await connection.query(
                updateTodoQuery, updateTodoParams
             );
            connection.release();
            return row;

        } catch (err){
            console.error("### updateTodo Query error ### \n ${err}");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### updateTodo DB error #### \n ${err}");
        return false;

    }
};

exports.deleteTodo = async function(userIdx, todoIdx){

    try{
        //DB 연결검사
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            //쿼리
            const deleteTodooQuery =
             "update Todos set status = 'D' where userIdx = ? and todoIdx =?;";
            const deleteTodoParams =[userIdx, todoIdx];

            const [row] = await connection.query(
                deleteTodooQuery, deleteTodoParams
             );
            connection.release();
            return row;

        } catch (err){
            console.error("### deleteTodo Query error ### \n ${err}");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### deleteTodo DB error #### \n ${err}");
        return false;

    }
};

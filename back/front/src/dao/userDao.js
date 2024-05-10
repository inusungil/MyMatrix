const {pool} = require("../../database");


//         **********  회원가입 *************

exports.insertUser = async function(email, password, nickname){
    try{
        //DB 연결검사
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            //쿼리
            const insertUserQuery =
                "insert into Users (email, password, nickname) values (?,?,?);";
            const insertUserParams =[email, password, nickname];

            const [row] = await connection.query(insertUserQuery, insertUserParams );
            connection.release();
            return row;

        } catch (err){
            console.error("### insertUser Query error ### \n ${err}");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### insertUser DB error #### \n ${err}");
        return false;

    }
};

//         **********  중복회원 검사 *************

exports.selectUserByEmail = async function(email){
    try{
        //DB 연결검사
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            //쿼리
            const selectUserByEmailQuery =
                "select * from Users where email = ?;";
            const selectUserByEmailParams =[email];

            const [row] = await connection.query(selectUserByEmailQuery,selectUserByEmailParams );
            connection.release();
            return row;

        } catch (err){
            console.error("### selectUserByEmail Query error ### \n ${err}");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### selectUserByEmail DB error #### \n ${err}");
        return false;

    }
};

//         **********  로그인 *************

exports.selectUser = async function(email, password){
    try{
        //DB 연결검사
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            //쿼리
            const selectUserlQuery = "select * from Users where email = ? and password = ?;";
            const selectUserParams =[email, password];

            const [row] = await connection.query(selectUserlQuery,selectUserParams );
            connection.release();
            return row;

        } catch (err){
            console.error("### selectUser Query error ### \n ${err}");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### selectUser DB error #### \n ${err}");
        return false;

    }
}

exports.selectNicknameByUserIdx =async function(userIdx){
    try{
        //DB 연결검사
        const connection = await pool.getConnection(async(conn) =>  conn);
        try{
            //쿼리
            const selectNicknameByUserIdxQuery = "select * from Users where userIdx = ?;";
            const selectNicknameByUserIdxParams =[userIdx];

            const [row] = await connection.query(selectNicknameByUserIdxQuery,selectNicknameByUserIdxParams );
            connection.release();
            return row;

        } catch (err){
            console.error("### selectNicknameByUserIdx Query error ### \n ${err}");
            connection.release();
            return false;

        }

    } catch(err){
        conseol.error(" #### selectNicknameByUserIdx DB error #### \n ${err}");
        return false;

    }
};
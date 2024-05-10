// axios({
//     method: "post",
//     url: "http://127.0.0.1:3000/sign-in",
//     headers: {},
//     data: {email:"test1117@naver.com", password:"aaaa1111"},
// })
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

// axios({
//     method: "post",
//     url: "http://127.0.0.1:3000/user",
//     headers: {},
//     data: {email:"test1117@naver.com", password:"aaaa1111", nickname:"짱구친구1"},
// })
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });    
console.log("axiosTest.js");
async function dummy(){
    try{
        const res = await axios({
            method: "post",
            url: "http://127.0.0.1:3000/sign-in",
            headers: {},
            data: {email:"test11@naver.com", password:"aaaa1111"},
        });
        console.log(res);
    } catch(err){
        console.error(err);	
    }
}


dummy();
// const token = localStorage.getItem("x-access-token");
// console.log(token);
// const unsigned = document.querySelector(".unsigned");
// unsigned.classList.add("hidden");
// console.log(2);
// console.log(url);
setHeader();
async function setHeader(){
    //로컬스토리지에 토큰 존재여부 검사
    const token = localStorage.getItem("x-access-token");
    console.log(token);
    // 토큰이 없으면 signed에 hidden 클래스 붙이기

    if(!token){
        const signed = document.querySelector(".signed");
        signed.classList.add("hidden");
        return;
    }
 
    const config ={
        method :"get",
        url : url + "/jwt",
        headers: {
            "x-access-token" : token,
        }
    };
    // console.log(config);
    // try{
    //     const res = await axios(config);
    //     alert(res.data.message);
    // }catch(err){
    //     console.log(err);
    // }
    const res = await axios(config);
   // console.log(res.data.code);

    if(res.data.code !== 200){
        console.log("잘못된 토큰입니다.");   //서버에 로그남길것
        return;
    }

    const nickname = res.data.result.nickname;

    const spanNickname = document.querySelector("span.nickname");
    spanNickname.innerText = nickname;          //Text update

    // 토큰이 있으면 unsigned에  hidden 클래스 붙이기
    const unsigned = document.querySelector(".unsigned");
    unsigned.classList.add("hidden");

}
////###############  로그 아웃 기능 ###############

const buttonSignout = document.getElementById("sign-out");

buttonSignout.addEventListener("click", signout);

function signout(){
    localStorage.removeItem("x-access-token");
    location.reload();
}




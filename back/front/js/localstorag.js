// 로컬스토리지 데이터 생성
localStorage.setItem("x-access-token", "dummy1 token");

// 로컬스토리지 데이터 조회
const aaa =localStorage.getItem("x-access-token");
console.log(aaa);

//로컬스토리지 데이터 
localStorage.removeItem("x-access-token");
const bbb =localStorage.getItem("x-access-token");
console.log(bbb);
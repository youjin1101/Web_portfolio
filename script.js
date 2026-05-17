const loginbox = document.getElementById("loginbox");
const loginbtn = document.getElementById("loginbtn");
    /* 자바 스크립트 로그아웃 함수 */
    function logout() {
        localStorage.removeItem("loginuser");
        location.reload();
    }
    const loginuser = localStorage.getItem("loginuser");
    if(loginuser) {
        // 우측, 우측 상단의 로그인 박스 내용 변경 //
        loginbox.innerHTML =`
        <h3>${loginuser}님 환영합니다.</h3>
        <button onclick = "logout()">Logout</button>`
        loginbtn.innerText = "Logout";
        loginbtn.onclick = function() {logout();}
        };
        /* ======= 자바스크립트 로그인 함수 ====== */
    function login() {
        /* ID, password null 체크 후 로그인창에
        input으로 입력된 값들 가져오기 */
        const usernameNULL = document.getElementById("username");
        if (!usernameNULL) return;
        const username = usernameNULL.value
       const passwordNULL = document.getElementById("password");
       if (!passwordNULL) return;
       const password = passwordNULL.value
        
        /* 로그인 결과 메시지 가져오기 ! */
        const message = document.getElementById("message");

        /* 미리 정해둔 계정 아이디 비밀번호 */
        const correctID = "lotte";
        const correctPW = "1982";
        /* 아이디 비밀번호 일치 여부 */
        if (
            username === correctID &&
            password === correctPW
        ) {
            localStorage.setItem("loginuser", username);
            message.innerText = "로그인 되었습니다.";
            message.style.color = "black";
            /* 메인 페이지로 이동 */
            setTimeout(function() {
                window.location.href = "index.html";
            }, 1500);
        } else {
            message.innerText = "아이디 또는 비밀번호가 틀렸습니다.";
            message.style.color = "red";
        }
    }
// 모바일의 사이드바 등등 구현!! JS는 클래스 띠부띠부만 함
// sidebar open.    active 클래스 붙이면 css에서 정의한 .active스타일 적용 됨
// classList.add = 해당 요소에 클래스를 추가하는 거!
function openSidebar() {
    document.getElementById("sidebar").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}
// sidebar close.   active 클래스 삭제시 active스타일도 삭제
// classList.remove = 해당 요소에서 class를 제거함
function closeSidebar () {
    document.getElementById("sidebar").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}


/* = = = = = = = = = 카트 기능 구현 = = = = = = = */
const product = {
    name : ""
}


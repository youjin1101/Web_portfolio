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
        loginbtn.onclick = ` function() {
            logout();
        }
        `};
        /* 자바스크립트 로그인 함수 */
    function login() {
        /* 로그인창에 input으로 입력된 값들 가져오기 */
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
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
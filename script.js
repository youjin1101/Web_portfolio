const loginbox = document.getElementById("loginbox");   
const loginbtn = document.getElementById("loginbtn");
    /* ==== 자바 스크립트 로그아웃 함수 ==== */
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
};


/* = = = = = = = = = 카트 기능 구현 = = = = = = = */
let cart =
JSON.parse(
    localStorage.getItem("cart")
) || [];
/* JSON.stringfy()는 배열/객체-> 문자열로 저장, JSON.parse()는 문자열->배열/객체 저장 */
/* localStorage는 글자만 저장! 그래서 배열로 바꿔야함  */
/*  JSON.parse쓰면 [] -> 배열 이렇게 바뀜 */

/*  ======== addcart 장바구니 담기 기능 ======== */
function addcart (
    name,
    price,
    image
) {
    const loginuser = localStorage.getItem("loginuser");
    if(!loginuser) {
        alert("로그인 후 이용 가능합니다.");
        return;
    }
    const nowproduct = cart.find(
        item => item.name === name); 
    /* === cart. 안에서 item name 같은 거 있는지 find ===
            = 는 대입. == 는 비교(True or False로 나옴). 
            === 는 값과 자료형태 모두 같아야 True 줌  */
    if(nowproduct) {
        nowproduct.quantity++;
    }
    else {
        const product = {
            name,
            price,
            image,
            quantity : 1
            };
        cart.push(product);
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    alert(
        "장바구니에 추가되었습니다!"
    );
}

const cartlist =
document.getElementById("cartlist");
if(cartlist) {
    let total = 0;
    /*   로그인 안 했을 경우!!   */
    if(!loginuser) {
        cartlist.innerHTML =`
        <h2>
        로그인 후 이용 가능합니다.
        </h2>
        `;
    }
    else {
            
        /* 총액변수 , for 문으로 장바구니 상품 mycart.html에 출력 */
        if (cart.length === 0) {
            cartlist.innerHTML =`
            <h3> 장바구니가 비어있습니다. </h3>
            `;
        }
        else {
            for (
                let i = 0;
                i < cart.length;
                i++
            ) {
                total +=
                cart[i].price * cart[i].quantity;   /* 가격 곱하기 갯수 */
                // cart 체크박스 선택 삭제 cart 체크박스 선택 삭제 cart 체크박스 선택 삭제
                cartlist.innerHTML += `
                    <div class = "cart-item">
                        <img
                        src="${cart[i].image}"
                        width="150">
                        <h3> ${cart[i].name}</h3>
                        <p>
                            가격 : ₩${cart[i].price}
                        </p>
                        <p>
                            수량 : ${cart[i].quantity}
                        </p>
                        <button class="deletebtn" onclick="deleteproduct(${i})">
                            삭제
                        </button>
                    </div>`;
            }
        } // cart delete button , total 금액 출력 //
                cartlist.innerHTML +=`
                <hr>
                <h2 class="carttotal">
                총 금액 : ₩${total.toLocaleString()}원
                </h2>
                `;
    }
}
// cart delete 함수 cart delete 함수 cart delete 함수 cart delete 함수
function deleteproduct(index) {
    cart.splice(
        index,
        1
    );
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    location.reload();
}

/*   이제 마이페이지 장바구니 화면 구현하고 장바구니 담은 템 삭제하는 거랑
   장바구니 버튼 밤티인 거 뜯어고치기 , 장바구니 수량만 증가되게 find()로 구현하기 */





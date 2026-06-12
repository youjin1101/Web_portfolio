const loginbox = document.getElementById("loginbox");   
const loginbtn = document.getElementById("loginbtn");

/* ==== 자바 스크립트 로그아웃 함수 ==== */
function logout() {
    localStorage.removeItem("loginuser");
    location.reload();
}

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
        alert("로그인 되었습니다.");
        location.href = "index.html";
    } else {
        message.innerText = "아이디 또는 비밀번호가 틀렸습니다.";
        message.style.color = "red";
    }
    
}

const loginuser = localStorage.getItem("loginuser");

if(loginuser) {
// 우측, 우측 상단의 로그인 박스 내용 변경 //
    loginbox.innerHTML =`
    <h3>${loginuser}님 환영합니다.</h3>
    <button onclick = "logout()">Logout</button>`;
    loginbtn.innerText = "Logout";
    upperloginbtn.innerText = "Logout";
    upperloginbtn.onclick = function() {logout();}
    loginbtn.onclick = function() {logout();}
};

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
// mypage mypage mypage mypage mypage
const myinfo =
    document.getElementById("myinfo");
    if(myinfo) {
        if(!loginuser) {
            myinfo.innerHTML = `
            <h3> 로그인 후 이용 가능합니다. </h3>
            `;
        }
        else {
            myinfo.innerHTML = `
            <div class = "mypagecard">
                <h3>${loginuser}님</h3>
                <p>등급 : 일반회원</p>
                <p>가입일 : 2026.05.22</p>
                <p>보유 포인트 : 3,000P</p>
            </div>
                `;
        }
    }

/* = = = = = = = = = 카트 기능 구현 = = = = = = = */

/* JSON.stringfy()는 배열/객체-> 문자열로 저장, JSON.parse()는 문자열->배열/객체 저장 */
/* localStorage는 글자만 저장! 그래서 배열로 바꿔야함  */
/*  JSON.parse쓰면 [] -> 배열 이렇게 바뀜 */

/*  ======== addcart 장바구니 담기 기능 ======== */
let cart =
        JSON.parse(
            localStorage.getItem("cart")
        )
        || [];
function addcart (
    name,
    price,
    image
) {
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
/*   로그인 안 했을 경우!!   */

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
                        <div class="quantitybox">
                            <button class="minusplusbtn" onclick="minusQuantity(${i})">
                            -
                            </button>
                            <span> 수량 : ${cart[i].quantity} </span>
                            <button class="minusplusbtn" onclick="plusQuantity(${i})">
                            +
                            </button>

                        </div>
                        <button class="deletebtn" onclick="deleteproduct(${i})">
                            삭제
                        </button>
                    </div>`;
            }
        } // cart delete button , total 금액 출력 //
        cartlist.innerHTML +=`
        <div class="cartfooter">
            <button class="orderbtn" onclick="ordercart()">
            주문하기
            </button>
            <hr>
            <h2 class="carttotal">
                총 금액 : ₩${total.toLocaleString()}원
            </h2>
        </div>
        `;
    }
}

// cart delete cart delete cart delete cart deletete cart delete
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
// cart product plus minus function //
function minusQuantity(index) {
    if (
        cart[index].quantity > 1
    ) {
        cart[index].quantity --;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function plusQuantity(index) {
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
/* order button order button order button order button   */
function ordercart() {
    if(cart.length === 0) {
        alert("장바구니가 비어있습니다.");
        location.reload();
    }
    else {
        alert("주문이 완료되었습니다.");
        localStorage.removeItem("cart");
        location.reload();
    }
}

/*   이제 마이페이지 장바구니 화면 구현하고 장바구니 담은 템 삭제하는 거랑
장바구니 버튼 밤티인 거 뜯어고치기 , 장바구니 수량만 증가되게 find()로 구현하기 */





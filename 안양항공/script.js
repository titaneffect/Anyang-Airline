document.getElementById("login-btn").addEventListener("click", function() {
    // 로그인 버튼 클릭 시 기본 폼 제출을 막습니다.
    event.preventDefault()
    alert("Login functionality here!");
    window.location.href = "reservation.html";
    
});

document.getElementById("signup-btn").addEventListener("click", function() {
    // 회원가입 버튼 클릭 시 새 창을 열면서 회원가입 페이지로 이동
    const width = 400; // 창 너비
    const height = 600; // 창 높이
    // 화면 크기 가져오기
    const screenWidth = screen.width;
    const screenHeight = screen.height;
 
    // 새 창을 띄울 위치 계산
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    window.open(
        "signup.html", // 새 창에서 열릴 URL
        "회원가입", // 새 창의 이름 (고유)
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
});

document.getElementById("createAccountBtn").addEventListener("click", function() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    // 서버로 데이터를 보냅니다.
    fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: newUsername, password: newPassword })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message); // 서버의 응답 메시지 표시
        if (result.success) {
            window.location.href = "index.html"; // 회원가입 성공 시 로그인 페이지로 이동
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

document.getElementById("submitBtn").addEventListener("click", function() {
    // 입력된 값을 가져옵니다.
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 서버로 보낼 데이터를 구성합니다.
    const data = { username, password };

    // Fetch API를 사용하여 POST 요청을 보냅니다.
    fetch("http://localhost:5000/login", {  // 서버 주소를 입력
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log("Server Response:", result);
        alert(result.message);  // 서버로부터의 메시지를 표시
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

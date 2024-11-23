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

document.getElementById("request-button-layout1").addEventListener("click", async() => {
    const input = document.getElementById("user-input-layout1").value;

    try {
        const res = await fetch(BASE_URL+"/api/session");
        const data = await res.json();
        const sessionid = data.session_id;
        sessionStorage.setItem("session_id", sessionid);

        document.getElementById("layout1").style.display = "none";
        document.getElementById("layout2").style.display = "block";
        
        const requestButten = document.getElementById("request-button-layout2");
        requestButten.disabled = true;
        document.getElementById("send-button-text-layout2").textContent ="···";

        const mainDiv = document.querySelector("#layout2 .message-container");
        const messageDiv = document.createElement("div");
        messageDiv.className = "send-message";
        messageDiv.textContent = input;
        mainDiv.appendChild(messageDiv);

        const responsemessageDiv = document.createElement("div");
        responsemessageDiv.className = "response-message";
        responsemessageDiv.textContent = "생각하는중...";
        mainDiv.appendChild(responsemessageDiv);

        const response = await fetch(BASE_URL+"/api/ai/non-member", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({session_id: sessionStorage.getItem("session_id"), message: input}),
        });

        const result = await response.json();
        console.log(result);

        responsemessageDiv.innerHTML = result.message;

        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise();
        }         

        requestButten.disabled = false;
        document.getElementById("send-button-text-layout2").textContent =">";
    } catch (error) {
        console.error("API request FAIL: ", error);
    }
});

document.getElementById("request-button-layout2").addEventListener("click", async() => {
    const input = document.getElementById("user-input-layout2").value;
    document.getElementById("user-input-layout2").value = "";

    try {
        const requestButten = document.getElementById("request-button-layout2");
        requestButten.disabled = true;
        document.getElementById("send-button-text-layout2").textContent ="···";

        const mainDiv = document.querySelector("#layout2 .message-container");
        const messageDiv = document.createElement("div");
        messageDiv.className = "send-message";
        messageDiv.textContent = input;
        mainDiv.appendChild(messageDiv);

        const responsemessageDiv = document.createElement("div");
        responsemessageDiv.className = "response-message";
        responsemessageDiv.textContent = "생각하는중...";
        mainDiv.appendChild(responsemessageDiv);

        const response = await fetch(BASE_URL+"/api/ai/non-member", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({session_id: sessionStorage.getItem("session_id"), message: input}),
        });

        const result = await response.json();
        console.log(result);
        
        responsemessageDiv.innerHTML = result.message;

        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise();
        }        

        requestButten.disabled = false;
        document.getElementById("send-button-text-layout2").textContent =">";
    } catch (error) {
        console.error("API request FAIL: ", error);
    }
});

document.getElementById("logo").addEventListener("click", () => {
    location.reload();
});
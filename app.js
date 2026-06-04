const loginBtn =
document.getElementById("loginBtn");

const uploadBereich =
document.getElementById("uploadBereich");

loginBtn.addEventListener("click", () => {

    const passwort =
    prompt("Operator-Passwort eingeben:");

    if(passwort === "1234"){

        alert("Operator angemeldet");

        uploadBereich.style.display =
        "block";

    } else {

        alert("Falsches Passwort");

    }

});

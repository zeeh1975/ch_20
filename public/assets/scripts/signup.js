const loginForm = document.querySelector("#loginform");
const passwordConfirmation = document.querySelector("#passwordconfirmation");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#loginbutton");

// submit formulario login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signup();
});

loginButton.addEventListener("click", doLogin);

passwordConfirmation.addEventListener("keydown", clearPasswordError);
password.addEventListener("keydown", clearPasswordError);

function clearPasswordError() {
  passwordConfirmation.classList.remove("is-invalid");
}

function doLogin() {
  window.location = "/login";
}

async function signup() {
  if (loginForm.password.value != loginForm.passwordconfirmation.value) {
    passwordConfirmation.classList.add("is-invalid");
    passwordConfirmation.focus();
    return;
  }

  try {
    const host = window.location.protocol + "//" + window.location.host;
    const destURL = new URL("/signup", host);
    const responseData = await fetch(destURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginForm.username.value,
        password: loginForm.password.value,
      }),
    });
    if (responseData.status === HTTP_STATUS_OK) {
      document.location.href = "/";
    } else {
      // si el resultado no es el esperado
      // se muestra un mensaje con el error
      response = await responseData.json();

      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: response.message,
      });
    }
  } catch (error) {
    console.log("error=", error);
  }
}

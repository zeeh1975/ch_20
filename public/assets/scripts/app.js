const socket = io.connect();
const productForm = document.querySelector("#productForm");
const chatForm = document.querySelector("#chatForm");
const porcentajeCompresion = document.querySelector("#porcentajecompresion");
const labelUsuario = document.querySelector("#labelusuario");

// Envia una petición al servidor de
// añadir un nuevo producto mediante fetch
async function addProduct() {
  try {
    const host = window.location.protocol + "//" + window.location.host;
    const destURL = new URL("/api/productos", host);
    const responseData = await fetch(destURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: productForm.title.value,
        price: productForm.price.value,
        thumbnail: productForm.thumbnail.value,
      }),
    });
    if (responseData.status === HTTP_STATUS_CREATED) {
      productForm.reset();
      productForm.title.focus();
    } else {
      // si el resultado no es el esperado
      // se muestra un mensaje con el error
      response = await responseData.json();

      if (typeof Swal !== "undefined") {
        await Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: response.error,
        });
      } else {
        alert(response.error);
      }
      if (responseData.status === HTTP_STATUS_ERROR_UNAUTHORIZED) {
        window.location = "/";
      }
    }
  } catch (error) {
    console.log("error=", error);
  }
}

async function doLogout() {
  result = await Swal.fire({
    title: "¿Está seguro que quiere salir?",
    icon: "question",
    showCancelButton: true,
    showConfirmButton: false,
    showDenyButton: true,
    cancelButtonText: "No",
    denyButtonText: "Si",
  });
  if (result.isDenied) {
    window.location = "/logout";
  }
}

// submit formulario productos
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct();
});

// submit formulario chat
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

// renderiza la lista de productos mediante la
// plantilla predefinida
function makeProductTable(productos) {
  return fetch("/assets/views/tabla_productos.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return html;
    });
}

// renderiza la lista de mensajes del chat
// con la plantilla predefinida
function makeChatTable(mensajes) {
  return fetch("/assets/views/tabla_chat.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ mensajes });
      return html;
    });
}

// websocket: envia un nuevo mensaje
// de chat al servidor
function sendMessage() {
  const mensaje = {
    author: {
      email: chatForm.email.value,
      nombre: chatForm.nombre.value,
      apellido: chatForm.apellido.value,
      edad: chatForm.edad.value,
      alias: chatForm.alias.value,
      avatar: chatForm.avatar.value,
    },
    text: chatForm.mensaje.value,
  };
  socket.emit("mensaje", mensaje);
  chatForm.mensaje.value = "";
  chatForm.mensaje.focus();
}

// websocket: recibe la lista de productos
socket.on("productos", (productos) => {
  makeProductTable(productos).then((html) => {
    document.getElementById("productos").innerHTML = html;
  });
});

// websocket: recibe los mensajes de chat
socket.on("mensajes", (mensajes) => {
  const authorSchema = new normalizr.schema.Entity("authors", {}, { idAttribute: "email" });
  const messageSchema = new normalizr.schema.Entity("message", {
    author: authorSchema,
  });
  const messagesSchema = [messageSchema];
  const mensajesDenormalizados = normalizr.denormalize(
    mensajes.result,
    messagesSchema,
    mensajes.entities
  );
  // calcular porcentaje de compresion
  let porcentaje;
  try {
    const tamanioDenormalizado = JSON.stringify(mensajesDenormalizados).length;
    const tamanioNormalizado = JSON.stringify(mensajes).length;
    porcentaje = (tamanioNormalizado * 100) / tamanioDenormalizado;
  } catch (error) {
    porcentaje = 0;
  }
  let compressionText = "";
  if (mensajesDenormalizados.length > 0) {
    compressionText = "Compresión\r\n" + porcentaje.toFixed(2) + "%";
  }
  porcentajeCompresion.textContent = compressionText;
  makeChatTable(mensajesDenormalizados).then((html) => {
    document.getElementById("mensajes").innerHTML = html;
  });
});

// Acualizar la etiqueta con el nombre de usuario
async function updateUserName() {
  try {
    const host = window.location.protocol + "//" + window.location.host;
    const destURL = new URL("/user", host);
    const responseData = await fetch(destURL, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (responseData.status === HTTP_STATUS_OK) {
      response = await responseData.json();
      labelUsuario.innerHTML = "Bienvenido " + response.usuario + labelUsuario.innerHTML;
    }
    // click logout
    const logoutButton = document.querySelector("#logoutbutton");
    logoutButton.addEventListener("click", doLogout);
  } catch (error) {
    console.log("error=", error);
  }
}

updateUserName();

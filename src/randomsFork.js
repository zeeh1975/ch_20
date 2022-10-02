const { buildRandomNumberList } = require("./util");

let cantidad;
if (process.argv[2]) {
  const cant = +process.argv[2];
  if (Number.isInteger(cant)) {
    cantidad = cant;
  }
}

process.on("message", (msg) => {
  if (msg === "start") {
    console.log("fork started: " + cantidad);
    const res = buildRandomNumberList(cantidad);
    console.log("fork completed: " + res.length);
    process.send(JSON.stringify(res));
    process.exit();
  }
});

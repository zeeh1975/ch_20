class ChatDto {
  constructor(datos) {
    this.author = {};
    this.author.email = datos.author.email;
    this.author.nombreCompleto = datos.author.nombre + " " + datos.author.apellido;
    this.author.edad = datos.author.edad;
    this.author.alias = datos.author.alias;
    this.author.avatar = datos.author.avatar;
    this.text = datos.text;
    this.fechahora = datos.fechahora;
    this.id = datos.id;
  }
}

export default ChatDto;

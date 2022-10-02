const validEmailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const validUrlRegex =
  /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/;
const HTTP_STATUS_ERROR_BAD_REQUEST = 400;
const HTTP_STATUS_ERROR_UNAUTHORIZED = 401;
const HTTP_STATUS_ERROR_NOT_FOUND = 404;
const HTTP_STATUS_ERROR_INTERNAL_SERVER_ERROR = 500;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const PRODUCTO_INEXISTENTE = "El producto no existe";
const CARRITO_INEXISTENTE = "El id de carrito no es valido";

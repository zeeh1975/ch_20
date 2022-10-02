import ChatFactoryDao from "../daos/chat/ChatFactoryDao.js";
import { chatDaoType } from "../config/config.js";

const itemsMuestra = [
  {
    author: {
      email: "mdelgadillo@hotmail.com",
      nombre: "Miguel",
      apellido: "Delgadillo",
      edad: 49,
      alias: "mdelgadillo",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1168.jpg",
    },
    text: "Quis eius distinctio. Veniam nisi sint aut et aut.",
    fechahora: "2022-07-28 13:33",
    id: 1,
  },
  {
    author: {
      email: "mam97@hotmail.com",
      nombre: "Marco Antonio",
      apellido: "Mesa",
      edad: 25,
      alias: "mam97",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/437.jpg",
    },
    text: "Ab est ut consequatur saepe asperiores dolore eos eius.",
    fechahora: "2022-07-28 13:34",
    id: 2,
  },
  {
    author: {
      email: "Leticia.Lemus81@yahoo.com",
      nombre: "Leticia",
      apellido: "Lemus",
      edad: 46,
      alias: "lemus81",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/761.jpg",
    },
    text: "Unde maxime natus ut.",
    fechahora: "2022-07-28 13:36",
    id: 3,
  },
  {
    author: {
      email: "Armando5@gmail.com",
      nombre: "Armando",
      apellido: "Santillán",
      edad: 49,
      alias: "asan73",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1039.jpg",
    },
    text: "Numquam voluptas voluptates qui.",
    fechahora: "2022-07-28 13:37",
    id: 4,
  },
  {
    author: {
      email: "Guillermo29@hotmail.com",
      nombre: "Guillermo",
      apellido: "Ávalos",
      edad: 34,
      alias: "matador88",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1176.jpg",
    },
    text: "Quia error quidem ex ad reiciendis sunt.",
    fechahora: "2022-07-28 13:38",
    id: 5,
  },
  {
    author: {
      email: "mdelgadillo@hotmail.com",
      nombre: "Miguel",
      apellido: "Delgadillo",
      edad: 49,
      alias: "mdelgadillo",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1168.jpg",
    },
    text: "Veniam nisi sint aut et aut. Quis eius distinctio.",
    fechahora: "2022-07-28 13:42",
    id: 6,
  },
  {
    author: {
      email: "Armando5@gmail.com",
      nombre: "Armando",
      apellido: "Santillán",
      edad: 49,
      alias: "asan73",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1039.jpg",
    },
    text: "Unde maxime natus ut. Numquam voluptas voluptates qui.",
    fechahora: "2022-07-28 13:55",
    id: 7,
  },
  {
    author: {
      email: "mam97@hotmail.com",
      nombre: "Marco Antonio",
      apellido: "Mesa",
      edad: 25,
      alias: "mam97",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/437.jpg",
    },
    text: "Asperiores dolore eos eius.",
    fechahora: "2022-07-28 14:25",
    id: 8,
  },
  {
    author: {
      email: "Armando5@gmail.com",
      nombre: "Armando",
      apellido: "Santillán",
      edad: 49,
      alias: "asan73",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1039.jpg",
    },
    text: "Quis eius distinctio.",
    fechahora: "2022-07-28 14:26",
    id: 9,
  },
  {
    author: {
      email: "mdelgadillo@hotmail.com",
      nombre: "Miguel",
      apellido: "Delgadillo",
      edad: 49,
      alias: "mdelgadillo",
      avatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1168.jpg",
    },
    text: "Asperiores dolore eos eius.",
    fechahora: "2022-07-28 14:31",
    id: 10,
  },
];

async function insertTestData() {
  const chatDao = ChatFactoryDao.get(chatDaoType);
  await chatDao.deleteAll();
  for (let i = 0; i < itemsMuestra.length; i++) {
    console.log(await chatDao.save(itemsMuestra[i]));
  }
  console.log(await chatDao.getAll());
  await chatDao.disconnect();
}

insertTestData();

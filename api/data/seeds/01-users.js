const bcrypt = require("bcryptjs");

// import { v4 as uuidv4 } from "uuid";

// const v4options = {
//   random: [
//     0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
//     0x67, 0x1c, 0x58, 0x36,
//   ],
// };

exports.seed = function (knex) {
  return knex("users").insert([
    {
      id: 1,
      userId: 000000,
      firstName: "Jake",
      lastName: "Mey",
      password: bcrypt.hashSync("newPassWord2022!", process.env.HASH_ROUNDS),
      email: "jake.mey@cakenutrition.com",
      admin: true,
      author: true,
      authorId: 000000,
    },
    {
      id: 2,
      userId: 000001,
      firstName: "Matt",
      lastName: "Bergeron",
      password: bcrypt.hashSync("newPassWord2022_2!", process.env.HASH_ROUNDS),
      email: "mjbergeron@leyline.dev",
      admin: true,
      author: false,
      authorId: 000001,
    },
  ]);
};

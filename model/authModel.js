import { userDb } from "../db/db.js";

export const AuthModel = {
  login: (authDto) => {
    if (
      authDto.email === userDb.email &&
      authDto.password === userDb.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", {
        id: userDb.id,
        user_name: userDb.user_name,
        email: userDb.email,
      });
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.clear();
    if (!localStorage.getItem("isLoggedIn") && !localStorage.getItem("user")) {
      return true;
    }
    return false;
  },
  isLoggedIn: () => localStorage.getItem("isLoggedIn"),
  getUser: () => JSON.parse(localStorage.getItem("user")),
};

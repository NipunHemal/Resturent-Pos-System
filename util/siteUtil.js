import { loader } from "../component/Loader.js";
import { Login } from "../view/Login.js";

export const d_none = {
  display: "none",
};

export const d_block = {
  display: "block",
};

export const redirectToDashboard = () => {
  $("#login-section").remove();
  $("#nav-bar").css(d_block);
  $("#main-container").css(d_block);
  loader();
};

export const redirectToLogin = () => {
  const login = new Login();
  if (!localStorage.getItem("isLoggedIn")) {
    $("body").prepend(login.render());
    $("#nav-bar").css(d_none);
    $("#main-container").css(d_none);
    login.init();
  } else {
    redirectToDashboard();
  }
};

export const logout = () => {
  localStorage.clear();
  redirectToLogin();
};

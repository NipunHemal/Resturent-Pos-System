import AuthDto from "../dto/AuthDto.js";
import { AuthModel } from "../model/authModel.js";
import { redirectToDashboard } from "../util/siteUtil.js";
import { isEmpty, isEmailValid } from "../util/validation.js";
import { tost } from "../util/tostUtil.js";
import getAlert from "../component/alert.js";

export default class AuthController {
  constructor() {}

  init() {
    $("#login-section").on("submit", "#login-form", (e) => this.handleLogin(e));
  }

  handleLogin(e) {
    e.preventDefault();
    e.stopPropagation();
    $(e.currentTarget).addClass("was-validated");
    const form = $(e.currentTarget);
    const emailSection = form.find("input[name='email']");
    const passwordSection = form.find("input[name='password']");
    const email = emailSection.val().trim();
    const password = passwordSection.val().trim();

    const valid = isEmailValid(email) && !isEmpty(password);

    if (!valid) {
      $("#login-alert-section").html(
        getAlert("error", "Invalid email or password")
      );
      tost("Please fill all the fields correctly", "error");
      return;
    }

    const isLoggedIn = AuthModel.login(new AuthDto(email, password));
    if (isLoggedIn) {
      tost("Login successful", "success");
      redirectToDashboard();
    } else {
      $(e.currentTarget).removeClass("was-validated");
      $("#login-alert-section").html(
        getAlert("error", "Invalid email or password")
      );
      tost("Invalid email or password", "error");
    }
  }
}

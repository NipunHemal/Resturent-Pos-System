import { loader } from "../../component/Loader.js";
import { redirectToLogin } from "../../util/siteUtil.js";
import { tost } from "../../util/tostUtil.js";
// import { redirectToLogin } from "../../util/siteUtil.js";

$(window).on("load", function () {
  loader();
  redirectToLogin();
});

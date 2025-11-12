import { ItemCartOffcanvas } from "../../component/ItemCartOffcanvas.js";
import { loader } from "../../component/Loader.js";
import { redirectToLogin } from "../../util/siteUtil.js";
import { DashboardController } from "../../controller/DashboaedController.js";
import { ConfirmOrderModel } from "../../component/ConfirmOrderModel.js";

$(window).on("load", function () {
  loader();
  redirectToLogin();
});

$("body").append(ItemCartOffcanvas());
$("body").append(ConfirmOrderModel.render());

new DashboardController().init();

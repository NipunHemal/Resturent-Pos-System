import { loader } from "../component/Loader.js";
import { CustomerView } from "../view/CustomerView.js";
import { ItemsView } from "../view/ItemsView.js";
import { OrderHistoryView } from "../view/OrderHostoryView.js";
import { OrdersView } from "../view/OrdersView.js";
import { DashboardController } from "./DashboaedController.js";

export class NavBarController {
    constructor() {
        this._dashboardController = new DashboardController();
    }

    init() {
        $("#home-nav-link").addClass("txt-orange");
        $(".nav-link").on("click", (e) => {
            $(".nav-link").removeClass("txt-orange");
            $(e.currentTarget).addClass("txt-orange");
        })

        $("#home-nav-link").on("click", (e) => this.handleHomeClick(e));
        $("#items-nav-link").on("click", () => this.handelClickItemsBar());
        $("#orders-nav-link").on("click", () => this.handleOrdersClick());
        $("#customers-nav-link").on("click", () => this.handleCustomersClick());
        $('#order-history-nav-link').on('click', () => this.handleOrderHistoryClick());

    }

    handleHomeClick(e) {
        loader("dark");
        this._dashboardController.render();
        this._dashboardController.loadDashboard();
    }

    handelClickItemsBar() {
        loader("dark");
        console.log("Items clicked");
        $("#main-container").html(ItemsView())
    }

    handleOrdersClick() {
        loader("dark");
        console.log("Orders clicked");
        $("#main-container").html(OrdersView())
    }

    handleCustomersClick() {
        loader("dark");
        console.log("Customers clicked");
        $("#main-container").html(CustomerView())
    }

    handleOrderHistoryClick() {
        loader("dark");
        console.log("Order History clicked");
        $("#main-container").html(OrderHistoryView())
    }


}
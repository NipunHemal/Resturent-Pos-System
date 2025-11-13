import { loader } from "../component/Loader.js";
import renderCustomer from "../controller/CustomerController.js";
import { OrderHistoryView } from "../view/OrderHostoryView.js";
import { OrdersView } from "../view/OrdersView.js";
import { DashboardController } from "./DashboaedController.js";
import { ItemController } from "./ItemController.js";

export class NavBarController {
    constructor() {
        this._dashboardController = new DashboardController();
        this._itemsController = new ItemController();
        this._itemsController.render();
        this._itemsController.load();
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
        this._itemsController.render();
        this._itemsController.load();
    }

    handleOrdersClick() {
        loader("dark");
        console.log("Orders clicked");
        $("#main-container").html(OrdersView())
    }

    handleCustomersClick() {
        loader("dark");
        console.log("Customers clicked");
        renderCustomer();
    }

    handleOrderHistoryClick() {
        loader("dark");
        console.log("Order History clicked");
        $("#main-container").html(OrderHistoryView())
    }


}
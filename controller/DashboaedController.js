import { ConfirmOrderModel } from "../component/ConfirmOrderModel.js";
import { ItemCard } from "../component/ItemCard.js";
import {
  closeOffcanvas,
  loadCartItems,
} from "../component/ItemCartOffcanvas.js";
import { loader } from "../component/Loader.js";
import { SidebarContent } from "../component/SidebarItem.js";
import ItemModel from "../model/ItemModel.js";
import { tost } from "../util/tostUtil.js";

export class DashboardController {
  constructor() {
    this.init();
  }

  init() {
    $(window).on("load", () => this.loadDashboard());
  }

  loadDashboard() {
    this.loadSidebar();
    this.loadItems();
    this.loadCart();
  }

  loadSidebar() {
    const categories = ItemModel.getCategories();
    const sidebarItems = categories
      ?.map((category) => SidebarContent(category))
      .join("");
    $("#sidebar-content").html(sidebarItems);
    this.initializeSidebar();
  }

  initializeSidebar() {
    $("#sidebar-content").on("click", "a", (event) => {
      $("#sidebar-content a").removeClass("active");
      $(event.currentTarget).addClass("active");
      const category = $(event.currentTarget).data("category");
      loader("dark");
      this.loadItems(category);
    });
  }
  loadItems(category = null) {
    const items = category
      ? ItemModel.getItemsByCategory(category)
      : ItemModel.getAllItems();
    const itemsHtml = items?.map((item) => ItemCard(item)).join(" ");
    $("#order_item_container").html(itemsHtml);

    $("#order_item_container").on("click", "#add-product-to-cart", function () {
      const itemId = $(this).data("item-id");
      ItemModel.addToCart(itemId, 1);
      loadCartItems(ItemModel.getCart());
      tost("Item added to cart", "success");
    });
  }

  loadCart() {
    const cartItems = ItemModel.getCart();
    loadCartItems(cartItems);

    $("#cart-items").off("click", ".btn-plus");
    $("#cart-items").off("click", ".btn-minus");
    $("#cart-items").off("click", "#remove-item");

    $("#cart-items").on("click", ".btn-plus", function () {
      console.log("Plus button clicked");
      const itemId = $(this).data("item-id");
      const currentQty = ItemModel.incrementQuantity(itemId);
      loadCartItems(ItemModel.getCart());
    });
    $("#cart-items").on("click", ".btn-minus", function () {
      const itemId = $(this).data("item-id");
      ItemModel.decrementQuantity(itemId);
      loadCartItems(ItemModel.getCart());
    });
    $("#cart-items").on("click", "#remove-item", function () {
      const itemId = $(this).data("item-id");
      ItemModel.removeFromCart(itemId);
      loadCartItems(ItemModel.getCart());
    });
    $("#place-order-btn").on("click", () => {
      closeOffcanvas();
      ConfirmOrderModel.init();
      ConfirmOrderModel.open();
      ConfirmOrderModel.onConfirm(() => {
        // ItemModel.clearCart();
        // loadCartItems(ItemModel.getCart());
      });
    });
  }
}

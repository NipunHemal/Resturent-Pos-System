import { ItemCard } from "../component/ItemCard.js";
import { loadCartItems } from "../component/ItemCartOffcanvas.js";
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
    categories?.forEach((category) => {
      const sidebarItem = SidebarContent(category);
      $("#sidebar-content").append(sidebarItem);
    });
  }

  loadItems() {
    const items = ItemModel.getAllItems();
    console.log(items);
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
  }
}

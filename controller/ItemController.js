import { ItemActionModel } from "../component/ItemActionModel.js";
import { ItemCard } from "../component/ItemCardEdit.js";
import { loader } from "../component/Loader.js";
import { SidebarContent } from "../component/SidebarItem.js";
import ItemModel from "../model/ItemModel.js";
import { d_block, d_none } from "../util/siteUtil.js";
import { tost } from "../util/tostUtil.js";
import { ItemsView } from "../view/ItemsView.js";

export class ItemController {

    render() {
        $("#main-container").html(ItemsView())
        this.init();
    }

    init() {
        $(window).on("load", () => this.load());
        $("#add_new_item").on("click", () => this.addNewItem());
    }

    load() {
        this.loadSidebar();
        this.loadItems();
    }

    loadSidebar() {
        const categories = ItemModel.getCategories();
        const sidebarItems = categories
            ?.map((category) => SidebarContent(category))
            .join("");
        $("#items-content").html(sidebarItems);
        this.initializeSidebar();
    }

    initializeSidebar() {
        $("#items-content").on("click", "a", (event) => {
            $("#items-content a").removeClass("active");
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
        $("#items_container").html(itemsHtml);

        $('#items_container #item_card').on("click", "#update", (e) => {
            const itemId = $(e.currentTarget).data("item-id");
            const item = ItemModel.getItemById(itemId);
            this.updateItem(item);
        })

        $('#itemActionModel')
            .off("click")
            .on("click", "#submit", (e) => {
                this.submit();
            })

        $('#items_container #item_card').on("click", "#delete", (e) => {
            const itemId = $(e.currentTarget).data("item-id");

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    ItemModel.deleteItem(itemId);
                    this.loadItems();
                    tost("Item deleted successfully", "success")
                }
            });
        })


    }

    addNewItem() {
        $("#itemActionModel #modal-title").text("Add New Item");
        $("#itemActionModel").data("item-id", null);
        $("#itemActionModel #item_name").empty();
        $("#itemActionModel #item_price").empty();

        const categorySelect = $("#itemActionModel #item_category");
        const categories = ItemModel.getCategories();
        categorySelect.empty();
        categories?.forEach((category) => {
            const option = `<option value="${category.name}">${category.name}</option>`;
            categorySelect.append(option);
        });


        $("#itemActionModel #item_qty").empty();
        $("#itemActionModel #item_image").css(d_none);

        ItemActionModel.open();
        ItemActionModel.open();
    }

    updateItem(item) {
        $("#itemActionModel #modal-title").text("Update Item");
        $("#itemActionModel").data("item-id", item.id);
        $("#itemActionModel #item_name").val(item.name);
        $("#itemActionModel #item_price").val(item.price);

        const categorySelect = $("#itemActionModel #item_category");
        const categories = ItemModel.getCategories();
        categorySelect.empty();
        categories?.forEach((category) => {
            const option = `<option value="${category.name}">${category.name}</option>`;
            categorySelect.append(option);
        });


        $("#itemActionModel #item_qty").val(item.quantity);
        $("#itemActionModel #item_image").attr("src", item.image);
        $("#itemActionModel #item_image").css(d_block);

        ItemActionModel.open();
    }

    submit() {
        const itemId = $(this).data("item-id");
        const itemName = $("#itemActionModel #item_name").val();
        const itemPrice = $("#itemActionModel #item_price").val();
        const itemCategory = $("#itemActionModel #item_category").val();
        const itemQuantity = $("#itemActionModel #item_qty").val();
        const itemImage = $("#itemActionModel #item_image_file");
        const filePath = itemImage.val();

        const newItem = {
            id: itemId,
            name: itemName,
            price: itemPrice,
            quantity: itemQuantity,
            image: filePath
        }

        console.log(newItem)

        if (!itemId || itemId == "") {
            try {
                ItemModel.addItem(newItem, itemCategory);
                tost("Item added successfully", "success");
            } catch (e) {
                tost(e.message || "Error adding item", "error");
            } finally {
                loader("dark");
                ItemActionModel.close();
                this.loadItems();

            }
        } else {
            // update item
            try {
                ItemModel.updateItem(newItem);
                tost("Item update successfully", "success");
            } catch (e) {
                tost(e.message || "Error updating item", "error");
            } finally {
                loader("dark");
                ItemActionModel.close();
                this.loadItems();
            }
        }

    }
}
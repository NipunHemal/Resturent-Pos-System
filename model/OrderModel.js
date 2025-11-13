import { orderDb } from "../db/db.js";
import ItemModel from "./ItemModel.js";

const OrderModel = {
  // 🟢 Get all orders
  getAll() {
    return [...orderDb];
  },

  // 🟢 Get order by ID
  getById(id) {
    return orderDb.find((o) => o.id === id) || null;
  },

  // 🟢 Get orders by customer
  getByCustomer(customerId) {
    return orderDb.filter((o) => o.customerId === customerId);
  },

  // 🟢 Add a new order
  add(orderData) {
    const newOrder = {
      id: OrderModel.generateId(),
      customerId: orderData.customerId,
      type: orderData.type || "Dine-In",
      paymentType: orderData.paymentType || "Cash",
      items: orderData.items || [],
      total: orderData.total || 0,
      date: orderData.date || new Date().toISOString().split("T")[0],
    };

    orderDb.push(newOrder);
    return newOrder;
  },

  // 🟡 Update existing order
  update(id, updatedData) {
    const index = orderDb.findIndex((o) => o.id === id);
    if (index === -1) return null;

    orderDb[index] = { ...orderDb[index], ...updatedData };
    return orderDb[index];
  },

  // 🔴 Remove order by ID
  remove(id) {
    const index = orderDb.findIndex((o) => o.id === id);
    if (index === -1) return false;

    orderDb.splice(index, 1);
    return true;
  },

  // 🧾 Calculate order total dynamically (optional helper)
  calculateTotal() {
    const cartItems = ItemModel.getCart();
    let total = 0;
    cartItems.forEach((item) => {
      const itemData = ItemModel.getItemById(item.id);
      if (itemData) total += itemData.price * item.quantity;
    });
    return total;
  },
  generateId() {
    return orderDb.length > 0 ? Math.max(...orderDb.map((o) => o.id)) + 1 : 1;
  },
};

export default OrderModel;

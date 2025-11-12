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
      id: generateId(),
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
  calculateTotal(items, itemModel) {
    if (!itemModel) return 0; // you can pass ItemModel
    let total = 0;
    items.forEach((item) => {
      const itemData = itemModel.getById(item.id);
      if (itemData) total += itemData.price * item.quantity;
    });
    return total;
  },
};

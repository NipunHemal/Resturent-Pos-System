import { customerDb } from "../db/db.js";

export const CustomerModel = {
  getAll() {
    return [...customerDb];
  },

  // 🟢 Get customer by ID
  getById(id) {
    return customerDb.find((c) => c.id === id) || null;
  },

  // 🟢 Add new customer
  add(customerData) {
    const newId =
      customerDb.length > 0 ? Math.max(...customerDb.map((c) => c.id)) + 1 : 1;

    const newCustomer = { id: newId, ...customerData };
    customerDb.push(newCustomer);
    return newCustomer;
  },

  // 🟡 Update existing customer
  update(id, updatedData) {
    const index = customerDb.findIndex((c) => c.id === id);
    if (index === -1) return null;

    customerDb[index] = { ...customerDb[index], ...updatedData };
    return customerDb[index];
  },

  // 🔴 Delete customer by ID
  remove(id) {
    const index = customerDb.findIndex((c) => c.id === id);
    if (index === -1) return false;

    customerDb.splice(index, 1);
    return true;
  },
};

import { customerDb as db } from "../db/db.js";

export const CustomerModel = {
  getAll() {
    return db;
  },

  getAllByQuery(query) {
    return db.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  },

  getById(id) {
    return db.find((c) => c.id === id);
  },

  add(customerData) {
    const newCustomer = {
      id: this.generateId(),
      ...customerData,
      email: " ",
    };
    db.push(newCustomer);
    return true;
  },

  update(id, updatedData) {
    console.log(+id);
    const index = db.findIndex((c) => c.id === +id);
    if (index !== -1) {
      db[index] = { ...db[index], ...updatedData };
      return true
    }
    return false;
  },

  remove(id) {
    const index = db.findIndex((c) => c.id === id);
    if (index !== -1) {
      db.splice(index, 1);
      return true;
    }
    return false;
  },
  generateId() {
    return this.getAll().length + 1;
  },
};

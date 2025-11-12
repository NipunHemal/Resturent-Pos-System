import { cartDb, itemCategoryDb, itemDb } from "../db/db.js";

const ItemModel = {
  getCategories: () => {
    return [...itemCategoryDb];
  },

  getItemsByCategory: (category) => {
    if (!itemDb[category]) {
      return [];
    }
    return itemDb[category].map((item) => ({ ...item, category }));
  },

  getItemById: (itemId) => {
    const itemIdNum = parseInt(itemId);
    for (const [category, items] of Object.entries(itemDb)) {
      const item = items.find((item) => item.id === itemIdNum);
      if (item) {
        return { ...item, category };
      }
    }
    return null;
  },

  searchItems: (query, category = null) => {
    const results = [];
    const searchQuery = query.toLowerCase();

    const categoriesToSearch = category ? [category] : Object.keys(itemDb);

    categoriesToSearch.forEach((cat) => {
      if (itemDb[cat]) {
        const matchingItems = itemDb[cat].filter((item) =>
          item.name.toLowerCase().includes(searchQuery)
        );
        matchingItems.forEach((item) => {
          results.push({ ...item, category: cat });
        });
      }
    });

    return results;
  },

  addCategory: (categoryData) => {
    const { name } = categoryData;

    // Check if category already exists
    const existingCategory = itemCategoryDb.find(
      (cat) => cat.name.toLowerCase() === name.toLowerCase()
    );

    if (existingCategory) {
      throw new Error(`Category "${name}" already exists`);
    }

    // Generate new ID
    const newId = Math.max(...itemCategoryDb.map((cat) => cat.id)) + 1;
    const newCategory = { id: newId, name };

    // Add to categories array
    itemCategoryDb.push(newCategory);

    // Initialize empty array for this category in itemDb
    itemDb[name] = [];

    return newCategory;
  },

  addItem: (item, category) => {
    if (!itemDb[category]) {
      throw new Error(`Category "${category}" does not exist`);
    }

    // Check if item with same name already exists in category
    const existingItem = itemDb[category].find(
      (i) => i.name.toLowerCase() === item.name.toLowerCase()
    );

    if (existingItem) {
      throw new Error(
        `Item "${item.name}" already exists in category "${category}"`
      );
    }

    // Generate new ID
    const allItems = Object.values(itemDb).flat();
    const newId = Math.max(...allItems.map((i) => i.id)) + 1;

    const newItem = {
      id: newId,
      name: item.name,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity) || 0,
    };

    // Add item to the category
    itemDb[category].push(newItem);

    return { ...newItem, category };
  },

  updateItem: (item) => {
    const { id, category, ...updateData } = item;
    const itemId = parseInt(id);

    if (!itemDb[category]) {
      throw new Error(`Category "${category}" does not exist`);
    }

    const itemIndex = itemDb[category].findIndex((i) => i.id === itemId);

    if (itemIndex === -1) {
      throw new Error(
        `Item with ID ${itemId} not found in category "${category}"`
      );
    }

    // Update the item
    itemDb[category][itemIndex] = {
      ...itemDb[category][itemIndex],
      ...updateData,
      id: itemId, // Ensure ID doesn't change
    };

    return { ...itemDb[category][itemIndex], category };
  },

  deleteItem: (itemId) => {
    const itemIdNum = parseInt(itemId);

    for (const [category, items] of Object.entries(itemDb)) {
      const itemIndex = items.findIndex((item) => item.id === itemIdNum);

      if (itemIndex !== -1) {
        const deletedItem = items[itemIndex];
        itemDb[category].splice(itemIndex, 1);
        return { ...deletedItem, category };
      }
    }

    throw new Error(`Item with ID ${itemId} not found`);
  },

  deleteCategory: (categoryId) => {
    const categoryIdNum = parseInt(categoryId);
    const categoryIndex = itemCategoryDb.findIndex(
      (cat) => cat.id === categoryIdNum
    );

    if (categoryIndex === -1) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }

    const category = itemCategoryDb[categoryIndex];

    // Check if category has items
    if (itemDb[category.name] && itemDb[category.name].length > 0) {
      throw new Error(
        `Cannot delete category "${category.name}" because it contains items`
      );
    }

    // Remove from categories array
    const deletedCategory = itemCategoryDb.splice(categoryIndex, 1)[0];

    // Remove from itemDb
    delete itemDb[category.name];

    return deletedCategory;
  },

  getAllItems: () => {
    const allItems = [];

    for (const [category, items] of Object.entries(itemDb)) {
      items.forEach((item) => {
        allItems.push({ ...item, category });
      });
    }

    return allItems;
  },

  getCart: () => {
    return cartDb;
  },
  addToCart: (itemId, quantity) => {
    console.log("Adding to cart:", itemId, quantity);
    const item = ItemModel.getItemById(itemId);
    if (item) {
      const cartItemIndex = cartDb.findIndex((i) => i.id === item.id);
      if (cartItemIndex !== -1) {
        cartDb[cartItemIndex].quantity += quantity;
      } else {
        cartDb.push({ id:itemId, quantity });
      }
    } else {
      throw new Error(`Item with ID ${itemId} not found`);
    }
  },
  incrementQuantity: (itemId) => {
    const itemIndex = cartDb.findIndex((i) => i.id === itemId);
    if (itemIndex !== -1) {
      cartDb[itemIndex].quantity += 1;
      return cartDb[itemIndex].quantity;
    } else {
      throw new Error(`Item with ID ${itemId} not found in cart`);
    }
  },
  decrementQuantity: (itemId) => {
    const itemIndex = cartDb.findIndex((i) => i.id === itemId);
    if (itemIndex !== -1) {
      cartDb[itemIndex].quantity -= 1;
      if (cartDb[itemIndex].quantity <= 0) {
        ItemModel.removeFromCart(itemId);
        return null;
      }
      return cartDb[itemIndex]?.quantity || null;
    } else {
      throw new Error(`Item with ID ${itemId} not found in cart`);
    }
  },
  removeFromCart: (itemId) => {
    const itemIndex = cartDb.findIndex((i) => i.id === itemId);
    if (itemIndex !== -1) {
      cartDb.splice(itemIndex, 1);
    } else {
      throw new Error(`Item with ID ${itemId} not found in cart`);
    }
  },
  clearCart: () => {
    cartDb = [];
  },
};

export default ItemModel;

// const ItemModel = {
//   getCategories: () => {
//     return [...itemCategoryDb];
//   },

//   getItemsByCategory: (category) => {
//     return itemDb[category] ? [...itemDb[category]] : [];
//   },

//   getItemById: (itemId) => {
//     for (const category in itemDb) {
//       const item = itemDb[category].find((i) => i.id === itemId);
//       if (item) return { ...item, category };
//     }
//     return null;
//   },

//   searchItems: (query, category = null) => {
//     const result = [];
//     const categories = category ? [category] : Object.keys(itemDb);
//     for (const cat of categories) {
//       if (itemDb[cat]) {
//         const items = itemDb[cat].filter((item) =>
//           item.name.toLowerCase().includes(query.toLowerCase())
//         );
//         result.push(...items.map(i => ({ ...i, category: cat })));
//       }
//     }
//     return result;
//   },

//   addCategory: (categoryData) => {
//     const newId = Math.max(...itemCategoryDb.map(c => c.id)) + 1;
//     const newCategory = { id: newId, ...categoryData };
//     itemCategoryDb.push(newCategory);
//     itemDb[categoryData.name] = [];
//     return newCategory;
//   },

//   addItem: (item, category) => {
//     if (!itemDb[category]) {
//       throw new Error(`Category "${category}" does not exist`);
//     }
//     const newId = Math.max(
//       0,
//       ...Object.values(itemDb).flat().map((i) => i.id)
//     ) + 1;
//     const newItem = { id: newId, ...item };
//     itemDb[category].push(newItem);
//     return newItem;
//   },

//   updateItem: (item) => {
//     const { id, name, price, quantity, category } = item;
//     if (!itemDb[category]) return false;
//     const index = itemDb[category].findIndex((i) => i.id === id);
//     if (index === -1) return false;
//     itemDb[category][index] = { id, name, price, quantity };
//     return true;
//   },

//   deleteItem: (itemId) => {
//     for (const category in itemDb) {
//       const index = itemDb[category].findIndex((i) => i.id === itemId);
//       if (index !== -1) {
//         itemDb[category].splice(index, 1);
//         return true;
//       }
//     }
//     return false;
//   },

//   deleteCategory: (categoryId) => {
//     const index = itemCategoryDb.findIndex((c) => c.id === categoryId);
//     if (index === -1) return false;
//     const categoryName = itemCategoryDb[index].name;
//     delete itemDb[categoryName];
//     itemCategoryDb.splice(index, 1);
//     return true;
//   },

//   getAllItems: () => {
//     const allItems = [];
//     for (const category in itemDb) {
//       allItems.push(...itemDb[category].map((i) => ({ ...i, category })));
//     }
//     return allItems;
//   },
// };

// export default ItemModel;

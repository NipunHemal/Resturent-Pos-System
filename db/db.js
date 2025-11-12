const userDb = {
  id: 1,
  user_name: "admin",
  email: "admin@gmail.com",
  password: "admin123",
};

const itemDb = {
  Coffee: [
    {
      id: 1,
      name: "Espresso",
      price: 3.0,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
    {
      id: 2,
      name: "Cappuccino",
      price: 4.0,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
    {
      id: 3,
      name: "Latte",
      price: 4.5,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
  ],
  Beverage: [
    {
      id: 4,
      name: "Green Tea",
      price: 2.5,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
    {
      id: 5,
      name: "Black Tea",
      price: 2.0,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
    {
      id: 6,
      name: "Herbal Tea",
      price: 3.0,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
  ],
  Food: [
    {
      id: 7,
      name: "Croissant",
      price: 2.5,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
    {
      id: 8,
      name: "Muffin",
      price: 2.0,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
    {
      id: 9,
      name: "Bagel",
      price: 1.5,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
  ],
  Dessert: [
    {
      id: 10,
      name: "Ice Cream",
      price: 2.5,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
    {
      id: 11,
      name: "Cake",
      price: 3.0,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
    {
      id: 12,
      name: "Donut",
      price: 1.5,
      quantity: 50,
      image:
        "https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png",
    },
  ],
};

const itemCategoryDb = [
  { id: 1, name: "Coffee", icon: "bi bi-cup-hot" },
  { id: 2, name: "Beverage", icon: "bi bi-cup-straw" },
  { id: 3, name: "Food", icon: "bi bi-basket" },
  { id: 4, name: "Dessert", icon: "bi bi-ice-cream" },
];

const customerDb = [
  {
    id: 1,
    name: "John Doe",
    email: " ",
    mobile: "123-456-7890",
    address: "123 Main St, City, Country",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: " ",
    mobile: "123-456-7890",
    address: "123 Main St, City, Country",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: " ",
    mobile: "123-456-7890",
    address: "123 Main St, City, Country",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: " ",
    mobile: "123-456-7890",
    address: "123 Main St, City, Country",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: " ",
    mobile: "123-456-7890",
    address: "123 Main St, City, Country",
  },
];

const cartDb = [
  { id: 1, quantity: 5 },
  { id: 2, quantity: 10 },
  { id: 3, quantity: 7 },
];

const orderDb = [
  {
    id: 1,
    customerId: 1,
    type: "Dine-In",
    items: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 1 },
    ],
    total: 12.5,
    date: "2023-10-01",
  },
  {
    id: 1,
    customerId: 1,
    type: "Takeaway",
    items: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 1 },
    ],
    total: 12.5,
    date: "2023-10-01",
  },
];

export { userDb, itemDb, cartDb, itemCategoryDb, customerDb, orderDb };

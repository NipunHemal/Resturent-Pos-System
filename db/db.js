const userDb = {
  id: 1,
  user_name: "admin",
  email: "admin@gmail.com",
  password: "admin123",
};

const itemDb = {
  Coffee: [
    { id: 1, name: "Espresso", price: 3.0, quantity: 50 },
    { id: 2, name: "Cappuccino", price: 4.0, quantity: 50 },
    { id: 3, name: "Latte", price: 4.5, quantity: 50 },
  ],
  Beverage: [
    { id: 4, name: "Green Tea", price: 2.5, quantity: 50 },
    { id: 5, name: "Black Tea", price: 2.0, quantity: 50 },
    { id: 6, name: "Herbal Tea", price: 3.0, quantity: 50 },
  ],
  Food: [
    { id: 7, name: "Croissant", price: 2.5, quantity: 50 },
    { id: 8, name: "Muffin", price: 2.0, quantity: 50 },
    { id: 9, name: "Bagel", price: 1.5, quantity: 50 },
  ],
  Dessert: [
    { id: 10, name: "Ice Cream", price: 2.5, quantity: 50 },
    { id: 11, name: "Cake", price: 3.0, quantity: 50 },
    { id: 12, name: "Donut", price: 1.5, quantity: 50 },
  ],
};

const itemCategoryDb = [
  { id: 1, name: "Coffee" },
  { id: 2, name: "Beverage" },
  { id: 3, name: "Food" },
  { id: 4, name: "Dessert" },
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

export { userDb, itemDb, itemCategoryDb, customerDb, orderDb };

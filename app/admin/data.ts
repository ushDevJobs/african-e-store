export const users = [
  { id: 1, name: "Alice Smith", spend: 120 },
  { id: 2, name: "Bob Johnson", spend: 75 },
  // Add more user objects...
];

export const products = [
  { id: 1, name: "Product A", status: "Available", sales: 200 },
  { id: 2, name: "Product B", status: "Out of Stock", sales: 150 },
  // Add more product objects...
];

export const sales = [
  { id: 1, productName: "Product A", amount: 50, date: "2023-10-01" },
  { id: 2, productName: "Product B", amount: 25, date: "2023-10-02" },
  // Add more sales records...
];

export const orders = [
  {
    id: 1,
    customerName: "Alice Smith",
    amount: 120,
    date: "2023-10-01",
    status: "Completed",
  },
  {
    id: 2,
    customerName: "Bob Johnson",
    amount: 75,
    date: "2023-10-02",
    status: "Pending",
  },
  // Add more order objects...
];

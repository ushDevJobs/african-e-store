// pages/index.tsx (or pages/dashboard.tsx)
"use client";

import React, { useState } from "react";
import UserList from "./components/userList";
import ProductList from "./components/productList";
import SalesList from "./components/salesList";
import { users, products, sales, orders } from "./data";
import ActiveUsersChart from "./components/activeUsersChart";
import SalesChart from "./components/salesChart";
import ProductCharts from "./components/productCharts";
import HomeCharts from "./components/homeCharts";
import OrderList from "./components/orderList";
import OrdersChart from "./components/ordersChart";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header with Navigation Tabs */}
      <header className="bg-white p-4 shadow-lg rounded-md mt-20">
        <nav className="flex flex-wrap">
          {["Home", "Users", "Products", "Sales", "Orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 m-1 rounded text-sm sm:text-base ${
                activeTab === tab
                  ? "bg-[#2C7865] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="mt-8">
        {activeTab === "Home" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Active Users Card */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold">Active Users</h2>
                <p className="text-3xl font-bold mt-2">{users.length}</p>
                <p className="text-sm text-gray-500 mt-1">Total active users</p>
              </div>
              {/* Products Available Card */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold">Products Available</h2>
                <p className="text-3xl font-bold mt-2">{products.length}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Products on the platform
                </p>
              </div>
              {/* Total Sales Card */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold">Total Sales</h2>
                <p className="text-3xl font-bold mt-2">{sales.length}</p>
                <p className="text-sm text-gray-500 mt-1">Sales made</p>
              </div>
              {/* Average Spend Card */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold">Average Spend</h2>
                <p className="text-3xl font-bold mt-2">
                  $
                  {(
                    users.reduce((total, user) => total + user.spend, 0) /
                    users.length
                  ).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Per user</p>
              </div>
            </div>
            {/* Optional: Include charts here */}
            <HomeCharts />
          </div>
        )}
        {activeTab === "Users" && (
          <div>
            <UserList users={users} />
            <ActiveUsersChart />
          </div>
        )}
        {activeTab === "Products" && (
          <div>
            <ProductList products={products} />
            <ProductCharts />
          </div>
        )}
        {activeTab === "Orders" && (
          <div>
            <OrderList orders={orders} />
            <OrdersChart />
          </div>
        )}
        {activeTab === "Sales" && (
          <div>
            <SalesList sales={sales} />
            <SalesChart />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

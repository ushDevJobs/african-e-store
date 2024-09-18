// pages/index.tsx (or pages/dashboard.tsx)
"use client";

import React, { useEffect, useState } from "react";
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
import { useCategories } from "../context/CategoryContext";
import { Products } from "../components/models/AllCategories";
import { toast } from "sonner";
import { createCustomErrorMessages } from "../components/constants/catchError";
import { StatusEnums } from "../components/models/ISellerStore";
import { UserOrderResponse } from "../components/models/IUserOrder";
import { useAdminFetchUserOrders, useFetchUserOrders } from "../api/apiClients";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const handleTabChange = (tab: string) => setActiveTab(tab);
  const { categories, handleFetchAllCategories } = useCategories();
  const fetchOrders = useAdminFetchUserOrders();
  const [prods, setProds] = useState<Products[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<UserOrderResponse>()
    const [orders, setOrders] = useState<UserOrderResponse[]>()
    const [isFetchingOrders, setIsFetchingOrders] = useState<boolean>(true);
    const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState<boolean>(false);

    async function handleFetchOrders({ clearPreviousOrders = false }) {

        // Show loader

        if (clearPreviousOrders) {
            // Clear previous configurations
            setOrders(undefined);
            // Show loader
            setIsFetchingOrders(true);
        }
        await fetchOrders()
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setOrders(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingOrders(false);
            });
    }
    const getStatusColor = (status: StatusEnums) => {
        switch (status) {
            case StatusEnums.Pending:
                return 'text-[#FD6A02]';
            case StatusEnums.Delivered:
                return 'text-[#2C7865]';
            case StatusEnums.Dispatched:
                return 'text-#6f6f6f';
            default:
                return 'text-#6f6f6f';
        }
    }

    useEffect(() => {
        handleFetchOrders({ clearPreviousOrders: true })
    }, []);

  useEffect(() => {
    handleFetchAllCategories();
  }, []);

  useEffect(() => {
    if (categories) {
      setProds(
        categories
          .map((categoryProd) => {
            return categoryProd.products;
          })
          .flat(1)
      );
    }
  }, [categories]);

  useEffect(() => {
    console.log(orders ? orders[0] : {});
  }, [orders]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
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
                <p className="text-3xl font-bold mt-2">{prods?.length}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Products on the platform
                </p>
              </div>
              {/* Total Sales Card */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold">Total Sales</h2>
                <p className="text-3xl font-bold mt-2">{orders ? orders.map(o=> {return o.orderDetails}).flat(1).length : [].length}</p>
                <p className="text-sm text-gray-500 mt-1">Sales made</p>
              </div>
              {/* Average Spend Card */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold">Average Spend</h2>
                <p className="text-3xl font-bold mt-2">
                  $
                  {orders ? (
                    orders.map(o=> {return o.orderDetails}).flat(1).reduce((total, user) => total + user.amount, 0) /
                    users.length
                  ).toFixed(2) : [].length}
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
            <ProductList products={prods} />
            <ProductCharts />
          </div>
        )}
        {activeTab === "Orders" && (
          <div>
            <OrderList orders={orders ? orders : []} />
            <OrdersChart />
          </div>
        )}
        {activeTab === "Sales" && (
          <div>
            <SalesList sales={orders ? orders.map(o=> {return o.orderDetails}).flat(1) : []} />
            <SalesChart />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;



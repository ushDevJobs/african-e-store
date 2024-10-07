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
import {
  FetchSEOPPCFunction,
  useAdminFetchUserOrders,
  useAdminFetchUsers,
  useFetchUserOrders,
} from "../api/apiClients";
import FBMarketingTab from "../admin/components/FBMarketingTab";
import FBPostAnalytics from "./components/FBPostAnalytics";
import { PostData } from "../components/models/IFBPosts";
import InstagramMarketingTab from "./components/InstagramMarketingTab";
import GenerateSellers from "./components/generateSellers";
import MarketingAnalyticsTab from "./components/MarketingAnalyticsTab";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const handleTabChange = (tab: string) => setActiveTab(tab);
  const { categories, handleFetchAllCategories } = useCategories();
  const fetchOrders = useAdminFetchUserOrders();
  const fetchUsers = useAdminFetchUsers();
  const [prods, setProds] = useState<Products[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<UserOrderResponse>();
  const [orders, setOrders] = useState<UserOrderResponse[]>();
  const [users, setUsers] = useState<any[]>([]);
  const [productSalesDataByCount, setProductSalesDataByCount] = useState<any[]>(
    []
  );
  const [productSalesDataByDate, setProductSalesDataByDate] = useState<any[]>(
    []
  );
  const [productDataByCount, setProductDataByCount] = useState<any[]>([]);
  const [productDataByDate, setProductDataByDate] = useState<any[]>([]);
  const [productSalesDataByCategory, setProductSalesDataByCategory] = useState<
    any[]
  >([]);
  const [userDataByDate, setUserDataByDate] = useState<any[]>([]);
  const [userDataByAccountType, setUserDataByAccountType] = useState<any[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState<boolean>(true);
  const [isFetchingOrders, setIsFetchingOrders] = useState<boolean>(true);
  const [isDeliveryModalVisible, setIsDeliveryModalVisible] =
    useState<boolean>(false);

  async function handleFetchUsers({ clearPreviousUsers = false }) {
    // Show loader

    if (clearPreviousUsers) {
      // Clear previous configurations
      setUsers([]);
      // Show loader
      setIsFetchingUsers(true);
    }
    await fetchUsers()
      .then((response) => {
        // console.log("Response: ", response.data.data);
        setUsers(response.data.data);
      })
      .catch((error) => {
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsFetchingUsers(false);
      });
  }

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
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsFetchingOrders(false);
      });
  }
  const getStatusColor = (status: StatusEnums) => {
    switch (status) {
      case StatusEnums.Pending:
        return "text-[#FD6A02]";
      case StatusEnums.Delivered:
        return "text-[#2C7865]";
      case StatusEnums.Dispatched:
        return "text-#6f6f6f";
      default:
        return "text-#6f6f6f";
    }
  };

  useEffect(() => {
    handleFetchOrders({ clearPreviousOrders: true });
    handleFetchUsers({ clearPreviousUsers: true });
  }, []);

  useEffect(() => {
    handleFetchAllCategories();
  }, []);

  useEffect(() => {
    if (categories) {
      setProds(
        categories
          .map((categoryProd) => {
            return categoryProd.products.map((prd) => {
              return {
                ...prd,
                cat_name: categoryProd.name,
                cat_id: categoryProd.id,
              };
            });
          })
          .flat(1)
      );
    }
  }, [categories]);

  useEffect(() => {
    if (orders && orders.length) {
      let resultObj = {};
      let resultObj2 = {};
      let resultObj3 = {};
      let resultObj4 = {};
      let resultObj5 = {};
      let resultObj6 = {};
      let resultObj7 = {};
      users.forEach((user) => {
        // console.log(user);
        if (
          Object.keys(resultObj6).includes(
            new Date(user.createdAt).toDateString()
          )
        ) {
          resultObj6[new Date(user.createdAt).toDateString()].metaz =
            resultObj6[new Date(user.createdAt).toDateString()].metaz.concat([
              {
                ...user,
              },
            ]);
        } else {
          resultObj6[new Date(user.createdAt).toDateString()] = {
            date: new Date(user.createdAt).toDateString(),
            metaz: [
              {
                ...user,
              },
            ],
          };
        }

        if (Object.keys(resultObj7).includes(user?.accountType)) {
          resultObj7[user?.accountType].accountType = user?.accountType;
          resultObj7[user?.accountType].metaz.concat([
            {
              ...user,
            },
          ]);
        } else {
          resultObj7[user?.accountType] = {
            accountType: user?.accountType,
            metaz: [
              {
                ...user,
              },
            ],
          };
        }
      });
      prods.forEach((product) => {
        if (
          Object.keys(resultObj4).includes(
            new Date(product.createdAt).toDateString()
          )
        ) {
          resultObj4[new Date(product.createdAt).toDateString()].count +=
            product.quantity;
          resultObj4[new Date(product.createdAt).toDateString()].metaz =
            resultObj4[new Date(product.createdAt).toDateString()].metaz.concat(
              [
                {
                  ...product,
                },
              ]
            );
        } else {
          resultObj4[new Date(product.createdAt).toDateString()] = {
            count: product.quantity,
            date: new Date(product.createdAt).toDateString(),
            metaz: [
              {
                ...product,
              },
            ],
          };
        }

        if (Object.keys(resultObj5).includes(product?.id)) {
          resultObj5[product.id].count += product.quantity;
        } else {
          resultObj5[product.id] = {
            name: product.name,
            product: product,
            count: product.quantity,
            views: product.views,
          };
        }
      });
      orders
        .map((o) => {
          return o.orderDetails.map((r) => {
            return { ...r, datePaid: o.datePaid, total_amount: o.amount };
          });
        })
        .flat(1)
        .forEach((sale) => {
          if (Object.keys(resultObj).includes(sale?.product?.id)) {
            resultObj[sale.product.id].count += sale.quantity;
          } else {
            resultObj[sale.product.id] = {
              name: sale.product.name,
              product: sale.product,
              count: sale.quantity,
              views: sale.product.views,
              meta: { ...sale },
            };
          }
          if (
            Object.keys(resultObj2).includes(
              new Date(sale?.datePaid).toDateString()
            )
          ) {
            resultObj2[new Date(sale?.datePaid).toDateString()].count +=
              sale.quantity;
            resultObj2[new Date(sale?.datePaid).toDateString()].metaz =
              resultObj2[new Date(sale?.datePaid).toDateString()].metaz.concat([
                {
                  name: sale.product.name,
                  product: sale.product,
                  count: sale.quantity,
                  meta: { ...sale },
                },
              ]);
          } else {
            resultObj2[new Date(sale?.datePaid).toDateString()] = {
              count: sale.quantity,
              date: new Date(sale?.datePaid).toDateString(),
              total_amount: sale.total_amount,
              metaz: [
                {
                  name: sale.product.name,
                  product: sale.product,
                  count: sale.quantity,
                  meta: { ...sale },
                },
              ],
            };
          }

          let prd_cat_id = prods.find((p) => sale.product.id === p.id)?.cat_id;
          let prd_cat = prods.find((p) => sale.product.id === p.id);
          if (prd_cat_id) {
            if (Object.keys(resultObj3).includes(prd_cat_id)) {
              resultObj3[prd_cat_id].name = prd_cat?.cat_name;
              resultObj3[prd_cat_id].products = resultObj3[
                prd_cat_id
              ].products.concat([{ ...sale.product }]);
            } else {
              resultObj3[prd_cat_id] = {
                name: prd_cat?.cat_name,
                products: [{ ...sale.product }],
              };
            }
          }
        });
      setProductSalesDataByCount(
        Object.keys(resultObj)
          .map((obj) => resultObj[obj])
          .sort((a, b) => {
            if (a.count > b.count) {
              return -1;
            }
            if (a.count < b.count) {
              return 1;
            }
            return 0;
          })
        // .slice(0, 5)
      );
      setProductSalesDataByCategory(
        Object.keys(resultObj3)
          .map((obj) => resultObj3[obj])
          .sort((a, b) => {
            if (a.products.length > b.products.length) {
              return -1;
            }
            if (a.products.length < b.products.length) {
              return 1;
            }
            return 0;
          })
          .slice(0, 5)
      );
      setProductSalesDataByDate(
        Object.keys(resultObj2)
          .map((obj) => resultObj2[obj])
          .sort(
            (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
          )
        // .slice(0, 5)
      );
      setProductDataByCount(
        Object.keys(resultObj5)
          .map((obj) => resultObj5[obj])
          .sort((a, b) => {
            if (a.count > b.count) {
              return -1;
            }
            if (a.count < b.count) {
              return 1;
            }
            return 0;
          })
        // .slice(0, 5)
      );
      setProductDataByDate(
        Object.keys(resultObj4)
          .map((obj) => resultObj4[obj])
          .sort(
            (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
          )
        // .slice(0, 5)
      );
      setUserDataByAccountType(
        Object.keys(resultObj7)
          .map((obj) => resultObj7[obj])
          .sort((a, b) => {
            if (a.metaz.length > b.metaz.length) {
              return -1;
            }
            if (a.metaz.length < b.metaz.length) {
              return 1;
            }
            return 0;
          })
          .slice(0, 5)
      );
      setUserDataByDate(
        Object.keys(resultObj6)
          .map((obj) => resultObj6[obj])
          .sort(
            (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
          )
        // .slice(0, 5)
      );
      // console.log(resultObj4);
    }
  }, [orders]);

  // useEffect(() => {
  //   if (productSalesDataByDate) {
  //     console.log(productSalesDataByDate);
  //   }
  // }, [productSalesDataByDate]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Header with Navigation Tabs */}
      <header className="bg-white p-4 shadow-lg rounded-md mt-20">
        <nav className="flex flex-wrap">
          {[
            "Home",
            "Users",
            "Products",
            "Sales",
            "Orders",
            "FB Marketing",
            "Instagram Marketing",
            // "Generate",
            "Marketing & SEO",
          ].map((tab) => (
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
                <p className="text-3xl font-bold mt-2">{users?.length}</p>
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
                <h2 className="text-xl font-semibold">Total Revenue</h2>
                <p className="text-3xl font-bold mt-2">
                $
                  {orders
                    ? orders
                        // .map((o) => {
                        //   return o.orderDetails;
                        // })
                        // .flat(1)
                        .reduce((total, order) => total + order.amount, 0)
                        .toFixed(2)
                    : [].length}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  from{" "}
                  {orders
                    ? orders
                        .map((o) => {
                          return o.orderDetails;
                        })
                        .flat(1).length
                    : [].length}{" "}
                  Sales made
                </p>
              </div>
              {/* Average Spend Card */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold">Average Spend</h2>
                <p className="text-3xl font-bold mt-2">
                  $
                  {orders
                    ? (
                        orders
                          .map((o) => {
                            return o.orderDetails;
                          })
                          .flat(1)
                          .reduce((total, user) => total + user.amount, 0) /
                        orders
                          .map((o) => {
                            return o.orderDetails;
                          })
                          .flat(1).length
                      ).toFixed(2)
                    : [].length}
                </p>
                <p className="text-sm text-gray-500 mt-1">Per user</p>
              </div>
            </div>
            {/* Optional: Include charts here */}
            <HomeCharts
              productSalesDataByCount={productSalesDataByCount}
              productSalesDataByDate={productSalesDataByDate}
            />
          </div>
        )}
        {activeTab === "Users" && (
          <div>
            <UserList users={users} />
            <ActiveUsersChart
              userDataByDate={userDataByDate}
              userDataByAccountType={userDataByAccountType}
            />
          </div>
        )}
        {activeTab === "Products" && (
          <div>
            <ProductList products={prods} />
            <ProductCharts
              productSalesDataByCount={productSalesDataByCount}
              productSalesDataByDate={productSalesDataByDate}
              productDataByCount={productDataByCount}
              productDataByDate={productDataByDate}
            />
          </div>
        )}
        {activeTab === "Orders" && (
          <div>
            <OrderList orders={orders ? orders : []} />
            <OrdersChart productSalesDataByDate={productSalesDataByDate} />
          </div>
        )}
        {activeTab === "Sales" && (
          <div>
            <SalesList
              sales={
                orders
                  ? orders
                      .map((o) => {
                        return o.orderDetails;
                      })
                      .flat(1)
                  : []
              }
            />
            <SalesChart
              productSalesDataByDate={productSalesDataByDate}
              productSalesDataByCategory={productSalesDataByCategory}
            />
          </div>
        )}
        {activeTab === "FB Marketing" && <FBMarketingTab />}
        {/* Main Content */}
        {activeTab === "Instagram Marketing" && <InstagramMarketingTab />}

        {activeTab === "Marketing & SEO" && <MarketingAnalyticsTab />}

        {activeTab === "Generate" && <GenerateSellers />}
      </main>
    </div>
  );
};

export default Dashboard;

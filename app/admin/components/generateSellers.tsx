import React from "react";
import axios from "axios";
import ApiRoutes from "@/app/api/apiRoutes";
import {
  GenerateProductsFunction,
  GenerateSellersFunction,
  GenerateSEOPPCFunction,
} from "@/app/api/apiClients";



const GenerateSellers = () => {
  const handleGenerateSellers = async () => {
    try {
      // console.log(`${ApiRoutes.BASE_URL_DEV}/${ApiRoutes.GenerateSellers}/`);
      const response = GenerateSellersFunction({
        quantity: 4,
      });
      //   alert("Sellers generated successfully!");
      //   console.log(response.data); // Optional: For debugging
    } catch (error) {
      //   alert("Error generating sellers");
      console.error("Error:", error);
    }
  };

  const handleGenerateProducts = async () => {
    try {
      // console.log('Here');
      // console.log(`${ApiRoutes.BASE_URL_DEV}/${ApiRoutes.GenerateSellers}/`);
      const response = GenerateProductsFunction();
      //   alert("Sellers generated successfully!");
      //   console.log(response.data); // Optional: For debugging
    } catch (error) {
      //   alert("Error generating sellers");
      console.error("Error:", error);
    }
  };

  const handleGenerateSEO = async () => {
    try {
      // console.log("H");
      // console.log(`${ApiRoutes.BASE_URL_DEV}/${ApiRoutes.GenerateSellers}/`);
      const response = GenerateSEOPPCFunction();
      //   alert("Sellers generated successfully!");
      //   console.log(response.data); // Optional: For debugging
    } catch (error) {
      //   alert("Error generating sellers");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full space-x-4">
      <button
        onClick={handleGenerateSellers}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-all"
      >
        Generate 4 Sellers
      </button>

      <button
        onClick={handleGenerateProducts}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-all"
      >
        Generate Products
      </button>

      <button
        onClick={handleGenerateSEO}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-all"
      >
        Generate SEO & PPC
      </button>
    </div>
  );
};

export default GenerateSellers;

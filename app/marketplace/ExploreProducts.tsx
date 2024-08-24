// 'use client';

// import React, { useEffect, useState } from 'react';

// import { useFetchSellerProducts } from '../api/apiClients'; // Custom hook for fetching seller products
// import { createCustomErrorMessages } from '../components/constants/catchError'; // Custom error message handler
// import { toast } from 'sonner'; // Notification library
// import { SellerProductResponse } from '../components/models/ISellerProduct'; // Product response model
// import { FullPageLoader } from '../Loader/ComponentLoader'; // Loader component
// import ProductCard from '../components/ProductCard';

// export default function ExploreProducts() {
//   const fetchSellerProducts = useFetchSellerProducts();

//   const [isFetchingSellerProducts, setIsFetchingSellerProducts] = useState<boolean>(true);
//   const [products, setProducts] = useState<SellerProductResponse[]>();

//   async function handleFetchSellerProducts() {
//     // Start loader
//     setIsFetchingSellerProducts(true);

//     await fetchSellerProducts()
//       .then((response) => {
//         // Assuming the API response contains a 'products' field with the product data
//         setProducts(response.data.products);
//       })
//       .catch((error) => {
//         const errorMessage = createCustomErrorMessages(error.response?.data);
//         toast.error(errorMessage);
//       })
//       .finally(() => {
//         setIsFetchingSellerProducts(false);
//       });
//   }

//   useEffect(() => {
//     handleFetchSellerProducts();
//   }, []);

//   return (
//     <section className="my-8">
//       <h2 className="text-2xl font-bold text-center mb-4">Explore Our Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products?.map((product, index) => (
//           <ProductCard key={index} product={product} />
//         ))}
//       </div>
//       {!products && isFetchingSellerProducts && (
//         <div className="h-[30vh]">
//           <FullPageLoader />
//         </div>
//       )}
//       {!products && !isFetchingSellerProducts && (
//         <p className="text-base text-gray-500 flex flex-col items-center justify-center text-center mx-auto min-h-[20vh]">
//           No products found
//         </p>
//       )}
//     </section>
//   );
// }

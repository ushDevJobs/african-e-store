// components/InstagramMarketingTab.tsx

import React from "react";
import { parseInstagramData } from "../utils/parseInstagramData";
import InstagramAnalyticsCharts from "./InstagramAnalyticsCharts";

const InstagramMarketingTab: React.FC = () => {
  const data = `

---

2 likes
therayvvinstore
Introducing Rayvvin, your one-stop shop for all things African groceries! From spices to fresh produce, we have it all. Shop today and get 10% off your first order.

#africangroceries #shoponline #groceriesdelivery #Africanfoodie #UKmarketplace
May 14, 2023

---

3 likes
therayvvinstore
New vendors are joining Rayvvin Marketplace every day! Don't miss out on the opportunity to grow your grocery business. Sign up for free today.

#newvendors #africanmarketplace #africangroceries #ethnicfooddistribution #onlineshop
View all 2 comments
May 28, 2023

---

6 likes
therayvvinstore
Welcome to Rayvvin, where you can find all your favorite African ingredients in one place. Shop from our wide selection of groceries, delivered anywhere in the UK.

Click the link in our bio to get started.

#explorepage #UKgroceries #AfricanFoodUK #ethnicfood #groceriesdelivery
June 9, 2023

---

3 likes
therayvvinstore
Have a feast this weekend with our special offers on African groceries! Everything from spices to fresh vegetables is available on Rayvvin. Order today and get a discount on bulk purchases.

#africangroceries #UKdelivery #bulksupplies #fooddelivery #onlineshop
View all 1 comment
June 18, 2023

---

5 likes
therayvvinstore
Rayvvin brings you closer to your favorite African dishes, no matter where you are in the UK. Order now and enjoy authentic African ingredients delivered to your doorstep.

#africanfood #ethnicgroceries #africandishes #UKdelivery #groceriesonline #reels
View all 2 comments
June 28, 2023

---

2 likes
therayvvinstore
Calling all African Grocery vendors! List your store on Rayvvin and reach a wider audience today. Get free marketing credits when you join.

#africanbusinesses #vendorplatform #grocerystore #onlineshopping #africanmarketplace
July 5, 2023

---

4 likes
therayvvinstore
Enjoy a plate of delicious, home-cooked Jollof rice with fresh ingredients from Rayvvin Store. Whether you're in London, Birmingham, or Glasgow, we deliver everywhere.

#JollofRice #UKFood #africangroceries #fooddelivery #UKfoodie #explorepage
View 1 comment
July 15, 2023

---

2 likes
therayvvinstore
Rayvvin is here to help your grocery business grow! Register your store on our platform and gain access to thousands of customers across the UK. Start selling today.

#africanvendors #ukmarketplace #wholesalemarketplace #ethnicfoodwholesale #suppliernetwork
July 26, 2023

---

3 likes
therayvvinstore
Fresh African produce now available on Rayvvin Marketplace. Shop with us today and enjoy free delivery on your first order!

Click the link in our bio to shop now.

#UKdelivery #africangroceries #africanproduce #shoponline #onlinestore #groceries
August 7, 2023

---

5 likes
therayvvinstore
Have you tried our exclusive African spices collection yet? Rayvvin Store has everything you need to make your favorite dishes.

Shop now, and we'll deliver directly to your door anywhere in the UK.

#africangroceries #africanspices #groceriesdelivery #explore #reels #foodlovers
View all 2 comments
August 13, 2023

---

1 like
therayvvinstore
Get 15% off your first order at Rayvvin Store! We’ve got the best African groceries at affordable prices.

Shop now and take advantage of this limited-time offer. Link in bio!

#AfricanGroceries #UKFoodVendors #GroceriesOnline #rayvvinstore #deals
View all 1 comment
August 25, 2023

---

3 likes
therayvvinstore
Want to offer your customers more variety? Join Rayvvin Marketplace today and connect with thousands of new customers across the UK. Start selling today.

#africangroceries #africanfood #ethnicfooddistribution #UKvendors #explorepage
View all 1 comment
September 5, 2023

---

4 likes
therayvvinstore
Shop from local African grocery vendors near you on Rayvvin Marketplace! Our vendors offer everything from spices to fresh vegetables. Support local businesses and enjoy a taste of home.

#shoplocal #africangroceries #africancusineuk #b2bmarketplace #reels #explorepage
View all 1 comment
September 14, 2023

---

2 likes
therayvvinstore
Want to prepare an authentic Nigerian dish this week? Get your Ogbono and fresh vegetables delivered straight to your doorstep.

Order today and have it delivered anywhere in the UK.

#africangroceries #nigeriandishes #UKdelivery #ethnicfooddistribution #reelsinstagram #explorepage
View 2 comments
September 20, 2023

---

1 like
therayvvinstore
Craving a fresh, home-cooked African meal? Get all the ingredients you need for the weekend from Rayvvin Store! We have the best deals on spices, grains, and African groceries.

Click the link in our bio to order now! Don't miss out.

#africangroceries #africanfood #UKdelivery #groceryvendors #homecooking #explorepage #spices
View all 1 comment
September 29, 2023

---

1 like
therayvvinstore
Are you craving a delicious plate of Egusi and demo? Or your Smoky Jollof rice.

Shop Your ingredients @rayvvinstore.

Click on the link in our bio to add these ingredients to your cart.

#africangroceries #africanfood #ukmarketplace #wholesalesupply #b2bmarketplace #onlinestore #fooddistribution #groceryvendors #bulksupplies #africaningredients #spices #grocerystore #reels #reelsinstagram #explorepage
View all 2 comments
October 13, 2023

---

2 likes
therayvvinstore
Rayvvin is now live!!!

You can now order your African groceries from our site today.

Order from your favorite vendors and find new vendors around you only on Rayvvin Marketplace.

Click on the link 🔗 in our bio to get started

#africangroceries #africanfood #ukmarketplace #wholesalesupply #b2bmarketplace #onlinestore #fooddistribution #groceryvendors #bulksupplies #africaningredients #spices #grocerystore #reels #reelsinstagram #explorepage
View 1 comment
October 13, 2023

---

1 like
therayvvinstore
Join us today at Rayvvin

Register your store at Rayvvin for FREE!

Click on the link 🔗 in our bio to get started

#rayvvin #africangrocerystore #africancusineuk #africansinuk
View 1 comment
October 13, 2023

---

3 likes
therayvvinstore
Shop now!!!

All products are 20% off!!

Rayvvin marketplace you one stop shop for all things African Groceries in UK

Click the link 🔗 in our bio to shop

#rayvvin #explore #africangroceries #ukdelivery #africancusine #africanexpats
View all 2 comments
October 12, 2023

---

6 likes
therayvvinstore
Have you tried this vegetable sauce before? @tspices_kitchen recipe with plantain is just delicious.

It’s super delicious & Follow @tspices_kitchen for more yummylicious recipes

@tspices_kitchen @tspices_kitchen

#rayvvin #reels #reelsinstagram #foodblog
#typreels #vegetablesauce #sundaylunch #dinnerrecipes #explore #explorepage
October 11, 2023

---

2 likes
therayvvinstore
What is your marketing plan for the next 50 days?

Let's help you reach a new target this month.

With our 1000 daily visitors on Rayvvin store lets connect you to new customers today.

All for FREE!

Click on the link 🔗 in our bio to get started NOW.

#explore #explorepage #exploremore #exploreuk🇬🇧 #GrowWithUs #Marketwithus #explorerayvvin #africangrocerystore #africansinuk
View 1 comment
October 11, 2023

---

2 likes
therayvvinstore
This is a call to all African Grocery vendors all over UK. Let's lend you a hand with Free marketing credits on our platform Rayvvin.

Rayvvin marketplace aims to aid you reach newer audiences and customers all over the UK.

New merchants on our platform get a head start with marketing credits

Start selling your African groceries to a wider audience with Rayvvin.

To join us click the link in our bio today.

#b2bafricanmarketplace #rayvvinmarketplace #onlinemarketplace #groceriesmarketplace #africangroceries #groceriesmarketplace
View 1 comment
October 10, 2023

---
`;

  const posts = parseInstagramData(data);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Instagram Marketing Analytics
      </h2>

      {/* Analytics Charts */}
      <InstagramAnalyticsCharts posts={posts} />

      {/* Posts Listing */}
      <div className="space-y-6 mt-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-600 mb-2">Date: {post.date}</p>
            <p className="text-gray-600 mb-2">Likes: {post.likes}</p>
            <p className="text-gray-600 mb-2">Comments: {post.comments}</p>
            <p className="mb-2">{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramMarketingTab;

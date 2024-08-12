"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ApiRoutes from "../api/apiRoutes";
import { removeProducts } from "../redux/features/cart/cartSlice";

type Props = {
    amount: string
}
export default function PaymentSuccessPage({amount}: Props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(removeProducts());
    }, []);

    return (
        <main className="max-w-6xl mx-auto p-10 pb-20 text-white text-center border m-10 rounded-md bg-[#f7fafa]">
            <div className="mb-10">
                <h1 className="text-4xl text-[#2c7865] font-extrabold mb-2">
                    Thank you!
                </h1>
                <h2 className="text-lg text-[#2c7865]">You successfully sent</h2>

                <div className="bg-white p-2 rounded-md text-[#2c7865] mt-5 text-4xl font-bold">
                    &pound;{amount}
                </div>
            </div>
            <Link
                href={"/orders"}
                className="bg-[#2c7865] text-white my-5 py-3 px-10 rounded-lg"
            >
                Orders
            </Link>
        </main>
    );
}

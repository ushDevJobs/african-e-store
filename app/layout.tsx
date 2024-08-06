import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.scss";
import Layout from "./components/Layout";
import NextTopLoader from 'nextjs-toploader';

// const inter = Inter({ subsets: ["latin"] });
const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Africa e-store website",
    description: "Africa e-store website",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={josefinSans.className}>
                <NextTopLoader
                    color='#2C7865'
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing='ease'
                    speed={200}
                    shadow='0 0 10px #2C7865,0 0 5px #2C7865'
                />
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    );
}

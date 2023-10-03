import Aside from "@/components/aside/components/Aside";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "rsuite/dist/rsuite.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { lazy } from "react";
import Footer from "@/components/footer/components/Footer";
const Navbar = lazy(() => import("@/components/navbar/components/Navbar"));

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head></head>
			<body className={inter.className}>
				<Navbar />
				<div className="flex pt-[70px]">
					<Aside />
					<main className="w-full md:w-[calc(100%-248px)] md:ml-[224px] md:mr-[24px] mt-[5rem]">
						{children}
					</main>
				</div>
				<Footer />
			</body>
		</html>
	);
}

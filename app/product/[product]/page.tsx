import { redirect } from "next/navigation";
import { type Metadata } from "next";
//
import Navbar from "@components/Navbar";
import Product from "@components/Product";
import Listings from "@components/Listings";
import Features from "@components/Features";
import Footer from "@components/Footer";
import { getProduct } from "@lib/DB";
import { type Book } from "@lib/Interface";

// Metadata
export const metadata: Metadata =
{
  title: "Product | BookWorm",
  keywords: ["BookWorm", "Product"]
};

// Props
interface Props
{
  params: { product: string; };
}

// Page
export default async function Page({ params }: Props): Promise<JSX.Element>
{
  const book: Book | null = await getProduct(params.product);

  if (!book)
  {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <Product { ...book } />
      { /* @ts-expect-error */ }
      <Listings heading="Recommended" />
      <Features />
      <Footer />
    </>
  );
}
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import { unstable_cache as nextCache } from "next/cache";
import Link from "next/link";

const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
  revalidate: 30,
});

async function getInitialProducts() {
  console.log("hit!!!!!");
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    // take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Awaited<ReturnType<typeof getInitialProducts>>;

export const metadata: Metadata = {
  title: "Home",
};

export default async function Products() {
  const initialProducts = await getCachedProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/add"
        className="fixed bottom-24 right-8 flex size-16 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400 xl:right-[30rem]"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}

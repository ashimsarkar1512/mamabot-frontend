// import {
//   AffiliateProduct,
//   SavedItem,
// } from "@/redux/features/api/user/recommandetion/savedItemsGet";
// import { useSaveItemMutation } from "@/redux/features/api/user/recommandetion/savedItemsPost";
// import Image from "next/image";

// function isAffiliateProduct(
//   savable: SavedItem["savable"],
// ): savable is AffiliateProduct {
//   return savable !== null && "affiliate_link" in savable && "reason" in savable;
// }
// interface SavedProductsProps {
//   products?: SavedItem[];
// }

// const SavedProducts = ({ products }: SavedProductsProps) => {
//   const [saveItem, { isLoading }] = useSaveItemMutation();
//   if (!products?.length) {
//     return <p>No saved products</p>;
//   }

//   const handleSave = async (productId: number) => {
//     try {
//       await saveItem({
//         item_type: "product",
//         item_id: productId,
//       }).unwrap();

//       alert("Product unsaved!");
//     } catch (err) {
//       console.error(err);
//       alert("Unsave failed");
//     }
//   };

//   return (
//     <section>
//       <h1 className="text-primary pb-3 font-semibold text-lg md:text-3xl ">
//         Your Saved Products :
//       </h1>

//       <div className="grid md:grid-cols-3 gap-6">
//         {products.map((item) => {
//           if (!isAffiliateProduct(item.savable)) return null;

//           const product = item.savable;

//           return (
//             // <div key={item.id} className="border rounded-xl p-4">
//             //   <h3>{product.title}</h3>
//             //   <p>{product.reason}</p>

//             //   <button
//             //     onClick={() => handleSave(product.id)}
//             //     disabled={isLoading}
//             //     className="mt-3 px-3 py-1 rounded bg-[#229ECF] text-white"
//             //   >
//             //     Unsave
//             //   </button>
//             // </div>
//             <div
//               key={product.id || index}
//               className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
//             >
//               <div className="relative h-34 md:h-68 w-full">
//                 <Image
//                   src={
//                     product.image ||
//                     product.image_url ||
//                     items[index % items.length]?.image ||
//                     "/images/saved-items/saved1.png"
//                   }
//                   alt={product.title || "Product"}
//                   fill
//                   className="object-cover transition-transform duration-500 ease-out hover:scale-105"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src =
//                       "/images/saved-items/saved1.png";
//                   }}
//                 />
//               </div>

//               <div className="p-5 flex flex-col">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-semibold text-[#229ECF] text-lg">
//                     {product.title}
//                   </h3>

//                   {/* <button
//                     onClick={() => handleSaveProduct(product.id)}
//                     className="p-1 cursor-pointer"
//                   >
//                     {bookmarkedProducts[product.id] ? (
//                       <Bookmark
//                         className="text-[#229ECF] fill-[#229ECF]"
//                         size={18}
//                       />
//                     ) : (
//                       <Bookmark size={18} />
//                     )}
//                   </button> */}
//                 </div>

//                 <p className="text-sm text-gray-500 mb-3">{product.reason}</p>

//                 <div className="flex items-center gap-2 text-sm mb-4">
//                   <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs capitalize">
//                     {product.category}
//                   </span>
//                 </div>

//                 {/* New Price & Button Section */}
//                 <div className="mt-auto flex items-center justify-between">
//                   <span className="text-lg font-semibold text-[#229ECF]">
//                     {product.price || ""}
//                   </span>
//                   <a
//                     href={product.affiliate_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="rounded-lg border-2 cursor-pointer border-[#229ECF] px-4 py-2 text-sm text-[#229ECF] hover:text-white hover:border-white bg-[#DEF0F8] hover:bg-[#229ECF] transition"
//                   >
//                     View In Shop
//                   </a>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default SavedProducts;
import {
  AffiliateProduct,
  SavedItem,
} from "@/redux/features/api/user/recommandetion/savedItemsGet";
import { useSaveItemMutation } from "@/redux/features/api/user/recommandetion/savedItemsPost";
import Image from "next/image";
import { useState } from "react";
import { Bookmark } from "lucide-react";

function isAffiliateProduct(
  savable: SavedItem["savable"],
): savable is AffiliateProduct {
  return savable !== null && "affiliate_link" in savable && "reason" in savable;
}

interface SavedProductsProps {
  products?: SavedItem[];
}

const SavedProducts = ({ products }: SavedProductsProps) => {
  const [saveItem, { isLoading }] = useSaveItemMutation();
  const [bookmarkedProducts, setBookmarkedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  if (!products?.length) {
    return <p>No saved products</p>;
  }

  const handleSave = async (productId: number | string) => {
    try {
      await saveItem({
        item_type: "product",
        item_id: typeof productId === "string" ? parseInt(productId) : productId,
      }).unwrap();

      setBookmarkedProducts((prev) => ({
        ...prev,
        [productId]: !prev[productId],
      }));

      alert("Product unsaved!");
    } catch (err) {
      console.error(err);
      alert("Unsave failed");
    }
  };

  return (
    <section>
      <h1 className="text-primary pb-3 font-semibold text-lg md:text-3xl ">
        Your Saved Products :
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((item, index) => {
          if (!isAffiliateProduct(item.savable)) return null;

          const product = item.savable;

          return (
            <div
              key={product.id || index}
              className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="relative h-34 md:h-68 w-full">
                <Image
                  src={
                    
                    product.image_url ||
                    "/images/saved-items/saved1.png"
                  }
                  alt={product.title || "Product"}
                  fill
                  className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/saved-items/saved1.png";
                  }}
                />
              </div>

              <div className="p-5 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-[#229ECF] text-lg">
                    {product.title}
                  </h3>

                  <button
                    onClick={() => handleSave(product.id)}
                    disabled={isLoading}
                    className="p-1 cursor-pointer"
                  >
                    <Bookmark
                      size={18}
                      className={
                        bookmarkedProducts[product.id]
                          ? "text-[#229ECF] fill-[#229ECF]"
                          : ""
                      }
                    />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-3">{product.reason}</p>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs capitalize">
                    {product.category}
                  </span>
                </div>

                {/* Price & Button */}
                <div className="mt-auto flex items-center justify-between">
                 
                  <a
                    href={product.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border-2 cursor-pointer border-[#229ECF] px-4 py-2 text-sm text-[#229ECF] hover:text-white hover:border-white bg-[#DEF0F8] hover:bg-[#229ECF] transition"
                  >
                    View In Shop
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SavedProducts;

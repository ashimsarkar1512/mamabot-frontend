import {
  AffiliateProduct,
  SavedItem,
} from "@/redux/features/api/user/recommandetion/savedItemsGet";

function isAffiliateProduct(
  savable: SavedItem["savable"],
): savable is AffiliateProduct {
  return savable !== null && "affiliate_link" in savable && "reason" in savable;
}
interface SavedProductsProps {
  products?: SavedItem[];
}

const SavedProducts = ({ products }: SavedProductsProps) => {
  if (!products?.length) {
    return <p>No saved products</p>;
  }

  return (
    <section>
      <h1 className="text-primary pb-3 font-semibold text-lg md:text-3xl ">
        Your Saved Products :
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((item) => {
          if (!isAffiliateProduct(item.savable)) return null;

          const product = item.savable;

          return (
            <div key={item.id} className="border rounded-xl p-4">
              <h3>{product.title}</h3>
              <p>{product.reason}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SavedProducts;

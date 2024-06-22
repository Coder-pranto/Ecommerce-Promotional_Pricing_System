import { CiStar } from "react-icons/ci";
import { FaLocationDot, FaCartShopping } from "react-icons/fa6";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
import AppDownload from "../../components/customers/AppDownload";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataQuery } from "../../utils/api";
import SkeletonProductDetails from "./SkeletonProductDetails";
import { OrderContext } from "../../context/OrderContext";
import { Helmet } from "react-helmet-async";
import { FacebookShareButton } from "react-share";
import Cookies from "js-cookie";
import RelatedProducts from "./RelatedProducts";
import Review from "./Review";

const ProductDetails = () => {
  const { addToOrder, discountedPrice } = useContext(OrderContext);

  const { id } = useParams();
  const userId = Cookies.get("userId");

  const {
    data: singleProductData,
    isLoading,
    isError,
    error,
  } = useDataQuery(["singleProduct", id], `/discount/${id}`);
  const product = singleProductData?.data?.data;
  // console.log(product);

  const { data: productsData, isLoading: loadingProducts } = useDataQuery(
    "products",
    "/discount"
  );

  // filterd based on sub category and the present product
  const filteredBySubCategoryProducts = productsData?.data?.data.filter(
    (singleProduct) =>
      singleProduct?.subcategory_id?._id === product?.subcategory_id?._id
  );
  // console.log(filteredBySubCategoryProducts);

  if (isLoading) return <SkeletonProductDetails />;
  if (isError)
    return (
      <h1 className="text-5xl h-screen flex justify-center items-center">
        {error.message}
      </h1>
    );

  return (
    <section>
      <div className="w-full mx-auto mt-5">
        <span className="font-bold text-slate-400">Home &gt;</span>
        <span className="font-bold text-primary"> Product</span>
      </div>

      {
        <div className="mt-8">
          <Helmet>
            <title>{product?.product_name}</title>
            <meta property="og:title" content={product?.product_name} />
            <meta property="og:type" content="product" />
            <meta property="og:description" content={product?.description} />
            <meta property="og:image" content={product?.image} />
            <meta
              property="og:url"
              content={`https://discounthut-bd.com/product/${product?._id}`}
            />
          </Helmet>
          <div className="flex flex-col md:flex-row gap-x-0 md:gap-x-20">
            <div className="">
              <img
                src={product?.image}
                alt={product?.product_name}
                className="w-full h-[400px] object-cover border-2 border-slate-200 rounded-lg shadow-lg"
              />
            </div>

            <div className="w-[35%] xs:w-full md:w-1/2 p-4 flex-col">
              <div className="one xs:mt-6">
                <h3 className="text-4xl mb-2">{product?.product_name}</h3>
                <div className="flex items-center gap-4 mb-2">
                  <span className=" text-xl text-gray-500">
                    {discountedPrice(
                      product?.price,
                      product?.discount,
                      product?.discount_type?.name
                    )}{" "}
                    BDT
                  </span>
                  <span className="text-gray-400 italic text-md line-through">
                    {product?.price} BDT
                  </span>
                </div>
                {/* <div className="mb-2 text-md">
                  <span className="mr-1 ">
                    <CiStar className="inline" color="red" />
                    <CiStar className="inline" color="red" />
                    <CiStar className="inline" color="red" />
                    <CiStar className="inline" color="red" />
                    <CiStar className="inline" color="red" />
                  </span>{" "}
                  |{" "}
                  <span className="text-slate-400 ml-1">
                    5 Customers Review
                  </span>
                </div> */}
                <p className="p-1 justify-normal">{product?.description}</p>

                <div className="flex items-center justify-center text-nowrap gap-4 text-white lg:mt-32 xs:mt-8">
                  <Link
                    to="/checkout"
                    onClick={() => addToOrder(product)}
                    className="flex items-center justify-center text-xs md:text-sm gap-2 bg-primary rounded-md py-3 px-5 w-1/2"
                  >
                    <FaCartShopping size={18} className="animate-pulse" />
                    <span>Ready to buy</span>
                  </Link>
                  <Link
                    to={`/map/${product?.seller_id}`}
                    className="flex items-center justify-center text-xs md:text-sm gap-2 bg-primary rounded-md py-3 px-5 w-1/2"
                  >
                    <FaLocationDot size={18} className="animate-bounce" />
                    <span>Shop Location</span>
                  </Link>
                </div>
              </div>
              <div className="two p-2 mt-52 xs:mt-16 text-lg text-slate-500">
                <hr className="border-b mb-14 border-slate-300" />
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-between">
                    <div className="w-1/4 text-left">SKU</div>
                    <div className="w-1/4 text-center">:</div>
                    <div className="w-1/2 text-left">{product?.sku}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/4 text-left">Category</div>
                    <div className="w-1/4 text-center">:</div>
                    <div className="w-1/2 text-left">
                      {product?.category_id?.name}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/4 text-left">Tags</div>
                    <div className="w-1/4 text-center">:</div>
                    <div className="w-1/2 text-left">
                      {product?.category_id?.name},{" "}
                      {product?.subcategory_id?.name},{" "}
                      {product?.sub_sub_category_id?.name},{" "}
                      {product?.sub_sub_sub_category_id?.name}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/4 text-left">Share</div>
                    <div className="w-1/4 text-center">:</div>
                    <div className="w-1/2 text-left">
                      <FacebookShareButton
                        url={`https://discounthut-bd.com/product/${product?._id}`}
                        quote={`Check out this amazing product: ${product?.product_name}`}
                        hashtag="#DiscountHutBD"
                      >
                        <FaFacebook
                          size="25px"
                          color=""
                          className="inline text-primary"
                        />
                      </FacebookShareButton>
                      {/* <Link
                        target="_blank"
                        to={`https://www.facebook.com/sharer/sharer.php?u=${product?.image}&link=https://discounthut-bd.com/product/${product?._id}`}
                      >
                        <FaFacebook
                          size="25px"
                          color=""
                          className="inline text-primary"
                        />
                      </Link> */}
                      <Link
                        target="_blank"
                        to={`https://wa.me/?text=https://discounthut-bd.com/product/${product?._id}`}
                      >
                        <FaWhatsapp
                          size="25px"
                          color=""
                          className="inline text-primary ml-4"
                        />
                      </Link>
                      <Link
                        target="_blank"
                        to={`https://www.linkedin.com/sharing/share-offsite/?url=https://discounthut-bd.com/product/${product?._id}`}
                      >
                        <FaLinkedin
                          size="25px"
                          color=""
                          className="inline text-primary ml-4"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <hr className="border-b mt-8 border-slate-300" />

      {/* Description and review Section */}
      <Review userId={userId} sellerId={product?.seller_id} />

      {/* Related Products */}
      <RelatedProducts
        filteredBySubCategoryProducts={filteredBySubCategoryProducts}
        loadingProducts={loadingProducts}
      />

      {/* AppDownload section  */}

      <AppDownload />
    </section>
  );
};

export default ProductDetails;

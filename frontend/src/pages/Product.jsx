import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  
  // Naya State Tab change karne ke liye
  const [activeTab, setActiveTab] = useState("description"); 

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-300 opacity-100">
      
      {/* --------------- Product Data Section (Same as before) ---------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-2xl font-medium">{currency}. {productData.price}</p>
          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border border-gray-300 py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? "border-orange-500" : ""}`}
                  key={index}
                >{item}</button>
              ))}
            </div>
          </div>
          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={() => addToCart(productData._id, size)}
          >ADD TO CART</button>
          <hr className="mt-8 text-gray-200 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy with 7 days.</p>
          </div>
        </div>
      </div>

      {/* --------------- Description & Review Section (MODIFIED) ----------------- */}
      <div className="mt-20">
        <div className="flex">
          <b 
            onClick={() => setActiveTab('description')} 
            className={`border border-gray-200 px-5 py-3 text-sm cursor-pointer ${activeTab === 'description' ? 'bg-gray-100' : ''}`}
          >
            Description
          </b>
          <p 
            onClick={() => setActiveTab('review')} 
            className={`border border-gray-200 px-5 py-3 text-sm cursor-pointer ${activeTab === 'review' ? 'bg-gray-100 font-bold' : ''}`}
          >
            Reviews (122)
          </p>
        </div>

        <div className="flex flex-col gap-4 border-gray-200 border px-6 py-6 text-sm text-gray-500">
          {activeTab === 'description' ? (
            /* Description Content */
            <>
              <p>An ecommerce site for selling products online. Built with MERN stack.</p>
              <p>{productData.description}</p>
            </>
          ) : (
            /* Dummy Reviews Content */
            <div className="flex flex-col gap-4">
              <div className="border-b pb-2">
                <p className="font-bold text-gray-800">Mohsin Imran</p>
                <p>Great quality! The fabric is very comfortable and fits perfectly.</p>
              </div>
              <div className="border-b pb-2">
                <p className="font-bold text-gray-800">Ali Khan</p>
                <p>Value for money. The delivery was also very fast.</p>
              </div>
              <div className="border-b pb-2">
                <p className="font-bold text-gray-800">Sara Ahmed</p>
                <p>The color is exactly as shown in the pictures. Highly recommended!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
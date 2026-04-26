import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-gray-300">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-112.5" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to our e-commerce store, where we bring together a curated
            selection of products designed to simplify your life and delight
            your senses. From everyday essentials to unique finds, our platform
            is built for fast browsing, secure checkout, and exceptional
            customer service.
          </p>
          <p>
            Our mission is to make online shopping reliable, enjoyable, and
            affordable. We partner with trusted brands, offer fast shipping, and
            provide clear product information so you can shop with confidence.
            Discover new favorites, manage your orders easily, and enjoy a
            seamless shopping experience from start to finish.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p style={{ marginTop: "-3%" }}>
            We strive to provide personalized recommendations, reliable
            delivery, and a customer-first shopping experience across every
            category.
          </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-md mb-20">
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We maintain strict quality standards for all our products, ensuring
            that every item meets our high expectations before it reaches your
            doorstep.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Our user-friendly platform allows you to browse, compare, and purchase
            products with ease, saving you time and effort in finding what you need.
          </p>
        </div>
        <div className="border border-gray-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated support team is available to assist you with any questions or concerns, ensuring a seamless shopping experience from start to finish.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;

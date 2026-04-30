import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {ShopContext} from "../context/ShopContext";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const { backendUrl, token } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendUrl + "/api/user/subscribe",
        {
          email,
        },
        {
          headers: {
            token,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="text-center ">
      <p className="text-2x1 font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Join our mailing list to receive updates on new arrivals, special offers
        and our promotions.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-black text-white text-xs sm:text-sm md:text-base px-10 py-4 cursor-pointer"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;

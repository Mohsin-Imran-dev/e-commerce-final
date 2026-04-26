import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { getCartAmount, delievery_fee, currency } = useContext(ShopContext);
  const totalAmount = getCartAmount();
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS"></Title>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}. 
            {totalAmount}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}. 
            {delievery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}. 
            {totalAmount === 0 ? 0 : totalAmount + delievery_fee}.00
          </b>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CartTotal;

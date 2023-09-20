import React, { useEffect, useState } from "react";
import Card from "../components/Cards/Card";

export default function Cart() {
  const [cartData, setcartData] = useState([]);

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("cart"));
    setcartData(a);
  }, []);

  const updateQuantity = (data, value) => {
    const b = [...cartData];
    b.forEach((i) => {
      if (i.id === data.id) {
        i.quantity = i.quantity || 1;
        i.quantity = i.quantity + value;
      }
    });

    localStorage.setItem("cart", JSON.stringify(b));
    setcartData(b);
  };

  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center">
        {cartData?.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
              rate={item.rating?.rate}
              count={item.rating?.count}
              isCart={true}
              
              quantity={item?.quantity}
              updateQuantity={updateQuantity}
            />
          );
        })}
      </div>
    </>
  );
}

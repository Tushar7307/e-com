import React, { useEffect, useState } from "react";
import Card from "../components/Cards/Card";
import axios from "axios";

export default function Home() {
  const [productData, setproductData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      console.log(data);
      setproductData(data);
    };

    getData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-8 justify-center">
        {productData?.map((item) => {
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
            />
          );
        })}
      </div>
    </>
  );
}

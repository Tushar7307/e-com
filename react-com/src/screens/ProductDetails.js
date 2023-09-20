import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Cards/Card";

export const rating = (item) => {
  return Array.from({ length: Math.ceil(item) }, (_, index) => index);
};

export const addtoCart = (addData) => {
  let getCart = JSON.parse(localStorage.getItem("cart")) || [];
  let isQty = false;

  getCart.forEach((i) => {
    if (String(i.id) === String(addData.id)) {
      isQty = true;
      i.quantity = i.quantity || 1;
      i.quantity = i.quantity + 1;
    }
  });

  if (!isQty) {
    localStorage.setItem(
      "cart",
      JSON.stringify([...getCart, { ...addData, quantity: 1 }])
    );
  } else {
    localStorage.setItem("cart", JSON.stringify([...getCart]));
  }
  isQty = false;
};

export default function ProductDetails() {
  let { id } = useParams();

  const [oneData, setoneData] = useState({});
  const [categoryData, setcategoryData] = useState([]);

  const getcategoryData = async (value) => {
    const { data } = await axios.get(
      `https://fakestoreapi.com/products/category/${value.category}`
    );

    const a = data.filter((i) => {
      return i.id.toString() !== id;
    });
    setcategoryData(a);
  };
  useEffect(() => {
    const singleData = async () => {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );

      setoneData(data);
      getcategoryData(data);
    };
    singleData();
  }, [id]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto max-h-96 object-contain object-center rounded"
            src={oneData.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {oneData.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {rating(oneData.rating?.rate).map((i, index) => {
                  return (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  );
                })}
                {rating(5 - rating(oneData.rating?.rate).length).map(
                  (i, index) => {
                    return (
                      <svg
                        key={index}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 text-indigo-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    );
                  }
                )}

                <span className="text-gray-600 ml-3">
                  {oneData.rating?.count}
                </span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{oneData.description}</p>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {oneData.price}$
              </span>
              <button
                onClick={() => addtoCart(oneData)}
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add to Cart
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {categoryData?.map((item) => {
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
    </section>
  );
}

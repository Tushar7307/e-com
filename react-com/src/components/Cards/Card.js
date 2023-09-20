import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { rating, addtoCart } from "../../screens/ProductDetails";

export default function Card({
  title,
  price,
  image,
  id,
  rate,
  isCart,
  quantity,
  updateQuantity,
}) {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();

  const buy = () => {
    sessionStorage.setItem(
      "buy",
      JSON.stringify({
        title,
        price,
        image,
        id,
        rate,
        isCart,
        quantity,
        updateQuantity,
      })
    );

    navigate("/shipping");
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link onClick={handleTop} to={`/product/${id}`}>
        <img className="p-8 rounded-t-lg" src={image} alt="product image" />
      </Link>
      <div className="px-5 pb-5">
        <Link onClick={handleTop} to={`/product/${id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>

        <div>
          <div className="flex items-center mt-2.5 mb-5">
            {rating(rate)?.map((i, index) => {
              return (
                <svg
                  key={index}
                  className="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              );
            })}
            {rating(5 - rating(rate).length)?.map((i, index) => {
              return (
                <svg
                  key={index}
                  className="w-4 h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              );
            })}

            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {rate}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {quantity
                ? String((Number(price) * Number(quantity)).toFixed(2))
                : price}
              $
            </span>

            {!isCart ? (
              <button
                // to={`/product/${id}`}
                onClick={() => addtoCart({ title, price, image, id, rate })}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </button>
            ) : (
              <button
                onClick={buy}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buy now
              </button>
            )}
            {isCart && (
              <div className="flex gap-3 justify-center items-center">
                <button
                  onClick={() =>
                    updateQuantity(
                      {
                        title,
                        price,
                        image,
                        id,
                        rate,
                        isCart,
                        quantity,
                        updateQuantity,
                      },
                      1
                    )
                  }
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  +
                </button>
                <span key={quantity}>{quantity?.toString()}</span>
                <button
                  onClick={() =>
                    updateQuantity(
                      {
                        title,
                        price,
                        image,
                        id,
                        rate,
                        isCart,
                        quantity,
                        updateQuantity,
                      },
                      -1
                    )
                  }
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  -
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

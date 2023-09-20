import React, { useState } from "react";
import { useNavigate, UseNavigate } from "react-router-dom";

export default function Shipping() {
  const [shippingInput, setshippinggInput] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setshippinggInput({
      ...shippingInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const logindata = JSON.parse(localStorage.getItem("auth"));
    console.log(logindata);
    localStorage.setItem("ship", JSON.stringify(shippingInput));
    if (!logindata) {
      navigate(`/signup?redirect=shipping`);
    } else if (!logindata?.isLogin) {
      navigate(`/login?redirect=shipping`);
    } else {
      const { id } = JSON.parse(sessionStorage.getItem("buy"));
      if(id){
          navigate(`/buy?id=${id}`)
      }
    }
  };
  return (
    <div className="flex w-full justify-center">
      <div className=" w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Please enter shipping address
          </h5>
          <div>
            <label
              htmlFor="street"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              street/flat/road
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="street"
              id="street"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder=""
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City/State
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="city"
              id="city"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

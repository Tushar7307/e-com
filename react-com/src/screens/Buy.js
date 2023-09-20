import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Cards/Card";


export default function Buy() {
  const [oneData, setoneData] = useState([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const id = new URLSearchParams(search).get("id");



  useEffect(() => {
    const singleData = async () => {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );

      setoneData(data);
      submit(data);
    };
    singleData();
  }, [id]);

  const submit = async (i) => {
    const { data } = await axios.post("/create-checkout-session", i);

  
    window.open(data.session.url, "_blank");
  
    navigate('/cart')
    return;
  };
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      <Card
        key={id}
        id={oneData.id}
        image={oneData.image}
        title={oneData.title}
        price={oneData.price}
        rating={oneData.rating}
        rate={oneData.rating?.rate}
      />
    </div>
  );
}

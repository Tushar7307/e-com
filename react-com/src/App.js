import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ProductDetails from "./screens/ProductDetails";
import Home from "./screens/Home";
import Layout from "./components/Layout";
import Cart from "./screens/Cart";
import Category from "./screens/Category";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import Buy from "./screens/Buy";
import Shipping from "./screens/Shipping";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "buy",
        element: <Buy />,
      },
      {
        path: "shipping",
        element: <Shipping />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

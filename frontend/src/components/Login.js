import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios"; // Import axios

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({
      email: "",
      password: "",
    });

    try {
      const response = await axios.post("/user/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Assuming the server returns an object with errors if any
      if (response.data.errors) {
        setError(response.data.errors);
        console.log(error);
      } else {
        props.closeModalLogin();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <div className="p-6 bg-rp-black text-white rounded-xl font-lexend">
        <h1 className="font-bold text-2xl">Log In</h1>
        <p>Please Log in to account to manage expenses</p>
        <hr className="my-4" />

        <div className="grid grid-cols-12">
          <label htmlFor="email" className="font-bold flex items-center col-span-4">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={handleInputChange}
            name="email"
            placeholder="Enter Email"
            className="p-2 m-2 inline-block outline-none  col-span-8 bg-jp-black rounded-sm placeholder-rp-yellow"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">{error.email}</span>
        </div>

        <div className="grid grid-cols-12">
          <label htmlFor="password" className="font-bold flex items-center col-span-4">
            Password
          </label>
          <input
            type="password"
            value={user.password}
            onChange={handleInputChange}
            name="password"
            placeholder="Enter Password"
            className="p-2 m-2 inline-block outline-none  col-span-8 bg-jp-black rounded-sm placeholder-rp-yellow"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">{error.password}</span>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <ReactLoading type="bubbles" color="#F5A302" height={50} width={50} />
          ) : (
            <button
              onClick={handleLogin}
              className="font-bold py-3 px-6 rounded-xl border-2 border-rp-yellow text-rp-yellow hover:border-rp-black hover:text-rp-black hover:bg-rp-yellow hover:scale-110 transition delay-150 duration-200"
            >
              Login
            </button>
          )}
        </div>

        <span className="flex justify-center py-2">
          <span className="pr-1">Don't have an account, </span>
          <span
            className="text-rp-yellow cursor-pointer"
            onClick={() => {
              props.closeModalLogin();
              props.openModalSignup();
            }}
          >
            Sign Up
          </span>
        </span>
      </div>
    </div>
  );
}

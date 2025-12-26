"use client";
import React, { useRef } from "react";
import { useCart } from "@/context/cartContext";
import Link from "next/link";

function Sidebar({ show, setShow }) {
  const { cartItems, removeItemFromCart } = useCart();
  const ref = useRef(null);

  if (!show) {
    return null;
  }

  function closeSidebar(e, show) {
    if (ref.current && !ref.current.contains(e.target)) {
      // slideIn remove from the ref and add slideOut class
      const sidebar = document.querySelector(".slideIn");
      sidebar.classList.remove("slideIn");
      sidebar.classList.add("slideOut");
      setTimeout(() => {
        setShow(false);
      }, 500);
    }

    if (show) {
      const sidebar = document.querySelector(".slideIn");
      sidebar.classList.remove("slideIn");
      sidebar.classList.add("slideOut");
      setTimeout(() => {
        setShow(false);
      }, 500);
    }
  }

  return (
    <div
      onClick={(e) => {
        closeSidebar(e, false);
      }}
      className="h-screen fadeIn fixed top-0 left-0 w-full items-end z-50 bg-black/50 backdrop-blur-sm backdrop-grayscale   flex flex-col"
    >
      <div
        ref={ref}
        className="flex slideIn w-[300px] bg-white h-full shadow-md "
      >
        {(cartItems.length !== 0 && (
          <nav className="flex-1 p-4 space-y-4">
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between">
                <h2 className="text-lg font-bold mb-2">Your Cart</h2>
                <button
                  onClick={(e) => {
                    closeSidebar(e, true);
                  }}
                  className="text-white bg-red-400 hover:bg-red-500 p-1 rounded-full duration-300 h-6 w-6 flex items-center justify-center"
                >
                  x
                </button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-gray-800">Your cart is empty.</p>
              ) : (
                <ul className="space-y-2">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-2  items-center justify-between p-2 bg-gray-200/50 rounded"
                    >
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="h-20 w-20 object-cover rounded-md"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-semibold capitalize">
                          {item?.name}
                        </h3>
                        <p className="text-xs text-gray-600">{item?.variant}</p>
                        <p className="text-xs text-gray-600">
                          NPR. {item?.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItemFromCart(item.id, item.name)}
                        className=""
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-400 hover:text-red-600 "
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
                              stroke="#000"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              stroke-linejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Checkout Button */}
            <div className="mt-4 w-full">
              <Link
                href={"/checkout"}
                className="w-full bg-blue-600 p-2 rounded text-white hover:bg-blue-500 transition"
                disabled={cartItems.length === 0}
              >
                Checkout
              </Link>
            </div>
          </nav>
        )) || (
          <div className="flex-1 p-4 space-y-4">
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between">
                <h2 className="text-lg font-bold mb-2">Your Cart</h2>
                <button
                  onClick={(e) => {
                    closeSidebar(e, true);
                  }}
                  className="text-white bg-red-400 hover:bg-red-500 p-1 rounded-full duration-300 h-6 w-6 flex items-center justify-center"
                >
                  x
                </button>
              </div>
              <p className="text-gray-800">Your cart is empty.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;

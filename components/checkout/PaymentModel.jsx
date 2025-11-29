"use client";
import { createOrder } from "@/functions/createOrder";
import { useState } from "react";
import { useCart } from "@/context/cartContext";

export default function PaymentModal({
  isOpen,
  onClose,
  payments,
  paymentType,
  promo,
  grandTotal,
  data,
  cart,
}) {
  const [file, setFile] = useState(null);
  const paymentQr = payments[paymentType - 1];
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState(null);
  const { clearCart } = useCart();

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const output = {
      data,cart,promo,grandTotal,file,paymentQr
    }

    const res = await createOrder(
      data,
      cart,
      promo,
      grandTotal,
      file,
      paymentQr.name
    );

    if (res) {
      setSuccess(true);
      setOrder(res);
      clearCart();
      window.location.href = ("https://casemandu.com.np/order/" + res._id)
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="max-w-3xl w-full h-full overflow-y-auto my-5"
        bis_skin_checked={1}
      >
        {!success && (
          <div
            className="relative h-auto bg-white my-5 p-6"
            bis_skin_checked={1}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              onClick={() => {
                onClose(false);
              }}
              strokeWidth={0}
              viewBox="0 0 24 24"
              className="rotate-45 w-8 h-8 absolute right-4 top-4 cursor-pointer hover:text-black/75 hover:bg-black/10 rounded-full duration-300 z-40"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z" />
            </svg>
            <h1 className="text-2xl font-medium">
              Pay Now with
              <span className="text-primary"> {paymentQr.name}</span>
            </h1>
            <p className="text-sm mt-3 text-gray-900">
              “Pay <span className="font-semibold">Rs 300</span> per cover in
              advance to confirm your order (e.g.,{" "}
              <span className="font-semibold">Rs 600</span> for{" "}
              <span className="font-semibold">2</span> covers), and settle the
              rest upon delivery!”
            </p>
            <div
              className="grid sm:grid-cols-2 gap-2 items-center sm:justify-center"
              bis_skin_checked={1}
            >
              <div bis_skin_checked={1}>
                <h2 className="mt-5 text-base text-gray-900">Payment Method</h2>
                <img
                  className="h-60 w-60 sm:h-72 sm:w-72 lg:h-80 lg:w-80 mt-5 border border-black object-contain rounded-lg"
                  src={paymentQr.qr}
                  alt="Khalti"
                  width={710}
                  height={710}
                />
              </div>
              <div bis_skin_checked={1}>
                <h2 className="mt-5 text-base text-gray-900">
                  Upload your Payment Screenshot{" "}
                  <span className="ms-1 text-red-500">*</span>
                </h2>
                <label
                  htmlFor="paymentImage"
                  className="h-60 w-60 sm:h-72 sm:w-72 lg:h-80 lg:w-80 mt-3 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50  hover:bg-gray-100"
                >
                  {(!file && (
                    <div
                      className="flex flex-col items-center justify-center pt-5 pb-6"
                      bis_skin_checked={1}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 16 16"
                        className="w-6 h-6 mb-4 text-gray-500"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        Click to upload
                      </p>
                    </div>
                  )) || (
                    <img
                      disabled={loading}
                      onDoubleClick={() => {
                        setFile(null);
                      }}
                      className="h-60 w-60 sm:h-72 sm:w-72 lg:h-80 lg:w-80 object-cover rounded-lg"
                      src={URL.createObjectURL(file)}
                      alt="payment"
                    />
                  )}
                  <input
                    disabled={loading}
                    accept="image/*"
                    onChange={handleFileChange}
                    id="paymentImage"
                    className="hidden"
                    type="file"
                  />
                </label>
              </div>
            </div>
            <button
              onClick={handleUpload}
              disabled={loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple text-white hover:bg-purple/90 h-10 px-4 py-2 mt-5 w-full"
            >
              {loading ? "Creating Order" : "Confirm Payment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

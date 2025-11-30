"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/cartContext";
import { UploadImage } from "@/functions/UploadImage";

const Designs = [
  {
    image: "https://i.ibb.co/9n8Yckw/airpods.png",
    title: "airpods",
    aspect: [1, 1],
    id: 1,
    price: 999,
    desc: `Compatible for Apple AirPods 2nd 1st charging case. 0.25mm see-through thin wall allows you to check the indicator status any time. Precise cutouts for easy access to all functions without any interference`,
  },
  {
    image: "https://i.ibb.co/p1td84k/mousepad.png",
    title: "mousepads",
    aspect: [1, 0.43],
    id: 2,
    price: 1150,
  },
  {
    image: "https://i.ibb.co/PrnPTW3/laptop-Sleeves.png",
    title: "laptopsleeves",
    aspect: [1, 1],
    id: 3,
    price: 1150,
  },
  {
    image: "https://i.ibb.co/bNjYR0z/popsocket.png",
    title: "popsockets",
    aspect: [1, 1],
    id: 4,
    price: 150,
  },
  {
    image: "https://i.ibb.co/tYZn2VV/template.png",
    title: "phonecases",
    aspect: [0.52, 1],
    id: 5,
    price: 550,
  },
];

function EditorMain({ id, phone, product }) {
  const [image, setImage] = useState(null);
  const { addItemToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState("");
  const [models, setModels] = useState([]);
  const [model, setModel] = useState("");
  const [singleModel, setSingleModel] = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const [laptopSize, setLaptopSize] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const editor = document.getElementById("editor");
    if (!!editor) editor.scrollIntoView({ behavior: "smooth" });
  }, []);

  const design = Designs.find((design) => design?.title === id);
  const imgref = useRef(null);

  useEffect(() => {
    if (!brand) return;
    if (!!brand) {
      const filtered = product.filter((item) => item._id === brand);
      const containsTemplate = filtered[0]?.models.filter(
        (item) => item.templateImg
      );
      console.log(containsTemplate);
      setModels(containsTemplate);
    }
  }, [brand]);

  useEffect(() => {
    if (!!model) {
      const filtered = models.filter((item) => item._id === model);
      setSingleModel(filtered[0]);
      const variant = filtered[0]?.caseTypes[0]?._id;
      setActiveVariant(variant);
    }
  }, [model]);

  async function handleAddToCart() {
    if (!image) return alert("Please upload an image");
    if (
      id === "laptopsleeves" &&
      (laptopSize.height === 0 || laptopSize.width === 0)
    )
      return alert("Please enter the size of your laptop");
    setLoading(true);

    const variant =
      id === "laptopsleeves"
        ? `Height : ${laptopSize?.height} , Width : ${laptopSize?.width} (In Inches)`
        : "Custom Design";

    const itemId = Math.floor(Math.random() * 1000);
    
    // Create a preview URL for display in cart (using blob URL)
    const previewUrl = URL.createObjectURL(image);
    
    const data = {
      name: !phone ? design.title : singleModel?.name,
      qty: 1,
      image: previewUrl, // Use blob URL for preview (will send actual file in order)
      variant: !phone
        ? variant
        : singleModel?.caseTypes.find((item) => item._id === activeVariant)
            ?.name,
      id: itemId,
      price: !phone
        ? design.price
        : singleModel?.caseTypes.find((item) => item._id === activeVariant)
            ?.price,
    };

    // Create coordinates object (default center position, can be updated with actual crop/position data)
    const customCaseCoordinates = {
      x: 0, // x position (can be updated based on actual positioning)
      y: 0, // y position (can be updated based on actual positioning)
      scale: 1, // scale factor (can be updated based on actual scaling)
      rotation: 0, // rotation angle (can be updated based on actual rotation)
    };

    // Pass customImage (File) and coordinates to addItemToCart
    // The actual image file will be sent directly in the order, not uploaded to imgbb
    addItemToCart(data, image, customCaseCoordinates);
    alert("Item added to cart");
    setImage(null);
    setLoading(false);
    setActiveVariant(null);
    setLaptopSize({ height: 0, width: 0 });
  }

  if (!design) return <h1>Design not found</h1>;

  return (
    <div className="flex flex-col gap-5 md:p-10 p-4">
      <div className="flex gap-2 items-center">
        <Link
          href={"/"}
          className="text-gray-400 cursor-pointer hover:text-blue-400 duration-300"
        >
          Home
        </Link>
        <p className="text-gray-400">&gt;</p>
        <p className="text-gray-400">{design?.title}</p>
      </div>

      <div
        id="editor"
        className="
         py-5 flex flex-col md:flex-row items-center justify-center  gap-4
        "
      >
        {/* preview Screen */}
        <div
          className="
                 md:w-1/2 w-full relative   rounded-md  bg-white flex justify-center items-center h-full
                "
        >
          <div
            className="relative bg-red-500  "
            style={{
              width: `${design?.aspect[0] * 500}px`,
            }}
          >
            <div
              className="flex overflow-hidden  bg-red-300 "
              style={{
                backgroundImage:
                  (!!image && `url(${URL.createObjectURL(image)})`) ||
                  "url(https://i.ibb.co/TqJNrL0/custom-Design.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <img
                onDoubleClick={() => {
                  document.getElementById("file").click();
                }}
                ref={imgref}
                src={`${
                  !!singleModel
                    ? singleModel?.templateImg ||
                      "https://i.ibb.co/tYZn2VV/template.png"
                    : design?.image
                }`}
                alt="preview"
                className="z-20 w-full object-contain "
                style={{}}
              />
            </div>
          </div>
          <div className="absolute z-30 -bottom-20 left-0 w-full bg-purple text-white p-2 rounded-md">
            Warning: Final product may vary slightly in color and design
            placement due to production processes.
          </div>
        </div>

        {/* editor */}
        <div className=" md:w-1/2 w-full  bg-white rounded-md p-2 h-full flex flex-col gap-3    ">
          <div className="flex flex-col gap-5">
            <h1 className="md:text-3xl text-xl font-bold">
              Customise <span className="capitalize ">{design?.title}</span>
            </h1>
            <div className="h-[1px] w-full bg-gray-300"></div>
            <p className="text-black/80 md:text-3xl text-xl font-bold ">
              Rs:{" "}
              {!activeVariant
                ? design?.price
                : singleModel?.caseTypes.find(
                    (item) => item._id === activeVariant
                  )?.price}
            </p>
            <div className="h-[1px] w-full bg-gray-300"></div>
            {/* write a short description */}
            {!phone && (
              <div className="flex">
                {(!!design?.desc && (
                  <p className="text-sm text-gray-900/80">{design?.desc}</p>
                )) || (
                  <p className="text-sm text-gray-700/80 ">
                    How to customise your {design?.title}? <br />
                    1. Click on the upload button below <br />
                    2. Resize and adjust the image <br />
                    3. Upload your image <br />
                    4. Click on the Order button <br />
                    5. Fill in the details and place the order
                  </p>
                )}
              </div>
            )}
            {/* laptop sleeves */}
            {id === "laptopsleeves" && (
              <div className="flex flex-col  gap-5">
                <p className="text-gray-900">
                  Enter the size of your laptop (in Inches)
                </p>
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <p className="text-gray-900">Height </p>
                      <span className="text-red-500">*</span>
                    </div>
                    <input
                      onChange={(e) => {
                        if (isNaN(e.target.value)) return;
                        setLaptopSize({
                          ...laptopSize,
                          height: e.target.value,
                        });
                      }}
                      defaultValue={laptopSize.height}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <p className="text-gray-900">Width </p>
                      <span className="text-red-500">*</span>
                    </div>
                    <input
                      defaultValue={laptopSize.width}
                      onChange={(e) => {
                        if (isNaN(e.target.value)) return;
                        setLaptopSize({ ...laptopSize, width: e.target.value });
                      }}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Phone model */}
            {phone && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p className="text-gray-900">Select Brand </p>
                    <span className="text-red-500">*</span>
                  </div>
                  <select
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Brand</option>
                    {product.map((phone) => (
                      <option key={phone._id} value={phone._id}>
                        {phone.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p className="text-gray-900">Select Model </p>
                    <span className="text-red-500">*</span>
                  </div>
                  <select
                    onChange={(e) => {
                      if (e.target.value === "") return;
                      setModel(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Model</option>
                    {models?.map((phone) => (
                      <option key={phone._id} value={phone._id}>
                        {phone.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {!!phone && !!singleModel && (
              <div className="flex flex-flex-wrap gap-2">
                {singleModel?.caseTypes?.map((type, index) => (
                  <div
                    key={index}
                    className="flex gap-2 flex-col justify-center items-center"
                  >
                    <div
                      onClick={() => setActiveVariant(type._id)}
                      className={`flex border duration-300 cursor-pointer border-black p-2 ${
                        activeVariant === type._id
                          ? "bg-black text-white"
                          : "bg-transparent text-black"
                      }  `}
                    >
                      {type?.name}
                    </div>
                    <p className="text-gray-900">Rs: {type?.price}</p>
                  </div>
                ))}
              </div>
            )}

            {/* images */}
            <div className="flex gap-2 flex-col">
              {!!image && (
                <div className="flex flex-col">
                  <p className="text-gray-900">Choosen Design</p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="custom"
                    className="w-20 h-20 object-cover border border-transparent"
                    style={{
                      aspectRatio: `${design?.aspect[0]}/${design?.aspect[1]}`,
                    }}
                  />
                  <p className="text-gray-900">
                    Be sure to maintain the aspect ratio of the image
                    <span className="text-red-500">
                      {" "}
                      {design?.aspect[0]}:{design?.aspect[1]}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center items-center p-5 border-dashed rounded-md ">
              <input
                disabled={loading}
                onChange={(e) => {
                  if (e.target.files.length === 0) return;
                  setImage(e.target.files[0]);
                }}
                type="file"
                id="file"
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="file"
                className="
                          md:w-auto w-full flex items-center justify-center bg-purple text-white px-5 py-2 rounded-md cursor-pointer hover:bg-purple/80 duration-300
                          "
              >
                <svg
                  className="w-6 h-6 inline-block mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      className="upDown"
                      d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                      stroke="#ffffff5c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    ></path>{" "}
                  </g>
                </svg>
                Upload Image
              </label>
              {!!image && (
                <button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="
                          md:w-auto w-full bg-green-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-green-800 duration-300
                          "
                >
                  <svg
                    className="w-6 h-6 inline-block mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  {loading ? "Adding to cart..." : "Add to Cart"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed z-50 top-0 left-0 h-full w-full bg-black/50 backdrop-grayscale flex justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md flex-col flex gap-3">
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-10 w-10 text-blue-600"
                xmlns="http://www.w3.org/
              2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Adding Items to cart...</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditorMain;

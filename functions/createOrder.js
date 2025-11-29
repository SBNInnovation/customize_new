import { UploadImage } from "./UploadImage";

export async function createOrder(
  data,
  cart,
  promo,
  grandTotal,
  image,
  paymentMethod
) {
  const img = await UploadImage(image);
  let paymentProof = img?.data?.url;

  const uploadData = {
    name: data.name,
    email: data.email,
    orderItems: cart,
    shippingAddress: data.address,
    province: "Koshi",
    city: data.district,
    phone: data.phone,
    additionalInfo: data.additionalInfo,
    paymentMethod: paymentMethod,
    paymentImage: paymentProof,
    priceSummary: {
      promoCode: !!promo ? promo?.code : null,
      total: grandTotal,
      deliveryCharge: 150,
    },
  };

  const api = process.env.NEXT_PUBLIC_BACKEND;

  const res = await fetch(api + "/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uploadData),
  });

  const val = await res.json();
  return val;
}

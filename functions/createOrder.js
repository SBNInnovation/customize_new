export async function createOrder(
  data,
  cart,
  promo,
  grandTotal,
  paymentImage,
  paymentMethod,
  customImage = null,
  customCaseCoordinates = null
) {
  // Create FormData for multipart/form-data request
  const formData = new FormData();

  // Append all order fields individually
  if (data.name) formData.append("name", data.name);
  if (data.email) formData.append("email", data.email);
  if (data.phone) formData.append("phone", data.phone);
  if (data.address) formData.append("shippingAddress", data.address);
  if (data.district) formData.append("city", data.district);
  if (data.additionalInfo) formData.append("additionalInfo", data.additionalInfo);
  if (paymentMethod) formData.append("paymentMethod", paymentMethod);
  
  // Format and stringify orderItems - backend requires this field
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    console.error("Cart is empty or invalid:", cart);
    throw new Error("Cart is empty. Please add items to cart before placing order.");
  }

  // Transform cart items to match backend expected format (same as casemandu-client)
  const orderItems = cart
    .filter((item) => {
      // More detailed validation
      if (!item) {
        console.warn("Found null/undefined item in cart");
        return false;
      }
      if (!item.name || item.name.trim() === "") {
        console.warn("Item missing name:", item);
        return false;
      }
      if (item.price === undefined || item.price === null || isNaN(Number(item.price))) {
        console.warn("Item missing or invalid price:", item);
        return false;
      }
      return true;
    })
    .map((item) => {
      // Backend expects orderItems with only: qty, price, variant
      // Based on successful API response structure
      const formattedItem = {
        qty: Number(item.qty) || 1,
        price: Number(item.price) || 0, // Ensure price is a number
        variant: item.variant || "Custom Design",
      };
      
      // Include product ID if available (for phone cases)
      // Some backends might require this field
      if (item.productId || item.product) {
        formattedItem.product = item.productId || item.product;
      }
      
      return formattedItem;
    });

  // Validate that we have at least one valid order item
  if (orderItems.length === 0) {
    console.error("No valid order items after transformation. Original cart:", cart);
    throw new Error("No valid items in cart. Please check your cart items have name and price.");
  }

  // Always append orderItems (backend requires this field)
  // Ensure it's a valid JSON string
  const orderItemsJson = JSON.stringify(orderItems);
  
  // Verify the JSON is valid before appending
  try {
    const parsed = JSON.parse(orderItemsJson); // Validate JSON is parseable
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("orderItems must be a non-empty array");
    }
  } catch (e) {
    console.error("Failed to validate orderItems JSON:", e);
    throw new Error("Failed to format order items. Please try again.");
  }
  
  // Append orderItems - backend requires this field
  formData.append("orderItems", orderItemsJson);

  
  if (promo && promo.code) {
    formData.append("priceSummary", JSON.stringify({
      promoCode: promo.code,
      total: grandTotal,
      deliveryCharge: 150,
    }));
  } else {
    formData.append("priceSummary", JSON.stringify({
      promoCode: null,
      total: grandTotal,
      deliveryCharge: 150,
    }));
  }

  // Append payment image as binary file directly (not uploaded to imgbb)
  if (paymentImage && (paymentImage instanceof File || paymentImage instanceof Blob)) {
    formData.append("paymentImage", paymentImage, paymentImage.name || "payment-proof");
  }

  // Send customCaseCoordinates as JSON string (or empty object if not provided)
  if (customCaseCoordinates && typeof customCaseCoordinates === 'object' && Object.keys(customCaseCoordinates).length > 0) {
    formData.append("customCaseCoordinates", JSON.stringify(customCaseCoordinates));
  } else {
    formData.append("customCaseCoordinates", "{}");
  }

  // Only append customImage if it exists and is a valid File/Blob
  if (customImage && (customImage instanceof File || customImage instanceof Blob)) {
    formData.append("customImage", customImage, customImage.name || "custom-image");
  }

  const api = process.env.NEXT_PUBLIC_API_URL ||"https://casemandu-api.onrender.com";

  if (!api) {
    throw new Error("NEXT_PUBLIC_BACKEND environment variable is not set");
  }

  try {
    
    const res = await fetch(api + "/api/orders", {
      method: "POST",
      // Don't set Content-Type header - browser will set it with boundary for FormData
      body: formData,
    });

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch (e) {
        const text = await res.text();
        errorData = { message: text || "Unknown error" };
      }
      
      // Check if the error is specifically about order items
      const errorMessage = errorData.message || errorData.error || `Order creation failed with status ${res.status}`;
      if (errorMessage.toLowerCase().includes("order item") || errorMessage.toLowerCase().includes("no order")) {
        console.error("Backend reported no order items. Sent orderItems:", orderItems);
      }
      
      throw new Error(errorMessage);
    }

  const val = await res.json();
  return val;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

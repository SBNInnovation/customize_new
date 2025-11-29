export async function verifyPromo(data) {
  const url = process.env.NEXT_PUBLIC_BACKEND;
  const response = await fetch(url + "/api/promocodes", {
    method: "GET",
  });
  const result = await response.json();
  if (result.length === 0) return false;
  const verify = result.filter((promo) => promo.code === data);

  if (verify.length > 0) {
    return verify[0];
  } else {
    return false;
  }
}

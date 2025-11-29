export async function GetAllPhone(){
    const url = process.env.NEXT_PUBLIC_BACKEND;
    const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
  
   const res =   await fetch(url+"/api/phones", requestOptions)
    const data = await res.json();
    return data;
}
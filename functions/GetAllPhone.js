export async function GetAllPhone(){
    const url = process.env.NEXT_PUBLIC_API_URL || "https://casemandu-api.casemandu.com.np";
    
    if (!url) {
        console.error("NEXT_PUBLIC_BACKEND environment variable is not set");
        return [];
    }
    
    const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
  
    try {
        const res = await fetch(url+"/api/phones", requestOptions);
        if (!res.ok) {
            console.error("Failed to fetch phones:", res.status);
            return [];
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching phones:", error);
        return [];
    }
}
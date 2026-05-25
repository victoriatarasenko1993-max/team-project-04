import axios from "axios";

export async function getDessertDetailsById(id){
    const BASE_URL = "https://deserts-store.b.goit.study";
    const END_POINT = "/api/desserts";
    const url = `${BASE_URL}${END_POINT}`;
    
    const params = {
        id: id,
    }
    const res = await axios.get(url, { params });
    return res;
}
import { supabase } from "../../createClient.js";

const getProducts =  async() => {
    try{
        const { data } = await supabase
          .from('Product')
          .select('*');
          console.log(data)
          return data;
    }
    catch(e){
        console.log(e)
    }
}
export default getProducts;
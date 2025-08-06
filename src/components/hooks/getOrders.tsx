import { supabase } from "../../createClient.js";

const getOrders =  async() => {
    try{
        const { data } = await supabase
          .from('Users')
          .select('*');
          console.log(data)
          return data;
    }
    catch(e){
        console.log(e)
    }
}
export default getOrders;
// hooks/useInsertOrders.js
import { supabase } from "../../createClient.js";

const insertOrders = async (productIds: number[], userId: string | null) => {
  try {
    const orders = productIds.map((productId) => ({
      productId,
      userId: userId && userId !== '0' ? parseInt(userId) : null // praktikisht: nëse s'ka user, dërgo null
    }));

    const { data, error } = await supabase.from("Orders").insert(orders);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Insert orders failed:", error);
    throw error;
  }
};


export default insertOrders;

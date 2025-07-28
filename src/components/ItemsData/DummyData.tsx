// DummyData.tsx
import { useEffect, useState } from 'react';
import { supabase } from "../../createClient";

export interface Item {
  ProductId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const DummyData = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('Product').select('*');

      if (error) {
        console.error("Fetch error:", error.message);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data) {
        // Mapo të dhënat dhe shto 'quantity'
        const mappedData: Item[] = data.map((item: any) => ({
          ...item,
          quantity: 0
        }));
        setItems(mappedData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return { items, loading, error };
};

export default DummyData;

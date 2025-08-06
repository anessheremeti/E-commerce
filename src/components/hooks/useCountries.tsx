import { useState, useEffect } from 'react';

const useCountries = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();

        const names = data
          .map((country: any) => country?.name?.common)
          .filter(Boolean)
          .sort();
          console.log(names)
        setCountries(names);
      } catch (err) {
        console.error("Error fetching countries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading };
};

export default useCountries;

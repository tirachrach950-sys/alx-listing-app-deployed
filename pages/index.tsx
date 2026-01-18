import { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
}

const Home: NextPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <>
      <Head>
        <title>ALX Listing App</title>
      </Head>
      <div style={{ padding: "2rem" }}>
        <h1>Property Listings</h1>
        <ul>
          {properties.map((prop) => (
            <li key={prop.id}>
              {prop.title} - {prop.location} - ${prop.price}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;


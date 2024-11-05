import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

// Base URL for the cocktail search API
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// Define the query with search term
const searchCocktailsQuery = (searchTerm) => {
  console.log("searchTerm in searchCocktailsQuery:", searchTerm); // Debugging
  return {
    queryKey: ["search", searchTerm || "vodka"], // Default to "a" if searchTerm is empty
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      console.log("API response:", response.data); // Debugging
      // Return drinks or an empty array if none found
      return response.data.drinks || [];
    },
  };
};

// Loader to capture search term from URL
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search") || "vodka"; // Default to "a" if not provided
    console.log("Captured searchTerm in loader:", searchTerm); // Debugging
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;

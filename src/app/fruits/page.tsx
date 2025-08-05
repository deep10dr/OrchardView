"use client";

import { useRef, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { PiSpinnerBold } from "react-icons/pi";
import axios from "axios";
import Lottie from "lottie-react";
import lost from "../animation/lost.json";

interface Details {
  name: string;
  scientificName: string;
  slug: string;
  description: string;
}

export default function Page() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<Details[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError("Please enter a fruit name.");
      setItems([]);
      return;
    }

    setLoading(true);
    setError("");
    setItems([]);

    try {
      const res = await axios.get(
        "https://nutritional-api.p.rapidapi.com/search",
        {
          params: { q: query },
          headers: {
            "x-rapidapi-key":
              "4c5be6c858mshb074e95e20315dcp1d16a5jsnd5dc2d873367",
            "x-rapidapi-host": "nutritional-api.p.rapidapi.com",
          },
        }
      );

      const data = res.data as Details[];

      if (!data.length) {
        setError("No results found.");
      } else {
        setItems(data);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 gap-6">
      {/* Title */}
      <p className="text-center font-bold text-3xl mb-4">Orchard View</p>

      {/* Search Box */}
      <div className="flex h-12 rounded-3xl gap-2 items-center bg-black/20 px-2 shadow-lg w-full max-w-xl">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter the fruit's name..."
          aria-label="Search input"
          className="flex-grow bg-transparent text-black placeholder:text-gray-700 p-2 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-[#FF5252] text-white p-[10px] rounded-full hover:shadow-2xl transition duration-200"
        >
          {loading ? (
            <PiSpinnerBold className="animate-spin text-xl" />
          ) : (
            <FaSearch className="text-lg" />
          )}
        </button>
      </div>

      {/* Error Message */}
      {error ? (
        <div className="w-full flex justify-center items-center flex-col">
          <p className="text-red-600 font-medium text-center">{error}</p>
          <div className="">
            <Lottie animationData={lost} loop={true} step={1} />
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 w-full max-w-6xl p-2 overflow-y-auto md:h-[500px]">
          {!loading &&
            !error &&
            items.length > 0 &&
            items.map((item, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-xl p-4 shadow hover:shadow-xl transition duration-300 
              "
              >
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-sm italic text-gray-700">
                  {item.scientificName}
                </p>
                <p className="text-sm text-gray-600 mb-2">{item.slug}</p>
                <p className="text-xs text-gray-800">{item.description}</p>
              </div>
            ))}

          {!loading && !error && items.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              Start typing a fruit name to search...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

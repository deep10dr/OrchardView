"use client";

import { useRef, useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
interface details {
  name: string;
  scientificName: string;
  slug: string;
  description: string;
}

export default function Page() {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [items, setItems] = useState([]);

  async function handleSearch() {
    const option = {
      method: "GET",
      url: "https://nutritional-api.p.rapidapi.com/search",
      params: { q: query },
      headers: {
        "x-rapidapi-key": "4c5be6c858mshb074e95e20315dcp1d16a5jsnd5dc2d873367",
        "x-rapidapi-host": "nutritional-api.p.rapidapi.com",
      },
    };
    axios
      .request(option)
      .then((value) => {
        console.log(value.data[0].name);
        setItems(value.data);
      })
      .catch((error) => {
        setItems([]);
      });
  }

  return (
    <div className="w-full min-h-screen flex flex-col-reverse items-center gap-10">
      <div className="p-2 flex h-12 rounded-3xl gap-2 items-center bg-black/20 mb-10">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter the fruits name search"
          className="p-2 shadow-2xl rounded-2xl focus:ring-0 hover:ring-0 border-none focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <div
          onClick={handleSearch}
          className="bg-[#FF5252] text-white p-3 rounded-3xl cursor-pointer hover:shadow-2xl "
        >
          <FaSearch />
        </div>
      </div>
      <div className="bg-black/20 text-white md:w-100  w-80 overflow-y-hidden gap-10 grid grid-cols-2 rounded-2xl p-2">
        {items.map((value: details, index: number, arr) => {
          return (
            <div key={index}>
              <p>{value?.name}</p>
              <p>{value?.scientificName}</p>
              <p>{value?.slug}</p>
              <p>{value?.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import HerbCard from "../components/HerbCard";
import SearchAndFilter from "../components/SearchAndFilter";
import { herbs } from "../data/herbs";

export default function Home() {
  const [filteredHerbs, setFilteredHerbs] = useState(herbs);

  const handleSearchAndFilter = (searchTerm, system) => {
    const filtered = herbs.filter((herb) => {
      const matchesSearch =
        herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        herb.medicinalUses.some((use) =>
          use.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesSystem = system === "All" || herb.ayushSystem === system;
      return matchesSearch && matchesSystem;
    });
    setFilteredHerbs(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to the Virtual Herbal Garden
      </h1>
      <p className="text-lg mb-8 text-center">
        Explore the diverse range of medicinal plants used in AYUSH (Ayurveda,
        Yoga & Naturopathy, Unani, Siddha, and Homeopathy).
      </p>
      <SearchAndFilter onSearch={handleSearchAndFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHerbs.map((herb) => (
          <Link key={herb.slug} href={`/herb/${herb.slug}`}>
            <HerbCard herb={herb} />
          </Link>
        ))}
      </div>
      {filteredHerbs.length === 0 && (
        <p className="text-center text-xl mt-8">
          No herbs found matching your search criteria.
        </p>
      )}
    </div>
  );
}

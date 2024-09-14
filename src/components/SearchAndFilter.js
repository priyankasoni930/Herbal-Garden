import { useState } from "react";

export default function SearchAndFilter({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("All");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term, selectedSystem);
  };

  const handleFilter = (e) => {
    const system = e.target.value;
    setSelectedSystem(system);
    onSearch(searchTerm, system);
  };

  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Search herbs..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded flex-grow"
      />
      <select
        value={selectedSystem}
        onChange={handleFilter}
        className="border p-2 rounded"
      >
        <option value="All">All Systems</option>
        <option value="Ayurveda">Ayurveda</option>
        <option value="Yoga and Naturopathy">Yoga and Naturopathy</option>
        <option value="Unani">Unani</option>
        <option value="Siddha">Siddha</option>
        <option value="Homeopathy">Homeopathy</option>
      </select>
    </div>
  );
}

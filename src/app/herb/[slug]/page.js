"use client";

import Image from "next/image";
import { herbs } from "../../../data/herbs";
import HerbQuiz from "../../../components/HerbQuiz";

export default function HerbPage({ params }) {
  const herb = herbs.find((h) => h.slug === params.slug);

  if (!herb) {
    return <div>Herb not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">{herb.name}</h1>
      <p className="text-xl text-green-600 mb-8">{herb.ayushSystem}</p>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/2">
          <Image
            src={`/images/herbs/${herb.image}`}
            alt={herb.name}
            width={800}
            height={600}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="mb-4">{herb.description}</p>
          <h2 className="text-2xl font-semibold mb-4">Medicinal Uses</h2>
          <ul className="list-disc list-inside mb-6">
            {herb.medicinalUses.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
          <HerbQuiz herb={herb} />
        </div>
      </div>
    </div>
  );
}

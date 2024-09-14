import Image from "next/image";

export default function HerbCard({ herb }) {
  return (
    <div className="herb-card">
      <Image
        src={`/images/herbs/${herb.image}`}
        alt={herb.name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{herb.name}</h2>
        <p className="text-gray-600 mb-2">{herb.shortDescription}</p>
        <p className="text-sm text-green-600 font-semibold">
          {herb.ayushSystem}
        </p>
      </div>
    </div>
  );
}

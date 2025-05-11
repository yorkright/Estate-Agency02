'use client';
import Link from 'next/link';
import Image from 'next/image';

const agents = [
  {
    id: '1',
    name: 'Jitender Rathore',
    photo: '/s1.png',
    email: 'john@example.com',
    phone: '123-456-7890',
  },
  {
    id: '2',
    name: 'Lalit sharma',
    photo: '/s2.png',
    email: 'jane@example.com',
    phone: '987-654-3210',
  },
  {
    id: '3',
    name: 'Priti pandey ',
    photo: '/s3.png',
    email: 'alex@example.com',
    phone: '555-123-4567',
  },
];

export default function AgentsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Meet Our Agents</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition duration-300"
          >
            <Image
              src={agent.photo}
              alt={agent.name}
              width={200}
              height={200}
              className="rounded-full mx-auto"
            />
            <h2 className="text-xl font-semibold text-center mt-4">{agent.name}</h2>
            <p className="text-center text-sm text-gray-500">{agent.email}</p>
            <p className="text-center text-sm text-gray-500">{agent.phone}</p>

            <div className="mt-4 text-center">
              <Link href={`/agents/${agent.id}`}>
                <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  View Profile
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

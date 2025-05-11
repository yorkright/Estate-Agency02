'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const agents = [
  {
    id: '1',
    name: 'Jitender Rathore',
    photo: '/s1.png',
    email: 'john@example.com',
    address: 'Delhi, outer jamnapar , near police chowki',
    pincode: '022134',
    phone: '123-456-7890',
  },
  {
    id: '2',
    name: 'Lalit sharma',
    photo: '/s2.png',
    email: 'jane@example.com',
    address: 'Maharastra, outer Lonavala , near beach',
    pincode: '678433',
    phone: '987-654-3210',
  },
  {
    id: '3',
    name: 'Priti pandey',
    photo: '/s3.png',
    email: 'alex@example.com',
    address: 'Delhi, karolbahg',
    pincode: '022140',
    phone: '555-123-4567',
  },
];

export default function AgentDetailPage() {
  const { id } = useParams();

  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        Agent not found (404)
      </div>
    );
  }

  return (
   <>
   <br /><br /><br />
   <div className="max-w-3xl mx-auto p-10">
      <Image
        src={agent.photo}
        alt={agent.name}
        width={200}
        height={200}
        className="rounded-6xl mx-auto"
      />
      <h1 className="text-3xl font-bold text-center mt-4">{agent.name}</h1>
      <p className="text-center text-gray-600">{agent.address}</p>
      <p className="text-center text-gray-600">Pincode: {agent.pincode}</p>
      <div className="mt-4 text-center space-y-1">
        <p><strong>Email:</strong> {agent.email}</p>
        <p><strong>Phone:</strong> {agent.phone}</p>
      </div>
    </div>



   </>
  );
}

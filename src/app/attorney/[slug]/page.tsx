"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import attorneys from "@/data/attorneys/attorneys";
import cases from "@/data/cases/cases";
import { Button } from "@/components/ui/button";
import { getAttorneysbyId } from "../../../../actions/attorneys";

type Attorney = {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
};

type Case = {
  id: number;
  title: string;
  client: string;
  attorney: string;
  description: string;
  status: string;
  verdict: string;
  date: string;
};

export default function AttorneyPage() {
  const params = useParams();
  const slug = params?.slug as string; // Ensuring it's treated as a string

  const [data, setAttorneyData] = useState<Attorney | null>(null);

  useEffect(() => {

    const fetch = async () => {
      if(slug)
      {
      const attorney = await getAttorneysbyId(slug);
      setAttorneyData(attorney || null);
      }
    };
    fetch();

  }, [slug]);

  if (!data)
    return <p className="mt-36 text-center text-xl">Attorney not found.</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-28 md:mt-36 p-3 gap-6">
        {/* Attorney Profile */}
        <div className="text-center space-y-3 md:border-r p-2">
          <img
            src={`/${data.image}`} // Ensure images are in the public folder
            alt={data.name}
            className="w-40 m-auto h-40 object-cover object-top rounded-full hover:scale-105 transition-all duration-200"
          />
          <h1 className="text-3xl font-bold mt-4">{data.name}</h1>
          <p className="text-lg text-gray-600">{data.specialty}</p>
          <p className="text-gray-500">{data.experience} experience</p>
          <p className="mt-4 text-sm text-gray-700">{data.bio}</p>
          <Button className="p-3">Get in touch with {data.name}</Button>
        </div>

        <div>
          <p className="text-3xl font-bold md:text-5xl text-center mb-6">
            Cases solved by {data.name}
          </p>
          <div className="space-y-4">
            {cases.map((c) => (
              
              <div
                key={c.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-bold">{c.title}</h2>
                <p className="text-gray-600">Client: {c.client}</p>
                <p className="text-gray-500 text-sm">Status: {c.status}</p>
                <p className="text-sm text-gray-700">{c.description}</p>
                <p className="text-sm font-semibold mt-2">
                  Verdict: {c.verdict} | Date: {c.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

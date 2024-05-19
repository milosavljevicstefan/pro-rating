"use client"

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { businessDetails } from '../data/businesses';

const Review = () => {
  const searchParams = useSearchParams();
  const businessName = searchParams.get('businessName');

  const [business, setBusiness] = useState<string | null>(businessName);
  const [table, setTable] = useState<string | null>(searchParams.get('tableNumber'));
  const [details, setDetails] = useState({
    image: '',
    ownerEmail: '',
    googleLink: ''
  });

  useEffect(() => {
    if (businessName) {
      setBusiness(businessName);
      const businessInfo = businessDetails[businessName] || {
        image: '/default-image.png',
        ownerEmail: 'default@example.com',
        googleLink: 'https://maps.google.com'
      };
      setDetails(businessInfo);
    }
    if (searchParams.get('tableNumber')) {
      setTable(searchParams.get('tableNumber'));
    }
  }, [businessName, searchParams]);

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto text-center">
      <img 
        src={details.image} 
        alt="Business" 
        className="w-full h-48 object-contain mb-6" 
      />
      <p className="mb-6">
        Here is some random text describing the business. <br />
        <strong>Business Name:</strong> {business} <br />
        <strong>Table Number:</strong> {table} <br />
        <strong>Owner Email:</strong> {details.ownerEmail} <br />
        <a href={details.googleLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">Google Maps Link</a>
      </p>
      <input 
        type="email" 
        placeholder="Enter your email" 
        className="p-3 mb-6 w-full border rounded-xl"
      />
      <div className="flex justify-around w-full">
        <button className="p-3 bg-red-500 text-white rounded">Bad</button>
        <button className="p-3 bg-yellow-500 text-white rounded">Okay</button>
        <button className="p-3 bg-green-500 text-white rounded">Good</button>
      </div>
    </div>
  );
}

export default Review;

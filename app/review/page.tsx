// app/review-form/page.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { businessDetails } from '../../data/businesses';
import { sendReviewMail } from '@/server/mailServerActions';

interface Translation {
  yourOpinion?: string;
  thankYou?: string;
  keyToService?: string;
}

interface LanguageTranslations {
  [key: string]: Translation;
}

const ReviewFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessName = searchParams.get('businessName');

  const [business, setBusiness] = useState<string | null>(businessName);
  const [table, setTable] = useState<string | null>(searchParams.get('tableNumber'));
  const [details, setDetails] = useState({
    image: '',
    ownerEmail: '',
    googleLink: '',
    language: '',
    primaryColor: '',
    secondaryColor: ''
  });

  useEffect(() => {
    if (businessName) {
      setBusiness(businessName);
      const businessInfo = businessDetails[businessName] || {
        image: '/default-image.png',
        ownerEmail: 'default@example.com',
        googleLink: 'https://maps.google.com',
        language: 'en',
        primaryColor: '#000000',
        secondaryColor: '#FFFFFF'
      };
      setDetails(businessInfo);
    }
    if (searchParams.get('tableNumber')) {
      setTable(searchParams.get('tableNumber'));
    }
  }, [businessName, searchParams]);

  const [message, setMessage] = useState('');

  const languageTranslations: LanguageTranslations = {
    'srb': {
      yourOpinion: 'Vaše mišljenje nam je važno!',
      thankYou: 'Hvala vam što ste izdvojili vreme da podelite Vaše utiske sa nama.',
      keyToService: 'Vaše mišljenje je ključno za stvaranje usluga prilagođenih vašim potrebama.'
    },
    'en': {
      yourOpinion: 'Your opinion is important to us!',
      thankYou: 'Thank you for taking the time to share your impressions with us.',
      keyToService: 'Your opinion is key to creating services tailored to your needs.'
    }
    // Add more translations as needed
  };

  const translations = languageTranslations[details.language];

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await sendReviewMail(details.ownerEmail, businessName || '', message, table || '')
    alert("Email send succesful")
  };

  return (
    <div className="flex flex-col items-center p-6 w-full h-screen max-w-md mx-auto text-center font-poppins">
      <p className="mb-6 text-lg font-semibold">{translations?.yourOpinion}</p>
      <p className="mb-6">{translations?.thankYou}</p>
      <p className="mb-6">{translations?.keyToService}</p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col flex-grow">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your review"
          className="flex-grow w-full p-3 mb-4 border rounded-xl"
        />
        
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-xl mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

const SubmitReview = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewFormContent />
    </Suspense>
  );
};

export default SubmitReview;
'use client'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { businessDetails } from '../data/businesses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faSmile, faMeh } from '@fortawesome/free-solid-svg-icons';

interface Translation {
  thankYou?: string;
  enterEmail?: string;
  pleaseRate?: string;
  errorLabel?: string;
}

interface LanguageTranslations {
  [key: string]: Translation;
}

const Review = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessName = searchParams.get('businessName');
  const [emailError, setEmailError] = useState('');

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

  const validateEmail = (email: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

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

  const handleReviewClick = (rating: string) => {
    const email = emailRef.current!.value;

    if (!validateEmail(email)) {
      setEmailError(translations?.errorLabel || 'Please enter a valid email.');
      return;
    }

    if (rating === 'good' && details.googleLink) {
      window.location.href = details.googleLink;
    } else {
      router.push(`/review-form?businessName=${business}&tableNumber=${table}`);
    }
  };

  const languageTranslations: LanguageTranslations = {
    'srb': {
      thankYou: 'Hvala Vam na Poseti!',
      enterEmail: 'Upišite svoj mejl i osvojite nagradu.',
      pleaseRate: 'Molimo Vas da nas ocenite i doprinesete da zajedno rastemo.',
      errorLabel: 'Molimo unesite važeću email adresu.'
    },
    'en': {
      thankYou: 'Thank you for visiting!',
      enterEmail: 'Enter your email and win a prize.',
      pleaseRate: 'Please rate us and help us grow together.',
      errorLabel: 'Please enter a valid email.'
    }
    // Add more translations as needed
  };
  
  const translations = languageTranslations[details.language];

  return (
    <div 
      className="flex flex-col items-center p-6 max-w-md mx-auto text-center" 
      style={{ 
        backgroundImage: `linear-gradient(135deg, ${details.primaryColor} 60%, ${details.secondaryColor} 40%)` 
      }}
    >
      <img 
        src={details.image} 
        alt="Business" 
        className="w-full h-48 object-contain mb-6" 
      />
      <div className="flex flex-col items-center p-6 max-w-md mx-auto text-center">
        <p className="mb-6 text-lg font-semibold">{translations?.thankYou}</p>
        <p className="mb-6">{translations?.enterEmail}</p>
        <p className="mb-6">{translations?.pleaseRate}</p>
    </div>
    <input
        type="email"
        placeholder="Enter your email"
        className={`p-3 mb-2 w-full border-2 rounded-xl ${emailError ? 'border-red-500' : ''}`}
        ref={emailRef}
      />
      {emailError && <p className="text-red-700 mb-6">{emailError}</p>}
    <div className="flex justify-around w-full">
  <div
    className="cursor-pointer flex justify-center items-center rounded-full p-3 bg-white"
    style={{ width: "3.2rem", height: "3.2rem" }}
    onClick={() => handleReviewClick('bad')}
  >
    <FontAwesomeIcon icon={faFaceFrown} style={{ color: "#f93434", fontSize: "3rem" }} />
  </div>
  <div
    className="cursor-pointer flex justify-center items-center rounded-full p-3 bg-white"
    style={{ width: "3.2rem", height: "3.2rem" }}
    onClick={() => handleReviewClick('okay')}
  >
    <FontAwesomeIcon icon={faMeh} style={{ color: "#FFD43B", fontSize: "3rem" }} />
  </div>
  <div
    className="cursor-pointer flex justify-center items-center rounded-full p-3 bg-white"
    style={{ width: "3.2rem", height: "3.2rem" }}
    onClick={() => handleReviewClick('good')}
  >
    <FontAwesomeIcon icon={faSmile} style={{ color: "#1bac11", fontSize: "3rem" }} />
  </div>
</div>

    </div>
  );
}

export default Review;


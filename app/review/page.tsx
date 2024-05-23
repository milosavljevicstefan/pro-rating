'use client'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { businessDetails } from '../../data/businesses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faSmile, faMeh } from '@fortawesome/free-solid-svg-icons';
import { sendMail } from '@/lib/mail';
import { sendPriceMail, sendReviewMail } from '@/server/mailServerActions';

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
  
  const send = async(rating: string)=> {
    const email = emailRef.current!.value;
    
    if (!validateEmail(email)) {
      setEmailError(translations?.errorLabel || 'Please enter a valid email.');
      return;
    }
    if (email) {
      sendPriceMail(email, business || '');
    } else {
      console.error("Email input reference is null.");
    }
    if (rating === 'good' && details.googleLink) {
      window.location.href = details.googleLink;
    } else {
      router.push(`/review-form?businessName=${business}&tableNumber=${table}`);
    }
  }

  return (
    <div 
  className="flex flex-col justify-center items-center p-6 w-screen h-screen text-center font-poppins" 
  style={{ 
    backgroundImage: `linear-gradient(135deg, ${details.primaryColor} 0%, ${details.primaryColor} 5%, #FFE5B4 15%, #FFE5B4 85%, ${details.secondaryColor} 95%, ${details.secondaryColor} 100%)` 
  }}
>
  <p className="pt-24 mb-6 text-3xl" style={{ height: '20%' }}>{translations?.thankYou}</p>
  <img 
    src={details.image} 
    alt="Business" 
    className="w-full h-48 object-contain " 
    style={{ height: '40%' }}
  />
  <p className="mb-6  text-l" style={{ height: '50%' }}>{translations?.enterEmail}</p>
  <input
    type="email"
    placeholder="Enter your email"
    className={`p-3 mb-2 w-full border-2 rounded-xl ${emailError ? 'border-red-500' : ''}`}
    ref={emailRef}
    style={{ height: '60%' }}
  />
  {emailError ? (
  <p className="text-red-700 mb-1">{emailError}</p>
    ) : (
      <div className="h-6 mb-4"/>
    )}

  
  <div className="flex flex-col justify-between h-full" style={{ height: '75%' }}>
    <div className="flex justify-around" style={{ height: '75%' }}>
      <div
        className="cursor-pointer flex justify-center items-center rounded-full ml-4 p-3 mb-5 bg-white"
        style={{ width: "3.2rem", height: "3.2rem" }}
        onClick={() => send('bad')}
      >
        <FontAwesomeIcon icon={faFaceFrown} style={{ color: "#f93434", fontSize: "3rem" }} />
      </div>
      <div
        className="cursor-pointer flex justify-center items-center rounded-full p-3 bg-white"
        style={{ width: "3.2rem", height: "3.2rem" }}
        onClick={() => send('okay')}
      >
        <FontAwesomeIcon icon={faMeh} style={{ color: "#FFD43B", fontSize: "3rem" }} />
      </div>
      <div
        className="cursor-pointer flex justify-center items-center rounded-full mr-4 p-3 bg-white"
        style={{ width: "3.2rem", height: "3.2rem" }}
        onClick={() => send('good')}
      >
        <FontAwesomeIcon icon={faSmile} style={{ color: "#1bac11", fontSize: "3rem" }} />
      </div>
    </div>
    <p className="mb-24" style={{ height: '100%' }}>{translations?.pleaseRate}</p>
  </div>
</div>


  );
}

export default Review;


// app/review/page.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { BusinessDetails, businessDetails } from '../../data/businesses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faSmile, faMeh } from '@fortawesome/free-solid-svg-icons';
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

const ReviewContent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessName = searchParams.get('businessName');
  const [emailError, setEmailError] = useState('');

  const [business, setBusiness] = useState<string | null>(businessName);
  const [table, setTable] = useState<string | null>(searchParams.get('tableNumber'));
  const [details, setDetails] = useState<BusinessDetails>({
    image: '',
    ownerEmail: '',
    googleLink: '',
    languages: [],
    backgroundColor: '',
    textColor: ''
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
        languages: ['en'],
        backgroundColor: '#000000',
        textColor: '#FFFFFF'
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

  const send = async (rating: string) => {
    const email = emailRef.current!.value;
    const translations = languageTranslations[details.languages[0]] || languageTranslations['en']; // Default to English

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

//   return (
//     <div
//       className="flex flex-col justify-center items-center p-6 w-screen h-screen text-center font-poppins"
//       style={{
//         backgroundColor: details.backgroundColor
//       }}
//     >
//       {details.languages.map((lang) => {
//         const translations = languageTranslations[lang];
//         return translations ? (
//           <React.Fragment key={lang}>
//             <p className="pt-24 mb-6 text-3xl" style={{ height: '20%' }}>{translations.thankYou}</p>
//             <img
//               src={details.image}
//               alt="Business"
//               className="w-full h-48 object-contain "
//               style={{ height: '40%' }}
//             />
//             <p className="mb-6 text-l" style={{ height: '50%' }}>{translations.enterEmail}</p>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className={`p-3 mb-2 w-full border-2 rounded-xl ${emailError ? 'border-red-500' : ''}`}
//               ref={emailRef}
//               style={{ height: '60%' }}
//             />
//             {emailError ? (
//               <p className="text-red-700 mb-1">{emailError}</p>
//             ) : (
//               <div className="h-6 mb-4" />
//             )}

//             <div className="flex flex-col justify-between h-full" style={{ height: '75%' }}>
//               <div className="flex justify-around" style={{ height: '75%' }}>
//                 <div
//                   className="cursor-pointer flex justify-center items-center rounded-full ml-4 p-3 mb-5 bg-white"
//                   style={{ width: "3.2rem", height: "3.2rem" }}
//                   onClick={() => send('bad')}
//                 >
//                   <FontAwesomeIcon icon={faFaceFrown} style={{ color: "#f93434", fontSize: "3rem" }} />
//                 </div>
//                 <div
//                   className="cursor-pointer flex justify-center items-center rounded-full p-3 bg-white"
//                   style={{ width: "3.2rem", height: "3.2rem" }}
//                   onClick={() => send('okay')}
//                 >
//                   <FontAwesomeIcon icon={faMeh} style={{ color: "#FFD43B", fontSize: "3rem" }} />
//                 </div>
//                 <div
//                   className="cursor-pointer flex justify-center items-center rounded-full mr-4 p-3 bg-white"
//                   style={{ width: "3.2rem", height: "3.2rem" }}
//                   onClick={() => send('good')}
//                 >
//                   <FontAwesomeIcon icon={faSmile} style={{ color: "#1bac11", fontSize: "3rem" }} />
//                 </div>
//               </div>
//               <p className="mb-24" style={{ height: '100%' }}>{translations.pleaseRate}</p>
//             </div>
//           </React.Fragment>
//         ) : null;
//       })}
//     </div>
//   );
// };

return (
  <div 
    className="flex flex-col justify-center items-center p-6 w-screen h-screen text-center font-poppins" 
    style={{ 
      backgroundColor: details.backgroundColor
    }}
  >
    {details.languages.map((lang) => {
      const translations = languageTranslations[lang];
      return translations ? (
        <React.Fragment key={lang}>
          <p className=''>{translations?.thankYou}</p>
        </React.Fragment>
      ) : null;
    })}
    {/* <p className="pt-24 mb-6 text-3xl" style={{ height: '20%' }}>{translations?.thankYou}</p> */}
    <img 
      src={details.image} 
      alt="Business" 
      className="w-full h-48 object-contain " 
      style={{ height: '40%' }}
    />
    {details.languages.map((lang) => {
      const translations = languageTranslations[lang];
      return translations ? (
        <React.Fragment key={lang}>
          <p className=''>{translations?.enterEmail}</p>
        </React.Fragment>
      ) : null;
    })}
    {/* <p className="mb-6 text-l" style={{ height: '50%' }}>{translations?.enterEmail}</p> */}
    <input
      type="email"
      placeholder="Enter your email"
      className={`p-3 mb-2 w-full border-2 rounded-xl ${emailError ? 'border-red-500' : ''}`}
      ref={emailRef}
      style={{ height: '60%' }}
    />
    {emailError ? (
      <div className='text-red-700 mb-1'>
        {details.languages.map((lang) => {
      const translations = languageTranslations[lang];
      return translations ? (
        <React.Fragment key={lang}>
          <p className=''>{translations?.enterEmail}</p>
        </React.Fragment>
      ) : null;
    })}
      </div>
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
      {details.languages.map((lang) => {
      const translations = languageTranslations[lang];
      return translations ? (
        <React.Fragment key={lang}>
          <p className=''>{translations?.pleaseRate}</p>
        </React.Fragment>
      ) : null;
    })}
      {/* <p className="mb-24" style={{ height: '100%' }}>{translations?.pleaseRate}</p> */}
    </div>
  </div>
);
};

const Review = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewContent />
    </Suspense>
  );
};

export default Review;

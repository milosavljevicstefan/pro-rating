// app/review/page.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { businessDetails } from '../../data/businesses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faSmile, faMeh } from '@fortawesome/free-solid-svg-icons';
import { sendPriceMail, sendReportMail, sendReviewMail } from '@/server/mailServerActions';
import { BusinessDetails } from '@/types';
import { PuffLoader } from 'react-spinners';

interface Translation {
  thankYou?: string;
  enterEmail?: string;
  pleaseRate?: string;
  errorLabel?: string;
  placeHolder?: string;
  bad?: string;
  okay?: string;
  good?: string;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [business, setBusiness] = useState<string | null>(businessName);
  const [table, setTable] = useState<string | null>(searchParams.get('tableNumber'));
  const [details, setDetails] = useState<BusinessDetails>({
    image: '',
    ownerEmails: [],
    googleLink: '',
    languages: [],
    reward: false,
    rewardText: '',
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
        thankYou: 'Hvala Vam na poseti!',
        enterEmail: 'Upišite svoj mejl i osvojite nagradu.',
        pleaseRate: 'Molimo Vas da nas ocenite i doprinesete da zajedno rastemo.',
        errorLabel: 'Molimo unesite važeću email adresu.',
        placeHolder: 'Unesite vašu email adresu...',
        bad: 'Loše',
        okay: 'U redu',
        good: 'Dobro'
    },
    'en': {
        thankYou: 'Thank you for visiting!',
        enterEmail: 'Enter your email and win a prize.',
        pleaseRate: 'Please rate us and help us grow together.',
        errorLabel: 'Please enter a valid email.',
        placeHolder: 'Enter your email...',
        bad: 'Bad',
        okay: 'Okay',
        good: 'Good'
    },
    'cro': {
        thankYou: 'Hvala vam na posjeti!',
        enterEmail: 'Unesite svoj email i osvojite nagradu.',
        pleaseRate: 'Molimo vas da nas ocijenite i pomognete nam rasti zajedno.',
        errorLabel: 'Molimo unesite važeću email adresu.',
        placeHolder: 'Unesite svoj email...',
        bad: 'Loše',
        okay: 'U redu',
        good: 'Dobro'
    },
    'de': {
        thankYou: 'Danke für Ihren Besuch!',
        enterEmail: 'Geben Sie Ihre E-Mail ein und gewinnen Sie einen Preis.',
        pleaseRate: 'Bitte bewerten Sie uns und helfen Sie uns, gemeinsam zu wachsen.',
        errorLabel: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
        placeHolder: 'Geben Sie Ihre E-Mail-Adresse ein...',
        bad: 'Schlecht',
        okay: 'Okay',
        good: 'Gut'
    },
    'es': {
        thankYou: '¡Gracias por visitarnos!',
        enterEmail: 'Ingrese su correo electrónico y gane un premio.',
        pleaseRate: 'Por favor, califíquenos y ayúdenos a crecer juntos.',
        errorLabel: 'Por favor, introduzca un correo electrónico válido.',
        placeHolder: 'Ingrese su correo electrónico...',
        bad: 'Malo',
        okay: 'Bien',
        good: 'Bueno'
    },
    'ro': {
        thankYou: 'Vă mulțumim pentru vizită!',
        enterEmail: 'Introduceți emailul dvs. și câștigați un premiu.',
        pleaseRate: 'Vă rugăm să ne evaluați și să ne ajutați să creștem împreună.',
        errorLabel: 'Vă rugăm să introduceți o adresă de email validă.',
        placeHolder: 'Introduceți adresa dvs. de email...',
        bad: 'Rău',
        okay: 'Bine',
        good: 'Bun'
    }
};


  const send = async (rating: string) => {
    const email = emailRef.current!.value;
    const translations = languageTranslations[details.languages[0]] || languageTranslations['en'];
    if (details.reward) {
      if (email !== '') {
        if (!validateEmail(email)) {
          setEmailError(translations?.errorLabel || 'Please enter a valid email.');
          return;
        }
        sendPriceMail(email, business || '', details.rewardText);
        const emailPromises = details.ownerEmails.map(ownerEmail => sendReportMail(ownerEmail , email, table || ''));
        setLoading(true);
        await Promise.all(emailPromises);
        setLoading(false);

    }
    if (rating === 'good' && details.googleLink) {
      window.location.href = details.googleLink;
    } else {
      router.push(`/review-form?businessName=${business}&tableNumber=${table}`);
    }
  }
}

return (
  <div 
    className="flex flex-col justify-center items-center p-6 w-screen h-screen text-center font-poppins" 
    style={{ 
      backgroundColor: details.backgroundColor,
      color: details.textColor
    }}
  >
     <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: loading ? "block" : "none" // Hide container when loading is false
    }}>
      {loading && ( // Render HashLoader only if loading is true
        <PuffLoader color="#e1e1e1" loading={loading} size={80} />
      )}
    </div>
     
    <img 
      src={details.image} 
      alt="Business" 
      className="w-full h-48 object-contain " 
      style={{ height: '30%' }}
    />
    <div style={{ height: '40%' }} className="text-3xl">
      {details.languages.map((lang) => {
      const translations = languageTranslations[lang];
      return translations ? (
        <React.Fragment key={lang}>
          <p className=''>{translations?.thankYou}</p>
        </React.Fragment>
      ) : null;
    })}
    </div >
    
    <div className='text-l' style={{height: '50%'}}>
      {details.languages.map((lang) => {
        const translations = languageTranslations[lang];
        return translations ? (
          <React.Fragment key={lang}>
            <p className=''>{translations?.enterEmail}</p>
          </React.Fragment>
        ) : null;
      })}
    </div>
    {details.reward && (
      <>
        <input
          type="email"
          placeholder="Email"
          className={`p-3 w-full border-2 rounded-xl text-black ${emailError ? 'border-red-500' : ''}`}
          ref={emailRef}
          style={{ maxHeight: "3rem", overflow: "auto", height: '60%' }}
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
          <div className="h-6"/>
        )}
      </>
    )}
    <div className="flex flex-col justify-between h-full" style={{ height: '70%' }}>
      <div className="flex justify-around" style={{ height: '70%' }}>
        <div className="cursor-pointer flex flex-col items-center  ml-4 p-3 mb-10" style={{ width: "3.2rem", height: "3.2rem" }} onClick={() => send('bad')}>
          <div>
            <FontAwesomeIcon icon={faFaceFrown} className='bg-white rounded-full' style={{ color: "#f93434", fontSize: "3rem" }} />
          </div>
          <div className='text-sm'>
          {details.languages.map((lang) => {
            const translations = languageTranslations[lang];
            return translations ? (
              <React.Fragment key={lang}>
                <p className=''>{translations?.bad}</p>
              </React.Fragment>
            ) : null;
          })}
          </div>
        </div>
        <div className="cursor-pointer flex flex-col items-center  p-3" style={{ width: "3.2rem", height: "3.2rem" }} onClick={() => send('okay')}>
          <div>
            <FontAwesomeIcon icon={faMeh} className='bg-white rounded-full' style={{ color: "#FFD43B", fontSize: "3rem" }} />
          </div>
          <div className='text-sm'>
            {details.languages.map((lang) => {
              const translations = languageTranslations[lang];
              return translations ? (
                <React.Fragment key={lang}>
                  <p className='' style={{ whiteSpace: 'nowrap' }}>{translations?.okay}</p>
                </React.Fragment>
              ) : null;
            })}
          </div>
        </div>
        <div className="cursor-pointer flex flex-col items-center mr-4 p-3" style={{ width: "3.2rem", height: "3.2rem" }} onClick={() => send('good')}>
          <div>
            <FontAwesomeIcon icon={faSmile} className='bg-white rounded-full' style={{ color: "#1bac11", fontSize: "3rem" }} />
          </div>
          <div className='text-sm'>
            {details.languages.map((lang) => {
              const translations = languageTranslations[lang];
              return translations ? (
                <React.Fragment key={lang}>
                  <p className='' style={{ whiteSpace: 'nowrap' }}>{translations?.good}</p>
                </React.Fragment>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className='pt-8' style={{ height: '100%' }}>
      {details.languages.map((lang) => {
        const translations = languageTranslations[lang];
        return translations ? (
          <React.Fragment key={lang}>
            <p className=''>{translations?.pleaseRate}</p>
          </React.Fragment>
        ) : null;
      })}
      </div>
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


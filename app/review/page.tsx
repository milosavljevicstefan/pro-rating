// app/review/page.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, use, useEffect, useRef, useState } from 'react';
import { businessDetails } from '../../data/businesses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceFrown, faSmile, faMeh } from '@fortawesome/free-solid-svg-icons';
import { sendPriceMail, sendReportMail, sendReviewMail } from '@/server/mailServerActions';
import { BusinessDetails } from '@/types';
import { RotateLoader } from 'react-spinners';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Translation {
  yourOpinion?: string;
  thankYou?: string;
  keyToService?: string;
  emailSuccess?: string;
  reviewPlaceHolder?: string;
  submit?: string;
  thankYouVisit?: string;
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
  const [number, setNumber] = useState<string | null>(searchParams.get('number'));
  const [details, setDetails] = useState<BusinessDetails>({
    activated: true,
    image: '',
    ownerEmails: [],
    googleLink: '',
    languages: [],
    reward: false,
    rewardText: '',
    backgroundColor: '',
    textColor: '',
    timeZone: 'Europe/Berlin'
  });
  const [view, setView] = useState('review');
  const [message, setMessage] = useState('');

  const validateEmail = (email: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (!details.activated) {
      if (typeof window !== "undefined") {
        window.location.href = "https://www.pro-rating.com";
      }
    }
  }, [details.activated])

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
    if (searchParams.get('number')) {
      setNumber(searchParams.get('number'));
    }
  }, [businessName, searchParams]);

  const languageTranslations: LanguageTranslations = {
    'srb': {
        yourOpinion: 'Vaše mišljenje nam je važno!',
        thankYou: 'Hvala vam što ste izdvojili vreme da podelite Vaše utiske sa nama.',
        keyToService: 'Vaše mišljenje je ključno za stvaranje usluga prilagođenih vašim potrebama.',
        emailSuccess: 'Hvala Vam na povratnim informacijama! Vaše mišljenje je zabeleženo.',
        reviewPlaceHolder: 'Unesite svoju recenziju...',
        submit: 'Pošalji',
        thankYouVisit: 'Hvala Vam na poseti!',
        enterEmail: 'Upišite svoj mejl i osvojite nagradu.',
        pleaseRate: 'Molimo Vas da nas ocenite i doprinesete da zajedno rastemo.',
        errorLabel: 'Molimo unesite važeću email adresu.',
        placeHolder: 'Unesite vašu email adresu...',
        bad: 'Loše',
        okay: 'U redu',
        good: 'Dobro'
    },
    'en': {
        yourOpinion: 'Your opinion is important to us!',
        thankYou: 'Thank you for taking the time to share your impressions with us.',
        keyToService: 'Your opinion is key to creating services tailored to your needs.',
        emailSuccess: 'Thank you for your feedback! Your opinion has been recorded.',
        reviewPlaceHolder: 'Enter your review...',
        submit: 'Submit',
        thankYouVisit: 'Thank you for visiting!',
        enterEmail: 'Enter your email and win a prize.',
        pleaseRate: 'Please rate us and help us grow together.',
        errorLabel: 'Please enter a valid email.',
        placeHolder: 'Enter your email...',
        bad: 'Bad',
        okay: 'Okay',
        good: 'Good'
    },
    'cro': {
        yourOpinion: 'Vaše mišljenje nam je važno!',
        thankYou: 'Hvala vam što ste izdvojili vrijeme da podijelite svoje mišljenje s nama.',
        keyToService: 'Vaše mišljenje je ključno za stvaranje usluga prilagođenih vašim potrebama.',
        emailSuccess: 'Hvala vam na povratnim informacijama! Vaše mišljenje je zabeleženo.',
        reviewPlaceHolder: 'Unesite svoju recenziju...',
        submit: 'Pošalji',
        thankYouVisit: 'Hvala vam na posjeti!',
        enterEmail: 'Unesite svoj email i osvojite nagradu.',
        pleaseRate: 'Molimo Vas odaberite smajlija koji najbolje opisuje Vaše iskustvo sa nama.',
        errorLabel: 'Molimo unesite važeću email adresu.',
        placeHolder: 'Unesite svoj email...',
        bad: 'Loše',
        okay: 'U redu',
        good: 'Dobro'
    },
    'de': {
        yourOpinion: 'Ihre Meinung ist uns wichtig!',
        thankYou: 'Vielen Dank, dass Sie sich die Zeit genommen haben, Ihre Eindrücke mit uns zu teilen.',
        keyToService: 'Ihre Meinung ist der Schlüssel zur Gestaltung von Dienstleistungen, die auf Ihre Bedürfnisse zugeschnitten sind.',
        emailSuccess: 'Vielen Dank für Ihr Feedback! Ihre Meinung wurde erfasst.',
        reviewPlaceHolder: 'Geben Sie Ihre Bewertung ein...',
        submit: 'Absenden',
        thankYouVisit: 'Danke für Ihren Besuch!',
        enterEmail: 'Geben Sie Ihre E-Mail ein und gewinnen Sie einen Preis.',
        pleaseRate: 'Bitte bewerten Sie uns und helfen Sie uns, gemeinsam zu wachsen.',
        errorLabel: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
        placeHolder: 'Geben Sie Ihre E-Mail-Adresse ein...',
        bad: 'Schlecht',
        okay: 'Okay',
        good: 'Gut'
    },
    'es': {
        yourOpinion: '¡Su opinión es importante para nosotros!',
        thankYou: 'Gracias por tomarse el tiempo de compartir sus impresiones con nosotros.',
        keyToService: 'Su opinión es clave para crear servicios adaptados a sus necesidades.',
        emailSuccess: '¡Gracias por sus comentarios! Su opinión ha sido registrada.',
        reviewPlaceHolder: 'Ingrese su reseña...',
        submit: 'Enviar',
        thankYouVisit: '¡Gracias por visitarnos!',
        enterEmail: 'Ingrese su correo electrónico y gane un premio.',
        pleaseRate: 'Por favor, califíquenos y ayúdenos a crecer juntos.',
        errorLabel: 'Por favor, introduzca un correo electrónico válido.',
        placeHolder: 'Ingrese su correo electrónico...',
        bad: 'Malo',
        okay: 'Bien',
        good: 'Bueno'
    },
    'ro': {
        yourOpinion: 'Părerea dumneavoastră este importantă pentru noi!',
        thankYou: 'Vă mulțumim că v-ați luat timp să împărtășiți impresiile dumneavoastră cu noi.',
        keyToService: 'Părerea dumneavoastră este cheia pentru crearea serviciilor adaptate nevoilor dumneavoastră.',
        emailSuccess: 'Vă mulțumim pentru feedback! Părerea dumneavoastră a fost înregistrată.',
        reviewPlaceHolder: 'Introduceți recenzia dumneavoastră...',
        submit: 'Trimite',
        thankYouVisit: 'Vă mulțumim pentru vizită!',
        enterEmail: 'Introduceți emailul dvs. și câștigați un premiu.',
        pleaseRate: 'Vă rugăm să ne evaluați și să ne ajutați să creștem împreună.',
        errorLabel: 'Vă rugăm să introduceți o adresă de email validă.',
        placeHolder: 'Introduceți adresa dvs. de email...',
        bad: 'Rău',
        okay: 'Bine',
        good: 'Bun'
    },
    'gg': {
        yourOpinion: 'jljljljljljljljljljljljljjljljljlj668678787',
        thankYou: 'Vă mulțumim că v-ați luat timp să împărtășiți impresiile dumneavoastră cu noi.',
        keyToService: 'Părerea dumneavoastră este cheia pentru crearea serviciilor adaptate nevoilor dumneavoastră.',
        emailSuccess: 'Vă mulțumim pentru feedback! Părerea dumneavoastră a fost înregistrată.',
        reviewPlaceHolder: 'Introduceți recenzia dumneavoastră...',
        submit: 'Trimite',
        thankYouVisit: 'iutiutiuti',
        enterEmail: 'Introduceți emailul dvs. și câștigați un premiu.',
        pleaseRate: 'Vă rugăm să ne evaluați și să ne ajutați să creștem împreună.',
        errorLabel: 'Vă rugăm să introduceți o adresă de email validă.',
        placeHolder: 'Introduceți adresa dvs. de email...',
        bad: 'sranje',
        okay: 'Bine',
        good: 'Bun'
    }
};


  const send = async (rating: string) => {
    const translations = languageTranslations[details.languages[0]] || languageTranslations['en'];
    if (details.reward) {
      const email = emailRef.current!.value;
      if (email !== '') {
        if (!validateEmail(email)) {
          setEmailError(translations?.errorLabel || 'Please enter a valid email.');
          const errorMessage = details.languages.map(lang => languageTranslations[lang]?.errorLabel || '').filter(Boolean).join('\n');
          toast.error(errorMessage || 'Review cannot be empty.', {
            position: "bottom-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          return;
        }
        sendPriceMail(email, business || '', details.rewardText);
        const emailPromises = details.ownerEmails.map(ownerEmail => sendReportMail(ownerEmail , email, number || '', details.languages, details.timeZone));
        setLoading(true);
        Promise.all(emailPromises);
        setLoading(false);
    }
  }
  if (rating === 'good' && details.googleLink) {
    window.location.href = details.googleLink;
  } else {
    setView('form');
  }
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (message.trim() === '') {
    const errorMessage = details.languages.map(lang => languageTranslations[lang]?.reviewPlaceHolder || '').filter(Boolean).join('\n');
    toast.error(errorMessage || 'Review cannot be empty.', {
      position: "bottom-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    return;
  }

  let emailMessage = '';
  setLoading(true)
  details.languages.map(language => emailMessage += "\n\n" + languageTranslations[language].emailSuccess);
  const emailPromises = details.ownerEmails.map(email => sendReviewMail(email, businessName || '', message, searchParams.get('number') || '', details.languages, details.timeZone));
  await Promise.all(emailPromises);
  setLoading(false)
  toast.success(emailMessage, {
    position: "bottom-right",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    onClose: () => {
      const businessNameParam = businessName ? encodeURIComponent(businessName) : '';
      const numberParam = searchParams.get('number') ? encodeURIComponent(searchParams.get('number')!) : '';
      const queryString = `?businessName=${businessNameParam}&number=${numberParam}`;
      router.push(`/review${queryString}`);
    }
  });
};

return (
  <div 
    className="flex flex-col justify-center items-center w-screen h-screen text-center font-poppins overflow-hidden" 
    style={{ 
      backgroundColor: details.backgroundColor,
      color: details.textColor,
      display: "flex",
      flexDirection: "column"
    }}
  >
     <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: loading ? "block" : "none" 
    }}>
      {loading && ( 
        <RotateLoader color="#e1e1e1" loading={loading} size={20} />
      )}
    </div>
    {view === 'review' && (
      <>
    <div className="w-full">
      <img 
        src={details.image} 
        alt="Business" 
        className="w-full h-auto object-cover md:hidden"
        style={{ height: '40vh', width: '100%' }} 
      />
      <div className="hidden md:block" style={{ height: '40vh', width: '100%' }}> 
        <img 
          src={details.image} 
          alt="Business" 
          className="w-full h-full object-contain" 
        />
      </div>
    </div>

        
        
        <div style={{ height: '15%' }} className="text-xl py-2">
          {details.languages.map((lang) => {
          const translations = languageTranslations[lang];
          return translations ? (
            <React.Fragment key={lang}>
              <p className=''>{translations?.thankYou}</p>
            </React.Fragment>
          ) : null;
        })}
        </div >
        {details.reward && (
          <>
            <div className='text-l py-2' style={{height: '10%'}}>
              {details.languages.map((lang) => {
                const translations = languageTranslations[lang];
                return translations ? (
                  <React.Fragment key={lang}>
                    <p className=''>{translations?.enterEmail}</p>
                  </React.Fragment>
                ) : null;
              })}
            </div>
            <div className='w-full px-6' style={{ height: '10%'}}>
            <input
              type="email"
              placeholder="Email"
              className={`p-3 w-full border-2 rounded-xl text-black ${emailError ? 'border-red-500' : ''}`}
              ref={emailRef}
              style={{ maxHeight: "3rem", overflow: "auto" }}
            />
            </div>
          </>
        )}
        <div className='flex items-end pb-6' style={{ height: '15%' }}>
        <div className="flex flex-col">
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
        <div className="flex flex-col justify-between h-full " style={{ height: '15%' }}>
        <div className="flex justify-around">
          <div className="cursor-pointer flex flex-col items-center  ml-4 p-3 mb-10" style={{ width: "3.2rem", height: "3.2rem", marginRight: "3rem" }} onClick={() => send('bad')}>
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
          <div className="cursor-pointer flex flex-col items-center  p-3" style={{ width: "3.2rem", height: "3.2rem", marginRight: "3rem" }} onClick={() => send('okay')}>
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
        </div>
        </>
        )}
    {view === 'form' && (
      <>
      <div 
    className="flex flex-col items-center p-6 w-full h-screen text-center font-poppins"
    style={{ 
      backgroundColor: details.backgroundColor,
      color: details.textColor
    }}>
      <div style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: loading ? "block" : "none" // Hide container when loading is false
    }}>
      {loading && ( // Render HashLoader only if loading is true
        <RotateLoader color="#e1e1e1" loading={loading} size={20} />
      )}
    </div>
      {details.languages.map((lang) => {
        const translations = languageTranslations[lang];
        return translations ? (
          <React.Fragment key={lang}>
            <p className="text-lg font-semibold">{translations.yourOpinion}</p>
          </React.Fragment>
        ) : null;
      })}
      <div className='mb-4'></div>
      {details.languages.map((lang) => {
        const translations = languageTranslations[lang];
        return translations ? (
          <React.Fragment key={lang}>
            <p>{translations.thankYou}</p>
          </React.Fragment>
        ) : null;
      })}
      <div className='mb-4'></div>
      {details.languages.map((lang) => {
        const translations = languageTranslations[lang];
        return translations ? (
          <React.Fragment key={lang}>
            <p>{translations.keyToService}</p>
          </React.Fragment>
        ) : null;
      })}
      <div className='mb-4'></div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col flex-grow">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              details.languages
                .map((lang) => {
                  const translations = languageTranslations[lang];
                  return translations ? translations.reviewPlaceHolder : null;
                })
                .filter((translation) => translation !== null)
                .join('\n')
            }
            className="flex-grow w-full p-3 mb-4 border rounded-xl bg-gray-100 text-black"
          />
         <button 
          type="submit" 
          className="w-full p-3 bg-blue-500 text-white rounded-xl mt-2 mb-12" 
          style={{ maxHeight: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {details.languages.map((lang) => {
            const translations = languageTranslations[lang];
            return translations ? (
              <React.Fragment key={lang}>
                {translations.submit}<br />
              </React.Fragment>
            ) : null;
          })}
        </button>
        </form>
      </div>
      </>
    )}

  </div>
);
};

const Review = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewContent />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Suspense>
  );
};


export default Review;


// app/review-form/page.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { businessDetails } from '../../data/businesses';
import { sendReviewMail } from '@/server/mailServerActions';
import { BusinessDetails } from '@/types';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Translation {
  yourOpinion?: string;
  thankYou?: string;
  keyToService?: string;
  emailSuccess?: string;
  reviewPlaceHolder?: string;
  submit?: string;
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

  useEffect(() => {
    if (businessName) {
      setBusiness(businessName);
      const businessInfo = businessDetails[businessName] || {
        image: '/default-image.png',
        ownerEmail: ['default@example.com'],
        googleLink: 'https://maps.google.com',
        languages: ['en'],
        reward: false,
        rewardText: '',
        backgroundColor: '#000000',
        textColor: '#FFFFFF'
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
      keyToService: 'Vaše mišljenje je ključno za stvaranje usluga prilagođenih vašim potrebama.',
      emailSuccess: 'Hvala Vam na povratnim informacijama! Vaše mišljenje je zabeleženo.',
      reviewPlaceHolder: 'Unesite svoju recenziju...',
      submit: 'Pošalji'
    },
    'en': {
      yourOpinion: 'Your opinion is important to us!',
      thankYou: 'Thank you for taking the time to share your impressions with us.',
      keyToService: 'Your opinion is key to creating services tailored to your needs.',
      emailSuccess: 'Thank you for your feedback! Your opinion has been recorded.',
      reviewPlaceHolder: 'Enter your review...',
      submit: 'Submit'
    },
    'cro': {
      yourOpinion: 'Vaše mišljenje nam je važno!',
      thankYou: 'Hvala vam što ste izdvojili vrijeme da podijelite svoje dojmove s nama.',
      keyToService: 'Vaše mišljenje je ključno za stvaranje usluga prilagođenih vašim potrebama.',
      emailSuccess: 'Hvala vam na povratnim informacijama! Vaše mišljenje je zabeleženo.',
      reviewPlaceHolder: 'Unesite svoju recenziju...',
      submit: 'Pošalji'
    },
    'de': {
      yourOpinion: 'Ihre Meinung ist uns wichtig!',
      thankYou: 'Vielen Dank, dass Sie sich die Zeit genommen haben, Ihre Eindrücke mit uns zu teilen.',
      keyToService: 'Ihre Meinung ist der Schlüssel zur Gestaltung von Dienstleistungen, die auf Ihre Bedürfnisse zugeschnitten sind.',
      emailSuccess: 'Vielen Dank für Ihr Feedback! Ihre Meinung wurde erfasst.',
      reviewPlaceHolder: 'Geben Sie Ihre Bewertung ein...',
      submit: 'Absenden'
    },
    'es': {
      yourOpinion: '¡Su opinión es importante para nosotros!',
      thankYou: 'Gracias por tomarse el tiempo de compartir sus impresiones con nosotros.',
      keyToService: 'Su opinión es clave para crear servicios adaptados a sus necesidades.',
      emailSuccess: '¡Gracias por sus comentarios! Su opinión ha sido registrada.',
      reviewPlaceHolder: 'Ingrese su reseña...',
      submit: 'Enviar'
    },
    'ro': {
      yourOpinion: 'Părerea dumneavoastră este importantă pentru noi!',
      thankYou: 'Vă mulțumim că v-ați luat timp să împărtășiți impresiile dumneavoastră cu noi.',
      keyToService: 'Părerea dumneavoastră este cheia pentru crearea serviciilor adaptate nevoilor dumneavoastră.',
      emailSuccess: 'Vă mulțumim pentru feedback! Părerea dumneavoastră a fost înregistrată.',
      reviewPlaceHolder: 'Introduceți recenzia dumneavoastră...',
      submit: 'Trimite'
    },
    'gg': {
      yourOpinion: 'jljljljljljljljljljljljljjljljljlj668678787',
      thankYou: 'Vă mulțumim că v-ați luat timp să împărtășiți impresiile dumneavoastră cu noi.',
      keyToService: 'Părerea dumneavoastră este cheia pentru crearea serviciilor adaptate nevoilor dumneavoastră.',
      emailSuccess: 'Vă mulțumim pentru feedback! Părerea dumneavoastră a fost înregistrată.',
      reviewPlaceHolder: 'Introduceți recenzia dumneavoastră...',
      submit: 'Trimite'
    },
  };
  
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
    details.languages.map(language => emailMessage += "\n\n" + languageTranslations[language].emailSuccess);
    const emailPromises = details.ownerEmails.map(email => sendReviewMail(email, businessName || '', message, searchParams.get('tableNumber') || ''));
    await Promise.all(emailPromises);
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
        const tableParam = searchParams.get('tableNumber') ? encodeURIComponent(searchParams.get('tableNumber')!) : '';
        const queryString = `?businessName=${businessNameParam}&tableNumber=${tableParam}`;
        router.push(`/review${queryString}`);
      }
    });
  };

  return (
    <div 
    className="flex flex-col items-center p-6 w-full h-screen max-w-md mx-auto text-center font-poppins"
    style={{ 
      backgroundColor: details.backgroundColor,
      color: details.textColor
    }}>
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
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-xl mt-2" style={{ maxHeight: "3rem", overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
  );
};

const SubmitReview = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewFormContent />
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

export default SubmitReview;

// mailServerActions.ts
"use server";

import { sendMail } from '@/lib/mail';

interface Translation {
    subject?: string;
    time?: string;
    number?: string;
    text?: string;
    review?: string;
  }

interface LanguageTranslations {
[key: string]: Translation;
}

const languageTranslations: LanguageTranslations = {
    'srb': {
        subject: "Korisnik je preuzeo nagradu!",
        time: "vreme: ",
        number: "broj: ",
        text: " je preuzeo svoju nagradu!",
        review: "recenzija"
    },
    'en': {
        subject: "User has claimed the reward!",
        time: "time: ",
        number: "number: ",
        text: " has claimed their reward!",
        review: "review"
    },
    'cro': {
        subject: "Korisnik je preuzeo nagradu!",
        time: "vrijeme: ",
        number: "broj: ",
        text: " je preuzeo svoju nagradu!",
        review: "recenzija"
    },
    'de': {
        subject: "Der Benutzer hat die Belohnung erhalten!",
        time: "Zeit: ",
        number: "Nummer: ",
        text: " hat seine Belohnung erhalten!",
        review: "Bewertung"
    },
    'es': {
        subject: "¡El usuario ha reclamado la recompensa!",
        time: "tiempo: ",
        number: "número: ",
        text: " ha reclamado su recompensa!",
        review: "reseña"
    },
    'ro': {
        subject: "Utilizatorul a revendicat recompensa!",
        time: "timp: ",
        number: "număr: ",
        text: " și-a revendicat recompensa!",
        review: "recenzie"
    },
    'gg': {
        subject: "Korisnik je preuzeo nagradu!",
        time: "vreme: ",
        number: "broj: ",
        text: " je preuzeo svoju nagradu!",
        review: "recenzija"
    }
};


export async function sendPriceMail(to: string, businessName: string, rewardText: string) {
    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: businessName,
        body: '<h1>' + rewardText + '</h1>'
    });
}

export async function sendReviewMail(to: string, businessName: string, review: string, table: string, languages: string[]) {
    const language = languages[0];
    const translation = language ? languageTranslations[language] : undefined;
    const reviewText = translation?.review;

    const subjectText = reviewText 
        ? reviewText.charAt(0).toUpperCase() + reviewText.slice(1) 
        : 'Review';

    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: subjectText + " " + businessName,
        body: '<h1>' + languageTranslations[languages[0]].number  + table + ', ' + languageTranslations[languages[0]].time + new Date().toLocaleString("en-US", { timeZone: 'Europe/Berlin' }) + '</h1><h1>' + languageTranslations[languages[0]].review + ': ' + review + '</h1>'
    });
}

export async function sendReportMail(to: string, email: string, table: string, languages: string[]) {

    

    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: languageTranslations[languages[0]]?.subject ?? "User has claimed the reward!",
        body: '<h1>' + email + ', ' + languageTranslations[languages[0]].number + table + ', ' + languageTranslations[languages[0]].time + new Date().toLocaleString("en-US", { timeZone: 'Europe/Berlin' }) + languageTranslations[languages[0]].text + '</h1>'
    });
}
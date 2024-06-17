// mailServerActions.ts
"use server";

import { sendMail } from '@/lib/mail';

interface Translation {
    reward?: string;
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
        reward: "Nagrada",
        subject: "Korisnik je preuzeo nagradu!",
        time: "vreme: ",
        number: "broj: ",
        text: " je preuzeo svoju nagradu!",
        review: "recenzija"
    },
    'en': {
        reward: "Reward",
        subject: "User has claimed the reward!",
        time: "time: ",
        number: "number: ",
        text: " has claimed their reward!",
        review: "review"
    },
    'cro': {
        reward: "Nagrada",
        subject: "Korisnik je preuzeo nagradu!",
        time: "vrijeme: ",
        number: "broj: ",
        text: " je preuzeo svoju nagradu!",
        review: "recenzija"
    },
    'de': {
        reward: "Belohnen",
        subject: "Der Benutzer hat die Belohnung erhalten!",
        time: "Zeit: ",
        number: "Nummer: ",
        text: " hat seine Belohnung erhalten!",
        review: "Bewertung"
    },
    'es': {
        reward: "Premio",
        subject: "¡El usuario ha reclamado la recompensa!",
        time: "tiempo: ",
        number: "número: ",
        text: " ha reclamado su recompensa!",
        review: "reseña"
    },
    'ro': {
        reward: "Răsplată",
        subject: "Utilizatorul a revendicat recompensa!",
        time: "timp: ",
        number: "număr: ",
        text: " și-a revendicat recompensa!",
        review: "recenzie"
    },
    'gg': {
        reward: "Răsplată",
        subject: "Korisnik je preuzeo nagradu!",
        time: "vreme: ",
        number: "broj: ",
        text: " je preuzeo svoju nagradu!",
        review: "recenzija"
    }
};


export async function sendPriceMail(to: string, businessName: string, rewardText: string, languages: string[]) {
    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: businessName,
        body: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>${languageTranslations[languages[0]].reward} ${businessName}</h2>
            <p>${rewardText}</p>
        </div>
        `
    });
}

export async function sendReviewMail(to: string, businessName: string, review: string, table: string, languages: string[], timeZone: string) {
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
        body: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>${subjectText} ${businessName}</h2>
          <p><strong>${languageTranslations[languages[0]].number}</strong> ${table}</p>
          <p><strong>${languageTranslations[languages[0]].time}</strong> ${new Date().toLocaleString("en-US", { timeZone: timeZone })}</p>
          <p><strong>${languageTranslations[languages[0]].review}</strong>: ${review}</p>
        </div>
      `
    });
}

export async function sendReportMail(to: string, email: string, table: string, languages: string[], timeZone: string) {


    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: languageTranslations[languages[0]]?.subject ?? "User has claimed the reward!",
        body: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p>${languageTranslations[languages[0]].number} ${table}</p>
          <p>${languageTranslations[languages[0]].time} ${new Date().toLocaleString("en-US", { timeZone: timeZone })}</p>
          <p>${email} ${languageTranslations[languages[0]].text}</p>
        </div>
      `
    });
}
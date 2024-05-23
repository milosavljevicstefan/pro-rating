// mailServerActions.ts
"use server";

import { sendMail } from '@/lib/mail';


export async function sendPriceMail(to: string, businessName: string) {
    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: "Recenzija " + businessName,
        body: '<h1>Cestitamo osvojili ste nagradu</h1>'
    });
}

export async function sendReviewMail(to: string, businessName: string, review: string, table: string) {
    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: "Recenzija" + businessName,
        body: '<h1>Recenzija broja stola:' + table + ' Vreme:' + new Date().toLocaleString() + '</h1><h1>Recenzija:' + review + '</h1>'
    });
}

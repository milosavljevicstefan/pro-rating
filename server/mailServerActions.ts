// mailServerActions.ts
"use server";

import { sendMail } from '@/lib/mail';


export async function sendPriceMail(to: string, businessName: string, rewardText: string) {
    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: businessName,
        body: '<h1>' + rewardText + '</h1>'
    });
}

export async function sendReviewMail(to: string, businessName: string, review: string, table: string) {
    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: "Review " + businessName,
        body: '<h1>Review table number:' + table + ' Time:' + new Date().toLocaleString() + '</h1><h1>Review:' + review + '</h1>'
    });
}

export async function sendReportMail(to: string, email: string, table: string) {
    await sendMail({
        to: to,
        name: "Ime? ?",
        subject: "User " + email + "claimed his reward",
        body: '<h1>User under email ' + email + ' at table number ' + table + ', time: ' + new Date().toLocaleString() + ' claimed his reward</h1>'
    });
}
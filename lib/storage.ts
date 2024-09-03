// lib/storage.ts

import { db, ref, set, get, child, push } from './firebase';

// Save referral information in Firebase
export async function saveReferral(userId: string, referrerId: string) {
    const referralRef = ref(db, `referrals/${referrerId}`);
    const newReferralRef = push(referralRef);
    await set(newReferralRef, userId);

    const referredByRef = ref(db, `referredBy/${userId}`);
    await set(referredByRef, referrerId);
}

// Get referrals for a given user from Firebase
export async function getReferrals(userId: string): Promise<string[]> {
    const referralRef = ref(db, `referrals/${userId}`);
    const snapshot = await get(referralRef);
    
    if (snapshot.exists()) {
        return Object.values(snapshot.val());
    } else {
        return [];
    }
}

// Get the referrer for a given user from Firebase
export async function getReferrer(userId: string): Promise<string | null> {
    const referrerRef = ref(db, `referredBy/${userId}`);
    const snapshot = await get(referrerRef);

    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null;
    }
}

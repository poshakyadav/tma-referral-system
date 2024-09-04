import { db, ref, set, push, get, child } from "./firebase";

export async function saveReferral(userId: string, referrerId: string) {
    const existingReferrer = await getReferrer(userId);
    if (existingReferrer) {
        alert(`User ${userId} has already been referred by ${existingReferrer}`);
        return;
    }

    console.log("Saving referral: ", { userId, referrerId });

    const referralRef = ref(db, `referrals/${referrerId}`);
    const newReferralRef = push(referralRef);
    await set(newReferralRef, userId);

    const referredByRef = ref(db, `referredBy/${userId}`);
    await set(referredByRef, referrerId);
}

export async function getReferrals(userId: string): Promise<string[]> {
    const referralsRef = ref(db, `referrals/${userId}`);
    const snapshot = await get(referralsRef);
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
}

export async function getReferrer(userId: string): Promise<string | null> {
    const referredByRef = ref(db, `referredBy/${userId}`);
    const snapshot = await get(referredByRef);
    return snapshot.exists() ? snapshot.val() : null;
}

import { database } from "@/lib/firebase";
import { ref, set, get, child, push } from "firebase/database";

export async function saveReferral(userId: string, referrerId: string) {
  try {
    const referralRef = ref(database, `referrals/${referrerId}`);
    const newReferralRef = push(referralRef);
    await set(newReferralRef, userId);

    const referredByRef = ref(database, `referredBy/${userId}`);
    await set(referredByRef, referrerId);
  } catch (error) {
    console.error("Error saving referral:", error);
  }
}

export async function getReferrals(userId: string): Promise<string[]> {
  try {
    const referralsRef = ref(database, `referrals/${userId}`);
    const snapshot = await get(referralsRef);

    if (snapshot.exists()) {
      const referrals = snapshot.val();
      return Object.values(referrals);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error getting referrals:", error);
    return [];
  }
}

export async function getReferrer(userId: string): Promise<string | null> {
  try {
    const referrerRef = ref(database, `referredBy/${userId}`);
    const snapshot = await get(referrerRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting referrer:", error);
    return null;
  }
}

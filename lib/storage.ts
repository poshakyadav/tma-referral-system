import { database } from "@/lib/firebase";
import { ref, set, get, child, push } from "firebase/database";

export async function saveReferral(userId: string, referrerId: string) {
  const referralRef = ref(database, `referrals/${referrerId}`);
  const newReferralRef = push(referralRef);
  await set(newReferralRef, userId);

  const referredByRef = ref(database, `referredBy/${userId}`);
  await set(referredByRef, referrerId);
}

export async function getReferrals(userId: string): Promise<string[]> {
  const referralsRef = ref(database, `referrals/${userId}`);
  const snapshot = await get(referralsRef);
  
  if (snapshot.exists()) {
    const referrals = snapshot.val();
    return Object.values(referrals);
  } else {
    return [];
  }
}

export async function getReferrer(userId: string): Promise<string | null> {
  const referrerRef = ref(database, `referredBy/${userId}`);
  const snapshot = await get(referrerRef);

  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
}

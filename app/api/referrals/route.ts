// app/api/referrals/route.ts

import { saveReferral, getReferrals, getReferrer } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { userId, referrerId } = await request.json();

    if (!userId || !referrerId) {
        return NextResponse.json({ error: 'Missing userId or referrerId' }, { status: 400 });
    }

    try {
        await saveReferral(userId, referrerId);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save referral' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    try {
        const referrals = await getReferrals(userId);
        const referrer = await getReferrer(userId);
        return NextResponse.json({ referrals, referrer });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

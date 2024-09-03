import { getReferrals, getReferrer, saveReferral } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";
import { logError } from "@/lib/logging";  // Highlighted: Importing logError function

export async function POST(request: NextRequest) {
    try {
        const { userId, referrerId } = await request.json();

        if (!userId || !referrerId) {
            throw new Error('Missing userId or referrerId');
        }

        await saveReferral(userId, referrerId);
        return NextResponse.json({ success: true });
    } catch (error) {
        logError('route', 'Error in POST route', error as Error);  // Type assertion
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get('userId');

        if (!userId) {
            throw new Error('Missing userId');
        }

        const referrals = await getReferrals(userId);
        const referrer = await getReferrer(userId);

        return NextResponse.json({ referrals, referrer });
    } catch (error) {
        logError('route', 'Error in GET route', error as Error);  // Type assertion
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

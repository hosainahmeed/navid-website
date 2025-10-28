import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;

    console.log('Token:', token);

    if (!token) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile', '/profile/:path*'],
};

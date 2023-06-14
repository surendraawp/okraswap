import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthHandler } from './services/auth'
import { userState } from './state/atoms'
import { useRecoilState } from 'recoil'
 

 
export function middleware(request: NextRequest) {
    // console.log('nextRespones', request);
    // AuthHandler()
    // let userd = useRecoilState(userState);
    // console.log(userd);
    
  // if (request.nextUrl.pathname.startsWith('/reseller')) {
  //   let userFromCookie = request.cookies.get('accessToken')?.value;
  //   console.log('cookie here', userFromCookie);
  //   // if()
  //   return NextResponse.rewrite(new URL('/login', request.url))
  // }
 
  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  // }
}
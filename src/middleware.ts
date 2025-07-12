import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/profile(.*)'])

export default clerkMiddleware(async (auth, req) => {
  console.log('Running middleware for:', req.nextUrl.pathname)
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: ['/admin(.*)', '/profile(.*)']
}
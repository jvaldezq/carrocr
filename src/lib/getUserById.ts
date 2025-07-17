import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

interface Response {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  imageUrl: string | null;
  phone: string | null;
}

export async function getUserDataById(id: string): Promise<Response | null> {
  try {
    const user = await clerkClient.users.getUser(id)
    return {
      id: user.id ?? null,
      firstName: user.firstName ?? null,
      lastName: user.lastName ?? null,
      email: user.primaryEmailAddress?.emailAddress ?? null,
      imageUrl: user.imageUrl ?? null,
      phone: user.primaryPhoneNumber?.phoneNumber ?? null,
    }
  } catch (error) {
    console.error('Error fetching seller:', error)
    return null
  }
}
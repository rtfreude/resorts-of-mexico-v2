import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { previewClient } from '@/lib/sanity.client'

export async function GET(request: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(previewClient, request.url)

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  // Enable Draft Mode
  ;(await draftMode()).enable()

  // Redirect to the path from the fetched post
  redirect(redirectTo)
}

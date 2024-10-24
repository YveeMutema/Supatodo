import { Database } from '@/types/supabase (2)'
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export function createClient() {
  const cookiesStore = cookies()


  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookiesStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookiesStore.set({ name, value, ...options })
          } catch (error) {
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookiesStore.set({ name, value: '', ...options })
          } catch (error) {
          }
        }
      }
    }
  )
}

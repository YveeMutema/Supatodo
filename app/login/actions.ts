  'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@/utils/helpers'

export async function emaillogin(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=authentication failed')
  }
  revalidatePath('/', 'layout')
  redirect('/todos')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?message=Error signing up')
    
  }

  revalidatePath('/', 'layout')
  redirect('login')
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login')

}

export async function oAuthSignIn(provider: Provider) {
  if(!provider) {
    return redirect('/login?message=No provider selected')
  }
  const supabase = createClient();
  const redirectUrl = getURL("/auth/callback")
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    }
  })

if (error) {
  redirect('/login?message=Authentication failed')
}

return redirect(data.url)
}

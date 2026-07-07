import * as pulumi from '@pulumi/pulumi'
import * as github from '@pulumi/github'

const config = new pulumi.Config()
const supabaseUrl = config.requireSecret('supabaseUrl')
const supabaseKey = config.requireSecret('supabaseAnonKey')
const repo = 'CESIZen'

const secretSupabaseUrl = new github.ActionsSecret('supabase-url', {
  repository: repo,
  secretName: 'NEXT_PUBLIC_SUPABASE_URL',
  plaintextValue: supabaseUrl,
})

const secretSupabaseKey = new github.ActionsSecret('supabase-key', {
  repository: repo,
  secretName: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  plaintextValue: supabaseKey,
})

export const secretNames = {
  supabaseUrl: secretSupabaseUrl.secretName,
  supabaseKey: secretSupabaseKey.secretName,
}

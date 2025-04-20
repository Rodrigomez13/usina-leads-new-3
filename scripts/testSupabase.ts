import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Cargamos el archivo .env desde /scripts
dotenv.config({ path: path.resolve(__dirname, './.env') })

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

async function testConnection() {
  const { data, error } = await supabase.from('servers').select('*')

  if (error) {
    console.error('❌ Error al conectar:', error.message)
  } else {
    console.log('✅ Conexión exitosa a Supabase')
    console.table(data)
  }
}

testConnection()

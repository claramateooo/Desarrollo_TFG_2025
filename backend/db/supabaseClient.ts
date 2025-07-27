// back/supabaseClient.ts

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1'

// Carga las variables del entorno (asegúrate de tener un `.env` y usar --allow-env)
const supabaseUrl = Deno.env.get("DB_PROYECT_URL")!
const supabaseKey = Deno.env.get("DB_API_KEY")!

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase

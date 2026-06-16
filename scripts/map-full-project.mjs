import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Recursive function to get all directories
function getDirectories(srcPath) {
  const result = []
  const files = fs.readdirSync(srcPath)
  for (const file of files) {
    const fullPath = path.join(srcPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      result.push(fullPath)
      result.push(...getDirectories(fullPath))
    }
  }
  return result
}

async function mapProject() {
  console.log("Acordando os agentes e iniciando Mapeamento Profundo do Código...")

  // Clean existing nodes (optional, but good to avoid duplicates. Let's just wipe and rewrite for this demo)
  await supabase.from('brain_links').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('brain_nodes').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const appDir = path.resolve(process.cwd(), 'app')
  const directories = getDirectories(appDir)

  // Add the root App node
  const { data: rootNode } = await supabase.from('brain_nodes').insert([{
    title: 'Diretório Raiz (app)',
    content: 'Ponto central do Next.js App Router',
    group_type: 'Projeto'
  }]).select().single()

  const pathMap = { [appDir]: rootNode.id }

  for (const dir of directories) {
    // Skip weird Next.js internal folders if any
    const folderName = path.basename(dir)
    if (folderName.startsWith('.')) continue

    let group = 'Ideia'
    if (dir.includes('(dashboard)')) group = 'Projeto'
    if (dir.includes('api')) group = 'Outro' // API Routes

    const { data: node } = await supabase.from('brain_nodes').insert([{
      title: `/${folderName}`,
      content: `Caminho completo: ${dir.replace(process.cwd(), '')}`,
      group_type: group
    }]).select().single()

    if (node) {
      pathMap[dir] = node.id
      console.log(`Mapeado: ${folderName}`)
      
      // Link to parent
      const parentDir = path.dirname(dir)
      if (pathMap[parentDir]) {
        await supabase.from('brain_links').insert([{
          source: pathMap[parentDir],
          target: node.id
        }])
      } else {
        // Link to root if parent not mapped
        await supabase.from('brain_links').insert([{
          source: rootNode.id,
          target: node.id
        }])
      }
    }
  }

  console.log("Mapeamento 100% concluído! O Segundo Cérebro agora contém a estrutura real do projeto.")
}

mapProject()

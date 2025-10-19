// Script to validate .env file format
const fs = require('fs')
const path = require('path')

console.log('🔍 Validating .env file format...')
console.log('================================')

const envPath = path.join(__dirname, '.env')

try {
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found at:', envPath)
    process.exit(1)
  }

  const envContent = fs.readFileSync(envPath, 'utf8')
  const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'))

  console.log('✅ .env file found')
  console.log('📄 File content:')
  console.log('----------------')
  
  lines.forEach((line, index) => {
    const trimmed = line.trim()
    if (trimmed) {
      console.log(`${index + 1}. ${trimmed}`)
      
      // Check for common issues
      if (trimmed.includes(' = ')) {
        console.log('   ⚠️  Warning: Spaces around = sign detected')
      }
      if (trimmed.includes('"') || trimmed.includes("'")) {
        console.log('   ⚠️  Warning: Quotes detected (may not be needed)')
      }
      if (trimmed.endsWith(' ')) {
        console.log('   ⚠️  Warning: Trailing space detected')
      }
    }
  })

  // Check for required variables
  const requiredVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']
  const foundVars = []
  
  lines.forEach(line => {
    const [key] = line.split('=')
    if (key && requiredVars.includes(key.trim())) {
      foundVars.push(key.trim())
    }
  })

  console.log('\n📋 Required variables check:')
  requiredVars.forEach(varName => {
    if (foundVars.includes(varName)) {
      console.log(`✅ ${varName}`)
    } else {
      console.log(`❌ ${varName} - NOT FOUND`)
    }
  })

  if (foundVars.length === requiredVars.length) {
    console.log('\n🎉 All required variables found!')
  } else {
    console.log('\n❌ Some required variables are missing!')
  }

} catch (error) {
  console.error('❌ Error reading .env file:', error.message)
}

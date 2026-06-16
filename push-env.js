const fs = require('fs');
const { execSync } = require('child_process');

const envFile = fs.readFileSync('.env.local', 'utf8');
const lines = envFile.split('\n').filter(l => l.trim() && !l.startsWith('#'));

for (const line of lines) {
  const [key, ...vals] = line.split('=');
  const val = vals.join('=').trim();
  const safeKey = key.trim();
  
  if (safeKey && val) {
    for (const environment of ['production', 'preview', 'development']) {
      try {
        console.log(`Adding ${safeKey} to ${environment}...`);
        fs.writeFileSync('.temp-env-val', val);
        execSync(`vercel env add ${safeKey} ${environment} < .temp-env-val`);
        console.log(`Successfully added ${safeKey} to ${environment}`);
      } catch(e) {
        console.error(`Failed to add ${safeKey} to ${environment}`);
      }
    }
  }
}

if (fs.existsSync('.temp-env-val')) {
  fs.unlinkSync('.temp-env-val');
}

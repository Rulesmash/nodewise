const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Regex to find all border-radius rules
// We'll replace all border-radius values with 0
// except for .whatsapp-float and its children (.whatsapp-icon, .whatsapp-tooltip, etc.)

let inWhatsappBlock = false;
let lines = css.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('whatsapp')) {
    // Basic heuristic: if the selector has whatsapp, we assume the block is for whatsapp
    if (lines[i].includes('{')) {
      inWhatsappBlock = true;
    }
  }
  
  if (lines[i].includes('border-radius') && !inWhatsappBlock) {
    // Replace border-radius with 0
    lines[i] = lines[i].replace(/border-radius:\s*[^;]+;/, 'border-radius: 0;');
  }

  if (lines[i].includes('}') && inWhatsappBlock) {
    inWhatsappBlock = false;
  }
}

fs.writeFileSync(cssPath, lines.join('\n'));
console.log('Successfully updated border-radius globally (ignored whatsapp blocks).');

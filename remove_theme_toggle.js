const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // We want to remove the theme toggle button block.
  // It looks like:
  // <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle Theme">
  //   <i data-lucide="moon" class="theme-icon-moon"></i>
  //   <i data-lucide="sun" class="theme-icon-sun"></i>
  // </button>

  // We can use a regex to replace it
  const regex = /<button class="theme-toggle-btn"[^>]*>[\s\S]*?<\/button>/g;
  
  if (regex.test(html)) {
    html = html.replace(regex, '');
    fs.writeFileSync(filePath, html);
    console.log(`Removed theme toggle from ${file}`);
  }
});

console.log('Finished processing HTML files.');

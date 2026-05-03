// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
let content = fs.readFileSync('components/Navbar.tsx', 'utf8');
content = content.replace('transition-all duration-500 bg-transparent', 'transition-[top] duration-500 bg-transparent');
fs.writeFileSync('components/Navbar.tsx', content);

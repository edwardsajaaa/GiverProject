const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/3d/InteractiveObjects.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Upgrade cylinders
content = content.replace(/cylinderGeometry args=\{\[(.+?),\s*(.+?),\s*(.+?),\s*\d+\s*\]\}/g, 'cylinderGeometry args={[$1, $2, $3, 32]}');

// Upgrade cones
content = content.replace(/coneGeometry args=\{\[(.+?),\s*(.+?),\s*\d+\s*\]\}/g, 'coneGeometry args={[$1, $2, 32]}');

// Upgrade spheres
content = content.replace(/sphereGeometry args=\{\[(.+?),\s*\d+,\s*\d+\s*\]\}/g, 'sphereGeometry args={[$1, 32, 32]}');
content = content.replace(/sphereGeometry args=\{\[(.+?),\s*\d+,\s*\d+,\s*0,\s*Math.PI \* 2,\s*0,\s*Math.PI \/ 1.7\]\}/g, 'sphereGeometry args={[$1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.7]}');

// Upgrade rock to smooth river stone
content = content.replace(/dodecahedronGeometry args=\{\[0.45, 1\]\}/g, 'icosahedronGeometry args={[0.45, 12]}');
content = content.replace(/dodecahedronGeometry args=\{\[0.3, 1\]\}/g, 'icosahedronGeometry args={[0.3, 12]}');

// Smooth pyramid
content = content.replace(/coneGeometry args=\{\[0.85, 1.1, 4\]\}/g, 'coneGeometry args={[0.85, 1.1, 4]}'); // Wait, Pyramid should stay 4 sided
content = content.replace(/coneGeometry args=\{\[0.85, 1.1, 32\]\}/g, 'coneGeometry args={[0.85, 1.1, 4]}'); // Revert pyramid just in case

// Fix ring geometry
content = content.replace(/ringGeometry args=\{\[(.+?),\s*(.+?),\s*40\s*\]\}/g, 'ringGeometry args={[$1, $2, 64]}');

// Smooth boxes (we can import RoundedBox from drei, but let's just make sure they aren't jagged if there are any)
// Monument uses boxGeometry, let's leave it as box but maybe we can add bevel if we use RoundedBox?
// We will just leave boxGeometry as is, since it's meant to be a box.

fs.writeFileSync(filePath, content);
console.log('Smoothed objects!');

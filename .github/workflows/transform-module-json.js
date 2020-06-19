var fs = require('fs');
let moduleInfo = JSON.parse(fs.readFileSync('module.json', 'utf8'));

if(moduleInfo.version.includes('beta'))
    moduleInfo.title += " (beta)"
else if(moduleInfo.version.includes('alpha'))
    moduleInfo.title += " (alpha)"
    
fs.writeFileSync('module.json', JSON.stringify(moduleInfo, null, 2));

var fs = require('fs');
let moduleInfo = JSON.parse(fs.readFileSync('module.json', 'utf8'));

if(moduleInfo.version.includes('beta')) {
    moduleInfo.title += " (beta)";
    moduleInfo.download = moduleInfo.download.replace("{{ channel }}", "beta");
    moduleInfo.manifest = moduleInfo.manifest.replace("{{ channel }}", "beta");
} else if(moduleInfo.version.includes('alpha')) {
    moduleInfo.title += " (alpha)"
    moduleInfo.download = moduleInfo.download.replace("{{ channel }}", "alpha");
    moduleInfo.manifest = moduleInfo.manifest.replace("{{ channel }}", "alpha");
} else {
    moduleInfo.download = moduleInfo.download.replace("{{ channel }}", "stable");
    moduleInfo.manifest = moduleInfo.manifest.replace("{{ channel }}", "stable");
}

fs.writeFileSync('module.json', JSON.stringify(moduleInfo, null, 2));

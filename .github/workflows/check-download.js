var fs = require('fs');
const info = JSON.parse(fs.readFileSync('module.json', 'utf8'));
const hasValidDownload = ['alpha', 'beta', 'stable'].every(channel => checkDownload(info, channel));

if (!hasValidDownload) {
    console.error(`Download channel does not match version:`, info.version, '≠', info.download);
    process.exitCode = 1;
}

function checkDownload(info, channel) {
    return info.download.includes(channel) || !info.version.endsWith(channel);
}

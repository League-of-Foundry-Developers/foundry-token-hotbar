// Change v4.2.1 (01-2021): The old module.json set its version automatically using the two commented lines below.
// (manifest.version = ...  and  fs.writeFileSync(...))
// Currently the developer has to change the version, manifest and download values manually.
// Leaving this here in case it's useful for the future, but feel free to delete it.

var fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('module.json', 'utf8'));
// first argument is node, second is the filename of the script, third is the version we pass in our workflow.
// expected tag format is 'refs/tags/v{major}.{minor}.{patch}"
const tagVersion = process.argv[2].split('/').slice(-1)[0];
if (!tagVersion || !tagVersion.startsWith('v')) {
  console.error(`Invalid version specified: ${tagVersion}`);
  process.exitCode = 1;
} else {
  // manifest.version = tagVersion.substring(1); // strip the 'v'-prefix
  // fs.writeFileSync('module.json', JSON.stringify(manifest, null, 2)); // pretty print JSON back to module.json
  console.log(tagVersion);
}

const { execSync } = require('child_process');
try {
  const output = execSync('npx tsc --noEmit', { encoding: 'utf-8', cwd: __dirname });
  require('fs').writeFileSync('build-error.log', 'SUCCESS\n' + output);
} catch (e) {
  require('fs').writeFileSync('build-error.log', 'ERROR\n' + e.stdout + '\n' + e.stderr);
}

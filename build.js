const { exec } = require('child_process');

console.log('Starting build process...');

// Run TypeScript compilation
exec('tsc', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error during compilation: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Compilation stderr: ${stderr}`);
  }
  console.log(`Compilation stdout: ${stdout}`);
  console.log('Build completed successfully!');
});
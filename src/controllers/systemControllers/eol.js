import os from 'os';

export const handleEOL = () => {
  console.log(`Default system EOL: ${JSON.stringify(os.EOL)}\n`);
}

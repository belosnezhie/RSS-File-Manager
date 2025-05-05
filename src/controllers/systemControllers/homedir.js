import os from 'os';

export const handleHomedir = () => {
  console.log(`Home directory: ${os.homedir()}\n`);
}

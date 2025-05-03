import os from 'os';
import { join } from 'path'

export const printDirectory = () => {
  const homeDir = os.homedir();
  const currentDir = process.cwd();

  const dir = currentDir.includes(homeDir) ? currentDir : join(homeDir, currentDir);

  console.log(`You are currently in ${dir}\n `);

  return dir;
}

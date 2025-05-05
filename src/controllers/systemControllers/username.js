import os from 'os';

export const handleUsername = () => {
  console.log(`System username: ${os.userInfo().username}\n`);
}

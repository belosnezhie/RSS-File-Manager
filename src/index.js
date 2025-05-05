import { commandsMap } from './model/index.js';
import { handleInputError } from './utils/handleInputError.js';
import { printDirectory } from './utils/printDirectory.js';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';
import { handleCD } from './controllers/pathControllers/cd.js';


const main = async () => {
  const args = process.argv;
  const index = args.findIndex((i) => i.includes('--username'));

  const name = index === -1 ? 'Anonymous' : args[index].split('=')[1];

  console.log(`Welcome to the File Manager, ${name}!`);

  await handleCD([os.homedir()]);

  const rl = createInterface({ input, output });

  process.on('SIGINT', () => {
    handleExit(name, rl);
  });

  while (true) {
    const line = await rl.question('> ');
    const [command, ...commandArgs] = line.trim().split(' ');

    if (command === '.exit') {
      handleExit(name, rl);
    }
    const controller = commandsMap.get(command);

    if (controller === undefined) {
      handleInputError('command does not exist');
      return;
    }

    await controller(commandArgs);
    printDirectory();
  }
}


const handleExit = (username, readline) => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  readline.close();
  process.exit(0);
}

await main();

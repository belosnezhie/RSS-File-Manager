import { commandsMap } from './model/index.js';
import { handleInputError } from './utils/handleInputError.js';
import { printDirectory } from './utils/printDirectory.js';

const main = async () => {
  const args = process.argv;
  const index = args.findIndex((i) => i.includes('--username'));

  const name = index === -1 ? 'Anonymous' : args[index].split('=')[1];

  console.log(`Welcome to the File Manager, ${name}!`);
  printDirectory();

  process.stdin.on('data', async (inputStdin) => {
    const input = inputStdin.toString().trim().split(' ');
    if (input[0] === '.exit') {
      handleExit(name);
    }
    const controller = commandsMap.get(input[0]);
    const args = input.splice(1, input.length);

    if (controller === undefined) {
      handleInputError('command does not exist');
      return;
    }

    await controller(args);
  });

  process.on('SIGINT', () => {
    handleExit(name);
  });
}


const handleExit = (username) => {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);

  process.exit(0);
}

await main();

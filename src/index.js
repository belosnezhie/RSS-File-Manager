import { commandsMap } from './model/index.js';
import { handleInputError } from './utils/handleInputError.js';
import { printDirectory } from './utils/printDirectory.js';

const main = async () => {

  const args = process.argv;
  const index = args.findIndex((i) => i.includes('--username'));
  if (index === -1) {
    throw new Error('Please, provide username')
  }
  const name =  args[index].split('=')[1];

  console.log(`Welcome to the File Manager, ${name}!`);
  printDirectory();

  process.stdin.on('data', async (inputStdin) => {
    const input = inputStdin.toString().trim().split(' ');
    const controller = commandsMap.get(input[0]);
    const args = input.splice(1, input.length);

    if (controller === undefined) {
      handleInputError('command does not exist');
      return;
    }

    await controller(args);
  });

  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${name}, goodbye!`);

    process.exit(0);
  });
}


await main();

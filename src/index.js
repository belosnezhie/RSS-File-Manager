import { commandsMap } from './model/index.js';
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

  process.stdin.on('data', (inputStdin) => {
    const input = inputStdin.toString().trim().split(' ');
    const controller = commandsMap.get(input[0]);
    const args = input[1];

    controller(args);
  });

  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${name}, goodbye!`);

    process.exit(0);
  });
}


await main();




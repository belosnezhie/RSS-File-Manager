const main = async () => {

  const args = process.argv;
  const index = args.findIndex((i) => i.includes('--username'));
  if (index === -1) {
    throw new Error('Please, provide username')
  }
  const name =  args[index].split('=')[1];

  console.log(`Welcome to the File Manager, ${name}!`);


  process.stdin.on('data', (inputStdin) => {
    console.log('Process has deen started');
    console.log(inputStdin.toString());
  });

  process.on('SIGINT', () => {
    console.log('\n');
    console.log(`Thank you for using File Manager, ${name}, goodbye!`);

    process.exit(0);
  });
}


await main();




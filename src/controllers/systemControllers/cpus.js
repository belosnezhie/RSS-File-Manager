import os from 'os';

export const handleCPUS = () => {
  const cpus = os.cpus();

  console.log(`overall amount of CPUS: ${cpus.length}`);

  cpus.forEach((cpu, index) => {
    const clockRate = (cpu.speed / 1000).toFixed(2);
    console.log(`CPU ${index + 1}:`);
    console.log(`Model: ${cpu.model}`);
    console.log(`Clock rate: ${clockRate} GHz\n`);
  });
}

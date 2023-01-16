import { createSourceFile } from '../services/sources.service';

export const init = (dir: string) => {
  console.log(`Creating Sources.md file at: ${dir}`);
  createSourceFile(dir);
  console.log(`Sources.md file created`);
};

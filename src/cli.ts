#! /usr/bin/env node
import { getRootDir } from './services/filemanager.service';
import { Markdown } from './services/Markdown';
import readline from 'readline';
import { findSourceFile } from './services/sources.service';
import { LIB_VERSION } from './config';
import { argv } from 'process';

//https://stackoverflow.com/questions/18193953/waiting-for-user-to-enter-input-in-node-js
function askQuestion(query): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) =>
    rl.question(`${query}\n`, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
}

async function main() {
  const args = argv.slice(2);

  if (args[0] === '-v' || args[0] === '--version') {
    console.log(`v${LIB_VERSION}`);
    process.exit();
  }

  const __rootDir = await getRootDir();
  const sourceFileName = findSourceFile(__rootDir);
  if (!sourceFileName) {
    console.log('Could not find Sources.md file');
    process.exit();
  }
  const md = new Markdown(__rootDir, sourceFileName);

  console.log('The available link categories are:');

  for (let header of md.subHeaders) {
    console.log(header);
  }

  const linkSubHeading = await askQuestion('link subheading?');
  const linkHREF = await askQuestion('link href?');
  const linkDescription = await askQuestion('link description?');
  md.addLink(linkSubHeading, linkHREF, linkDescription);
  md.saveFile();
}

main();

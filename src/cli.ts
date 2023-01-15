#! /usr/bin/env node
import { getRootDir } from './services/filemanager.service';
import readline from 'readline';
import { findSourceFile } from './services/sources.service';
import { LIB_VERSION, SUB_HEADING_LEVEL } from './config';
import { argv } from 'process';
import { jondown } from 'jondown';
import { isYesAnswer, unformat } from './services/cli.utils';

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

function exit(msg?: string) {
  if (msg) {
    console.log(msg);
  }
  process.exit();
}

async function main() {
  const args = argv.slice(2);

  if (args[0] === '-v' || args[0] === '--version') {
    exit(`v${LIB_VERSION}`);
  }

  const __rootDir = await getRootDir();
  const sourceFileName = findSourceFile(__rootDir);
  if (!sourceFileName) {
    console.log('Could not find Sources.md file');
    process.exit();
  }
  const md = jondown(`${__rootDir}/${sourceFileName}`);

  console.log('The available link categories are:');

  const headings = md.getHeadingsByLevel(SUB_HEADING_LEVEL);

  headings.forEach(({ value }) => console.log(value));

  const linkSubAns = await askQuestion('link subheading?');

  let linkSubHeading = headings.find(({ value }) =>
    unformat(value).startsWith(unformat(linkSubAns)),
  )?.value;

  if (!linkSubHeading) {
    const shouldCreate = await askQuestion(
      `Subheading: "${linkSubAns}" could not be found, create it?`,
    );

    if (isYesAnswer(shouldCreate)) {
      const useSubmittedLink = await askQuestion(
        `Use "${linkSubAns}" as new heading?`,
      );

      if (!isYesAnswer(useSubmittedLink)) {
        linkSubHeading = await askQuestion('Enter new heading');
      } else {
        linkSubHeading = linkSubAns;
      }

      md.insertHeading(linkSubHeading, SUB_HEADING_LEVEL);
      console.log(`Subheading "${linkSubHeading}" created`);
    } else {
      exit(`Subheading: "${linkSubAns}" could not be found, exiting`);
    }
  }
  console.log(
    `Link will be appended to subheading: "${linkSubHeading}"`,
  );
  const linkHREF = await askQuestion('link href?');
  const linkDescription = await askQuestion('link description?');

  const formattedLink = md.actions.createLink(
    linkHREF,
    linkDescription,
  );
  md.insertUnderHeading(
    linkSubHeading,
    md.actions.createBulletItem(formattedLink),
  );
  md.saveFile();
  exit(`added ${formattedLink} under subheading "${linkSubHeading}"`);
}

main();

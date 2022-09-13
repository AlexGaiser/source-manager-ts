#! /usr/bin/env node
import { getRootDir } from "./services/filemanager.service";
import { Markdown } from "./services/Markdown";
import readline from 'readline';
import { findSourceFile } from "./services/sources.service";

//https://stackoverflow.com/questions/18193953/waiting-for-user-to-enter-input-in-node-js
function askQuestion(query):Promise<string> {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise<string>(resolve => rl.question(`${query}\n`, ans => {
      rl.close();
      resolve(ans);
  }))
}

async function  main (){
  const __rootDir = await getRootDir()
  const sourceFileName = findSourceFile(__rootDir);
  if(!sourceFileName) {
    console.log('Could not find Sources.md file')
    process.exit()
  }
  const md = new Markdown(__rootDir, sourceFileName);
  
  console.log('The available link categories are:')

  for(let header of md.subHeaders) {
    console.log(header)
  }

  const linkSubHeading = await askQuestion('link subheading?')
  const linkHREF =  await askQuestion('link href?')
  const linkDescription = await askQuestion('link description?')
  md.addLink(linkSubHeading, linkHREF, linkDescription)
  md.saveFile();
}

main()
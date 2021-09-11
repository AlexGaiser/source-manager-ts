import { readFile, writeFile, writeMarkdownfile } from "./filemanager.service";

export class Markdown {
  filePath:string;
  fileName: string;
  fileLines: string[];
  
  constructor(filePath:string, fileName:string) {
    this.filePath = filePath;
    this.fileLines = readFile(filePath, fileName).toString().split('\n');
    this.fileName = fileName;
  }

  get subHeaders() {
    return this.fileLines.filter(line=>line.startsWith('##') || line.startsWith('###')).map(this.trimHeader)
  }

  private makeLinkString(link:string, description?: string){
    return `[${description || link}](${link})`
  }

  addLinkToLine(targetLine: number, link:string, description?:string) {
    const linkString = this.makeLinkString(link, description)
    this.fileLines.splice(targetLine, 0, linkString)
    return this;
  }

  trimHeader (header:string) {
    return header.split(' ').slice(1).join(' ')
  }

  addLink(header:string, link:string, description:string) {
    const targetIndex = this.fileLines.findIndex((line)=>this.trimHeader(line)===header) +1;
    this.addLinkToLine(targetIndex, link, description)
  }

  saveFile() {
    return writeMarkdownfile(this.fileLines, this.filePath, this.fileName.replace('.md',''))
  }
}
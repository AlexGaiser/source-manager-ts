# Source Tracking CLI Tool

## Description

This is a tool for managing and tracking sources when working on a project. I, like a lot of people, like to read a variety of sources when working on projects. Recently I have taken up the practice of storing those sources in Markdown files inside the project repository. The main benefit of this is that anyone who looks at your repository can easily find the information you used. This helps with knowledge sharing and makes it easy to find helpful resources for anyone working on something similar. 

As an example the Sources.md file for this project includes the links I used to build this particular CLI tool. My hope is that people will use this tool to make their own research easier, but I also made it just for me!

## How To Use

1. Create a node project with a Sources.md file 
2. Add some subheadings ('##' or '###') to the file where you want links to go
3. Install source manager `npm install -g source-manager-md`
4. run `add-source-link` or `asl` from the command line in your target directory
5. Check your sources file. The new link should be inserted under the correct subheading


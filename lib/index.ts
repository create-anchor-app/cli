#! /usr/bin/env node

"use strict";
import inquirer from "inquirer";
import { promises } from "fs";
import fetch from "node-fetch";
import { handler } from "./handler";
import path from "path";
import chalk from "chalk";

import { chooseName, flags, whatAreYouBuilding } from "./utils";

const args = process.argv.slice(2);
const supportedCommands: string[] = ["-v", "--version", "-h", "--help"];

console.clear();


(async () => {
  try {
    const filePath = path.resolve(__dirname, "api.json");
    const res = await fetch("https://create-anchor-app.vercel.app/api.json")

    await promises.writeFile(filePath, await res.text());
    const examples = require(filePath);

    if (args.length) {
      if (args[0] === "-v" || args[0] === "--version") {
        flags("-v");
      }

      if (!Object.keys(examples).includes(args[0])) {
        flags(args[0]);
      }

      if (args.length > 2 && args.filter((x) => !supportedCommands.includes(x)).length > 0) {
        console.log(chalk.red("Unexpected flag(s) :", args.join(" ")));
        process.exit(1);
      }
    }

    const exampleName = args[0] || await whatAreYouBuilding(examples);
    const answer = args[1] || await chooseName();
    await handler(exampleName, answer);



  } catch (err: any) {
    console.log(chalk.red(`Error fetching latest examples: ${err.message}`));
    process.exit(1);
  };
})();


import path from "path";
import { execSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import fetch from "node-fetch";
import zipper from "node-stream-zip";

export async function handler(template: string, name: string, setupCI: boolean) {
  console.clear();
  const examples = require(path.resolve(__dirname, "api.json"));
  console.log(chalk.gray("Template: "), chalk.green(template));
  console.log(chalk.gray("App name: "), chalk.green(name));
  console.log(chalk.gray("Setup CI: "), chalk.green(setupCI ? 'Yes' : 'No'));
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Proceed?",
        default: true,
      },
    ])
    .then(async (answers) => {
      if (answers.confirm) {
        console.clear();
        var start = new Date();
        const pathname = `${path.resolve("./")}/${name}`;
        if (fs.existsSync(pathname)) {
          console.log(chalk.gray(`Directory already exists: ${pathname}`));
          await inquirer
            .prompt([
              {
                type: "confirm",
                name: "confirm",
                message: "Overwrite?",
                default: false,
              },
            ])
            .then(async (answers) => {
              if (!answers.confirm) {
                process.exit(1);
              }
            });
        }
        const ex = examples[template];
        console.log(chalk.gray("Setting up..."));
        console.log(chalk.gray("Cloning repo..."));
        await download(ex.repo, pathname, name);
        console.clear();
        console.log(chalk.gray("Setting up..."));
        console.log(chalk.gray("Installing Dependencies..."));
        execSync(`cd ${pathname} && ${ex.install} --force && git init`, {
          stdio: [1],
        });
        console.clear();
        console.log(
          `Done in ${(new Date().getTime() - start.getTime()) / 1000}s ✨ `
        );
        const startCommand = ex.run;

        if (ex.guide !== undefined && ex.guide !== "") {
          console.log(`Find accompanying tutorial at ${chalk.green(ex.guide)}`);
        }
        if (ex.docs !== undefined && ex.docs !== "") {
          console.log(`Check out docs at ${chalk.green(ex.docs)}`);
        }
        if (startCommand !== undefined && startCommand !== "") {
          console.log(
            "run `" +
            chalk.green(
              `cd ${name}${startCommand ? " && " + startCommand : ""}`
            ) +
            "` to get started"
          );
        }
        if (setupCI) {
          execSync(`mkdir -p ${pathname}/.github/workflows`, { stdio: [1] });
          console.log(chalk.gray("Setting up..."));
          console.log(chalk.grey('Setting up CI for the project...'))
          
          const file = await fetch('https://gist.githubusercontent.com/anoushk1234/0f86460f08821bdbbdb03a3f56681928/raw/995c7d1a221546cadef7fa47131eef1a57001706/tests.yml');
          const fileStream = fs.createWriteStream(`${pathname}/.github/workflows/ci.yml`);

          await new Promise((resolve, reject) => {
            file.body.pipe(fileStream);
            file.body.on("error", reject);
            fileStream.on("finish", resolve);
          });
        }
      } else {
        console.log(chalk.red("Operation cancelled by user"));
      }
    })
    .catch((err) => {
      console.clear();
      if (err.command) {
        console.log(`${chalk.cyan(err.command)} has failed.`);
      } else {
        console.log(chalk.red("Unexpected error. Please report it as a bug:"));
        console.log(err.message);
      }
    });
}
async function download(repo: string, path: string, name: string) {
  let branch: string = "master";
  let res = (await fetch(
    `https://codeload.github.com/create-anchor-app/${repo}/zip/refs/heads/master`
  )) as any;
  if (res.status !== 200) {
    res = (await fetch(
      `https://codeload.github.com/create-anchor-app/${repo}/zip/refs/heads/main`
    )) as any;
    branch = "main";
  }
  console.log(chalk.gray(res.statusText));
  const fileStream = fs.createWriteStream(`${__dirname}/${name}.zip`);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });

  fs.mkdirSync(path);
  const zip = new zipper.async({ file: `${__dirname}/${name}.zip` });
  await zip.extract(`${repo}-${branch}`, path);
  console.log(chalk.gray("Done"));
  await zip.close();
  fs.unlinkSync(`${__dirname}/${name}.zip`);
}

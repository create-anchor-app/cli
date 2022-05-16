import chalk from "chalk";
import inquirer from "inquirer";
import generate from "project-name-generator";
import path from "path";

export function flags(flag: string) {
    switch (flag) {
        case "-h" || "--help":
            console.log(
                `Please visit  ${chalk.cyan(
                    "https://github.com/create-anchor-app/cli#readme"
                )} to know more about the usage of this CLI.`
            );
            break;

        case "-v" || "--version":
            console.log(
                `${chalk.cyan("create-anchor-app")} ${chalk.green(
                    require(path.resolve(__dirname, "../package.json")).version
                )}`
            );
            break;
        default:
            console.log(chalk.red("Unexpected flag or project type:", flag));
    }
    process.exit(1);
}

export async function chooseName() {
    const answer = await inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Name of the app?",
                default: generate().dashed,
            },
        ]).catch((err) => {
            console.log(chalk.red("Unexpected error:", err));
            process.exit(1);
        });

    return answer.name;


}



export const whatAreYouBuilding = async (examples: Object) => {

    const answer = await inquirer
        .prompt([
            {
                type: "list",
                name: "example",
                message: "What are you building today?",
                choices: Object.keys(examples),
            },
        ]).catch((err) => {
            console.log(chalk.red("Unexpected error:", err));
            process.exit(1);
        });

    return answer.example

};

export const shouldSetupCI = async () => {

    const answer = await inquirer
        .prompt([
            {
                type: "confirm",
                name: "example",
                message: "Do you want to setup CI?",
                default: true,
            },
        ]).catch((err) => {
            console.log(chalk.red("Unexpected error:", err));
            process.exit(1);
        });

    return answer.example

};
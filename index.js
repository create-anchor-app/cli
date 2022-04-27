//import fetch from 'node-fetch';

const fetch = require("node-fetch");
async function run() {
  const res = await fetch(
    "https://codeload.github.com/create-anchor-app/anchor-escrow/zip/refs/heads/main"
  );
  console.log(res.status);
}
run();

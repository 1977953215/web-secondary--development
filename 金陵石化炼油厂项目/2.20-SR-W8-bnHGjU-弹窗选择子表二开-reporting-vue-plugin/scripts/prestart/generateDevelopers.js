const exec = require("child_process").execSync
const path = require("path")
const fs = require("fs")
const information = require("../information.json")
module.exports = function generateDevelopers() {
  let preDevelopers = information.developers
  let developers = ""
  let currentDeveloper = ""
  try {
    currentDeveloper = exec("git config user.name", { "encoding": "utf8" }).replace("\n", "")
  } catch (e) {
    console.log(e)
  }
  if (preDevelopers) {
    if (preDevelopers.split(",").includes(currentDeveloper)) {
      developers = preDevelopers
    } else {
      developers = `${preDevelopers},${currentDeveloper}`
    }
  } else {
    developers = currentDeveloper
  }
  information.developers = developers
  fs.writeFileSync(
    path.resolve(__dirname, "../information.json"),
    JSON.stringify(information, null, 2),
    "utf8"
  )
  return developers
}

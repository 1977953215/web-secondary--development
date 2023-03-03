const fs = require("fs")
const path = require("path")
const chalk = require("chalk")

module.exports = function checkPreview() {
  if (!fs.existsSync(path.resolve(__dirname, "../../output/preview.png"))) {
    console.log(chalk.red("请将前端页面截图，并命名为preview.png放在output文件夹"))
    return
  }
  fs.readFile(path.resolve(__dirname, "../../output/preview.png"), "utf-8", function(err, data) {
    if (err) {
      console.log(err)
      return
    }
    if (data === "preview.png") {
      console.log(chalk.red("请将前端页面截图，并命名为preview.png放在output文件夹,覆盖原占位文件"))

    }
  })

}

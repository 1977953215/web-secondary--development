const fs = require("fs");
const path = require("path");
const configJson = require("../../pluginTemp/config.json");
const chalk = require("chalk");
const information = require("../information.json");
module.exports = function generateDirName() {
   const pluginType = configJson.type == "app" ? (configJson.props.type == "customize" ? "app" : configJson.props.type) : configJson.type;
   const isVue = fs.readdirSync(path.resolve(__dirname, "../")).some((item) => item == "vue.config.js");
   const firstDate = information.firstDate;
   //生成文件夹名称
   const requirementNumber = configJson["requirement-number"];
   const requirementName = configJson["requirement-name"];
   const dirName = `${firstDate}-${requirementNumber}-${requirementName}-${pluginType}-${isVue ? "vue" : "react"}-plugin`;
   console.log(chalk.blue("建议文件夹名："));
   console.log(chalk.blue(dirName));
   configJson.suggestedFolderName = dirName;
   fs.writeFileSync(path.resolve(__dirname, "../../pluginTemp/config.json"), JSON.stringify(configJson, null, 2), "utf8");
};

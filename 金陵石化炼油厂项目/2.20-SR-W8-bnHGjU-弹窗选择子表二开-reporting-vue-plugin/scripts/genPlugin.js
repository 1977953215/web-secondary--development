#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const AdmZip = require("adm-zip");
const yParser = require("yargs-parser");
const chalk = require("chalk");
const args = yParser(process.argv.slice(2));
const sourceMap = args.source || true;
sourceMap && console.log(chalk.yellow("plugin命令打包含有map文件，方便线上调试，如不需要，请运行npm run production"));
function printZip(zip) {
   let zipEntries = zip.getEntries(); // an array of ZipEntry records
   zipEntries.forEach(function (zipEntry) {
      console.log(zipEntry.name || zipEntry.entryName); // outputs zip entries information
   });
}

Date.prototype.Format = function (fmt) {
   var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds(), //毫秒
   };
   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
   for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
         fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
   }
   return fmt;
};
// 删除老的文件
fse.removeSync(path.resolve(__dirname, "../pluginTemp/js"));
fse.removeSync(path.resolve(__dirname, "../pluginTemp/media"));

// copy js

let mainFileName = ""; // 主入口文件
fs.mkdirSync(path.resolve(__dirname, "../pluginTemp/js"));
fs.readdirSync(path.resolve(__dirname, "../dist/js")).map((file) => {
   if (path.extname(file) === ".js") {
      if (file.indexOf("app") > -1) {
         mainFileName = file;
      }
      fs.copyFileSync(path.resolve(__dirname, `../dist/js/${file}`), path.resolve(__dirname, `../pluginTemp/js/${file}`));
   } else {
      if (sourceMap && path.extname(file) === ".map") {
         fs.copyFileSync(path.resolve(__dirname, `../dist/js/${file}`), path.resolve(__dirname, `../pluginTemp/js/${file}`));
      }
   }
});
// copy 静态文件
if (fs.existsSync(path.resolve(__dirname, "../dist/media"))) {
   fs.mkdirSync(path.resolve(__dirname, "../pluginTemp/media"));
   fs.readdirSync(path.resolve(__dirname, "../dist/media")).map((file) => {
      fs.copyFileSync(path.resolve(__dirname, `../dist/media/${file}`), path.resolve(__dirname, `../pluginTemp/media/${file}`));
   });
}

let configJson = require("../pluginTemp/config.json");

configJson.main = mainFileName;

fs.writeFileSync(path.resolve(__dirname, "../pluginTemp/config.json"), JSON.stringify(configJson, null, 2), "utf8");
mainFileName && console.log(chalk.blue("config.json 修改完成"));
const requirementNumber = configJson["requirement-number"];
const requirementName = configJson["requirement-name"] == "需求名称" ? "" : `${configJson["requirement-name"]}-`;
let zip = new AdmZip();
zip.addLocalFolder(path.resolve(__dirname, "../pluginTemp"));
let pluginPath = path.resolve(__dirname, `../${requirementNumber}-${requirementName}${new Date().Format("yyyy年MM月dd日-HH时mm分")}.zip`);
zip.writeZip(pluginPath);
zip.writeZip(path.resolve(__dirname, "../output/插件包.zip"));
printZip(zip);
console.log(chalk.blue("打包完成..."));

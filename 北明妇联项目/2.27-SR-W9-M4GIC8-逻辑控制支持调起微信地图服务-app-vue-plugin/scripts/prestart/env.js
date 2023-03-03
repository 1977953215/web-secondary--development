const fs = require("fs")
const path = require("path")
const generateDevelopers = require("./generateDevelopers.js")
module.exports = function env() {
  const isVue = fs.readdirSync(path.resolve(__dirname, "../../")).some((item) => item == "vue.config.js")
  const developers = generateDevelopers()
  fs.writeFileSync(
    path.resolve(__dirname, "../../.env"),
    `${isVue ? "VUE" : "REACT"}_APP_DEVELOPERS=${developers}`,
    "utf8"
  )
}

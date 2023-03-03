const information = require("../information.json")
const fs = require("fs")
const path = require("path")
module.exports = function generateFirstDate() {
  const firstDate = information.firstDate
    ? information.firstDate
    : getWeekDate(1)
  information.firstDate = firstDate
  fs.writeFileSync(
    path.resolve(__dirname, "../information.json"),
    JSON.stringify(information, null, 2),
    "utf8"
  )
  return firstDate
}

/**
 * 获取当周周一到周日的日期
 * @param n {number} 1,2,3,4,5,6,7
 * @return {string}
 * @example 1.30
 */
function getWeekDate(n) {
  n = (1 - n)
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let day = now.getDay()

  if (day !== 0) {
    n = n + (day - 1)
  } else {
    n = n + day
  }
  if (day) {
    //这个判断是为了解决跨年的问题
    if (month <= 1) {
      year -= 1
      month = 12
    }
  }
  now.setDate(now.getDate() - n)
  year = now.getFullYear()
  month = now.getMonth() + 1
  date = now.getDate()
  s = month + "." + date
  return s
}

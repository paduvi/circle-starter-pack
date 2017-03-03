/**
 * Created by chotoxautinh on 11/23/16.
 */
let data = "payroll:abcxyz";
let prefix = "payroll:";

console.log(data.replace(new RegExp("^(" + prefix + ")"), ""));

let name = `"abc"""`;

console.log(name.replace(/^"+|"+$/gm, ''));
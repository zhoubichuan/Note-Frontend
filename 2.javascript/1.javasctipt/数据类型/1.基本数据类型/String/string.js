//String:字符串类

//js中的对象就是一个泛指，所有东西都是对象，类时把这个泛指具体细分：Object、Array、RegExp、Date、String、Node这些都是js中的内置类，实列是类中的一个具体的东西

var string = "hello";
//一个字符串是由多个字符组成的
//str.length 获取字符串中的个数（字符串长度）
//字符串中也存在索引，也是从0开始的，"w"这个字符的索引就是0
//空格、换行这些特殊的符号也是一个字符

//1、chartAt(索引)获取指定索引位置的字符
// for (var i = 0; i < str.length; i++) {
//   console.log(str.chartAt(i));
// }
//charCodeAt（索引）获取指定索引位置的字符对应的ASCII值
// for (var i = 0; i < str.length; i++) {
//   console.log(str.charCodetAt(i));
// }

//2、字符串的截取
//substr(n,m)，从索引n开始截取m个字符
//substring(n,m)从索引n开发，找到索引m处（不包含m），将找到的字符串返回
//slice（n,m）从索引n开始，找到索引m处（不包含m），将找到的字符串返回 slice支持负数作为索引，str.length+负数索引
//slice（n）没有m代表截取到末尾

//3、字符串中位置查找
//indexOf（字符）获取指定字符在字符串中第一次出现的索引位置
//lastIndexOf（字符）：y获取指定字符在字符串中最后一次出现索引的位置
//如果没有这个字符，返回-1，可以判断字符串中是否包含某个字符

string.indexOf("h");
string.lastIndexOf("h");

//4、大小写转换
//toLowerCase：将所有字符转换为小写
//toUpperCase：将所有字符转换为大写

//5、替换
//replace（要替换的老字符，替换成新字符）
//在不使用正则的情况下每一次调用方法只能替换一次
string.replace("老的", "新的");

string.replace(/老的/g, "新的");

//6、将字符串按照指定的分隔符拆分为数组
//splice
var s = "1+2+3+4+5";
console.log(s.split("+"));
console.log(s.split(""));
console.log(s.split(" "));

//7、match
var time = "2018-02-03 12:03:09";
//2018年02月03日 12时03分09秒

//思路一
function zero(value) {
  return value < 10 ? "0" + value : value;
}
function formatTime(timeStr) {
  var ary = timeStr.split(" ");
  var str1 = ary[0];
  var str2 = ary[1];
  var ary1 = str1.split("-");
  var ary2 = str2.split(":");
  return (
    ary1[0] +
    "年" +
    ary1[1] +
    "月" +
    ary1[2] +
    "日" +
    ary2[0] +
    "时" +
    ary2[1] +
    "分" +
    ary2[2] +
    "秒"
  );
}

console.log(formatTime(time));

//思路二：直接用replace一个个替换（没办法补充0）

//思路三:用正则

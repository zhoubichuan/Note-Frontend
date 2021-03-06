


/* 关于内存的释放和作用域销毁的研究 */
//堆内存
//对象数据类型或者函数数据类型在定义的时候首先会开辟一个堆内存，堆内存有一个引用的弟子，如果外面有变量等知道了这个地址，我们就说这个内存被占用了就不能销毁了
var obj1 = {name:"张三"}
var obj2 = obj1
//我们想要让堆内存释放/销毁，只需要把所有引用它的变量赋值为null即可，如果当前的堆内存没有任何东西被占用，那么浏览器会在空闲的时候把他销毁...
obj1= null
obj2 = null

//栈内存
// 1）全局作用域
//只有当页面关闭的时候全局作用域才会销毁

// 2）私有作用域（只有函数执行的时候会产生私有作用域）
// 一般情况下，函数执行会形成一个新的私有作用域，当私有作用域中代码执行完成后，我们当前作用域都会主动的进行释放和销毁
//但是还是存在特殊的情况：
// 当前私有作用域中的部分内存被作用域以外的东西占用了，那么当前的这个作用域就不能销毁了
//a、函数执行返回了一个引用数据类型的值，并且在函数的外面被一个其他的东西给接受了，这种情况下一般形成的私有作用域都不会销毁
function fn(){
    var num = 100
    return function (){

    }
}
var f = fn()

//在一个私有的作用域中给DOM元素的事件绑定方法，一般情况下我们的私有作用域都不销毁
var oDiv = document.getElementById("div")
~function(){
    oDiv.onclick=function(){

    }
}()//当前的自执行函数形成的这个私有的作用域也不销毁


//下述情况属于不立即销毁，-->fn返回的函数没有被其他的东西占用，但是还需要执行一次，所以暂时不销毁，当返回的值执行完成以后，浏览器会在空闲的时候把它销毁
function fn(){
    var num = 10
    return function(){

    }
}
fn()()//首先执行fn，返回一个小函数对应的内存地址，然后紧接着让返回的小函数再执行


/* 作用域练习题 */
//++i和i++都是自身累加1，在和其他的值进行运算的时候是有区别的
//i++:先拿i的值进行运算，运算完成本身再+1
//++i:先本身累加1，然后拿累加完成后的结果去运算
var i = 5
console.log(1+ i++)//6
console.log(i + (++i))//7
console.log(2+(i++)+(++i)+(++i)+(i++))//30
console.log(i)//9

function fn(){
    var i = 10
    return function(n){
        console.log(n+(++i))
    }
}
var f = fn()
f(10)//21
f(20)//32
fn()(10)//21
fn()(20)//31

function fn(i) {
    return function (n) {
        console.log(n + (++i))
    }
}
var f = fn(13)
f(12)//25
f(14)//28
fn(15)(12)//27
fn(16)(13)//29

/* 思考题：用闭包作用域的方式实现选项卡循环绑定事件的处理 */
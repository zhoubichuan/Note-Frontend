//类的编译
class Parent {
  constructor() {
    this.mame = "parent";
    return {};
  }
  static b() {
    return 2;
  }
  eat() {
    console.log("eat");
  }
}
class Child extends Parent {
  constructor() {
    this.age = 9; //私有属性
  }
  static a() {
    //静态属于类上的方法
    return 1;
  }
  smoking() {
    //原型上的方法
    console.log("somking");
  }
}
let child = new Child();
console.log(child.smoking);
console.log(child.a());

//1.类只能new
Child(); //运行会报错
//2.类可以继承公有私有和静态方法
//3.父类的构造函数中返回了一个引用类型会把这个引用类型作为子类的this

//类的原理
//类的调用检测检测实列是不是new出来的
function _classCallCheck(instance, constructor) {
  if (!(instance instanceof constructor)) {  throw new Error("Class constructor Child cannot be invoked without");
  }
}
//constructor是构造函数
//protoPropertys 是原型方法的描述
//staticPropertys 是静态方法的描述
function definePropertys(target, arr) {
  for (let i = 0; i < arr.length; i++) {
    Object.defineProperty(target, arr[i].key, {
      ...arr[i],
      configurable: true,
      enumerable: true,
      writable: true
    });
  }
}
function _createClass(constructor, protoPropertys, staticPropertys) {
  if (protoPropertys.length > 0) {
    definePropertys(constructor.prototype, protoPropertys);
  }
  if (staticPropertys.length > 0) {
    definePropertys(constructor, staticPropertys);
  }
}
let Parent = (function() {
  //为了方便扩展
  function P() {
    _classCallCheck(this, P);
  }
  _createClass(
    P,
    [
      {
        key: "eat",
        value: function() {
          console.log("吃");
        }
      }
    ],
    [
      {
        key: "b",
        value: function() {
          return 2;
        }
      }
    ]
  );
  return P;
})();
let p = new Parent();
console.log(Parent.b())
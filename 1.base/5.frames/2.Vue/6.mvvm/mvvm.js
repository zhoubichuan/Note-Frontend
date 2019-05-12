class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (data && typeof data == "object") {
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(obj, key, value) {
    this.observer(value);
    Object.defineProperty(obj, key, {
      get() {
        return value;
      },
      set: newVal => {
        if (newVal != value) {
          this.observer(newVal);
          value = newVal;
        }
      }
    });
  }
}
class Compiler {
  constructor(el, vm) {
    //判断el属性是不是一个元素，如果不是元素就获取
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    //把当前节点中的元素 获取到 放到内存中
    this.vm = vm;
    let fragment = this.node2fragment(this.el);
    //把节点中的内容进行替换

    //编译模板 用数据编译
    this.compile(fragment);
    //把内容在塞到页面中

    this.el.appendChild(fragment);
  }
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  //编译元素
  compileElement(node) {
    let attributes = node.attributes;
    [...attributes].forEach(attr => {
      let { name, value: expr } = attr;
      if (this.isDirective(name)) {
        let [, directive] = name.split("-");
        //需要调用不同的指令来处理
        CompileUtil[directive](node, expr, this.vm);
      }
    });
  }
  //编译文本
  compileText(node) {
    let content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      CompileUtil["text"](node, content, this.vm);
    }
  }
  //核心的编译方法
  compile(node) {
    //用来编译内存中的dom节点
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child);
        //如果是元素的话 需要把自己传进去 再遍历子节点
        this.compile(child);
      } else {
        this.compileText(child);
      }
    });
  }
  //把节点移动到内存中
  node2fragment(node) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = node.firstChild)) {
      //appendChild具有移动性
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  isElementNode(node) {
    //是不是元素节点
    return node.nodeType === 1;
  }
}
CompileUtil = {
  getVal(vm, expr) {
    return expr.split(".").reduce((data, current) => {
      return data[current];
    }, vm.$data);
  },
  model(node, expr, vm) {
    //mode是节点 expr是表达式 vm是当前实列 给输入框赋予value属性
    let fn = this.updater["modelUpdater"];
    let value = this.getVal(vm, expr);
    fn(node, value);
  },
  html() {},
  text(node, expr, vm) {
    let fn = this.updater["textUpdater"];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1]);
    });
    fn(node, content);
  },
  updater: {
    //把数据插入到节点中
    modelUpdater(node, value) {
      node.value = value;
    },
    htmlUpdater() {},
    textUpdater(node, value) {
      node.textContent = value;
    }
  }
};
class Vue {
  constructor(options) {
    //this.$el $data $options
    this.$el = options.el;
    this.$data = options.data;
    //这个根元素 存在 编译模板
    if (this.$el) {
      //把数据 全部转化成用Object。defineProperty来定义
      new Observer(this.$data);
      new Compiler(this.$el, this);
    }
  }
}

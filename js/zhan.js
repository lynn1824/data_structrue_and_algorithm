/******
 * @description 栈的描述
 * 数据结构：栈
 * 数据关系：后入先出
 * 包含方法：push(栈顶添加元素)、pop(栈顶移除元素)、peek(查找栈顶)、isEmpty(检查栈是否为空)、clear(清空所有元素)、size(获取栈的长度)
*****/

// 定义栈的类
var Stack = function() {
    var items = [];

    this.push = function(element) {
        items.push(element);
    }

    this.pop = function() {
        return items.pop();
    }

    this.peek = function() {
        return items[items.length -1];
    }

    this.isEmpty = function() {
        return items.length === 0;
    }

    this.clear = function() {
        items = [];
    }

    this.size = function() {
        return items.length;
    }

    this.getItems = function() {
        return items;
    }
};

// 10进制转2进制
var divBy2 = function(number) {
    var s = new Stack();
    var yushu;

    var result = '';
    
    while(number > 0) {
        yushu = number % 2;
        s.push(yushu);
        number = Math.floor( number / 2 );
    }

    while(!s.isEmpty()) {
        result += s.pop();
    }

    return result;
}

// js当中调用栈（用的就是栈的数据结构...）
var fun1 = function() {
    return console.log('fun1 finish');
}

var fun2 = function() {
    fun1();
    return console.log('fun2 finish');
}

fun2();

// 栈存在[fun2(栈底), fun1(栈顶)]
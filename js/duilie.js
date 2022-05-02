/******
 * @description 队列的描述
 * 数据结构：队列
 * 数据关系：先入先出
 * 包含方法：enqueue(入列)、dequeue(出列))、front(查找队首)、isEmpty(检查队列是否为空)、clear(清空所有元素)、size(获取队列的长度)、getItems(获取队列所有元素)
*****/
var Queue = function() {
    var items = [];

    this.enqueue = function(item) {
        items.push(item);
    }

    this.dequeue = function() {
        return items.shift();
    }

    this.front = function() {
        return items[0];
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
}

// 击鼓传花游戏, numbers（成员） count当传到第几位时，第几位被淘汰，直到最后只剩一位返回。
function sendGame1(numbers, count) {
    var q = new Queue();
    // 全部入列
    for(var i = 0; i < numbers.length; i++) {
        q.enqueue(numbers[i]);
    }

    var c = 1;
    while(q.size() > 1) {
        // 出列
        var f = q.dequeue();
        if(!(c%count === 0)) {
            // 如果未被击中，继续入列
            q.enqueue(f);
        }
        c++;
    }
    return q.dequeue();
}

// 击鼓传花游戏, numbers（成员） count当传到第几位时，第几位被淘汰，直到最后只剩一位返回。
function sendGame2(numbers, count) {
    var q = new Queue();
    // 全部入列
    for(var i = 0; i < numbers.length; i++) {
        q.enqueue(numbers[i]);
    }

    while(q.size() > 1) {
        // 出列
        for(var i = 0; i < count - 1; i++) {
            q.enqueue(q.dequeue);
        }
        q.dequeue();
    }
    return q.dequeue();
}
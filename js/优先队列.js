/**
 * 优先队列：priority_queue
**/

// 优先队列：比如，坐飞机（优先登机）、打印机（很多电脑在控制，同时上传打印任务，这个是串行的，所以需要队列）
// 所以说队列是一种很有用的数据结构
var PriorityQueue = function() {
    var items = [];
    
    var PriorityItem = function(element, priority) {
        this.item = element;
        this.priority = priority;
    }

    this.enqueue = function(element, priority) {
        var item = new PriorityItem(element, priority);
        if(items.length === 0) {
            items.push(item);
        } else {
            debugger;
            for(var i = 0; i < items.length; i++) {
                var currentItem = items[i];
                if(currentItem.priority >= item.priority) {
                    if(i === (items.length  - 1)) {
                        items.push(item);
                        break;
                    } else {
                        continue;
                    }
                } else {
                    items.splice(i, 0, item);
                    break;
                }
            }
        }
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
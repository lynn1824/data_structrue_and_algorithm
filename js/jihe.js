// Es6 set
var Set2 = function() {
    var items = {};

    // has 检查元素是否存在
    this.has = function(value) {
        return items.hasOwnProperty(value);
    }

    // 添加元素
    this.add = function(value) {
        if(!this.has(value)) {
            items[value] = value;
            return value;
        }
        return false;
    }

    // 移除元素
    this.remove = function(value) {
        if(this.has(value)) {
            return delete items[value];
        } 
        return false;
    }

    this.getItems = function() {
        return items;
    }

    this.clear = function() {
        items = {};    
    }

    this.getSize = function() {
        return Object.keys(items).length;   
    }

    this.value = function() {
        return Object.keys(items);
    }

    // 并集
    this.union = function(otherSet) {
        var resultSet = new Set2();

        // 1、把自己的值给提取出来
        var arr = this.value();
        for(var i = 0; i < arr.length; i++) {
            resultSet.add(arr[i]);
        }

        // 2、将otherSet
        arr = otherSet.value();
        for(var i = 0; i < arr.length; i++) {
            resultSet.add(arr[i]);
        }

        return resultSet;
    }

    // 交集
    this.intersection = function(otherSet) {
        var resultSet = new Set2();

        var arr = this.value();
        for(var i = 0; i < arr.length; i++) {
            if(otherSet.has(arr[i])) {
                resultSet.add(arr[i]);
            }
        }
        return resultSet;
    }

    // 差集
    this.difference = function(otherSet) {
        var resultSet = new Set2();
        var arr = this.value();
        for(var i = 0; i < arr.length; i++) {
            if(!otherSet.has(arr[i])) {
                resultSet.add(arr[i]);
            }
        }
        return resultSet;
    }
}
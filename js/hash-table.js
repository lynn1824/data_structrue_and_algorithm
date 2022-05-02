var LinkTable = function() {
    // 链表头
    var head = null;
    // 链表长度
    var length = 0;

    var Node = function(element) {
        this.element = element;
        this.next = null;
    }

    // 链表追加节点
    this.append = function(element) {
        var node = new Node(element);
        if(head === null) {
            // 这时候链表头也是链表尾
            head = node;
        } else {
            var currentNode = head;
            // 找到最后一个元素
            while(currentNode.next) {
                currentNode = currentNode.next;
            }
            // 将最后一个元素next指向新元素
            currentNode.next = node;
        }
        length++;
    }

    // 链表插入节点
    this.insert = function(element, position) {
        var node = new Node(element);
        if(position > -1 && position < (length - 1)) {
            // 如果在0号位置插入
            if(position === 0) {
                node.next = head;
            } else {
                // 第一步：先找到前一个节点
                var previousNode = head;
                // 第一步已经走了，就要从1开始，不然从0开始，就会找到下下个节点
                var i = 1;
                // 退出循环时就是当前节点的上一个节点，它的next就是当前元素的后一个节点
                while(i < position) {
                    previousNode = previousNode.next;
                    i++;
                }
                // 获取没嵌入前的前后两个节点（分别为：previousNode、nextNode）
                var nextNode = previousNode.next;
                // 然后将previousNode变成当前节点的上一个节点, 将nextNode变成当前节点的下一个节点
                previousNode.next = node;
                node.next = nextNode;
            }
            length++;
        } else {
            console.error('您插入的节点位置不在可用范围');
        }
    }

    // 获取链表头
    this.getHead = function() {
        return head;
    }

    // 获取长度
    this.getSize = function() {
        return length;
    }

    // 是否为空
    this.isEmpty = function() {
        return length === 0;
    }

    // 获取当前元素索引
    this.indexOf = function(element) {
        var currentNode = head;
        var index = 0;
        while(currentNode.next) {
            if(currentNode.element === element) {
                return index;
            }
            currentNode = currentNode.next;
            index ++;
        }
        return -1;
    }

    // removeAt(移除元素)
    this.removeAt = function(position) {
        if(position > -1 && position < length) {
            var currentNode = head;
            if(position === 0) {
                head = currentNode.next;
            } else {
                var i = 1;
                while(i < position) {
                    currentNode = currentNode.next;
                    i++;
                }
                // 取到当前要删除节点的上一个节点
                var currentPreviousNode = currentNode;
                // 当前要删除的元素
                currentNode = currentPreviousNode.next;
                // 当前要删除节点的后一个节点
                var currentNextNode = currentNode.next;
                // 开始移除节点
                currentPreviousNode.next = currentNextNode;
            }
            length--;
            return currentNode;
        }
        return null;
    }

    // remove(根据元素移除节点)
    this.remove = function(element) {
        return this.removeAt(this.indexOf(element));
    }
}

// 哈希表(将一个)
var HashTable = function() {
    var items = [];

    // 散列函数
    this.loseHashCode = function(key) {
        var hash = 0;
        for(var i = 0; i < key.length; i++) {
            hash += key[i].charCodeAt();
        }
        // 质数取余法
        return hash % 37;
    }

    /**
     * 如何让生成的code唯一呢？？
     * 原理：将key转化成md5再将md5转化为unicode（万国码）作为hash表的code，这样就唯一了(这是自己想的方法)
     * 下面的方法叫 资源定位法（将资源key转化成unicode后，）
     * */ 
    var djb2HashCode = function() {
        var hash = 5381;

        for(var i = 0; i < key.length; i++) {
            hash += hash * 33 + key[i].charCodeAt();
        }
        // 质数取余法
        return hash % 1013;
    }

    // 设置散列值
    this.put = function(key, value) {
        var position = this.loseHashCode(key);
        console.log(position + ' -- ' + value);
        items[position] = value;
    }

    // 获取散列值
    this.getItems = function() {
        return items;
    }

    // 移除
    this.remove = function(key) {
        items[this.loseHashCode(key)] = undefined;
    }

    // 获取
    this.get = function(key) {
        return items[this.loseHashCode(key)];
    }
}

// 解决hashTable（hashCode）冲突的方法一   链式分离(所谓链式分离：就是在hash表中每一个key都是对应一个链表， 然后相同codde再往链表上存储)
var HashTable_L = function() {
    var table = [];

     // 散列函数
     this.loseHashCode = function(key) {
        var hash = 0;
        for(var i = 0; i < key.length; i++) {
            hash += key[i].charCodeAt();
        }
        // 质数取余法
        return hash % 37;
    }

    this.Node = function(key, value) {
        this.key = key;
        this.value = value;
    }

    this.put = function(key, value) {
        var position = this.loseHashCode(key);

        // 如果hashCode已经存在(此时的hashCode就是数组索引)
        if(table[position]) {
            table[position].append(new Node(key, value));
        } else {
            var l = new LinkTable();
            table[position] = l;
            table[position].append(new Node(key, value));
        }
    }

    this.get = function(key) {
        var position = this.loseHashCode(key);

        if(table[position]) {
            // 链表线性查找
            var currentNode = table[position].getHead();
            while(currentNode) {
                if(key === currentNode.element.key) {
                    return currentNode.value;
                }
                currentNode = currentNode.next;
            }
        }
        return undefined;
    }

    this.remove = function(key) {
        var position = this.loseHashCode(key);

        if(table[position]) {
            var currentNode = table[position].getHead();

            while(currentNode) {
                if(currentNode.element.key === key) {
                    // 查找到对应的key了
                    table[position].remove(currentNode.element);
                    // 如果链表空了，使用该hash表中位置元素占用的内存
                    if(table[position].isEmpty()) {
                        table[position] = undefined;
                    }
                    return true;
                }
                currentNode = currentNode.next;
            }
        } else {
            return false;
        }
    }
}

/**
 * 解决hashTable（hashCode）冲突的方法二   线性探查
 * 原理：
 *      当table（数组）中已经存在该索引, 则会探查下一个索引是否存在值，如果存在，继续向下查找。如果不存在，则当前所以为key
 **/ 
var HashTable_C = function(){
    var table = [];

    // 散列函数
    this.loseHashCode = function(key) {
       var hash = 0;
       for(var i = 0; i < key.length; i++) {
           hash += key[i].charCodeAt();
       }
       // 质数取余法
       return hash % 37;
   }

   this.Node = function(key, value) {
       this.key = key;
       this.value = value;
   }

   this.put = function(key, value) {
        var position = this.loseHashCode(key);
        if(table[position] == undefined) {
            table[position] = new Node(key, value);
        } else {
            // 这个位置被占据了
            var index = position + 1;
            while(table[index] != undefined) {
                index++;
            }
            table[index] = new Node(key, value);
        }
   }

   // 探查性查找
   this.get = function(key) {
        var position = this.loseHashCode(key);

        if(table[position].key === key) {
            return table[position].value;
        } else {
            // 开始寻找下一个
            var index = position + 1;
            while(table[index].key) {
                if(table[index].key === key) {
                    return table[index].value;
                }
                index++;
            }
        }
        return undefined;
   }
}



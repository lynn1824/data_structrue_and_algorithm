/******
 * @description 链表的描述
 * 数据结构：链表
 * 数据关系：链表它是一种在内存中并不是连续空间的存储，只是通过对象的属性指向了它下一个对象的地址，从而形成的一种链式数据结构；
 * 类比：它就像一辆火车、由一个火车头（链表头）拉着后面车厢（节点），next属性就是它的链子
 * 包含方法： insert(往链表中某一个位置插入节点Node)、
 *          delete(删除链表某个节点Node)、head(链表头)
 *          isEmpty(检查队列是否为空)
 *          clear(清空链表所有节点)
 *          removeAt(根据位置移除某个元素)
 *          indexOf(定位某个元素的位置)
 *          getSize(获取链表的长度)
 *          getNode(获取链表中某个节点)
 *          append(链表尾部追加节点)
*****/
document.title = "数据结构-链表";
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
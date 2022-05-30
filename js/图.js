/**
 * 图结构，如何表示（邻接表）
 * 表的第一列代表当前点，第二列代表当前点指向的其它顶点
***/

// 队列
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

// 栈
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

var Graph = function() {
    // 以数组的方式存储每个顶点
    var vertices = [];
    // 以对象的方式存储每个顶点包含的边
    var edgeList = {};

    /**
     * 添加顶点
     */
    this.addVertices = function(v) {
        vertices.push(v);
    }

    /**
     * 添加边
     * */ 
    this.addEdge = function(a, b) {
        edgeList[a] = edgeList[a] || [];
        edgeList[b] = edgeList[b] || [];
        edgeList[a].push(b);
        edgeList[b].push(a);
    }

    /**
     * 打印
    */
    this.print = function() {
        var s = '\n';
        for(var i = 0; i < vertices.length; i++) {
            // 获取顶点
            var currentVertice = vertices[i];
            s += currentVertice + ' => ';
            // 获取边
            var edge = edgeList[currentVertice];
            if(edge) {
                for(var j = 0; j < edge.length; j++) {
                    s += edge[j];
                }
            }
            s += '\n';
        }
        console.log(s);
    }

    
    var initColor = function() {
        var color = {};
        for(var i = 0; i < vertices.length; i++) {
            color[vertices[i]] = 'white';
        }
        return color;
    }

    // 遍历（广度优先）(white（未发现）、gray（已发现未探索）、black（已探索）)
    this.bfs = function(v, callback) {
        /**
         * color = {
         *      A: 'white',
         *      B: 'white',
         *      C: 'white'
         * }
         * */
        var color = initColor();
        
        var queue = new Queue();
        queue.enqueue(v);

        while(!queue.isEmpty()) {
            var now = queue.dequeue();
            var edges = edgeList[now];

            for(var i = 0; i < edges.length; i++) {
                var w = edges[i];
                if(color[w] === 'white') {
                    // 全部入列,并标记为已发现
                    color[w] = 'gray';
                    queue.enqueue(w);
                }
            }
            color[now] = 'black';
            if(callback) {
                callback(now);
            }
        }
    }

    /**
     * 广度优先算法  计算最短距离()
     * 广度优先算法就像从顶点开始剥洋葱一下，从心开始剥，所以每个遍历处理的点跟上一个回溯点是最近的
     * */
    this.BFS = function(v) {
        /**
         * color = {
         *      A: 'white',
         *      B: 'white',
         *      C: 'white'
         * }
         * */
        var color = initColor();
        
        var queue = new Queue();
        queue.enqueue(v);

        var d = {};
        var pred = {};
        
        // 初始化距离
        for(var i = 0; i < vertices.length; i++) {
            d[vertices[i]] = 0; 
            pred[vertices[i]] = null;
        }

        while(!queue.isEmpty()) {
            var now = queue.dequeue();
            var edges = edgeList[now];

            for(var i = 0; i < edges.length; i++) {
                var w = edges[i];
                if(color[w] === 'white') {
                    // 全部入列,并标记为已发现
                    color[w] = 'gray';

                    // 设置回溯点
                    pred[w] = now;
                    d[w] = d[now] + 1;

                    queue.enqueue(w);
                }
            }
            color[now] = 'black';
        }

        return {
            pred: pred,
            d: d
        }
    }

    // 利用栈递归（从根节点进行查找）
    var dfsVisite = function(u, color, callback) {
        color[u] = 'gray';
        var n = edgeList[u];
        for(var i = 0; i < n.length; i++) {
            var w = n[i];
            if(color[w] == 'white') {
                dfsVisite(n, color, callback);
            }
        }
        color[u] = 'black';
        callback(u);
    }

    // 深度优先遍历
    this.dfs = function(v, callback) {
        // 初始化颜色
        var color = initColor();
        dfsVisite(v, color, callback);
    }
}

var g = new Graph();
g.addVertices('A');
g.addVertices('B');
g.addVertices('C');
g.addVertices('D');
g.addVertices('E');
g.addVertices('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('A', 'D');
g.addEdge('B', 'E');
g.addEdge('B', 'F');
g.addEdge('C', 'D');

// 添加最短路径
g.addEdge('D', 'F');


var s = g.BFS('A');

var lastShort = function(from, to) {
    var v = to; //设置当前点
    var path = new Stack();
    while(v !== from) {
        path.push(v);
        v = s.pred[v]; // 寻找当前点回溯点
    }
    path.push(v);
    var str = '';
    while(!path.isEmpty()) {
        str += path.pop() + '->'; 
    }
    
    console.log(str);
}

lastShort('A', 'F');
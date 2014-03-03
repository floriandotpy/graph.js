var GRAPH = function(){
    var WIDTH, HEIGHT;
    var PADDING = 10;
    var NODE_RADIUS = 7;
    var EDGE_WIDTH = 3;
    var NODE_BORDER_WIDTH = 2;
    var JITTER = 0.5;

    function obj2arr(obj) {
        var arr = [];
        for (i in obj) {
            arr[i] = obj[i];
        }
        return arr;
    }

    function arr2obj (arr) {
        var obj = {};
        for (i in arr) {
            obj[i] = arr[i];
        }
        return obj;
    }

    function randBetween(lower, upper) {
        return Math.floor(Math.random()*(upper-lower+1)+lower);
    }

    function drawNode(node, ctx, fillStyle, strokeStyle) {
        ctx.beginPath();
        ctx.moveTo(node.x+NODE_RADIUS, node.y);
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.lineWidth = NODE_BORDER_WIDTH;
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI*2, true);
        ctx.moveTo(node.x+NODE_RADIUS, node.y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function drawEdges (node, graph, ctx, style) {
        ctx.beginPath();
        ctx.strokeStyle = style;
        ctx.fillStyle = style;
        ctx.lineWidth = EDGE_WIDTH;
        for (var j in node.adj) {
            var otherNode = graph[node.adj[j]];
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
        }
        ctx.stroke();
        ctx.closePath();
    }

    function positionNodes(nodelist, width, height) {
        if (nodelist.length === 1) {
            var node = nodelist[0];
            node.x = Math.floor(width/2) + Math.floor(Math.random() * JITTER * (width - width/2));
            node.y = Math.floor(height/2) + Math.floor(Math.random() * JITTER * (height - height/2));
            return [node];
        } else {
            var m = Math.floor(nodelist.length/2),
                one = nodelist.slice(0, m),
                two = nodelist.slice(m);
            if (width > height) {
                positionNodes(one, Math.floor(width/2), height);
                positionNodes(two, Math.floor(width/2), height);
                for (i in two) {
                    two[i].x += Math.floor(width/2);
                }
            } else {
                positionNodes(one, width, Math.floor(height/2));
                positionNodes(two, width, Math.floor(height/2));
                for (i in two) {
                    two[i].y += Math.floor(height/2);
                }
            }
        }
        return nodelist;
    }

    function draw (canvas, graph) {
        var ctx = canvas.getContext("2d");
        WIDTH = parseInt(canvas.getAttribute("width"), 10);
        HEIGHT = parseInt(canvas.getAttribute("height"), 10);

        // position nodes
        graph = arr2obj(positionNodes(obj2arr(graph), WIDTH, HEIGHT));

        // draw edges
        for (var i in graph) {
            var node = graph[i];
            drawEdges(node, graph, ctx, "#aaa");
        }
        // draw nodes
        for (var i in graph) {
            var node = graph[i];
            drawNode(node, ctx, "#ccc", "#666");
        }
    }

    return {
        draw: draw
    }
}();
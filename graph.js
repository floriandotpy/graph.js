var GRAPH = function(){
    var WIDTH, HEIGHT;
    var PADDING = 10;
    var NODE_RADIUS = 7;
    var EDGE_WIDTH = 3;
    var NODE_BORDER_WIDTH = 2;

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

    function draw (canvas, graph) {
          var ctx = canvas.getContext("2d");
          WIDTH = parseInt(canvas.getAttribute("width"), 10);
          HEIGHT = parseInt(canvas.getAttribute("height"), 10);

          // position nodes
          for (var i in graph) {
              var node = graph[i];
              node.x = randBetween(PADDING, WIDTH-PADDING);
              node.y = randBetween(PADDING, HEIGHT-PADDING);
          }

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
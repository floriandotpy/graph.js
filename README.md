graph.js
===

Just playing around with HTML5 canvas for the first time. You can use this for displaying
graphs in your browser. Graphs in the mathematical term of nodes and edges. Forget
charts if you had those in mind.

Usage
===

Define your graph as a plain JS object. For example 3 nodes with 3 edges will look as follows. The `adj` property is a list of nodes where an edge leads to (There is no distinction between directed and undirected edges for now).

```
var graphObj = {
    0: {adj: [1]},
    1: {adj: [2]},
    2: {adj: [0]}
};
```

Check out index.htm for an example.

Placement of the nodes is random and therefore not even remotely optimal.

![Example of rendered graph](https://raw.github.com/florianletsch/graph.js/master/example.png)
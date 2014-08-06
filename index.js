/* Generated by es6-transpiler 0.7.14-2 */ 
"use strict";

var Node = require('./node');

var LfpGraph = (function(){var DP$0 = Object.defineProperty;

  function LfpGraph(ctor) {var options = arguments[1];if(options === void 0)options = {};var id = arguments[2];if(id === void 0)id = null;
    if (!(this instanceof LfpGraph)) return new LfpGraph(ctor, options, id);
    
    this.nodes = {};
    this.typeCount = {};
    this.rootNode = null;

    var node = new Node(this, ctor(options));
    
    this.add(null, node, id);
  }DP$0(LfpGraph, "prototype", {"configurable": false, "enumerable": false, "writable": false});

  // adds a node to the structure
  LfpGraph.prototype.add = function(parent, node) {var id = arguments[2];if(id === void 0)id = null;
    id = id || node.lfp.type;
    this.typeCount[id] = this.typeCount[id] +1 || 0;
    id = (this.typeCount[id] === 0)? id : (("" + id) + ("-" + (this.typeCount[id])) + "");
    node.id = id; // to remove the node later

    if(parent){ // && this.nodes[parent.id]) {
      // debugging
      if(!this.nodes[parent.id]) console.error('Parent didnt register correctly');

      // fetch parent node
      var p = this.get(parent.id);

      // add node as nodes in the graph
      p.nodes.push(node.id);
      
      // removing logic, clean up when code is ready
      // node.parent = p.lfp; // bind the parnt for removing later
      // node.index = idx; // necessary?
    
    } else {
      this.rootNode = id;
    }

    this.nodes[node.id] = node;

    // console.log(this.nodes);
    return id;
  }

  // removes a node from the structure
  LfpGraph.prototype.remove = function(item) {var this$0 = this;

    // clear nodes nodes from the node
    // remove nodes from the graph

    // only if it has nodes
    if(item.nodes.length > 0) {
      
      // subnodes
      item.nodes.forEach(function(id ) {
        var node = this$0.get(id);
        this$0.remove(node); // remove subnodes
        delete this$0.nodes[id];
      });

      item.nodes = []; // reset nodes container
    }
  }

  // graph pipe, only adds nodes into the rootNode
  LfpGraph.prototype.pipe = function(ctor) {var options = arguments[1];if(options === void 0)options = {};var id = arguments[2];if(id === void 0)id = null;
    var lfp = ctor(options);
    var node = new Node(this, lfp);
   
    var parent = this.get(this.rootNode);
    parent.lfp.add(lfp);
    this.add(parent, node, id);

    return node;
  }

  LfpGraph.prototype.get = function(id) {
    return this.nodes[id];
  }


  LfpGraph.prototype.toString = function(){
    return this.nodes;
  }

;return LfpGraph;})();

module.exports = LfpGraph;
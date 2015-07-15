// A class used to describe a very basic tree
// this is intended as a superclass for other trees
var Tree = function() {
  this.root = null;
  this.count = 0;
  // this.height = 0;  //will implement this later perhaps

  return this;
};

// a method to add to the tree.
// if parent is given, it will become the child of that parent
// otherwise, it will become the child of root
// else it will become root
Tree.prototype.addNode = function(key, data, parent) {
  if (typeof key !== 'undefined') {
    data = data || null;
    if (typeof parent !== 'object') {
      parent = this.root || null;
    }

    // create the new node, with parent, if known
    var newNode = new TreeNode(key, data, parent);
    if (parent !== null) {
      // add this to children of parent, if known
      parent.children.push(newNode);
    } else {
      // this is the root node now
      this.root = newNode;
    }
    this.count++;
  }
  return this;
}

// keeping this one unchainable for now because I don't know how to preserve 'this'
Tree.prototype.display = function() {
  this.displayTree(this.root, 'd3');
}


// at the moment, this function is destructive and breaks root.
// working on figuring that out, but nothing
// for now, don't call it unless you're done manipulating the tree
Tree.prototype.displayTree = function(root, method) {

  console.log('displaying tree');
  method = method || 'd3';

  if (method === 'd3' && typeof d3 === 'object') {
    // this d3 code adapted from this article:
    // http://www.d3noob.org/2014/01/tree-diagrams-in-d3js_11.html

    // ************** Generate the tree diagram  *****************
    var margin = {top: 50, right: 80, bottom: 50, left: 80},
     width = 960 - margin.right - margin.left,
     height = 500 - margin.top - margin.bottom;

    var i = 0; // set up a cursor

    var tree = d3.layout.tree()
     .size([height, width]);

    var diagonal = d3.svg.diagonal()
     .projection(function(d) { return [d.x, d.y]; });

    var svg = d3.select("body").append("svg")
     .attr("width", width + margin.right + margin.left)
     .attr("height", height + margin.top + margin.bottom)
      .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    root = root || this.root;

    update(root);

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
       links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 100; });

      // Declare the nodesâ€¦
      var node = svg.selectAll("g.node")
       .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter the nodes.
      var nodeEnter = node.enter().append("g")
       .attr("class", "node")
       .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")"; });

      nodeEnter.append("circle")
       .attr("r", 10)
       .style("fill", "#fff");

      nodeEnter.append("text")
       .attr("y", function(d) {
        return d.children || d._children ? -18 : 18; })
       .attr("dy", ".35em")
       .attr("text-anchor", "middle")
       .text(function(d) { return d.key; })
       .style("fill-opacity", 1);

      // Declare the linksâ€¦
      var link = svg.selectAll("path.link")
       .data(links, function(d) { return d.target.id; });

      // Enter the links.
      link.enter().insert("path", "g")
       .attr("class", "link")
       .attr("d", diagonal);
    }
  }
};

// basic find method

// A class used to describe a basic tree node
// i've decided to include a parent pointer for now
var TreeNode = function(key, data, parent) {
  this.key = key;
  this.data = data || null;
  this.children = [];
  this.parent = parent || null;

  // this.level = 0  // will impelemnt later perhaps;

  return this;
};
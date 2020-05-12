var showData = function () {
  var left = document.getElementById("left").value;
  var right = document.getElementById("right").value;
  var html_to_insert =
    '<div class="g-labels"></div>    <svg class="g-nodes" width="1070" height="640"></svg>';

  document.getElementById("g-chart").innerHTML = html_to_insert;

  var width = 1070,
    height = 640;

  var collisionPadding = 4,
    clipPadding = 4,
    minRadius = 16, // minimum collision radius
    maxRadius = 65; // currently-displayed topic

  var formatShortCount = d3.format(",.0f");

  var max = 0;
  for (var i in data.words) {
    var sum = data[left][i] + data[right][i];

    if (max < sum) max = sum;
  }

  var r = d3.scale.sqrt().domain([0, max]).range([0, maxRadius]);

  var force = d3.layout
    .force()
    .charge(0)
    .size([width, height - 80])
    .on("tick", tick);

  var node = d3.select(".g-nodes").selectAll(".g-node"),
    label = d3.select(".g-labels").selectAll(".g-label"),
    arrow = d3.select(".g-nodes").selectAll(".g-note-arrow");

  d3.select(".g-nodes")
    .append("rect")
    .attr("class", "g-overlay")
    .attr("width", width)
    .attr("height", height)
    .on("click", clear);

  update();

  window.update = update;
  // Update the known topics.
  function update() {
    data.display = [];

    for (var w in data.words) {
      var leftCount = data[left][w];
      var rightCount = data[right][w];
      var totalCount = leftCount + rightCount;

      var d = {};
      d.id = w;
      d.count = totalCount;
      d.left = leftCount;
      d.right = rightCount;
      d.name = data.words[w];
      d.r = r(totalCount);
      d.cr = Math.max(minRadius, d.r);
      d.k = fraction(leftCount, rightCount);
      if (isNaN(d.k)) d.k = 0.5;
      if (isNaN(d.x)) d.x = (1 - d.k) * width + Math.random();
      d.bias = 0.5 - Math.max(0.1, Math.min(0.9, d.k));
      data.display.push(d);
    }

    force.nodes(data.display).start();
    updateNodes();
    updateLabels();
  }

  // Update the displayed nodes.
  function updateNodes() {
    node = node.data(data.display, function (d) {
      return d.name;
    });

    node.exit().remove();
    var nodeEnter = node
      .enter()
      .append("a")
      .attr("class", "g-node")
      .attr("xlink:href", function (d) {
        return "#" + encodeURIComponent(d.name);
      })
      .call(force.drag);

    var leftEnter = nodeEnter.append("g").attr("class", "g-left");

    leftEnter
      .append("clipPath")
      .attr("id", function (d) {
        return "g-clip-left-" + d.id;
      })
      .append("rect");

    leftEnter.append("circle");

    var rightEnter = nodeEnter.append("g").attr("class", "g-right");

    rightEnter
      .append("clipPath")
      .attr("id", function (d) {
        return "g-clip-right-" + d.id;
      })
      .append("rect");

    rightEnter.append("circle");

    nodeEnter.append("line").attr("class", "g-split");

    node
      .selectAll("rect")
      .attr("y", function (d) {
        return -d.r - clipPadding;
      })
      .attr("height", function (d) {
        return 2 * d.r + 2 * clipPadding;
      });

    node
      .select(".g-left rect")
      .style("display", function (d) {
        return d.k > 0 ? null : "none";
      })
      .attr("x", function (d) {
        return -d.r - clipPadding;
      })
      .attr("width", function (d) {
        return 2 * d.r * d.k + clipPadding;
      });

    node
      .select(".g-right rect")
      .style("display", function (d) {
        return d.k < 1 ? null : "none";
      })
      .attr("x", function (d) {
        return -d.r + 2 * d.r * d.k;
      })
      .attr("width", function (d) {
        return 2 * d.r;
      });

    node.select(".g-left circle").attr("clip-path", function (d) {
      return d.k < 1 ? "url(#g-clip-left-" + d.id + ")" : null;
    });

    node.select(".g-right circle").attr("clip-path", function (d) {
      return d.k > 0 ? "url(#g-clip-right-" + d.id + ")" : null;
    });

    node
      .select(".g-split")
      .attr("x1", function (d) {
        return -d.r + 2 * d.r * d.k;
      })
      .attr("y1", function (d) {
        return -Math.sqrt(d.r * d.r - Math.pow(-d.r + 2 * d.r * d.k, 2));
      })
      .attr("x2", function (d) {
        return -d.r + 2 * d.r * d.k;
      })
      .attr("y2", function (d) {
        return Math.sqrt(d.r * d.r - Math.pow(-d.r + 2 * d.r * d.k, 2));
      });

    node.selectAll("circle").attr("r", function (d) {
      return r(d.count);
    });
  }

  // Update the displayed node labels.
  function updateLabels() {
    label = label.data(data.display, function (d) {
      return d.name;
    });

    label.exit().remove();

    var labelEnter = label
      .enter()
      .append("a")
      .attr("class", "g-label")
      .attr("href", function (d) {
        return "#" + encodeURIComponent(d.name);
      })
      .call(force.drag);

    labelEnter
      .append("div")
      .attr("class", "g-name")
      .text(function (d) {
        return d.name;
      });

    labelEnter.append("div").attr("class", "g-value");

    label
      .style("font-size", function (d) {
        return Math.max(8, d.r / 2) + "px";
      })
      .style("width", function (d) {
        return d.r * 2.5 + "px";
      });

    // Create a temporary span to compute the true text width.
    label
      .append("span")
      .text(function (d) {
        return d.name;
      })
      .each(function (d) {
        d.dx = Math.max(d.r * 2.5, this.getBoundingClientRect().width);
      })
      .remove();

    label
      .style("width", function (d) {
        return d.dx + "px";
      })
      .select(".g-value")
      .text(function (d) {
        return formatShortCount(d.left) + " - " + formatShortCount(d.right);
      });

    // Compute the height of labels when wrapped.
    label.each(function (d) {
      d.dy = this.getBoundingClientRect().height;
    });
  }

  function tick(e) {
    node
      .each(bias(e.alpha * 105))
      .each(collide(0.1))
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    label
      .style("left", function (d) {
        return d.x - d.dx / 2 + "px";
      })
      .style("top", function (d) {
        return d.y - d.dy / 2 + "px";
      });

    arrow.style("stroke-opacity", function (d) {
      var dx = d.x - d.cx,
        dy = d.y - d.cy;
      return dx * dx + dy * dy < d.r * d.r ? 1 : 0;
    });
  }

  // A left-right bias causing topics to orient by party preference.
  function bias(alpha) {
    return function (d) {
      d.x += d.bias * alpha;
    };
  }

  // Resolve collisions between nodes.
  function collide(alpha) {
    var q = d3.geom.quadtree(data.display);
    return function (d) {
      var r = d.cr + maxRadius + collisionPadding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      q.visit(function (quad, x1, y1, x2, y2) {
        if (
          quad.point &&
          quad.point !== d &&
          d.other !== quad.point &&
          d !== quad.point.other
        ) {
          var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.cr + quad.point.r + collisionPadding;
          if (l < r) {
            l = ((l - r) / l) * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

  // Given two quantities a and b, returns the fraction to split the circle a + b.
  function fraction(a, b) {
    var k = a / (a + b);
    if (k > 0 && k < 1) {
      var t0,
        t1 = Math.pow(12 * k * Math.PI, 1 / 3);
      for (var i = 0; i < 10; ++i) {
        // Solve for theta numerically.
        t0 = t1;
        t1 =
          (Math.sin(t0) - t0 * Math.cos(t0) + 2 * k * Math.PI) /
          (1 - Math.cos(t0));
      }
      k = (1 - Math.cos(t1 / 2)) / 2;
    }
    return k;
  }

  // Clear the active topic when clicking on the chart background.
  function clear() {
    location.replace("#!");
  }
};

function initilizeDropdowns() {
  var paperNames = [];
  for (var key in data) {
    if (["words", "Total", "X", "Y"].indexOf(key) == -1) {
      paperNames.push(key);
    }
  }

  var dropdowns = [
    document.getElementById("left"),
    document.getElementById("right"),
  ];
  paperNames.forEach((paper, i) => {
    dropdowns.forEach((dropdown) => {
      var option = document.createElement("option");
      option.text = paper;
      option.value = paper;
      dropdown.appendChild(option);
    });
  });

  if (paperNames.length > 1) {
    dropdowns[1].selectedIndex = "1";
  }
}

initilizeDropdowns();

showData();

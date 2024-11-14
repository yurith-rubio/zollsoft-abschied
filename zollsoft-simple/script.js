//initilize svg or grab svg
const svg = d3.select("svg");
const svgWidth = svg.attr("width");
const svgHeight = svg.attr("height");

//intialize data
const mainDot = { name: "Main" };
const graph = {
  nodes: [
    {
      name: "Alice",
      content:
        "Wir sind unendlich traurig über euren Verlust. Er war nicht nur ein großartiger Kollege, sondern auch ein wunderbarer Freund, Ehemann und Vater. Unsere Gedanken sind bei dir und den Kindern in dieser schweren Zeit.",
    },
    {
      name: "Bob",
      content:
        "Bitte nimm unser herzliches Beileid an. Seine Freundlichkeit und sein Humor werden uns allen fehlen. Unser tiefes Mitgefühl gilt dir, seiner geliebten Frau, und den Kindern.",
    },
    {
      name: "Chen",
      content:
        "Es tut mir unendlich leid. Er war wirklich einzigartig, und seine Liebe für euch als Familie war immer zu spüren. Wir sind für dich und die Familie da, wenn ihr uns braucht.",
    },
    {
      name: "Dawg",
      content:
        "Es ist kaum zu glauben, dass er nicht mehr bei uns ist. Seine Hingabe für seine Arbeit und seine Familie war inspirierend. Ich wünsche euch Trost in der Liebe, die er euch gegeben hat, und in den gemeinsamen Erinnerungen.",
    },
    {
      name: "Ethan",
      content:
        "Wir sind untröstlich über seinen Verlust. Er war ein außergewöhnlicher Mensch, der viele Leben berührt hat. Seine Erinnerung wird in den Herzen seiner Kollegen, Freunde und vor allem seiner Familie weiterleben.",
    },
    {
      name: "George",
      content:
        "Mein herzlichstes Beileid. Er war ein wunderbarer Freund und stolzer Vater. Seine Liebe zu euch als Familie war immer spürbar. Ich wünsche euch Kraft und Frieden in dieser schweren Zeit.",
    },
    {
      name: "Frank",
      content:
        "Worte können unser Mitgefühl kaum ausdrücken. Er war eine Freude, mit ihm zu arbeiten, und ein hingebungsvoller Familienmensch. Wir werden ihn sehr vermissen und denken an dich und die Kinder.",
    },
    {
      name: "Hanes",
      content:
        "Bitte nimm unser aufrichtiges Mitgefühl an. Seine Herzlichkeit und Freundlichkeit haben uns allen gutgetan. Wir hoffen, dass du dich in dieser schweren Zeit von Liebe und Unterstützung umgeben fühlst.",
    },
    {
      name: "Ivan",
      content:
        "Wir sind tief bestürzt über seinen Verlust. Seine Familie bedeutete ihm alles, und er brachte Freude in unser aller Leben. Mögest du in der Liebe, die ihr geteilt habt, und in euren Erinnerungen Kraft finden.",
    },
  ],
  links: [
    { source: "Alice", target: "Bob" },
    { source: "Bob", target: "Chen" },
    { source: "Chen", target: "Dawg" },
    { source: "Dawg", target: "Ethan" },
    { source: "Ethan", target: "George" },
    { source: "George", target: "Frank" },
    { source: "Frank", target: "Hanes" },
    { source: "Hanes", target: "Alice" },
    { source: "Ivan", target: "Alice" },
    { source: "Ivan", target: "Bob" },
    { source: "Ivan", target: "Chen" },
    { source: "Ivan", target: "Dawg" },
    { source: "Ivan", target: "Ethan" },
    { source: "Ivan", target: "George" },
    { source: "Ivan", target: "Frank" },
    { source: "Ivan", target: "Hanes" },

  ],
};

const centralNodeWidth = 320;
const centralNodeHeight = 320;
const secondaryNodeWidth = 150;
const secondaryNodeHeight = 150;
const smallText = "10px";
const largeText = "20px";

// const simulation = d3
//   .forceSimulation(graph.nodes)
//   .force("x", d3.forceX().strength(0.1))
//   .force("y", d3.forceY().strength(0.1))
//   .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
//   .force(
//     "collide",
//     d3.forceCollide().radius(function (d) {
//       if (d.name === "Ivan") {
//         return 250;
//       }
//       return 100; // Adjust radius as needed
//     })
//   )
//   .on("tick", ticked);

const ivanNode = graph.nodes.find(node => node.name === "Ivan");

var simulation = d3
.forceSimulation(graph.nodes)
.force(
  "link",
  d3
    .forceLink()
    .id(function(d) {
      return d.name;
    })
    .links(graph.links)
)

.force("charge", d3.forceManyBody().strength(-8000))
.force("collide", d3.forceCollide().radius(function(d) {
  if (d.name === "Ivan") {
    return 100;
  }
  return 0;
}
))
.force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
.on("tick", ticked);

const link = svg
  .append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(graph.links)
  .enter()
  .append("line")
  .attr("stroke-width", function (d) {
    return 1;
  });

const node = svg
  .append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(graph.nodes)
  .enter()
  .append("circle")
  .attr("r", 10)

const text = svg
  .append("g")
  .attr("class", "content")
  .selectAll("foreignObject")
  .data(graph.nodes)
  .enter()
  .append("foreignObject")
  .attr("width", function (d) {
    if (d.name === "Ivan") {
      return centralNodeWidth;
    }
    return secondaryNodeWidth;
  })
  .attr("height", function (d) {
    if (d.name === "Ivan") {
      return centralNodeHeight;
    }
    return secondaryNodeHeight;
  })
  .attr("x", function (d) {
    if (d.name === "Ivan") {
      return d.x;
    }
    return d.x;
  })
  .attr("y", function (d) {
    return d.y;
  })
  .classed("main-text", function (d) {
    return d.name === "Ivan";
  })
  .style("max-width", "150px")
  .style("text-overflow", "ellipsis")
  .style("font-size", function (d) {
    if (d.name === "Ivan") {
      return largeText;
    }
    return smallText;
  })
  .style("color", "white")
  .style("background-color", function (d) {
    // if (d.name === "Ivan") {
    //   return "#192026";
    // }
    return "transparent";
  })
  .style("opacity", function (d) {
    if (d.name === "Ivan") {
      return 1;
    }
    return .2;
  })
  .style("position", "relative")
  .style("z-index", function (d) {
    if (d.name === "Ivan") {
      return 0;
    }
    return 1;
  })
  .style("border-radius", function (d) {
    if (d.name === "Ivan") {
      return "10px";
    }
    return "0px";
  })
  .each(function(d) {
    if (d.name === "Ivan") {
      d3.select(this).lower();
    }
  })
  .style("padding", function (d) {
    if (d.name === "Ivan") {
      return "20px";
    }
    return "5px";
  })
  .text(function (d) {
    return d.content;
  })
  // .on("mouseover", function (d) {
  //   d3.select(this)
  //   .transition()
  //   .duration(300)
  //   .style("font-size", largeText)
  //   .style("opacity", 1)
  //   .attr("width", function (d) {
  //     if (d.name === "Ivan") {
  //       return centralNodeWidth;
  //     }
  //     return secondaryNodeWidth + 100;
  //   })
  //   .attr("height", function (d) {
  //     if (d.name === "Ivan") {
  //       return centralNodeHeight;
  //     }
  //     return secondaryNodeHeight + 100;
  //   })

  //   d3.selectAll(".content > foreignObject")
  //     .filter(function(d) { return d.name === "Ivan"; })
  //     .transition()
  //     .duration(300)
  //     .style("opacity", .2)

  // })
  // .on("mouseout", function (d) {
  //   d3.select(this)
  //   .transition()
  //   .duration(300)
  //   .style("font-size", function (d) {
  //     if (d.name === "Ivan") {
  //       return largeText;
  //     }
  //     return smallText;
  //   })
  //   .style("opacity", function (d) {
  //     if (d.name === "Ivan") {
  //       return 1;
  //     }
  //     return .2;
  //   })
  //   .attr("width", function (d) {
  //     if (d.name === "Ivan") {
  //       return centralNodeWidth;
  //     }
  //     return secondaryNodeWidth;
  //   })
  //   .attr("height", function (d) {
  //     if (d.name === "Ivan") {
  //       return centralNodeHeight;
  //     }
  //     return secondaryNodeHeight;
  //   })
  //   d3.selectAll(".content > foreignObject")
  //     .filter(function(d) { return d.name === "Ivan"; })
  //     .transition()
  //     .duration(300)
  //     .style("opacity", 1)
  // })
    .call(
      d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
    );

  //add logo to the main-text 
  const mainNode = d3.select(".main-text")
    .html(`Wir sind tief bestürzt über seinen Verlust. Seine Familie bedeutete ihm alles, und er brachte Freude in unser aller Leben. Mögest du in der Liebe, die ihr geteilt habt, und in euren Erinnerungen Kraft finden.
      <br>
      <br>
      <img src="./zollsoft-team.png" alt="Logo" />`)

  
  // .html('Wir sind tief bestürzt über seinen Verlust. Seine Familie bedeutete ihm alles, und er brachte Freude in unser aller Leben. Mögest du in der Liebe, die ihr geteilt habt, und in euren Erinnerungen Kraft finden.<img src="./zollsoft-team.png" alt="Logo" />')

function ticked() {
  link
    .attr("x1", function (d) {
      if (d.source.name === "Ivan") {
        return d.source.x + centralNodeWidth / 2;
      }
      return d.source.x;
    })
    .attr("y1", function (d) {
      if (d.source.name === "Ivan") {
        return d.source.y + centralNodeHeight / 2;
      }
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });

  node
    .attr("cx", function (d) {
      if (d.name === "Ivan") {
        return d.x + centralNodeWidth / 2;
      }
      return d.x;
    })
    .attr("cy", function (d) {
      if (d.name === "Ivan") {
        return d.y + centralNodeHeight / 2;
      }
      return d.y;
    })

  text
    .attr("x", function (d) {
      if (d.name === "Ivan") {
        return d.x;
      }
      return d.x - secondaryNodeWidth / 2;
    })
    .attr("y", function (d) {
      if (d.name === "Ivan") {
        return d.y;
      }
      return d.y - secondaryNodeHeight / 2;
    });

  // Position Ivan always in the center
  const ivanNode = graph.nodes.find((node) => node.name === "Ivan");
  if (ivanNode) {
    ivanNode.x = svgWidth / 2 - centralNodeWidth / 2;
    ivanNode.y = svgHeight / 2 - centralNodeHeight / 2;
  }
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

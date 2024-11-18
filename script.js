//initilize svg or grab svg
const svg = d3.select("#responsiveSvg");
let svgWidth = svg.attr("width");
let svgHeight = svg.attr("height");

let isMobile = false;


function resizeSvg() {
  svgWidth = window.innerWidth;
  svgHeight = window.innerHeight;

  if (svgWidth < 450) {
    // svg.attr("width", svgWidth * 0.7);
    svg.attr("width", 400);
    svg.attr("height", svgHeight * 0.8);
    isMobile = true;
  } else {
    svg.attr("width", 1400);
    svg.attr("height", 1000);
    isMobile = false;
  }
}

// Call resizeSvg on window resize
window.addEventListener("resize", resizeSvg);

// Call resizeSvg on initial load
resizeSvg();



//intialize data
const mainDot = { name: "Main" };
const graph = {
  nodes: [
    {
      name: "Ferdi1",
      content:`Er wird mir als warmherziger Mensch in Erinnerung bleiben, der viel dazu beigetragen hat, dass ich mich hier auf meiner ersten richtigen Arbeit willkommen und wohl gefühlt habe - dafür bin ich Ihm für immer dankbar. 
      <br><br> - Ferdi1`,
    },
    {
      name: "Ferdi2",
      content:
        `Mein herzliches Beileid. Immer bodenständig, vernünftig und doch scherzend.
        <br><br> - Ferdi`,
    },
    {
      name: "Fabian1",
      content:
        `Ein toller Kerl!
        <br><br> - Fabian`,
    },
    {
      name: "Fabian2",
      content:
        `Über die vielen Projekte, die wir gemeinsam bestritten haben, hab ich ihn wirklich ins Herz geschlossen.
        <br><br> - Fabian`,
    },
    {
      name: "Fabian3",
      content:
        `Ich werde ihn immer als gelassenen, freundlichen und enorm intelligenten Menschen in Erinnerung behalten.
        <br><br> - Fabian`,
    },
    {
      name: "Fabian4",
      content:
        `He will be missed!
        <br><br> - Fabian`,
    },
    {
      name: "Yurith",
      content:
        `Mein herzlichstes Beileid an seine Familie und Freunde.
        <br><br> - Yurith`,
    },
    {
      name: "Webservices",
      content:"",
    },
  ],
  links: [
    { source: "Ferdi1", target: "Ferdi2" },
    { source: "Ferdi2", target: "Fabian1" },
    { source: "Fabian1", target: "Fabian2" },
    { source: "Fabian2", target: "Fabian3" },
    { source: "Fabian3", target: "Fabian4" },
    { source: "Fabian4", target: "Yurith" },
    { source: "Yurith", target: "Ferdi1" },
    { source: "Webservices", target: "Ferdi1" },
    { source: "Webservices", target: "Ferdi2" },
    { source: "Webservices", target: "Fabian1" },
    { source: "Webservices", target: "Fabian2" },
    { source: "Webservices", target: "Fabian3" },
    { source: "Webservices", target: "Fabian4" },
    { source: "Webservices", target: "Yurith" },
  ],
};

let centralNodeWidth = 380;
let centralNodeHeight = 320;
let secondaryNodeWidth = 150;
let secondaryNodeHeight = 150;
let smallText = "10px";
let largeText = "20px";

if (isMobile) {
  centralNodeWidth = 250;
  centralNodeHeight = 200;
  secondaryNodeWidth = 150;
  secondaryNodeHeight = 80;
  smallText = "8px";
  largeText = "14px";
}

const WebservicesNode = graph.nodes.find(node => node.name === "Webservices");


if (isMobile) {
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
    .force("charge", d3.forceManyBody().strength(-1000))
    // .force("collide", d3.forceCollide().radius(100))
    .force("radial", d3.forceRadial(800, svgWidth / 2, svgHeight / 2))
    .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
    .on("tick", ticked);
} else {
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
    .force("charge", d3.forceManyBody().strength(-2000))
    // .force("collide", d3.forceCollide().radius(100))
    .force("radial", d3.forceRadial(1200, svgWidth / 2, svgHeight / 2))
    .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
    .on("tick", ticked);
}
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
    if (d.name === "Webservices") {
      return centralNodeWidth;
    }
    return secondaryNodeWidth;
  })
  .attr("height", function (d) {
    if (d.name === "Webservices") {
      return centralNodeHeight;
    }
    return secondaryNodeHeight;
  })
  .attr("x", function (d) {
    if (d.name === "Webservices") {
      return d.x;
    }
    return d.x;
  })
  .attr("y", function (d) {
    return d.y;
  })
  .classed("main-text", function (d) {
    return d.name === "Webservices";
  })
  .style("max-width", "150px")
  .style("text-overflow", "ellipsis")
  .style("font-size", function (d) {
    if (d.name === "Webservices") {
      return largeText;
    }
    return smallText;
  })
  .style("color", "white")
  .style("background-color", function (d) {
    if (d.name === "Webservices") {
      return "#192026";
    }
    return "transparent";
  })
  .style("opacity", function (d) {
    if (d.name === "Webservices") {
      return 1;
    }
    return .4;
  })
  .style("position", "relative")
  .style("border-radius", function (d) {
    if (d.name === "Webservices") {
      return "10px";
    }
    return "0px";
  })
  .each(function(d) {
    if (d.name === "Webservices") {
      d3.select(this).lower();
    }
  })
  .style("padding", function (d) {
    if (d.name === "Webservices") {
      if (isMobile) {
        return "10px";
      }
      return "40px";
    }
    return "5px";
  })
  .html(function (d) {
    return d.content;
  })
  .on("mouseover", function (d) {
    d3.select(this)
    .transition()
    .duration(300)
    .style("font-size", largeText)
    .style("opacity", 1)
    .attr("width", function (d) {
      if (d.name === "Webservices") {
        return centralNodeWidth;
      }
      return secondaryNodeWidth + 100;
    })
    .attr("height", function (d) {
      if (d.name === "Webservices") {
        return centralNodeHeight;
      }
      return secondaryNodeHeight + 100;
    })

    d3.selectAll(".content > foreignObject")
      .filter(function(d) { return d.name === "Webservices"; })
      .transition()
      .duration(300)
      .style("opacity", .2)

  })
  .on("mouseout", function (d) {
    d3.select(this)
    .transition()
    .duration(300)
    .style("font-size", function (d) {
      if (d.name === "Webservices") {
        return largeText;
      }
      return smallText;
    })
    .style("opacity", function (d) {
      if (d.name === "Webservices") {
        return 1;
      }
      return .4;
    })
    .attr("width", function (d) {
      if (d.name === "Webservices") {
        return centralNodeWidth;
      }
      return secondaryNodeWidth;
    })
    .attr("height", function (d) {
      if (d.name === "Webservices") {
        return centralNodeHeight;
      }
      return secondaryNodeHeight;
    })
    d3.selectAll(".content > foreignObject")
      .filter(function(d) { return d.name === "Webservices"; })
      .transition()
      .duration(300)
      .style("opacity", 1)
  })
    .call(
      d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
    );

  //add logo to the main-text 
  const mainNode = d3.select(".main-text")
    .html(`Das Team Webservices hat einen wundervollen Kollegen und starken Mitstreiter verloren. 
        <br>
        <br>
        Wir sind bei euch in der Trauer um einen so liebevollen MensFabian1!
        <br>
        <br>
        <img src="./zollsoft-team.png" alt="Logo" />`)

function ticked() {
  link
    .attr("x1", function (d) {
      if (d.source.name === "Webservices") {
        return d.source.x + centralNodeWidth / 2;
      }
      return d.source.x;
    })
    .attr("y1", function (d) {
      if (d.source.name === "Webservices") {
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
      if (d.name === "Webservices") {
        return d.x + centralNodeWidth / 2;
      }
      return d.x;
    })
    .attr("cy", function (d) {
      if (d.name === "Webservices") {
        return d.y + centralNodeHeight / 2;
      }
      return d.y;
    })

  text
    .attr("x", function (d) {
      if (d.name === "Webservices") {
        return d.x;
      }
      return d.x - secondaryNodeWidth / 2;
    })
    .attr("y", function (d) {
      if (d.name === "Webservices") {
        return d.y;
      }
      return d.y - secondaryNodeHeight / 2;
    });

  // Position Webservices always in the center
  if (WebservicesNode) {
    WebservicesNode.x = svgWidth / 2 - centralNodeWidth / 2;
    WebservicesNode.y = svgHeight / 2 - centralNodeHeight / 2;
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

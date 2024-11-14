import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import data from '/Users/yurith.rubio/Yurith/meins/zollsoft-abschied/zollsoft-abschied/public/data.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'zollsoft-abschied';

  ngOnInit() {
     // use print_graph() method to output graph vertices
    //main_graph();

    var width = 700,
    height = 300;


    var color = d3.scale.category20();

    var force = d3.layout.force()
    .charge(-120)

    .linkDistance(150)
    .size([width, height]);

    var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(0,0)");

    d3.json("input.json", function(error, graph) {
    force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

    var link = svg.selectAll(".link")
      .data(graph.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) {
        return Math.sqrt(d.value);
      });

    var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      // size of nodes
      .attr("r", 20)
      .style("fill", function(d) {
        return color(d.group);
      })
      .call(force.drag);

    //I'm stuck here
    var texts = svg.selectAll("text.label")
      .data(graph.nodes)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("fill", "white")
      .text(function(d) {
        return d.name;
      });

    node.append("title")
      .text(function(d) {
        return d.name;
      });

    force.on("tick", function() {
      link.attr("x1", function(d) {
        return d.source.x;
      })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      node.attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
      texts.attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      });
    });
    });

  }
}

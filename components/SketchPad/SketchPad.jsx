import {
  Ellipse,
  Line,
  Pencil,
  Rectangle,
  TOOL_ELLIPSE,
  TOOL_LINE,
  TOOL_PENCIL,
  TOOL_RECTANGLE,
} from "./tools";
import React, { Component } from "react";

import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";

export const toolsMap = {
  [TOOL_PENCIL]: Pencil,
  [TOOL_LINE]: Line,
  [TOOL_RECTANGLE]: Rectangle,
  [TOOL_ELLIPSE]: Ellipse,
};

export default class SketchPad extends Component {
  tool = null;
  interval = null;

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    items: PropTypes.array.isRequired,
    animate: PropTypes.bool,
    canvasClassName: PropTypes.string,
    color: PropTypes.string,
    fillColor: PropTypes.string,
    size: PropTypes.number,
    tool: PropTypes.string,
    toolsMap: PropTypes.object,
    onItemStart: PropTypes.func, // function(stroke:Stroke) { ... }
    onEveryItemChange: PropTypes.func, // function(idStroke:string, x:number, y:number) { ... }
    onDebouncedItemChange: PropTypes.func, // function(idStroke, points:Point[]) { ... }
    onCompleteItem: PropTypes.func, // function(stroke:Stroke) { ... }
    debounceTime: PropTypes.number,
  };

  static defaultProps = {
    width: 500,
    height: 500,
    color: "#ffffff",
    size: 5,
    fillColor: "",
    canvasClassName: "canvas",
    debounceTime: 1000,
    animate: true,
    tool: TOOL_PENCIL,
    toolsMap,
  };

  constructor(props) {
    super(props);
    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDebouncedMove = this.onDebouncedMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.undo = this.undo.bind(this);
    this.drawing = false;
    this.pathsry = [];
    this.points = [];

    this.mouse = { x: 0, y: 0 };
    this.previous = { x: 0, y: 0 };
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext("2d");
    this.initTool(this.props.tool);
  }

  componentWillReceiveProps({ tool, items }) {
    items
      .filter((item) => this.props.items.indexOf(item) === -1)
      .forEach((item) => {
        this.initTool(item.tool);
        this.tool.draw(item, this.props.animate);
      });
    this.initTool(tool);
  }

  initTool(tool) {
    this.tool = this.props.toolsMap[tool](this.ctx);
  }

  oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),
    };
  }
  drawPaths() {
    // delete everything
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw all the paths in the paths array
    this.pathsry.forEach((path) => {
      this.ctx.beginPath();
      this.ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        this.ctx.lineTo(path[i].x, path[i].y);
      }
      this.ctx.stroke();
    });
  }

  undo() {
    // remove the last path from the paths array
    this.pathsry.splice(-1, 1);
    // draw all the paths in the paths array
    drawPaths();
  }

  onMouseDown(e) {
    this.drawing = true;
    this.previous = { x: this.mouse.x, y: this.mouse.y };
    this.mouse = this.oMousePos(this.canvas, e);
    this.points = [];
    this.points.push({ x: this.mouse.x, y: this.mouse.y });
    const data = this.tool.onMouseDown(
      ...this.getCursorPosition(e),
      this.props.color,
      this.props.size,
      this.props.fillColor
    );
    data &&
      data[0] &&
      this.props.onItemStart &&
      this.props.onItemStart.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      this.interval = setInterval(
        this.onDebouncedMove,
        this.props.debounceTime
      );
    }
  }

  onDebouncedMove() {
    if (
      typeof this.tool.onDebouncedMouseMove == "function" &&
      this.props.onDebouncedItemChange
    ) {
      this.props.onDebouncedItemChange.apply(
        null,
        this.tool.onDebouncedMouseMove()
      );
    }
  }

  onMouseMove(e) {
    if (this.drawing === true) {
      this.previous = { x: this.mouse.x, y: this.mouse.y };
      this.mouse = this.oMousePos(this.canvas, e);
      // saving the points in the points array
      this.points.push({ x: this.mouse.x, y: this.mouse.y });
    }
    const data = this.tool.onMouseMove(...this.getCursorPosition(e));
    data &&
      data[0] &&
      this.props.onEveryItemChange &&
      this.props.onEveryItemChange.apply(null, data);
  }

  onMouseUp(e) {
    this.drawing = false;
    // Adding the path to the array or the paths
    this.pathsry.push(this.points);
    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    // data &&
    //   data[0] &&
    //   this.props.onCompleteItem &&
    //   this.props.onCompleteItem.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  getCursorPosition(e) {
    const { top, left } = this.canvas.getBoundingClientRect();
    return [e.clientX - left, e.clientY - top];
  }

  render() {
    const { width, height, canvasClassName } = this.props;
    return (
      <canvas
        ref={(canvas) => {
          this.canvasRef = canvas;
        }}
        className={canvasClassName}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseUp}
        onMouseUp={this.onMouseUp}
        undo={this.undo}
        width={width}
        height={height}
      />
    );
  }
}

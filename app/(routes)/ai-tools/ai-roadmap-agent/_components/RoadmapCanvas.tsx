import React from "react";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TurboNode from "./TurboNode";

const nodeTypes = {
  turbo: TurboNode,
  input: TurboNode, // or your own InputNode component
  default: TurboNode, // or your own DefaultNode component
  output: TurboNode,
};

const RoadmapCanvas = ({ initialNodes, initialEdges }: any) => {
  //   const initialNodes = [
  //     { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  //     { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  //   ];
  //   const initialEdges = [{ id: "el-2", source: "1", target: "2" }];
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        {/* @ts-ignore */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default RoadmapCanvas;

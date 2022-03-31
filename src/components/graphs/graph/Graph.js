import React, {useCallback, useEffect, useState} from "react"
import SpriteText from 'three-spritetext';
import {getGraphStats, getResults} from "@lsflk/gig-client-shared/functions";
import {ApiRoutes} from "@lsflk/gig-client-shared/routes";
import {addNewEntitiesToGraph, createDataGraphFromStats, createLinkNodesFromEntityNode} from "./Functions";
import GraphPanel from "../panel/GraphPanel";
import "./Graph.css"
import {GraphStyle, GraphTheme, NodeStyle} from "./Constants";
import GraphStyleWrapper from "./GraphStyleWrapper"
import RingLoader from "react-spinners/RingLoader";

function Graph() {

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight - 70);

  const [searchKey, setSearchKey] = useState("");
  const [viewGraphPanel, setViewGraphPanel] = useState(true);
  const [stat, setStat] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [resultsPerNode, setResultsPerNode] = useState(0);
  const [nodeStyle, setNodeStyle] = useState(NodeStyle.name);
  const [backgroundTheme, setBackgroundTheme] = useState(GraphTheme.light);
  const [graphStyle, setGraphStyle] = useState(GraphStyle.threeDimensional);
  const app_props = {
    nodeStyle, setNodeStyle,
    resultsPerNode, setResultsPerNode,
    backgroundTheme, setBackgroundTheme,
    graphStyle, setGraphStyle,
    searchKey, setSearchKey,
    viewGraphPanel, setViewGraphPanel,
    graphData
  };

  function setGraphDimensions() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight - 70)
  }

  useEffect(() => {
    window.addEventListener("resize", setGraphDimensions);
  }, []);

  async function getStats() {
    const graphStatData = await getGraphStats();
    if (graphStatData) {
      setStat(graphStatData.payload);
    }
  }

  async function getSearchResults(searchParam) {
    if (searchParam.length > 1) {
      return getResults(searchParam, ApiRoutes.search);
    }
    return false
  }

  const loadInitialGraph = useCallback(async () => {
    let statGraph = createDataGraphFromStats(stat);
    setGraphData(statGraph);
    if (resultsPerNode > 0) {
      if (searchKey && searchKey !== "") {
        const result = await getSearchResults(searchKey);
        if (result) {
          statGraph = addNewEntitiesToGraph(statGraph, result);
          setGraphData(statGraph);
        }
      } else {
        const categories = stat?.category_wise_count;
        for (let i = 0; i < categories?.length; i++) {
          const result = await getSearchResults(categories[i]._id + ":");
          if (result) {
            statGraph = addNewEntitiesToGraph(statGraph, result);
            setGraphData(statGraph);
          }
        }
      }

    }
  }, [setGraphData, stat, resultsPerNode, searchKey]);

  useEffect(() => {
    if (stat) {
      loadInitialGraph().then(() => console.log("initial graph loaded!"))
    } else {
      getStats().then(() => console.log("graph stats loaded."))
    }
  }, [stat, loadInitialGraph]);

  async function handleNodeClick(node) {
    switch (node.type) {
      case "category":
        const result = await getSearchResults(node.id + ":");
        setGraphData(addNewEntitiesToGraph(graphData, result));
        break;
      case "entity":
        setGraphData(createLinkNodesFromEntityNode(graphData, node));
        break;
      default:
    }
  }

  return (
    <div id={"gig-info-graph-" + backgroundTheme.value} className="content">
      {graphData ?
        <GraphStyleWrapper
          width={width}
          height={height}
          graphStyle={graphStyle}
          graphData={graphData} nodeAutoColorBy="name"
          linkAutoColorBy="source"
          linkWidth={1}
          onNodeClick={handleNodeClick}
          backgroundColor={backgroundTheme.color}
          nodeCanvasObject={(node, ctx, globalScale) => {
            if (nodeStyle.value === NodeStyle.name.value) {
              const label = node.id;
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = node.color;
              ctx.fillText(label, node.x, node.y);
            }
            else {
              ctx.beginPath();
              ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.color;
              ctx.fill();
            }
          }}
          nodeThreeObject={node => {
            if (nodeStyle.value === NodeStyle.name.value) {
              const sprite = new SpriteText(node.id);
              sprite.color = node.color;
              sprite.textHeight = 8;
              return sprite;
            }
          }}
          onNodeDragEnd={node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          }}
        /> :
        <header className="App-header">
          <div style={{marginTop: '-250px', marginLeft: '-250px'}}>
            <RingLoader color='#36D7B7' loading={true} size={150}/>
          </div>
        </header>
      }
      <GraphPanel {...app_props}/>
    </div>

  )

}

export default Graph

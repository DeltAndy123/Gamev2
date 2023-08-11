import {gameState} from "../../window";
import {stopLoop, floorMultiple} from "../../lib/util";
import {CHUNK_SIZE} from "./main";
import {cam} from "../camera";
import {Scene} from "three";
import {loadChunk} from "./chunk";

var scene: Scene;
export function setRenderScene(s: Scene) {
  scene = s;
}

const counterOg: number = 50;
var counter: number = counterOg;

function deleteIfOutRadius(r: number) {
  r += 1;
  const x = 
  floorMultiple(cam.camera.position.x, CHUNK_SIZE) / 8;
  const y = 
  floorMultiple(cam.camera.position.z, CHUNK_SIZE) / 8;
  
  for(const i in cam.octrees?.map) {
    const coord = i.split(",");
    const cx = parseInt(coord[0]);
    const cy = parseInt(coord[1]);
    
    if(x < cx || x >= cx + r || y < cy || y >= cy + r) {
      // delete chunk
      for(const z in cam.octrees.map[i].blocks)
        scene.remove(cam.octrees.map[i].blocks[z]);
      
      delete cam.octrees.map[i];
    }
  }
}

function addInRadius(r: number) {
  const x = 
  floorMultiple(cam.camera.position.x, CHUNK_SIZE) / 8;
  const y = 
  floorMultiple(cam.camera.position.z, CHUNK_SIZE) / 8;
  
  /*
  trees["1,0"] = (loadChunk(1, 0));
  trees["-1,0"] = (loadChunk(-1, 0));
  trees["0,1"] = (loadChunk(0, 1));
  trees["1,1"] = (loadChunk(1, 1));
  trees["-1,1"] = (loadChunk(-1, 1));
  trees["0,-1"] = (loadChunk(0, -1));
  trees["1,-1"] = (loadChunk(1, -1));
  trees["-1,-1"] = (loadChunk(-1, -1));
  */
  
  for(let yy = y; yy < y+r; yy++) {
    for(let xx = x; xx < x+r; xx++) {
      if(cam.octrees == undefined) return;
      if(cam.octrees.get(xx, yy) == undefined) {
        //cam.octrees.set(xx, yy, loadChunk(xx, yy))
      }
    }
  }
}

export const chunkRenderLoop = stopLoop(() => {
  if(counter-- <= 0) {
    counter = counterOg;
    console.clear();
    const {renderDistance} = gameState;
    //deleteIfOutRadius(renderDistance);
    //addInRadius(renderDistance);
  }
}, false);
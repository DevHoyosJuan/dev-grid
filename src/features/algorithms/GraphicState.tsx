import { useId } from 'react'
import type { GraphNode, HuffmanNode, VisualState } from './algorithmDomain'

function TreeGraphic({ forest }: { forest: HuffmanNode[] }) {
  const nodes: {node:HuffmanNode;x:number;y:number}[] = [], links: {from:number;to:number;bit:string}[] = []
  const leaves = (node:HuffmanNode):number => node.left && node.right ? leaves(node.left)+leaves(node.right) : 1
  const total = forest.reduce((sum,node) => sum+leaves(node),0)
  const visit = (node:HuffmanNode,left:number,right:number,depth:number):number => {
    const index = nodes.length; nodes.push({node,x:(left+right)/2,y:40+depth*75})
    if (node.left && node.right) { const split = left+(right-left)*leaves(node.left)/leaves(node); links.push({from:index,to:visit(node.left,left,split,depth+1),bit:'0'});links.push({from:index,to:visit(node.right,split,right,depth+1),bit:'1'}) }
    return index
  }
  let cursor = 20
  forest.forEach(node => { const width = 540*leaves(node)/total; visit(node,cursor,cursor+width,0); cursor += width })
  const height = Math.max(...nodes.map(node => node.y))+55
  return <svg className="state-svg" viewBox={`0 0 580 ${height}`} role="img" aria-label="Árboles Huffman: cada nodo indica su peso; aristas izquierda 0 y derecha 1"><g className="tree-links">{links.map((link,index) => { const a=nodes[link.from],b=nodes[link.to];return <g key={index}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y}/><text x={(a.x+b.x)/2+7} y={(a.y+b.y)/2}>{link.bit}</text></g> })}</g>{nodes.map(({node,x,y},index) => <g key={index}><circle className="tree-node" cx={x} cy={y} r={22}/><text x={x} y={y+4} textAnchor="middle">{node.left ? `Σ${node.weight}` : `${node.label}:${node.weight}`}</text></g>)}</svg>
}

function GraphGraphic({ nodes, state }: { nodes: GraphNode[]; state: VisualState }) {
  const marker = useId().replace(/:/g,'')
  return <svg className="state-svg" viewBox="0 0 580 285" role="img" aria-label={`Grafo dirigido. ${nodes.map(node => `${node.label}: ${node.detail ?? ''}${node.active ? ', actual' : ''}`).join('; ')}`}>
    <defs><marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="currentColor"/></marker></defs>
    <g className="graph-links">{state.edges?.map((edge,index) => { const a=nodes.find(node=>node.id===edge.from)!,b=nodes.find(node=>node.id===edge.to)!;const distance=Math.hypot(b.x-a.x,b.y-a.y),dx=(b.x-a.x)/distance*26,dy=(b.y-a.y)/distance*26;return <g key={index}><line x1={a.x+dx} y1={a.y+dy} x2={b.x-dx} y2={b.y-dy} markerEnd={`url(#${marker})`}/>{edge.weight !== undefined && <text x={(a.x+b.x)/2+9} y={(a.y+b.y)/2-9}>{edge.weight}</text>}</g> })}</g>
    {nodes.map(node=><g key={node.id}><circle className={node.active?'graph-node graph-node--active':node.visited?'graph-node graph-node--visited':'graph-node'} cx={node.x} cy={node.y} r={24}/><text x={node.x} y={node.y+4} textAnchor="middle">{node.label}</text><text className="node-detail" x={node.x} y={node.y+42} textAnchor="middle">{node.detail}{node.active ? ' · actual' : ''}</text></g>)}
  </svg>
}

/** Renders a full algorithm snapshot with a representation appropriate to its domain. */
export function GraphicState({ state }: { state: VisualState }) {
  return <div className="graphical-state" tabIndex={0} role="region" aria-label="Representación gráfica del paso">
    {state.kind === 'array' && <div className="array-state" aria-label={`Arreglo: ${state.values?.join(', ')}`}>
      {state.values?.map((value,index)=><div key={index} className={state.active?.includes(index)?'array-column array-column--active':'array-column'}><div className="array-bar" style={{height:`${Math.max(10,Math.abs(value)/Math.max(...state.values!,1)*150)}px`}}><strong>{value}</strong></div><span>{index}{state.active?.includes(index) ? ' · actual' : ''}</span></div>)}
    </div>}
    {state.kind === 'graph' && <GraphGraphic nodes={state.nodes ?? []} state={state}/>}
    {state.kind === 'grid' && <div className="astar-grid">{state.nodes?.map(node=><div key={node.id} className={`grid-cell ${state.blocked?.includes(node.id)?'grid-cell--blocked':node.active?'grid-cell--active':node.visited?'grid-cell--visited':''}`}><strong>{state.blocked?.includes(node.id)?'Muro':node.label}</strong><small>{node.detail}</small>{node.active && <small>Actual / camino</small>}</div>)}</div>}
    {state.kind === 'hanoi' && <div className="hanoi-scene" role="img" aria-label={`Torres de Hanoi. ${state.pegs?.map((peg,index)=>`${'ABC'[index]}: ${peg.join(', ') || 'vacía'}`).join('; ')}`}>
      {state.pegs?.map((peg,index)=><div className="hanoi-tower" key={index}><span className="hanoi-post"/><span className="hanoi-platform"/><strong className="hanoi-tower-label">{'ABC'[index]}</strong>{peg.map((disk,position)=><span key={disk} className={`hanoi-piece hanoi-piece--${disk}`} style={{width:`${30+disk*12}%`,bottom:position*26+7}}>{disk}</span>)}</div>)}
    </div>}
    {state.kind === 'points' && <svg className="state-svg" viewBox="0 0 580 360" role="img" aria-label={`Agrupamiento K-means con ${state.points?.length} puntos y dos centroides`}><path className="point-axis" d="M30 15V330H565"/>{state.points?.map((point,index)=><g key={index}><circle className={`cluster-${point.cluster}`} cx={30+point.x*60} cy={330-point.y*36} r={9}/><text x={42+point.x*60} y={333-point.y*36}>P{index+1} · G{point.cluster+1}</text></g>)}{state.centers?.map((center,index)=><g key={index}><path className={`centroid cluster-${index}`} d={`M${30+center.x*60-12} ${330-center.y*36}h24M${30+center.x*60} ${330-center.y*36-12}v24`}/><text x={30+center.x*60} y={310-center.y*36}>C{index+1}</text></g>)}</svg>}
    {state.kind === 'tokens' && <div className="token-state">{state.tokens?.map((token,index)=><div key={index} className={state.active?.includes(index)?'token token--active':'token'}><strong>{token}</strong><small>{index}{state.active?.includes(index)?' · actual':''}</small></div>)}</div>}
    {state.kind === 'tree' && <TreeGraphic forest={state.forest ?? []}/>}
    {state.rows && <dl className={state.kind==='numbers'?'number-state':'state-rows'}>{state.rows.map(([label,value],index)=><div key={index}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
    {state.kind === 'points' && <dl className="state-rows">{state.centers?.map((center,index)=><div key={index}><dt>Centro {index+1}</dt><dd>({center.x.toFixed(2)}, {center.y.toFixed(2)})</dd></div>)}</dl>}
  </div>
}

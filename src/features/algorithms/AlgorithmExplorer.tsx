import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { algorithmEntries } from '../../content/education'
import { algorithmLessons, generateTrace } from './algorithmDomain'
import { GraphicState } from './GraphicState'
import { FlowDiagram } from './FlowDiagram'
import { MarkdownContent } from '../../shared/MarkdownContent'

/** Coordinates canonical algorithm descriptions, reversible traces, pseudocode and complete flow diagrams. */
export function AlgorithmExplorer() {
  const [selectedId,setSelectedId]=useState('DATA-061')
  const [variant,setVariant]=useState(0)
  const [diskCount,setDiskCount]=useState(3)
  const [stepIndex,setStepIndex]=useState(0)
  const lesson=algorithmLessons.find(item=>item.id===selectedId)!
  const entry=algorithmEntries.find(item=>item.id===selectedId)!
  const trace=useMemo(()=>generateTrace(selectedId,variant,selectedId==='DATA-079'?diskCount:undefined),[selectedId,variant,diskCount])
  const current=trace[stepIndex]
  const choose=(id:string)=>{setSelectedId(id);setVariant(0);setDiskCount(3);setStepIndex(0)}
  return <div className="catalog-page page-in">
    <div className="page-intro"><div className="eyebrow"><span className="eyebrow-line"/> ALGORITMOS INTERACTIVOS</div><h1>Seguí el razonamiento.</h1><p>{algorithmEntries.length} algoritmos: ejemplos gráficos, pseudocódigo y diagramas de flujo. Avanzá, retrocedé y compará distintas entradas.</p></div>
    <div className="algorithm-workspace grid gap-5 mt-6 lg:grid-cols-[230px_minmax(0,1fr)]">
      <div className="mobile-algorithm-select"><label htmlFor="algorithm-select">Algoritmo</label><select id="algorithm-select" value={selectedId} onChange={event=>choose(event.target.value)}>{algorithmEntries.map(item=><option key={item.id} value={item.id}>{item.title}</option>)}</select></div>
      <nav className="algorithm-catalog" aria-label="Catálogo completo de algoritmos"><h2>Algoritmos</h2>{algorithmEntries.map(item=><button key={item.id} aria-pressed={item.id===selectedId} className={item.id===selectedId?'algorithm-choice algorithm-choice--active':'algorithm-choice'} onClick={()=>choose(item.id)}><span>{item.title}</span><small>{item.id}</small></button>)}</nav>
      <div className="algorithm-content min-w-0">
        <section className="visualizer" aria-label={`Ejemplo interactivo de ${entry.title}`}><div className="visualizer-head"><div><span className="detail-id">RECORRIDO INTERACTIVO · {entry.id}</span><h2>{entry.title}</h2></div><button className="icon-button" aria-label="Reiniciar recorrido" onClick={()=>setStepIndex(0)}><RotateCcw size={16}/></button></div><p className="visualizer-description">{entry.summary}</p>
          <div className="example-controls"><label>Entrada de ejemplo<select value={variant} onChange={event=>{const next=Number(event.target.value);setVariant(next);setDiskCount(next===0?3:4);setStepIndex(0)}}>{lesson.examples.map((example,index)=><option key={index} value={index}>{example}</option>)}</select></label>{selectedId==='DATA-079' && <label>Discos<select value={diskCount} onChange={event=>{setDiskCount(Number(event.target.value));setStepIndex(0)}}>{[2,3,4,5].map(value=><option key={value} value={value}>{value} discos · {2**value-1} movimientos</option>)}</select></label>}</div>
          <GraphicState state={current.visual}/><div className="step-description" aria-live="polite"><span className="step-number">{stepIndex+1}<i>/</i>{trace.length}</span><p>{current.message}</p></div><div className="trace-controls"><button className="button button--quiet" disabled={stepIndex===0} onClick={()=>setStepIndex(index=>index-1)}><ArrowLeft size={15}/> Anterior</button><span className="trace-progress">{stepIndex===trace.length-1?'Recorrido completo':`Paso ${stepIndex+1} de ${trace.length}`}</span><button className="button button--primary" disabled={stepIndex===trace.length-1} onClick={()=>setStepIndex(index=>index+1)}>Siguiente <ArrowRight size={15}/></button></div>
        </section>
        <div className="algorithm-explanations grid gap-4 mt-[22px] xl:grid-cols-2"><section className="pseudocode-panel"><h2>Pseudocódigo</h2><p>Procedimiento del ejemplo. Las entradas y decisiones son explícitas.</p><pre tabIndex={0} aria-label={`Pseudocódigo de ${entry.title}`}><code>{lesson.pseudocode}</code></pre></section><section className="flow-panel"><h2>Diagrama de flujo</h2><FlowDiagram backtracking={selectedId==='DATA-080'} plan={lesson.flow} recursive={['DATA-065','DATA-066','DATA-079','DATA-080'].includes(selectedId)} title={entry.title}/></section></div>
        <details className="canonical-example"><summary>Concepto y ejemplos del corpus</summary><MarkdownContent source={entry.body}/></details>
      </div>
    </div>
  </div>
}

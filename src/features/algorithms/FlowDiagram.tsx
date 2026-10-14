import { useEffect, useId, useRef } from 'react'
import type { RefObject } from 'react'
import type { FlowPlan } from './algorithmDomain'

function Label({ text, x, y, width = 34 }: { text: string; x: number; y: number; width?: number }) {
  const words = text.split(' '), lines: string[] = []; let line = ''
  words.forEach(word => { if ((line + ' ' + word).length > width && line) { lines.push(line); line = word } else line = line ? line + ' ' + word : word })
  if (line) lines.push(line)
  return <text x={x} y={y-(lines.length-1)*8} textAnchor="middle">{lines.map((part,index) => <tspan key={index} x={x} dy={index === 0 ? 0 : 16}>{part}</tspan>)}</text>
}


function BacktrackingDiagram({ marker, title, viewportRef }: { marker: string; title: string; viewportRef: RefObject<HTMLDivElement | null> }) {
  return <figure className="flow-figure"><div className="diagram-scroll" ref={viewportRef} role="region" tabIndex={0} aria-label={`Diagrama de flujo de ${title}`}><svg className="flow-svg" viewBox="0 0 620 960" role="img" aria-label={`Flujo de ${title}. Primero comprobar objetivo; después validar rama; elegir, explorar, deshacer y explorar alternativa.`}>
    <defs><marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="currentColor"/></marker></defs>
    <g className="flow-links" markerEnd={`url(#${marker})`}><path d="M300 60V95"/><path d="M300 155V180"/><path d="M300 280V355"/><path d="M440 230H535V285"/><path d="M535 365H590V824H465"/><path d="M440 405H560V824H465"/><path d="M300 455V505"/><path d="M300 580V625"/><path d="M300 700V795"/><path d="M300 850V895"/></g>
    <g className="flow-shapes"><rect x="200" y="20" width="200" height="40" rx="20"/><rect x="125" y="95" width="350" height="60" rx="6"/><path d="M300 180L440 230L300 280L160 230Z"/><rect x="470" y="285" width="130" height="80" rx="6"/><path d="M300 355L440 405L300 455L160 405Z"/><rect x="125" y="505" width="350" height="75" rx="6"/><rect x="125" y="625" width="350" height="75" rx="6"/><rect x="135" y="795" width="330" height="55" rx="6"/><rect x="200" y="895" width="200" height="40" rx="20"/></g>
    <g className="flow-labels"><Label text="Inicio" x={300} y={45}/><Label text="Candidatos positivos; índice, elegidos y suma" x={300} y={127}/><Label text="¿Suma = objetivo?" x={300} y={235} width={22}/><Label text="Registrar solución" x={535} y={327} width={13}/><Label text="¿Índice < n y suma < objetivo?" x={300} y={410} width={22}/><Label text="Elegir candidato; BUSCAR con índice+1 y suma+candidato" x={300} y={546}/><Label text="Deshacer elección; BUSCAR sin el candidato (índice+1)" x={300} y={666}/><Label text="Retornar al llamador" x={300} y={827}/><Label text="Fin / retornar" x={300} y={921}/><text x="474" y="216">Sí</text><text x="315" y="320">No</text><text x="315" y="487">Sí</text><text x="490" y="393">No: podar</text></g>
  </svg></div><figcaption>En pantallas pequeñas podés desplazar el diagrama horizontalmente. Al alcanzar el objetivo se registra la solución. Una rama sin candidatos o con suma excedida se descarta. Las llamadas recursivas exploran primero con el candidato y después sin él, restaurando la elección entre ambas.</figcaption></figure>
}

/** Draws the procedure's decision, labeled exit branch and loop or recursive subprocess calls. */
export function FlowDiagram({ plan, recursive, title, backtracking = false }: { plan: FlowPlan; recursive: boolean; title: string; backtracking?: boolean }) {
  const marker = useId().replace(/:/g,'')
  const viewportRef = useRef<HTMLDivElement>(null)
  // Start narrow views at the main path; side branches remain available through internal scrolling.
  useEffect(() => {
    const viewport = viewportRef.current
    if (viewport) viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2)
  }, [title, backtracking])
  if (backtracking) return <BacktrackingDiagram marker={marker} title={title} viewportRef={viewportRef}/>
  return <figure className="flow-figure"><div className="diagram-scroll" ref={viewportRef} role="region" tabIndex={0} aria-label={`Diagrama de flujo de ${title}`}>
    <svg role="img" aria-label={`Flujo de ${title}. Decisión: ${plan.condition}`} viewBox="0 0 620 735" className="flow-svg">
      <defs><marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="currentColor" /></marker></defs>
      <g className="flow-links" markerEnd={`url(#${marker})`}><path d="M310 60V95"/><path d="M310 155V180"/><path d="M310 280V330"/><path d="M310 395V435"/><path d="M450 230H560V592H480"/>{recursive ? <path d="M310 495V565"/> : <path d="M130 465H55V230H170"/>}<path d="M310 620V660"/></g>
      <g className="flow-shapes"><rect x="210" y="20" width="200" height="40" rx="20"/><rect x="120" y="95" width="380" height="60" rx="6"/><path className="flow-decision" d="M310 180L450 230L310 280L170 230Z"/><rect x="130" y="330" width="350" height="65" rx="6"/><rect x="130" y="435" width="350" height="60" rx="6"/><rect x="130" y="565" width="350" height="55" rx="6"/><rect x="210" y="660" width="200" height="40" rx="20"/></g>
      <g className="flow-labels"><Label text="Inicio" x={310} y={45}/><Label text={plan.setup} x={310} y={127}/><Label text={plan.condition} x={310} y={231} width={24}/><Label text={plan.action} x={305} y={367}/><Label text={plan.repeat} x={305} y={468}/><Label text={plan.output} x={305} y={595}/><Label text="Fin / retornar" x={310} y={685}/><text x="324" y="312">{plan.yes ?? 'Sí'}</text><text x="500" y="218">{plan.no ?? 'No'}</text>{!recursive && <text x="65" y="417">Repetir</text>}</g>
    </svg>
    </div><figcaption>En pantallas pequeñas podés desplazar el diagrama horizontalmente. {plan.condition} Si se cumple: {plan.action}; {plan.repeat}. Si no: {plan.output}. {recursive ? 'Los bloques de recursión representan llamadas al mismo procedimiento sobre subproblemas.' : 'La flecha de retorno vuelve a comprobar la condición.'}</figcaption></figure>
}

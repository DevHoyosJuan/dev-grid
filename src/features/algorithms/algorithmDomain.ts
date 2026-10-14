export type GraphNode = { id: number; label: string; x: number; y: number; detail?: string; active?: boolean; visited?: boolean }
export type GraphEdge = { from: number; to: number; weight?: number }
export type HuffmanNode = { label: string; weight: number; left?: HuffmanNode; right?: HuffmanNode }
export type VisualState = {
  kind: 'array' | 'graph' | 'grid' | 'hanoi' | 'points' | 'tokens' | 'tree' | 'numbers'
  values?: number[]; active?: number[]; nodes?: GraphNode[]; edges?: GraphEdge[]
  pegs?: number[][]; points?: { x: number; y: number; cluster: number }[]
  centers?: { x: number; y: number }[]; tokens?: string[]; forest?: HuffmanNode[]
  rows?: [string, string][]; blocked?: number[]
}
export type AlgorithmStep = { message: string; visual: VisualState }
export type FlowPlan = { setup: string; condition: string; action: string; repeat: string; output: string; yes?: string; no?: string }
export type AlgorithmLesson = { id: string; pseudocode: string; flow: FlowPlan; examples: [string, string] }

const lesson = (id: number, pseudocode: string, setup: string, condition: string, action: string, repeat: string, output: string, examples: [string, string], yes = 'Sí', no = 'No'): AlgorithmLesson => ({ id: `DATA-${id.toString().padStart(3, '0')}`, pseudocode, flow: { setup, condition, action, repeat, output, yes, no }, examples })

/** Algorithm-specific procedures and flow plans supplement, rather than replace, the canonical explanations. */
export const algorithmLessons: AlgorithmLesson[] = [
  lesson(61, 'REPETIR\n  cambiado ← falso\n  PARA i ← 0 HASTA n−2\n    SI A[i] > A[i+1]\n      intercambiar(A[i], A[i+1])\n      cambiado ← verdadero\nHASTA cambiado = falso\nRETORNAR A', 'Leer A; cambiado ← verdadero', '¿Hubo intercambios en la pasada?', 'Reiniciar bandera; comparar e intercambiar vecinos', 'Iniciar otra pasada', 'Arreglo ordenado', ['7, 3, 9, 2, 6, 1, 5', '4, 2, 4, 1, 8']),
  lesson(62, 'PARA i ← 0 HASTA n−2\n  mínimo ← i\n  PARA j ← i+1 HASTA n−1\n    SI A[j] < A[mínimo]: mínimo ← j\n  intercambiar(A[i], A[mínimo])\nRETORNAR A', 'Leer A; i ← 0', '¿i < n−1?', 'Buscar mínimo del sufijo y colocarlo en i', 'i ← i+1', 'Arreglo ordenado', ['7, 3, 9, 2, 6, 1, 5', '4, 2, 4, 1, 8']),
  lesson(63, 'PARA i ← 1 HASTA n−1\n  clave ← A[i]; j ← i−1\n  MIENTRAS j ≥ 0 Y A[j] > clave\n    A[j+1] ← A[j]; j ← j−1\n  A[j+1] ← clave\nRETORNAR A', 'Leer A; i ← 1', '¿Quedan claves por insertar?', 'Desplazar mayores e insertar clave en el prefijo', 'Avanzar al siguiente elemento', 'Arreglo ordenado', ['7, 3, 9, 2, 6, 1, 5', '4, 2, 4, 1, 8']),
  lesson(64, 'CONSTRUIR_MAX_HEAP(A)\nPARA fin ← n−1 HASTA 1\n  intercambiar(A[0], A[fin])\n  REPARAR_HEAP(A, raíz=0, tamaño=fin)\nRETORNAR A\n\nREPARAR_HEAP: intercambiar raíz con su mayor hijo\ny repetir hasta cumplir la propiedad del heap', 'Construir max-heap', '¿Tamaño del heap > 1?', 'Extraer máximo al final y reparar heap', 'Reducir tamaño del heap', 'Arreglo ordenado', ['7, 3, 9, 2, 6, 1, 5', '4, 2, 4, 1, 8']),
  lesson(65, 'MERGE_SORT(A)\n  SI longitud(A) ≤ 1: RETORNAR A\n  izquierda ← MERGE_SORT(primera mitad)\n  derecha ← MERGE_SORT(segunda mitad)\n  MEZCLAR el menor frente de ambas mitades\n  En empate tomar de izquierda (estabilidad)\n  RETORNAR mezcla', 'Leer segmento A', '¿Longitud del segmento > 1?', 'Dividir y ordenar cada mitad recursivamente', 'Mezclar las dos mitades ordenadas', 'Retornar segmento ordenado', ['7, 3, 9, 2, 6, 1, 5', '4, 2, 4, 1, 8']),
  lesson(66, 'QUICKSORT(A, inicio, fin)\n  SI inicio ≥ fin: RETORNAR\n  pivote ← A[fin]; límite ← inicio\n  PARA j ← inicio HASTA fin−1\n    SI A[j] ≤ pivote\n      intercambiar(A[j], A[límite]); límite++\n  intercambiar(A[límite], A[fin])\n  QUICKSORT(A, inicio, límite−1)\n  QUICKSORT(A, límite+1, fin)', 'Leer segmento e índices inicio,fin', '¿Inicio < fin?', 'Elegir pivote, particionar y fijar su posición', 'Ordenar las dos particiones recursivamente', 'Retornar segmento ordenado', ['7, 3, 9, 2, 6, 1, 5', '4, 2, 4, 1, 8']),
  lesson(67, 'PARA i ← 0 HASTA n−1\n  SI A[i] = objetivo: RETORNAR i\nRETORNAR −1', 'i ← 0; leer objetivo', '¿Quedan elementos y no hay coincidencia?', 'Comparar A[i] con objetivo', 'Si difiere, i ← i+1', 'Índice encontrado o −1', ['Buscar 6 en [7,3,9,2,6,1,5]', 'Buscar 10 en [4,2,4,1,8]']),
  lesson(68, 'bajo ← 0; alto ← n−1\nMIENTRAS bajo ≤ alto\n  medio ← bajo + piso((alto−bajo)/2)\n  SI A[medio] = objetivo: RETORNAR medio\n  SI A[medio] < objetivo: bajo ← medio+1\n  SINO: alto ← medio−1\nRETORNAR −1', 'Leer arreglo ordenado y objetivo', '¿Intervalo no vacío y no encontrado?', 'Comparar punto medio con objetivo', 'Conservar solo la mitad candidata', 'Índice encontrado o −1', ['Buscar 23 en [3,8,12,17,23,31,42]', 'Buscar 10 en [1,2,4,4,8]']),
  lesson(69, 'cola ← [origen]; visitados ← {origen}\nMIENTRAS cola no vacía\n  u ← desencolar()\n  PARA vecino v de u\n    SI v no visitado\n      marcar v; distancia[v] ← distancia[u]+1\n      encolar(v)', 'Cola con origen; marcar origen', '¿Cola no vacía?', 'Retirar frente y encolar vecinos nuevos', 'Continuar con el siguiente frente', 'Orden BFS y distancias en aristas', ['Grafo A→B,C; B→D; C→D,E', 'Mismo grafo desde C']),
  lesson(70, 'DFS(u)\n  marcar u como visitado\n  PARA vecino v de u\n    SI v no visitado: DFS(v)\nDFS(origen)', 'Pila con origen; visitados vacíos', '¿Pila no vacía?', 'Extraer; visitar y apilar vecinos no visitados', 'Continuar por el último vecino apilado', 'Orden de exploración DFS', ['Grafo desde A', 'Grafo desde C']),
  lesson(71, 'distancia[origen] ← 0; otras ← infinito\npendientes ← todos los vértices\nMIENTRAS pendientes no vacío\n  u ← pendiente con menor distancia\n  SI distancia[u] = infinito: TERMINAR\n  retirar u\n  PARA arista (u,v,peso ≥ 0)\n    distancia[v] ← min(distancia[v], distancia[u]+peso)\nRETORNAR distancias', 'Distancia origen 0; resto ∞', '¿Hay vértice alcanzable pendiente?', 'Fijar menor distancia y relajar sus aristas', 'Seleccionar el siguiente mínimo', 'Distancias mínimas', ['Pesos positivos desde A', 'Pesos positivos desde C']),
  lesson(72, 'distancia[origen] ← 0; otras ← infinito\nREPETIR V−1 veces\n  PARA cada arista (u,v,peso)\n    SI distancia[u]+peso < distancia[v]\n      distancia[v] ← distancia[u]+peso\nSI alguna arista aún mejora una distancia\n  INFORMAR ciclo negativo alcanzable\nSINO RETORNAR distancias', 'Distancias; ronda ← 0', '¿Quedan rondas con mejoras?', 'Relajar todas las aristas', 'Incrementar ronda (máximo V−1)', 'Comprobar ciclo negativo; devolver distancias', ['Pesos positivos', 'Una arista negativa; sin ciclo negativo']),
  lesson(73, 'abiertos ← {inicio}; g[inicio] ← 0\nMIENTRAS abiertos no vacío\n  u ← menor g[u]+Manhattan(u,destino)\n  SI u = destino: reconstruir camino\n  retirar u\n  PARA vecino libre v\n    SI g[u]+1 < g[v]\n      g[v] ← g[u]+1; padre[v] ← u\n      añadir v a abiertos\nINFORMAR sin camino', 'Grilla; g(inicio)=0; heurística Manhattan', '¿Abiertos no vacío y destino pendiente?', 'Expandir menor f=g+h; actualizar vecinos libres', 'Actualizar frontera', 'Reconstruir camino o informar ausencia', ['Grilla 4×4 con obstáculos', 'Grilla alternativa 4×4']),
  lesson(74, 'MIENTRAS b ≠ 0\n  resto ← a MOD b\n  a ← b\n  b ← resto\nRETORNAR a', 'Leer enteros no negativos a,b', '¿b ≠ 0?', 'Calcular resto de a ÷ b', '(a,b) ← (b,resto)', 'MCD = a', ['MCD(48,18)', 'MCD(1071,462)']),
  lesson(75, 'SI n < 2: RETORNAR falso\nd ← 2\nMIENTRAS d×d ≤ n\n  SI n MOD d = 0: RETORNAR falso\n  d ← d+1\nRETORNAR verdadero', 'Leer n; descartar n<2; d←2', '¿d² ≤ n y no hay divisor?', 'Calcular n MOD d', 'Si resto≠0, incrementar divisor', 'Primo o compuesto', ['Primalidad de 29', 'Primalidad de 21']),
  lesson(76, 'Elegir k centros iniciales\nREPETIR\n  asignar cada punto al centro más cercano\n  reemplazar cada centro por la media de su grupo\n  SI grupo vacío: conservar su centro\nHASTA centros estables o límite de iteraciones\nRETORNAR grupos y centros', 'Puntos 2D; k=2; semillas explícitas', '¿Centros cambiaron y quedan iteraciones?', 'Asignar por distancia euclídea y recalcular medias', 'Usar los nuevos centros', 'Agrupamientos del ejemplo', ['Dos nubes y centros extremos', 'Centros iniciales alternativos']),
  lesson(77, 'resultado ← []; i ← 0\nMIENTRAS i < longitud(texto)\n  símbolo ← texto[i]; cantidad ← 1\n  MIENTRAS siguiente símbolo = símbolo\n    cantidad++; i++\n  añadir (símbolo,cantidad) a resultado; i++\nRETORNAR pares (formato sin ambigüedad)', 'Leer texto; salida vacía', '¿Quedan caracteres?', 'Contar racha del símbolo actual', 'Añadir par símbolo/cantidad y avanzar', 'Secuencia RLE de pares', ['AAAABBBCC', 'AABCCCCA']),
  lesson(78, 'contar frecuencias de símbolos\ncola ← hojas ordenadas por peso\nMIENTRAS tamaño(cola) > 1\n  a,b ← extraer dos pesos menores\n  insertar nodo(a.peso+b.peso, a, b)\nrecorrer árbol: izquierda=0; derecha=1\nRETORNAR tabla de códigos prefijo', 'Frecuencias; cola de árboles hoja', '¿Quedan más de un árbol?', 'Combinar los dos árboles de menor peso', 'Reinsertar el padre por peso', 'Recorrer árbol y obtener códigos', ['BANANA', 'ABRACADABRA']),
  lesson(79, 'HANOI(n, origen, auxiliar, destino)\n  SI n = 0: RETORNAR\n  HANOI(n−1, origen, destino, auxiliar)\n  mover disco de origen a destino\n  HANOI(n−1, auxiliar, origen, destino)', 'Recibir n, origen, auxiliar y destino', '¿n > 0?', 'Mover n−1 a auxiliar; mover disco mayor', 'Mover n−1 de auxiliar a destino (recursión)', 'Retornar al llamador', ['Tres discos', 'Cuatro discos']),
  lesson(80, 'BUSCAR(índice, elegidos, suma)\n  SI suma = objetivo: registrar solución; RETORNAR\n  SI suma > objetivo O índice = n: RETORNAR\n  elegir candidato[índice]\n  BUSCAR(índice+1, elegidos, suma+candidato)\n  deshacer elección\n  BUSCAR(índice+1, elegidos, suma)', 'Candidatos positivos; suma=0', '¿Rama válida y objetivo pendiente?', 'Elegir siguiente candidato y explorar', 'Deshacer y explorar la rama sin candidato', 'Soluciones de suma objetivo', ['[2,3,4,5] suma 7', '[1,2,3,4] suma 6']),
  lesson(107, 'construir LPS del patrón\ni ← 0; j ← 0\nMIENTRAS i < longitud(texto)\n  SI texto[i] = patrón[j]: i++; j++\n  SI j = longitud(patrón)\n    registrar i−j; j ← LPS[j−1]\n  SINO SI difieren y j > 0: j ← LPS[j−1]\n  SINO SI difieren: i++\nRETORNAR coincidencias (incluye solapadas)', 'Texto, patrón no vacío y tabla LPS', '¿Queda texto por comparar?', 'Comparar caracteres; registrar patrón completo', 'Avanzar o recuperar prefijo mediante LPS', 'Índices de coincidencias', ['ABABABAC / ABAC', 'AAAAA / AAA']),
]

/** Computes immutable, deterministic snapshots for a selected algorithm and explicit example input. */
export function generateTrace(id: string, variant = 0, diskCount?: number): AlgorithmStep[] {
  if (variant !== 0 && variant !== 1) throw new RangeError('Example must be 0 or 1')
  if (diskCount !== undefined && (!Number.isInteger(diskCount) || diskCount < 2 || diskCount > 5)) throw new RangeError('Hanoi supports 2 to 5 disks')
  const steps: AlgorithmStep[] = []
  // Snapshot copies prevent later in-place mutations from changing a previous step.
  const emit = (message: string, visual: VisualState) => steps.push({ message, visual: structuredClone(visual) })
  const input = variant === 0 ? [7, 3, 9, 2, 6, 1, 5] : [4, 2, 4, 1, 8]
  const number = Number(id.replace('DATA-', ''))
  if (number >= 61 && number <= 66) {
    const a = [...input]
    const show = (message: string, active: number[] = []) => emit(message, { kind: 'array', values: a, active })
    show('Entrada sin ordenar. Los índices comienzan en cero.')
    const swap = (i: number, j: number) => { [a[i], a[j]] = [a[j], a[i]] }
    if (number === 61) {
      let changed = true
      while (changed) { changed = false; for (let i = 0; i < a.length - 1; i++) { const inverted = a[i] > a[i + 1]; if (inverted) { swap(i, i + 1); changed = true }; show(`Comparar posiciones ${i} y ${i + 1}: ${inverted ? 'intercambio' : 'sin intercambio'}.`, [i, i + 1]) } }
    } else if (number === 62) {
      for (let i = 0; i < a.length - 1; i++) { let minimum = i; for (let j = i + 1; j < a.length; j++) { if (a[j] < a[minimum]) minimum = j; show(`Mínimo candidato del sufijo: ${a[minimum]} en ${minimum}.`, [minimum, j]) }; swap(i, minimum); show(`Fijar el mínimo en la posición ${i}.`, [i]) }
    } else if (number === 63) {
      for (let i = 1; i < a.length; i++) { const key = a[i]; let j = i - 1; while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; show(`Clave ${key} retenida fuera del arreglo; desplazar ${a[j]} a la derecha.`, [j, j + 1]); j-- }; a[j + 1] = key; show(`Insertar ${key} en ${j + 1}; prefijo ordenado.`, [j + 1]) }
    } else if (number === 64) {
      const heapify = (size: number, root: number) => { let largest = root; const left = 2 * root + 1, right = left + 1; if (left < size && a[left] > a[largest]) largest = left; if (right < size && a[right] > a[largest]) largest = right; if (largest !== root) { swap(root, largest); show(`Reparar max-heap de tamaño ${size}: intercambiar ${root} y ${largest}.`, [root, largest]); heapify(size, largest) } }
      for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) heapify(a.length, i)
      show('Max-heap construido; la raíz contiene el máximo.', [0])
      for (let end = a.length - 1; end > 0; end--) { swap(0, end); show(`Máximo fijado en ${end}; reparar el prefijo.`, [0, end]); heapify(end, 0) }
    } else if (number === 65) {
      const merge = (start: number, end: number) => { if (end - start <= 1) return; const mid = Math.floor((start + end) / 2); show(`Dividir segmento [${start}, ${end}) en ${mid}.`, [start, end - 1]); merge(start, mid); merge(mid, end); const left = a.slice(start, mid), right = a.slice(mid, end); let i = 0, j = 0; const combined: number[] = []; while (i < left.length && j < right.length) combined.push(left[i] <= right[j] ? left[i++] : right[j++]); combined.push(...left.slice(i), ...right.slice(j)); a.splice(start, end - start, ...combined); show(`Mezclar mitades: [${combined.join(', ')}].`, Array.from({ length: end - start }, (_, index) => start + index)) }; merge(0, a.length)
    } else {
      const quick = (start: number, end: number) => { if (start >= end) return; const pivot = a[end]; let boundary = start; for (let j = start; j < end; j++) { if (a[j] <= pivot) swap(j, boundary++); show(`Pivote ${pivot}; particionar comparando índice ${j}.`, [j, end]) }; swap(boundary, end); show(`Pivote fijo en ${boundary}.`, [boundary]); quick(start, boundary - 1); quick(boundary + 1, end) }; quick(0, a.length - 1)
    }
    show(`Resultado: [${a.join(', ')}].`)
  } else if (number === 67 || number === 68) {
    const a = number === 68 ? (variant ? [1, 2, 4, 4, 8] : [3, 8, 12, 17, 23, 31, 42]) : input
    const target = variant ? 10 : number === 68 ? 23 : 6
    emit(`Buscar ${target}${number === 68 ? ' en entrada ordenada' : ''}.`, { kind: 'array', values: a })
    let found = -1
    if (number === 67) { for (let i = 0; i < a.length; i++) { emit(`Comparar A[${i}]=${a[i]} con ${target}.`, { kind: 'array', values: a, active: [i] }); if (a[i] === target) { found = i; break } } }
    else { let low = 0, high = a.length - 1; while (low <= high) { const mid = low + Math.floor((high - low) / 2); emit(`Intervalo [${low},${high}]; medio ${mid}, valor ${a[mid]}.`, { kind: 'array', values: a, active: [mid], rows: [['Intervalo candidato', `${low} … ${high}`]] }); if (a[mid] === target) { found = mid; break }; if (a[mid] < target) low = mid + 1; else high = mid - 1 } }
    emit(found < 0 ? `Objetivo ausente; resultado −1.` : `Coincidencia en índice ${found}.`, { kind: 'array', values: a, active: found < 0 ? [] : [found], rows: [['Resultado', String(found)]] })
  } else if (number >= 69 && number <= 72) {
    const edges: GraphEdge[] = [{ from: 0, to: 1, weight: 2 }, { from: 0, to: 2, weight: 4 }, { from: 1, to: 3, weight: 3 }, { from: 2, to: 3, weight: number === 72 && variant ? -2 : 1 }, { from: 2, to: 4, weight: 6 }, { from: 3, to: 4, weight: 2 }]
    const source = number <= 71 && variant ? 2 : 0
    const visited = new Set<number>(), dist = Array<number>(5).fill(Infinity); dist[source] = 0
    const coordinates = [[60,130],[210,60],[210,210],[360,130],[510,130]]
    const graph = (message: string, active: number[] = [], rows: [string,string][] = []) => emit(message, { kind: 'graph', edges: number <= 70 ? edges.map(edge => ({ from: edge.from, to: edge.to })) : edges, nodes: coordinates.map(([x,y], id) => ({ id, x,y, label: String.fromCharCode(65 + id), detail: `d=${dist[id] === Infinity ? '∞' : dist[id]}`, active: active.includes(id), visited: visited.has(id) })), rows })
    graph(`Origen ${String.fromCharCode(65 + source)}. Aristas dirigidas.`)
    if (number <= 70) {
      const pending = [source]
      if (number === 69) visited.add(source)
      while (pending.length) { const u = number === 69 ? pending.shift()! : pending.pop()!; if (number === 70 && visited.has(u)) continue; visited.add(u); const neighbors = edges.filter(edge => edge.from === u).map(edge => edge.to); for (const v of number === 70 ? [...neighbors].reverse() : neighbors) { if (!visited.has(v)) { if (number === 69) visited.add(v); dist[v] = dist[u] + 1; pending.push(v) } }; graph(`Visitar ${String.fromCharCode(65+u)}; ${number === 69 ? 'cola FIFO' : 'pila LIFO'}: ${pending.map(v => String.fromCharCode(65+v)).join(', ') || 'vacía'}.`, [u]) }
    } else if (number === 71) {
      while (visited.size < 5) { const available = dist.map((distance,id) => ({distance,id})).filter(node => !visited.has(node.id)).sort((a,b) => a.distance - b.distance || a.id - b.id); const u = available[0].id; if (!Number.isFinite(dist[u])) break; visited.add(u); for (const edge of edges.filter(edge => edge.from === u)) { if (dist[u] + edge.weight! < dist[edge.to]) dist[edge.to] = dist[u] + edge.weight!; graph(`Fijar ${String.fromCharCode(65+u)} y relajar ${String.fromCharCode(65+edge.to)}.`, [u, edge.to]) } }
    } else {
      for (let round = 1; round < 5; round++) { let changed = false; for (const edge of edges) { if (dist[edge.from] + edge.weight! < dist[edge.to]) { dist[edge.to] = dist[edge.from] + edge.weight!; changed = true; graph(`Ronda ${round}: relajar ${String.fromCharCode(65+edge.from)}→${String.fromCharCode(65+edge.to)}.`, [edge.from,edge.to]) } }; if (!changed) break }
      graph('Comprobación final: ninguna arista mejora; no hay ciclo negativo alcanzable.')
    }
    graph('Recorrido finalizado.', [], [['Distancias', dist.map(value => Number.isFinite(value) ? String(value) : '∞').join(', ')]])
  } else if (number === 73) {
    const blocked = variant ? [2,6,10,9] : [5,6,9]
    const costs = Array<number>(16).fill(Infinity), parents = Array<number>(16).fill(-1), opened = new Set([0]), closed = new Set<number>(); costs[0] = 0
    const h = (id: number) => 6 - Math.floor(id/4) - id%4
    const grid = (message: string, active: number[] = []) => emit(message, { kind: 'grid', blocked, nodes: Array.from({ length: 16 }, (_,id) => ({ id,x: id%4,y: Math.floor(id/4),label: id === 0 ? 'Inicio' : id === 15 ? 'Meta' : String(id), detail: Number.isFinite(costs[id]) ? `g:${costs[id]} h:${h(id)}` : '', active: active.includes(id), visited: closed.has(id) })) })
    grid('Grilla 4×4: moverse arriba/abajo/izquierda/derecha cuesta 1.')
    while (opened.size) { const u = [...opened].sort((a,b) => costs[a]+h(a)-costs[b]-h(b) || a-b)[0]; opened.delete(u); closed.add(u); grid(`Expandir ${u}: f=${costs[u]+h(u)}.`, [u]); if (u === 15) { const path = [15]; while (parents[path[0]] !== -1) path.unshift(parents[path[0]]); grid(`Camino mínimo de ${costs[15]} pasos: ${path.join(' → ')}.`, path); break }; const adjacent = [u-4,u+4,...(u%4 > 0 ? [u-1] : []),...(u%4 < 3 ? [u+1] : [])].filter(v => v >= 0 && v < 16 && !blocked.includes(v)); for (const v of adjacent) if (costs[u]+1 < costs[v]) { costs[v] = costs[u]+1; parents[v] = u; opened.add(v) } }
  } else if (number === 74) {
    let a = variant ? 1071 : 48, b = variant ? 462 : 18
    emit(`Calcular MCD(${a},${b}).`, { kind:'numbers', rows:[['a',String(a)],['b',String(b)]] })
    while (b !== 0) { const remainder = a%b; emit(`${a} mod ${b} = ${remainder}.`, { kind:'numbers', rows:[['a',String(a)],['b',String(b)],['resto',String(remainder)]] }); [a,b] = [b,remainder] }
    emit(`b=0: MCD=${a}.`, { kind:'numbers', rows:[['a',String(a)],['b','0'],['MCD',String(a)]] })
  } else if (number === 75) {
    const n = variant ? 21 : 29; const rows: [string,string][] = [['Número', String(n)]]; let prime = n >= 2
    emit(`Probar divisores hasta √${n}.`, { kind:'numbers',rows })
    for (let d = 2; d*d <= n; d++) { rows.push([`Divisor ${d}`, `${n} mod ${d} = ${n%d}`]); emit(`Comprobar divisor ${d}.`, { kind:'numbers',rows }); if (n%d === 0) { prime = false; break } }
    emit(`${n} es ${prime ? 'primo' : 'compuesto'}.`, { kind:'numbers',rows:[...rows,['Resultado',prime ? 'Primo' : 'Compuesto']] })
  } else if (number === 76) {
    const points = [{x:1,y:1,cluster:0},{x:2,y:2,cluster:0},{x:1,y:3,cluster:0},{x:7,y:6,cluster:0},{x:8,y:7,cluster:0},{x:7,y:8,cluster:0}]
    let centers = variant ? [{x:1,y:1},{x:2,y:2}] : [{x:1,y:1},{x:8,y:7}]
    emit('k=2; distancia euclídea; semillas deterministas.', {kind:'points',points,centers})
    for (let iteration = 1; iteration <= 10; iteration++) { points.forEach(point => { const distances = centers.map(center => (point.x-center.x)**2+(point.y-center.y)**2); point.cluster = distances[0] <= distances[1] ? 0 : 1 }); emit(`Iteración ${iteration}: asignar puntos al centro más cercano.`, {kind:'points',points,centers}); const next = centers.map((center,index) => { const group = points.filter(point => point.cluster === index); return group.length ? {x:group.reduce((sum,p) => sum+p.x,0)/group.length,y:group.reduce((sum,p) => sum+p.y,0)/group.length} : center }); const stable = next.every((center,index) => center.x === centers[index].x && center.y === centers[index].y); centers = next; emit(`Recalcular centros como medias${stable ? '; convergencia alcanzada' : ''}.`, {kind:'points',points,centers}); if (stable) break }
  } else if (number === 77) {
    const text = variant ? 'AABCCCCA' : 'AAAABBBCC'; const rows: [string,string][] = []
    emit('Entrada; la salida usa pares para no confundir símbolos con longitudes.', {kind:'tokens',tokens:[...text],rows})
    for (let i = 0; i < text.length;) { const start = i; while (i+1 < text.length && text[i+1] === text[start]) i++; rows.push([text[start],String(i-start+1)]); emit(`Racha ${text[start]} de longitud ${i-start+1}.`, {kind:'tokens',tokens:[...text],active:Array.from({length:i-start+1},(_,position) => start+position),rows}); i++ }
    emit(`Resultado: ${rows.map(([symbol,count]) => `(${symbol},${count})`).join(' ')}.`, {kind:'tokens',tokens:[...text],rows})
  } else if (number === 78) {
    const text = variant ? 'ABRACADABRA' : 'BANANA'; const frequencies = new Map<string,number>(); for (const char of text) frequencies.set(char,(frequencies.get(char) ?? 0)+1)
    const forest: HuffmanNode[] = [...frequencies].map(([label,weight]) => ({label,weight})); const sort = () => forest.sort((a,b) => a.weight-b.weight || a.label.localeCompare(b.label)); sort()
    emit(`Frecuencias de ${text}; desempate alfabético.`, {kind:'tree',forest})
    while (forest.length > 1) { const left = forest.shift()!, right = forest.shift()!; forest.push({label:left.label+right.label,weight:left.weight+right.weight,left,right}); sort(); emit(`Combinar pesos ${left.weight} y ${right.weight}.`, {kind:'tree',forest}) }
    const rows: [string,string][] = []; const visit = (node: HuffmanNode,code: string) => { if (!node.left || !node.right) rows.push([node.label,code || '0']); else {visit(node.left,code+'0');visit(node.right,code+'1')} }; visit(forest[0],'')
    emit('Árbol completo. Izquierda=0, derecha=1; códigos prefijo.', {kind:'tree',forest,rows})
  } else if (number === 79) {
    const count = diskCount ?? (variant ? 4 : 3); const pegs = [Array.from({length:count},(_,i) => count-i),[],[]] as number[][]
    emit(`${count} discos en A; destino C.`, {kind:'hanoi',pegs})
    const move = (n: number,from: number,aux: number,to: number) => { if (n === 0) return; move(n-1,from,to,aux); const disk = pegs[from].pop()!; pegs[to].push(disk); emit(`Mover disco ${disk} de ${'ABC'[from]} a ${'ABC'[to]}.`, {kind:'hanoi',pegs}); move(n-1,aux,from,to) }; move(count,0,1,2)
  } else if (number === 80) {
    const candidates = variant ? [1,2,3,4] : [2,3,4,5], target = variant ? 6 : 7, chosen: number[] = [], solutions: string[] = []
    const show = (message: string) => emit(message,{kind:'tokens',tokens:candidates.map(String),active:chosen,rows:[['Elegidos',chosen.map(index => candidates[index]).join(' + ') || '∅'],['Suma',String(chosen.reduce((sum,index) => sum+candidates[index],0))],['Objetivo',String(target)],['Soluciones',solutions.join('; ') || 'Pendiente']]})
    show('Explorar subconjuntos: cada candidato se usa como máximo una vez.')
    const search = (index: number,sum: number) => { if (sum === target) { solutions.push(chosen.map(i => candidates[i]).join('+')); show('Objetivo alcanzado: registrar solución.'); return }; if (sum > target || index === candidates.length) { show('Podar rama: suma excedida o sin candidatos.'); return }; chosen.push(index); show(`Elegir ${candidates[index]}.`); search(index+1,sum+candidates[index]); chosen.pop(); show(`Deshacer ${candidates[index]} y explorar sin él.`); search(index+1,sum) }; search(0,0); show('Exploración completa; estado de decisiones restaurado.')
  } else if (number === 107) {
    const text = variant ? 'AAAAA' : 'ABABABAC', pattern = variant ? 'AAA' : 'ABAC', lps = Array<number>(pattern.length).fill(0); let prefix = 0
    for (let i=1;i<pattern.length;) { if (pattern[i] === pattern[prefix]) lps[i++] = ++prefix; else if (prefix) prefix = lps[prefix-1]; else i++ }
    const matches: number[] = []; let i=0,j=0
    const show = (message: string, active: number[] = []) => emit(message,{kind:'tokens',tokens:[...text],active,rows:[['Patrón',pattern],['LPS',lps.join(', ')],['Índices',`i=${i}, j=${j}`],['Coincidencias',matches.join(', ') || 'Ninguna']]})
    show('Tabla LPS construida; patrón no vacío.')
    while (i < text.length) { const position = i; if (text[i] === pattern[j]) {i++;j++;show('Coincidencia de carácter; avanzar ambos índices.',[position]);if(j===pattern.length){matches.push(i-j);j=lps[j-1];show('Patrón completo; recuperar prefijo para solapamientos.',[position])}} else if(j){j=lps[j-1];show('Desajuste: recuperar prefijo sin retroceder el índice del texto.',[position])}else{i++;show('Desajuste sin prefijo; avanzar texto.',[position])} }
    show(`Búsqueda completa: índices ${matches.join(', ') || 'ninguno'}.`)
  } else { throw new Error(`No graphical lesson for ${id}`) }
  return steps
}

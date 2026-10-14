import { describe, expect, it } from 'vitest'
import { algorithmEntries } from '../../content/education'
import { algorithmLessons, generateTrace } from './algorithmDomain'

describe('DG-CHG-006 graphical algorithm invariants', () => {
  it('rejects invalid example and Hanoi configurations before recursion',()=>{
    expect(()=>generateTrace('DATA-079',0,0)).toThrow(RangeError)
    expect(()=>generateTrace('DATA-079',0,6)).toThrow(RangeError)
    expect(()=>generateTrace('DATA-061',2)).toThrow(RangeError)
  })
  it('covers exactly every canonical algorithm with two reproducible examples, pseudocode and flow', () => {
    expect(algorithmLessons.map(lesson=>lesson.id)).toEqual(algorithmEntries.map(entry=>entry.id))
    for (const lesson of algorithmLessons) {
      expect(lesson.pseudocode).toMatch(/RETORNAR|HASTA|REPETIR|MIENTRAS|PARA/)
      expect(lesson.flow.condition).toContain('¿')
      expect(lesson.flow.output).not.toBe('')
      for (const variant of [0,1]) {
        const trace=generateTrace(lesson.id,variant)
        expect(trace.length).toBeGreaterThan(1)
        expect(trace).toEqual(generateTrace(lesson.id,variant))
        expect(trace.every(step=>step.message && step.visual.kind)).toBe(true)
      }
    }
  })
  it.each([61,62,63,64,65,66])('DATA-%s sorting preserves the multiset and produces nondecreasing order', number => {
    for (const variant of [0,1]) {
      const trace=generateTrace(`DATA-0${number}`,variant)
      expect(trace.at(-1)!.visual.values).toEqual([...trace[0].visual.values!].sort((a,b)=>a-b))
      expect(trace[0].visual.values).toEqual(variant===0?[7,3,9,2,6,1,5]:[4,2,4,1,8])
    }
  })
  it('searches terminate immediately at a match or return absence',()=>{
    expect(generateTrace('DATA-067').at(-1)!.visual.rows).toEqual([['Resultado','4']])
    expect(generateTrace('DATA-068').at(-1)!.visual.rows).toEqual([['Resultado','4']])
    expect(generateTrace('DATA-067',1).at(-1)!.visual.rows).toEqual([['Resultado','-1']])
    expect(generateTrace('DATA-068',1).at(-1)!.visual.rows).toEqual([['Resultado','-1']])
    expect(generateTrace('DATA-067')).toHaveLength(7)
  })
  it('graph shortest paths agree with the weighted examples',()=>{
    expect(generateTrace('DATA-071').at(-1)!.visual.nodes!.map(node=>node.detail)).toEqual(['d=0','d=2','d=4','d=5','d=7'])
    expect(generateTrace('DATA-072',1).at(-1)!.visual.nodes!.map(node=>node.detail)).toEqual(['d=0','d=2','d=4','d=2','d=4'])
    expect(generateTrace('DATA-069').at(-1)!.visual.nodes!.map(node=>node.detail)).toEqual(['d=0','d=1','d=1','d=2','d=2'])
  })
  it('A* returns legal adjacent paths without traversing blocked cells',()=>{
    for(const variant of [0,1]) {
      const state=generateTrace('DATA-073',variant).at(-1)!.visual
      const path=generateTrace('DATA-073',variant).at(-1)!.message.match(/pasos: (.+)\./)![1].split(' → ').map(Number)
      expect(path.every((id,index)=>index===0 || Math.abs(id%4-path[index-1]%4)+Math.abs(Math.floor(id/4)-Math.floor(path[index-1]/4))===1)).toBe(true)
      expect(path).toContain(0);expect(path).toContain(15)
      expect(path.every(id=>!state.blocked!.includes(id))).toBe(true)
      expect(generateTrace('DATA-073',variant).at(-1)!.message).toContain('6 pasos')
    }
  })
  it('Euclides and primality show mathematically correct results',()=>{
    expect(generateTrace('DATA-074').at(-1)!.message).toBe('b=0: MCD=6.')
    expect(generateTrace('DATA-074',1).at(-1)!.message).toBe('b=0: MCD=21.')
    expect(generateTrace('DATA-075').at(-1)!.message).toBe('29 es primo.')
    expect(generateTrace('DATA-075',1).at(-1)!.message).toBe('21 es compuesto.')
  })
  it('K-means finishes with each center equal to the mean of its assigned points',()=>{
    for(const variant of [0,1]) {
      const state=generateTrace('DATA-076',variant).at(-1)!.visual
      state.centers!.forEach((center,index)=>{
        const group=state.points!.filter(point=>point.cluster===index)
        expect(group.length).toBeGreaterThan(0)
        expect(center.x).toBeCloseTo(group.reduce((sum,point)=>sum+point.x,0)/group.length)
        expect(center.y).toBeCloseTo(group.reduce((sum,point)=>sum+point.y,0)/group.length)
      })
    }
  })
  it('RLE reconstructs the exact source; Huffman yields distinct prefix-free codes',()=>{
    for(const variant of [0,1]) {
      const rle=generateTrace('DATA-077',variant).at(-1)!.visual.rows!
      expect(rle.map(([char,count])=>char.repeat(Number(count))).join('')).toBe(variant?'AABCCCCA':'AAAABBBCC')
      const huffman=generateTrace('DATA-078',variant).at(-1)!.visual
      const codes=huffman.rows!.map(row=>row[1])
      expect(codes.every((code,index)=>codes.every((other,otherIndex)=>index===otherIndex || !other.startsWith(code)))).toBe(true)
      expect(huffman.forest![0].weight).toBe(variant?11:6)
    }
  })
  it.each([2,3,4,5])('Hanoi with %s disks has 2ⁿ−1 legal moves and independent snapshots',count=>{
    const trace=generateTrace('DATA-079',0,count)
    expect(trace.length).toBe(2**count)
    expect(trace.at(-1)!.visual.pegs).toEqual([[],[],Array.from({length:count},(_,index)=>count-index)])
    for(let index=1;index<trace.length;index++) {
      const previous=trace[index-1].visual.pegs!,next=trace[index].visual.pegs!
      expect(next.flat().sort((a,b)=>a-b)).toEqual(Array.from({length:count},(_,i)=>i+1))
      expect(next.every(peg=>peg.every((disk,i)=>i===0 || peg[i-1]>disk))).toBe(true)
      expect(next.filter((peg,i)=>peg.length!==previous[i].length)).toHaveLength(2)
    }
    expect(trace[0].visual.pegs![0]).toHaveLength(count)
  })
  it('backtracking restores choices and enumerates valid subsets; KMP includes overlapping matches',()=>{
    const rows=generateTrace('DATA-080').at(-1)!.visual.rows!
    expect(rows.find(row=>row[0]==='Soluciones')![1]).toBe('2+5; 3+4')
    expect(rows.find(row=>row[0]==='Elegidos')![1]).toBe('∅')
    expect(generateTrace('DATA-107').at(-1)!.message).toContain('índices 4')
    expect(generateTrace('DATA-107',1).at(-1)!.message).toContain('índices 0, 1, 2')
  })
})

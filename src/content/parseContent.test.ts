import { describe, expect, it } from 'vitest'
import source from '../../data.md?raw'
import { parseKnowledge } from './parseContent'

describe('DG-CHG-004/005 canonical Markdown', () => {
  it('preserves the canonical A* title rather than stripping its asterisk',()=>{
    expect(parseKnowledge(source).find(entry=>entry.id==='DATA-073')?.title).toBe('A*')
  })
  it('imports every current DATA heading once, including fractional and nested algorithm IDs', () => {
    const ids = [...source.matchAll(/^#{3,4}\s+(DATA-\d+(?:\.\d+)?)\s+[—–-]/gm)].map(match=>match[1])
    const entries = parseKnowledge(source)
    expect(entries.map(entry=>entry.id)).toEqual(ids)
    expect(new Set(entries.map(entry=>entry.id)).size).toBe(ids.length)
    expect(entries.find(entry=>entry.id==='DATA-010.5')).toBeDefined()
    expect(entries.find(entry=>entry.id==='DATA-079')?.category).toBe('Algoritmos y técnicas')
    expect(entries.find(entry=>entry.id==='DATA-115')).toBeDefined()
  })
  it('preserves code indentation and stops at true headings, not comments inside fences', () => {
    const text = '## 1. Base\n### DATA-001 — A\n**Concepto:** Definición.\n\n```python\n# comentario\n    x = 1\n### DATA-999 — comentario dentro de código\n```\n\n#### DATA-002 — B\nOtro concepto.'
    const entries = parseKnowledge(text)
    expect(entries).toHaveLength(2)
    expect(entries[0].body).toContain('    x = 1')
    expect(entries[0].body).toContain('### DATA-999')
    expect(entries[0].summary).toBe('Definición.')
  })
})

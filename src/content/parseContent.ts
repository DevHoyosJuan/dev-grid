import type { Exercise, ExerciseLevel, KnowledgeEntry } from './types'

const plain = (value: string) => value.replace(/\*\*|`/g, '').replace(/\*([^*]+)\*/g, '$1').replace(/^Concepto(?: ampliado| general[^:]*)?:\s*/i, '').trim()

/** Preserves canonical Markdown, including examples, nested DATA headings and fractional identifiers. */
export function parseKnowledge(markdown: string): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = []
  let category = 'Fundamentos'
  let current: { id: string; title: string; category: string; lines: string[] } | null = null
  let fenced = false
  const finish = () => {
    if (!current) return
    const body = current.lines.join('\n').trim().replace(/\n---\s*$/, '').trim()
    const summary = plain(body.split(/\n\s*\n/)[0] ?? '')
    entries.push({ id: current.id, title: current.title, category: current.category, body, summary })
    current = null
  }
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) { fenced = !fenced; current?.lines.push(line); continue }
    if (!fenced) {
      const heading = line.match(/^#{3,4}\s+(DATA-\d+(?:\.\d+)?)\s+[—–-]\s+(.+)$/)
      const bullet = line.match(/^-\s+\*\*(DATA-\d+(?:\.\d+)?)\s+(.+?):\*\*\s*(.+)$/)
      if (heading || bullet) {
        finish()
        const match = heading ?? bullet!
        current = { id: match[1], title: plain(match[2]), category, lines: bullet ? [bullet[3]] : [] }
        continue
      }
      if (/^#{1,3}\s/.test(line)) {
        finish()
        const chapter = line.match(/^##\s+\d+\.\s*(.+)$/)
        if (chapter) category = plain(chapter[1])
        continue
      }
    }
    current?.lines.push(line)
  }
  finish()
  return entries
}

/** Derives neutral exercise contracts and prerequisite references from the canonical catalog. */
export function parseExercises(markdown: string): Exercise[] {
  const entries: Exercise[] = []
  const headings = [...markdown.matchAll(/^###\s+(EX-\d+)\s+[—–-]\s+(.+)$/gm)]
  headings.forEach((heading, index) => {
    const position = heading.index ?? 0
    const block = markdown.slice(position, headings[index + 1]?.index ?? markdown.length)
    const levels = [...markdown.slice(0, position).matchAll(/##\s+Nivel\s+(bajo|medio|alto|experto)/gi)]
    const level = (levels.at(-1)?.[1].toLowerCase() ?? 'bajo') as ExerciseLevel
    const field = (name: string) => plain(block.match(new RegExp(`^- \\*\\*${name}:\\*\\*\\s*(.+)$`, 'mi'))?.[1] ?? '')
    entries.push({ id: heading[1], title: plain(heading[2]), level, category: field('Categoría'), prerequisites: [...new Set(field('Temas previos recomendados').match(/DATA-\d+(?:\.\d+)?/g) ?? [])], description: field('Descripción'), conditions: field('Condiciones'), expected: field('Resultado esperado') })
  })
  return entries
}

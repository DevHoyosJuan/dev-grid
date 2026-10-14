import type { ReactNode } from 'react'

function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>
    return part
  })
}

/** Renders corpus Markdown as semantic React nodes; code and HTML always remain inert text. */
export function MarkdownContent({ source }: { source: string }) {
  const lines = source.split(/\r?\n/)
  const blocks: ReactNode[] = []
  for (let index = 0; index < lines.length;) {
    const line = lines[index]
    if (!line.trim() || /^---\s*$/.test(line)) { index++; continue }
    if (/^\s*```/.test(line)) {
      const language = line.trim().slice(3).trim()
      const code: string[] = []
      index++
      while (index < lines.length && !/^\s*```/.test(lines[index])) code.push(lines[index++])
      index++
      blocks.push(<div className="markdown-code" key={index}><div className="code-language">{language || 'Ejemplo'}</div><pre tabIndex={0} aria-label={`Ejemplo de código ${language}`}><code>{code.join('\n')}</code></pre></div>)
      continue
    }
    if (/^\|/.test(line) && /^\|[\s:|-]+\|\s*$/.test(lines[index + 1] ?? '')) {
      const cells = (row: string) => row.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim())
      const header = cells(line)
      index += 2
      const rows: string[][] = []
      while (index < lines.length && /^\|/.test(lines[index])) rows.push(cells(lines[index++]))
      blocks.push(<div className="markdown-table" key={index} tabIndex={0} aria-label="Tabla del concepto"><table><thead><tr>{header.map((cell, position) => <th key={position}>{inline(cell)}</th>)}</tr></thead><tbody>{rows.map((row, position) => <tr key={position}>{row.map((cell, column) => <td key={column}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>)
      continue
    }
    if (/^\s*[-*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line)
      const items: string[] = []
      while (index < lines.length && (ordered ? /^\d+\.\s/.test(lines[index]) : /^\s*[-*]\s/.test(lines[index]))) items.push(lines[index++].replace(/^\s*(?:[-*]|\d+\.)\s/, ''))
      const children = items.map((item, position) => <li key={position}>{inline(item)}</li>)
      blocks.push(ordered ? <ol key={index}>{children}</ol> : <ul key={index}>{children}</ul>)
      continue
    }
    if (/^#{1,6}\s/.test(line)) { blocks.push(<h3 key={index}>{inline(line.replace(/^#+\s/, ''))}</h3>); index++; continue }
    const paragraph = [line]
    index++
    while (index < lines.length && lines[index].trim() && !/^(?:```|#{1,6}\s|\s*[-*]\s|\d+\.\s|\|)/.test(lines[index])) paragraph.push(lines[index++])
    blocks.push(<p key={index}>{inline(paragraph.join(' '))}</p>)
  }
  return <div className="markdown-content">{blocks}</div>
}

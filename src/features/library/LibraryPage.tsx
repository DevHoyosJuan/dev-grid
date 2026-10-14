import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import type { KnowledgeEntry } from '../../content/types'
import { knowledgeCategories, knowledgeEntries } from '../../content/education'
import { MarkdownContent } from '../../shared/MarkdownContent'

type LibraryProps = { category: string | null; items: KnowledgeEntry[]; selected: KnowledgeEntry | null; onCategory: (value: string | null) => void; onSelect: (entry: KnowledgeEntry | null) => void; onBack: () => void }

/** Presents all canonical library content with equivalent horizontal and vertical category navigation. */
export function LibraryPage({ category, items, selected, onCategory, onSelect, onBack }: LibraryProps) {
  if (selected) return <div className="detail-page page-in">
    <button className="back-link" onClick={onBack}><ArrowLeft size={15} /> Volver a {category ?? 'la biblioteca'}</button>
    <div className="detail-hero"><span className="detail-id">{selected.id} · {selected.category}</span><h1>{selected.title}</h1></div>
    <article className="concept-content"><div className="concept-label"><BookOpen size={14} /> CONCEPTO Y EJEMPLOS</div><MarkdownContent source={selected.body} /></article>
  </div>
  const choose = (value: string) => onCategory(category === value ? null : value)
  return <div className="catalog-page page-in">
    <div className="page-intro"><div className="eyebrow"><span className="eyebrow-line" /> BIBLIOTECA DE CONCEPTOS</div><h1>{category ?? 'Aprendé los fundamentos.'}</h1><p>Definiciones y ejemplos del corpus educativo, organizados para leer, relacionar y practicar.</p></div>
    <div className="category-strip" aria-label="Filtro de categorías">{knowledgeCategories.map(item => <button key={item} aria-pressed={category === item} className={category === item ? 'category-chip category-chip--active' : 'category-chip'} onClick={() => choose(item)}>{item}<span>{knowledgeEntries.filter(entry => entry.category === item).length}</span></button>)}</div>
    <div className="library-layout grid gap-5 sm:grid-cols-[225px_minmax(0,1fr)]">
      <nav className="library-categories" aria-label="Listado vertical de categorías">
        <h2>Categorías</h2><button aria-pressed={category === null} className={category === null ? 'category-row category-row--active' : 'category-row'} onClick={() => onCategory(null)}>Todas las categorías<span>{knowledgeEntries.length}</span></button>
        {knowledgeCategories.map(item => <button key={item} aria-pressed={category === item} className={category === item ? 'category-row category-row--active' : 'category-row'} onClick={() => onCategory(item)}>{item}<span>{knowledgeEntries.filter(entry => entry.category === item).length}</span></button>)}
      </nav>
      <section aria-label="Unidades de la categoría"><div className="catalog-count" role="status"><span>{items.length} unidades</span><span>CONTENIDO CANÓNICO</span></div><div className="knowledge-grid">{items.map((entry,index) => <button className="knowledge-card" key={entry.id} onClick={() => onSelect(entry)}><span className="knowledge-card-top"><span>{entry.category}</span><span>{entry.id}</span></span><h3>{entry.title}</h3><p>{entry.summary}</p><span className="knowledge-card-bottom">Leer concepto <ArrowRight size={14} /></span><span className="knowledge-card-number">{String(index + 1).padStart(2, '0')}</span></button>)}</div></section>
    </div>
  </div>
}

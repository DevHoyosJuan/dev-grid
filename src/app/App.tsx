import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Braces, Check, ChevronDown,
  Code2, Command, Compass, Gauge, Grid2X2, Layers3, LockKeyhole,
  Menu, Play, Terminal, X,
} from 'lucide-react'
import { exercises, findKnowledge, knowledgeCategories, knowledgeEntries, algorithmEntries } from '../content/education'
import type { Exercise, ExerciseLevel, KnowledgeEntry } from '../content/types'
import { LibraryPage } from '../features/library/LibraryPage'
import { AlgorithmExplorer } from '../features/algorithms/AlgorithmExplorer'

type Section = 'Inicio' | 'Biblioteca' | 'Algoritmos' | 'Ejercicios'
// Keep future account presentation available, while the first release has no sessions.
const releaseFeatures = { accountControls: false }
const levels: ExerciseLevel[] = ['bajo', 'medio', 'alto', 'experto']
const navItems: { label: Section; icon: typeof Compass }[] = [
  { label: 'Inicio', icon: Grid2X2 },
  { label: 'Biblioteca', icon: BookOpen },
  { label: 'Algoritmos', icon: Layers3 },
  { label: 'Ejercicios', icon: Braces },
]

/** Composes the public learning workspace and keeps navigation state local to the page. */
function App() {
  const [section, setSection] = useState<Section>('Inicio')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [category, setCategory] = useState<string | null>(null)
  const [selectedKnowledge, setSelectedKnowledge] = useState<KnowledgeEntry | null>(null)
  const [level, setLevel] = useState<ExerciseLevel | 'todos'>('todos')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const filteredKnowledge = knowledgeEntries.filter((entry) => !category || entry.category === category)
  const filteredExercises = exercises.filter((exercise) => level === 'todos' || exercise.level === level)

  function navigate(next: Section) {
    setSection(next)
    setCategory(null)
    setSelectedKnowledge(null)
    setSelectedExercise(null)
    setMobileOpen(false)
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`} aria-label="Navegación">
        <div className="brand-lockup"><span className="brand-mark"><Command size={18} strokeWidth={2.5} /></span><span>dev<span className="brand-accent">grid</span><small>LEARN · BUILD · REPEAT</small></span></div>
        <div className="sidebar-label">ESPACIO DE APRENDIZAJE</div>
        <nav className="side-nav" aria-label="Secciones principales">
          {navItems.map(({ label, icon: Icon }) => <button key={label} aria-label={label} className={`nav-item ${section === label ? 'nav-item--active' : ''}`} onClick={() => navigate(label)} aria-current={section === label ? 'page' : undefined}><Icon size={17} /><span>{label}</span>{label === 'Ejercicios' && <span className="nav-count">100</span>}</button>)}
        </nav>
        <div className="sidebar-label sidebar-label--topics">EXPLORAR POR TEMA</div>
        <div className="topic-nav">
          {knowledgeCategories.slice(0, 7).map((item) => <button key={item} onClick={() => { setSection('Biblioteca'); setCategory(item); setSelectedKnowledge(null); setMobileOpen(false) }} className={category === item ? 'topic-item topic-item--active' : 'topic-item'}><span className="topic-dot" />{item}</button>)}
          <button className="topic-more" onClick={() => navigate('Biblioteca')}>Ver todas las categorías <ArrowRight size={13} /></button>
        </div>
        <div className="sidebar-bottom"><div className="status-icon"><Check size={14} /></div><div><strong>Todo listo para aprender</strong><span>Contenido abierto y gratuito</span></div></div>
      </aside>
      {mobileOpen && <button className="mobile-scrim" aria-label="Cerrar navegación" onClick={() => setMobileOpen(false)} />}
      <div className="workspace">
        <header className="topbar">
          <button className="mobile-menu" aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
          <div className="breadcrumb"><span>Dev Grid</span><span className="crumb-slash">/</span><strong>{selectedKnowledge?.title ?? selectedExercise?.title ?? (category ?? section)}</strong></div>
          <div className="topbar-actions" hidden={!releaseFeatures.accountControls}><span className="open-pill"><span /> Acceso abierto</span><button className="account-button" aria-label="Cuenta, próximamente" title="Inicio de sesión disponible en una próxima etapa"><span className="avatar">DG</span><ChevronDown size={14} /></button></div>
        </header>
        <main id="main-content" tabIndex={-1}>
          {section === 'Inicio' && <Home onNavigate={navigate} onCategory={(value) => { setCategory(value); setSection('Biblioteca') }} />}
          {section === 'Biblioteca' && <LibraryPage category={category} items={filteredKnowledge} selected={selectedKnowledge} onCategory={setCategory} onSelect={setSelectedKnowledge} onBack={() => setSelectedKnowledge(null)} />}
          {section === 'Algoritmos' && <AlgorithmExplorer />}
          {section === 'Ejercicios' && <Exercises level={level} items={filteredExercises} selected={selectedExercise} onLevel={setLevel} onSelect={setSelectedExercise} onBack={() => setSelectedExercise(null)} onKnowledge={(id) => { const item = findKnowledge(id); if (item) { setSelectedKnowledge(item); setSection('Biblioteca') } }} />}
        </main>
        <footer className="page-footer"><span>Desarrollado por <strong>DevHoyosJuan</strong></span><span><LockKeyhole size={12} /> Tu código no se guarda ni se comparte</span></footer>
      </div>
    </div>
  )
}

function Home({ onNavigate, onCategory }: { onNavigate: (section: Section) => void; onCategory: (category: string) => void }) {
  const featured = knowledgeEntries.filter((entry) => ['DATA-026', 'DATA-052', 'DATA-061'].includes(entry.id))
  return <div className="home-page page-in">
    <section className="hero-panel">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> TU ESPACIO PARA CRECER</div><h1>Entendé el código.<br /><span>Construí lo que sigue.</span></h1><p>Conceptos claros, algoritmos que podés recorrer y desafíos para poner cada idea en práctica.</p><div className="hero-actions"><button className="button button--primary" onClick={() => onNavigate('Biblioteca')}>Explorar biblioteca <ArrowRight size={16} /></button><button className="text-action" onClick={() => onNavigate('Ejercicios')}>Ir a ejercicios <ArrowUpRight size={15} /></button></div><div className="hero-proof"><span className="proof-avatars"><i>⌘</i><i>{'{}'}</i><i>∑</i></span><span><strong>Aprendé a tu ritmo</strong><small>Sin cuenta · Sin costo</small></span></div></div>
      <div className="hero-art" aria-label="Ilustración abstracta de una cuadrícula de código"><div className="orbit orbit--one" /><div className="orbit orbit--two" /><div className="orbit orbit--three" /><div className="grid-visual"><div className="grid-glow" /><div className="grid-core"><span>01</span><b>DG</b><span>10</span></div><span className="orbit-node node--one" /><span className="orbit-node node--two" /><span className="orbit-node node--three" /><span className="orbit-node node--four" /></div><div className="float-card float-card--top"><span className="float-code">{'{ }'}</span><span><strong>Ideas → código</strong><small>Un paso a la vez</small></span></div><div className="float-card float-card--bottom"><span className="pulse-dot" /><span><strong>Modo práctica</strong><small>100 desafíos disponibles</small></span><ArrowUpRight size={14} /></div><span className="art-coordinate coordinate--top">40° 42′ 46″</span><span className="art-coordinate coordinate--bottom">DEV / GRID_01</span></div>
      <div className="hero-footnote"><span>01 / 03</span><span className="hero-dashes"><i /><i /><i /></span><span>APRENDIZAJE INTERACTIVO</span></div>
    </section>
    <section className="quick-stats" aria-label="Contenido disponible"><Stat icon={<BookOpen />} number={knowledgeEntries.length.toString()} label="Conceptos para explorar" /><Stat icon={<Layers3 />} number={algorithmEntries.length.toString()} label="Algoritmos paso a paso" /><Stat icon={<Braces />} number={exercises.length.toString()} label="Ejercicios por nivel" /><Stat icon={<Code2 />} number="03" label="Lenguajes para practicar" /></section>
    <section className="learning-section"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> EMPEZÁ POR DONDE QUIERAS</div><h2>Un camino, <span>muchas entradas.</span></h2></div><p>La mejor forma de aprender es encontrar una idea y empezar a jugar con ella.</p></div><div className="path-grid"><button className="path-card path-card--library" onClick={() => onNavigate('Biblioteca')}><div className="path-icon"><BookOpen size={19} /></div><div className="path-meta">01 · EXPLORAR</div><h3>La biblioteca</h3><p>Fundamentos, arquitectura y buenas prácticas explicados con claridad.</p><span className="path-link">Recorrer categorías <ArrowRight size={14} /></span><span className="path-watermark">Aa</span></button><button className="path-card path-card--algo" onClick={() => onNavigate('Algoritmos')}><div className="path-icon"><Layers3 size={19} /></div><div className="path-meta">02 · VISUALIZAR</div><h3>Algoritmos en acción</h3><p>Seguí cada paso, retrocedé y entendé qué cambia en cada decisión.</p><span className="path-link">Ver recorridos <ArrowRight size={14} /></span><span className="mini-bars"><i /><i /><i /><i /><i /></span></button><button className="path-card path-card--practice" onClick={() => onNavigate('Ejercicios')}><div className="path-icon"><Terminal size={19} /></div><div className="path-meta">03 · PRACTICAR</div><h3>Tu próxima solución</h3><p>Elegí un nivel y resolvé desafíos en tu lenguaje preferido.</p><span className="path-link">Ver ejercicios <ArrowRight size={14} /></span><span className="path-braces">{'{ }'}</span></button></div></section>
    <section className="topics-section"><div className="section-heading section-heading--compact"><div><div className="eyebrow"><span className="eyebrow-line" /> BUENOS LUGARES PARA EMPEZAR</div><h2>Ideas que <span>se conectan.</span></h2></div><button className="text-action" onClick={() => onNavigate('Biblioteca')}>Ver biblioteca completa <ArrowRight size={14} /></button></div><div className="featured-grid">{featured.map((entry, index) => <button key={entry.id} className="featured-card" onClick={() => onCategory(entry.category)}><span className="featured-index">0{index + 1}</span><span className="featured-kicker">{entry.category}</span><h3>{entry.title}</h3><p>{entry.summary}</p><span className="featured-arrow"><ArrowUpRight size={17} /></span></button>)}</div></section>
    <section className="bottom-note"><span className="note-mark"><Gauge size={18} /></span><p><strong>El progreso no es una carrera.</strong> Volvé a lo básico, probá algo difícil o seguí la curiosidad del momento.</p><button onClick={() => onCategory(knowledgeCategories[0])}>Encontrar una idea <ArrowRight size={14} /></button></section>
  </div>
}

function Stat({ icon, number, label }: { icon: ReactNode; number: string; label: string }) { return <div className="stat-item"><span className="stat-icon">{icon}</span><div><strong>{number}</strong><span>{label}</span></div></div> }

function Exercises({ level, items, selected, onLevel, onSelect, onBack, onKnowledge }: { level: ExerciseLevel | 'todos'; items: Exercise[]; selected: Exercise | null; onLevel: (level: ExerciseLevel | 'todos') => void; onSelect: (exercise: Exercise | null) => void; onBack: () => void; onKnowledge: (id: string) => void }) {
  const [language, setLanguage] = useState('Python')
  const [code, setCode] = useState('def solve():\n    # Escribí tu solución aquí\n    pass\n\nsolve()')
  const templates: Record<string, string> = { Python: 'def solve():\n    # Escribí tu solución aquí\n    pass\n\nsolve()', PHP: '<?php\n// Escribí tu solución aquí\n', JavaScript: '// Escribí tu solución aquí\nfunction solve() {\n  \n}\n\nsolve();' }
  if (selected) return <div className="detail-page exercise-detail page-in"><button className="back-link" onClick={onBack}><ArrowLeft size={15} /> Volver al catálogo</button><div className="exercise-heading"><div><span className="exercise-badge">{selected.level}</span><span className="detail-id">{selected.id} <span>·</span> {selected.category}</span><h1>{selected.title}</h1><p>{selected.description}</p></div><div className="expected-card"><span>RESULTADO ESPERADO</span><p>{selected.expected}</p></div></div><div className="exercise-detail-grid"><div className="exercise-info"><section className="info-block"><span className="panel-label">CONDICIONES</span><p>{selected.conditions}</p></section><section className="info-block"><span className="panel-label">TEMAS PARA REPASAR</span><div className="prerequisite-list">{selected.prerequisites.map((id) => { const item = findKnowledge(id); return <button key={id} disabled={!item} onClick={() => onKnowledge(id)}>{id}{item && <><span>·</span>{item.title}<ArrowUpRight size={13} /></>}</button> })}</div></section><div className="anonymous-note"><LockKeyhole size={15} /><span>Tu borrador permanece en esta página durante la práctica. El código no se guarda como historial.</span></div></div><section className="practice-panel"><div className="practice-head"><div><span className="panel-label">ÁREA DE PRÁCTICA</span><h2>Tu solución</h2></div><label className="language-select">Lenguaje<select value={language} onChange={(event) => { setLanguage(event.target.value); setCode(templates[event.target.value]) }}><option>Python</option><option>PHP</option><option>JavaScript</option></select><ChevronDown size={13} /></label></div><div className="editor-toolbar"><span className="editor-dot" />{language === 'JavaScript' ? 'solution.js' : language === 'Python' ? 'solution.py' : 'solution.php'}<span className="editor-toolbar-right">LOCAL · BORRADOR EN MEMORIA</span></div><div className="editor-shell"><div className="line-numbers" aria-hidden="true">{code.split('\n').map((_, index) => <span key={index}>{index + 1}</span>)}</div><textarea aria-label={`Editor de código ${language}`} spellCheck={false} value={code} onChange={(event) => setCode(event.target.value)} /></div><label className="stdin-label" htmlFor="stdin">ENTRADA ESTÁNDAR <span>stdin</span></label><textarea id="stdin" className="stdin-input" placeholder="Entrada opcional para tu programa" /><div className="run-actions"><button className="button button--primary" disabled title="El servicio de ejecución todavía no está conectado"><Play size={14} fill="currentColor" /> Ejecutar</button><button className="button button--outline" disabled title="La evaluación requiere el servicio backend">Evaluar solución <ArrowRight size={14} /></button></div><div className="service-state"><span className="service-state-icon"><LockKeyhole size={14} /></span><p><strong>Servicio de ejecución pendiente</strong><br />El editor conserva tu borrador mientras esta página permanezca abierta. La ejecución y evaluación se habilitarán al conectar el servicio seguro.</p></div></section></div></div>
  return <div className="catalog-page page-in"><PageIntro eyebrow="EJERCICIOS DE PROGRAMACIÓN" title="La práctica hace clic." description="Elegí un nivel, abrí un desafío y llevá lo que aprendiste a una solución propia." /><div className="exercise-toolbar"><div className="level-filters" aria-label="Filtrar ejercicios por nivel"><button className={level === 'todos' ? 'level-chip level-chip--active' : 'level-chip'} onClick={() => onLevel('todos')}>Todos <span>{exercises.length}</span></button>{levels.map((item) => <button key={item} className={level === item ? 'level-chip level-chip--active' : 'level-chip'} onClick={() => onLevel(item)}>{item}<span>{exercises.filter((exercise) => exercise.level === item).length}</span></button>)}</div><span className="catalog-source">100 RETOS · 3 LENGUAJES</span></div><div className="exercise-grid">{items.map((exercise, index) => <button className="exercise-card" key={exercise.id} onClick={() => onSelect(exercise)}><div className="exercise-card-top"><span className={`level-dot level-dot--${exercise.level}`} />{exercise.level}<span className="exercise-id">{exercise.id}</span></div><h3>{exercise.title}</h3><p>{exercise.description}</p><div className="exercise-card-bottom"><span>{exercise.category}</span><span>Abrir reto <ArrowRight size={13} /></span></div><span className="exercise-card-index">{String(index + 1).padStart(2, '0')}</span></button>)}</div></div>
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <div className="page-intro"><div className="eyebrow"><span className="eyebrow-line" />{eyebrow}</div><h1>{title}</h1><p>{description}</p></div> }

export { App }

import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'
import { MarkdownContent } from '../shared/MarkdownContent'

describe('CHG-001 acceptance scenarios',()=>{
  it('preserves hidden account controls and credits the author across navigation',async()=>{
    const user=userEvent.setup();render(<App/> )
    expect(screen.queryByRole('button',{name:'Cuenta, próximamente'})).not.toBeInTheDocument()
    expect(screen.getByText('Acceso abierto').closest('[hidden]')).toBeInTheDocument()
    const navigation=within(screen.getByRole('navigation',{name:'Secciones principales'}))
    for(const name of ['Biblioteca','Algoritmos','Ejercicios','Inicio']) {
      await user.click(navigation.getByRole('button',{name}))
      expect(screen.getByText('DevHoyosJuan')).toBeVisible()
    }
  })
  it('vertical categories filter the library and concept detail renders the explanation once with examples',async()=>{
    const user=userEvent.setup();const {container}=render(<App/> )
    await user.click(screen.getByRole('button',{name:'Biblioteca'}))
    const categories=screen.getByRole('navigation',{name:'Listado vertical de categorías'})
    await user.click(within(categories).getByRole('button',{name:/Paradigmas y programación/}))
    await user.click(screen.getByRole('button',{name:/DATA-011/}))
    expect(screen.getByRole('heading',{name:'Paradigmas'})).toBeVisible()
    expect(container.querySelector('.detail-hero p')).toBeNull()
    expect(container.querySelectorAll('.concept-content pre').length).toBeGreaterThan(0)
    expect(container.querySelector('.concept-content')).toHaveTextContent('Concepto ampliado:')
  })
  it('Hanoi supports reversible moves, alternative inputs, pseudocode and a labeled flowchart',async()=>{
    const user=userEvent.setup();render(<App/> )
    await user.click(screen.getByRole('button',{name:'Algoritmos'}))
    await user.click(screen.getByRole('button',{name:/Torre de Hanoi.*DATA-079/}))
    expect(screen.getByRole('img',{name:/Torres de Hanoi/})).toHaveAttribute('aria-label','Torres de Hanoi. A: 3, 2, 1; B: vacía; C: vacía')
    expect(screen.getByRole('button',{name:'Anterior'})).toBeDisabled()
    await user.click(screen.getByRole('button',{name:'Siguiente'}))
    expect(screen.getByRole('img',{name:/Torres de Hanoi/})).toHaveAttribute('aria-label','Torres de Hanoi. A: 3, 2; B: vacía; C: 1')
    await user.click(screen.getByRole('button',{name:'Anterior'}))
    expect(screen.getByRole('img',{name:/Torres de Hanoi/})).toHaveAttribute('aria-label','Torres de Hanoi. A: 3, 2, 1; B: vacía; C: vacía')
    await user.selectOptions(screen.getByLabelText('Discos'),'4')
    expect(screen.getByText('Paso 1 de 16')).toBeVisible()
    expect(screen.getByRole('heading',{name:'Pseudocódigo'})).toBeVisible()
    expect(screen.getByRole('heading',{name:'Diagrama de flujo'})).toBeVisible()
    expect(screen.getByRole('img',{name:/Flujo de Torre de Hanoi/})).toBeVisible()
  })
  it('Markdown code preserves whitespace, tables are semantic and raw HTML stays inert',()=>{
    const {container}=render(<MarkdownContent source={'**Ejemplo:**\n\n```js\n  const x = 1;\n  console.log(x);\n```\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\n<script>alert(1)</script>'}/> )
    expect(container.querySelector('pre code')?.textContent).toBe('  const x = 1;\n  console.log(x);')
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(container.querySelector('script')).toBeNull()
    expect(screen.getByText('<script>alert(1)</script>')).toBeVisible()
  })
})

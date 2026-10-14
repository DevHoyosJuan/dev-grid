import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('DG-CHG-001–005: hidden controls, author credit, categories and formatted examples',async({page})=>{
  await page.setViewportSize({width:1366,height:900});await page.goto('/')
  await expect(page.getByText('Acceso abierto',{exact:true})).toBeHidden()
  await expect(page.getByRole('button',{name:'Cuenta, próximamente',includeHidden:true})).toBeHidden()
  await expect(page.getByText('DevHoyosJuan',{exact:true})).toBeVisible()
  await page.getByRole('button',{name:'Biblioteca',exact:true}).click()
  const categories=page.getByRole('navigation',{name:'Listado vertical de categorías'})
  await categories.getByRole('button',{name:/Paradigmas y programación/}).click()
  await page.getByRole('button',{name:/DATA-011/}).click()
  await expect(page.locator('.detail-hero p')).toHaveCount(0)
  await expect(page.locator('.concept-content pre').first()).toBeVisible()
  await expect(page.getByText('DevHoyosJuan',{exact:true})).toBeVisible()
  const audit=await new AxeBuilder({page}).analyze()
  expect(audit.violations.filter(item=>['serious','critical'].includes(item.impact ?? ''))).toEqual([])
})

test('DG-CHG-006: every algorithm renders both examples, its procedure and flowchart',async({page})=>{
  await page.setViewportSize({width:1366,height:1000});await page.goto('/')
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message))
  await page.getByRole('button',{name:'Algoritmos',exact:true}).click()
  const choices=page.locator('.algorithm-catalog button')
  await expect(choices).toHaveCount(21)
  for(let index=0;index<21;index++) {
    await choices.nth(index).click()
    await expect(page.getByRole('heading',{name:'Pseudocódigo',exact:true})).toBeVisible()
    await expect(page.getByRole('heading',{name:'Diagrama de flujo',exact:true})).toBeVisible()
    await expect(page.locator('.flow-svg')).toBeVisible()
    await page.getByRole('button',{name:'Siguiente',exact:true}).click()
    await page.getByLabel('Entrada de ejemplo').selectOption('1')
    await expect(page.getByRole('button',{name:'Anterior',exact:true})).toBeDisabled()
    await page.getByRole('button',{name:'Siguiente',exact:true}).click()
  }
  expect(errors).toEqual([])
})

test('DG-CHG-006: Hanoi transfers every disk and reverses or resets the state',async({page})=>{
  await page.setViewportSize({width:1366,height:1000});await page.goto('/')
  await page.getByRole('button',{name:'Algoritmos',exact:true}).click()
  await page.getByRole('button',{name:/Torre de Hanoi.*DATA-079/}).click()
  for(let move=0;move<7;move++) await page.getByRole('button',{name:'Siguiente',exact:true}).click()
  await expect(page.getByRole('img',{name:/Torres de Hanoi/})).toHaveAttribute('aria-label','Torres de Hanoi. A: vacía; B: vacía; C: 3, 2, 1')
  await expect(page.getByRole('button',{name:'Siguiente',exact:true})).toBeDisabled()
  await page.getByRole('button',{name:'Anterior',exact:true}).click()
  await expect(page.getByRole('button',{name:'Siguiente',exact:true})).toBeEnabled()
  await page.getByRole('button',{name:'Reiniciar recorrido'}).click()
  await expect(page.getByRole('img',{name:/Torres de Hanoi/})).toHaveAttribute('aria-label','Torres de Hanoi. A: 3, 2, 1; B: vacía; C: vacía')
  await page.evaluate(()=>window.scrollTo(0,0))
  await page.screenshot({path:'test-results/hanoi-desktop.png',fullPage:true})
  const audit=await new AxeBuilder({page}).analyze()
  expect(audit.violations.filter(item=>['serious','critical'].includes(item.impact ?? ''))).toEqual([])
})

for(const width of [320,768,1366]) test(`DG-CHG-003/006: responsive and keyboard at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/')
  const checkWidth=async()=>expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width)
  await checkWidth()
  if(width<=820) {
    await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Saltar al contenido'})).toBeFocused()
    await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Abrir menú'})).toBeFocused()
    await page.keyboard.press('Enter')
  }
  await page.getByRole('button',{name:'Biblioteca',exact:true}).click();await checkWidth()
  await page.getByRole('navigation',{name:'Listado vertical de categorías'}).getByRole('button',{name:/Fundamentos de programación/}).click()
  await page.getByRole('button',{name:/DATA-002/}).click();await checkWidth()
  if(width<=820) await page.getByRole('button',{name:'Abrir menú'}).click()
  await page.getByRole('button',{name:'Algoritmos',exact:true}).click()
  if(width<1120) await page.getByLabel('Algoritmo',{exact:true}).selectOption('DATA-079')
  else await page.getByRole('button',{name:/Torre de Hanoi.*DATA-079/}).click()
  await page.getByRole('button',{name:'Siguiente',exact:true}).click();await checkWidth()
  await expect(page.getByRole('heading',{name:'Diagrama de flujo',exact:true})).toBeVisible()
  if(width===320) { expect(await page.locator('.diagram-scroll').evaluate(element=>element.scrollLeft)).toBeGreaterThan(0); await page.evaluate(()=>window.scrollTo(0,0)); await page.screenshot({path:'test-results/hanoi-mobile.png',fullPage:true}) }
})

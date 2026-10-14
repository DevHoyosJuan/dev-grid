import { readFileSync } from 'node:fs'

const data = readFileSync(new URL('../data.md', import.meta.url), 'utf8')
const exercises = readFileSync(new URL('../exercises.md', import.meta.url), 'utf8')
const dataIds = [...data.matchAll(/^#{3,4}\s+(DATA-\d+(?:\.\d+)?)\s+[—–-]/gm)].map(match => match[1])
const exerciseIds = [...exercises.matchAll(/^###\s+(EX-\d+)/gm)].map((match) => match[1])
const referencedDataIds = [...exercises.matchAll(/DATA-\d+(?:\.\d+)?/g)].map((match) => match[0])
const duplicates = (values) => values.filter((value, index) => values.indexOf(value) !== index)
const missingReferences = [...new Set(referencedDataIds.filter((id) => !dataIds.includes(id)))]

if (dataIds.length === 0 || exerciseIds.length < 100) {
  throw new Error(`Expected a nonempty DATA corpus and at least 100 exercises; found ${dataIds.length} and ${exerciseIds.length}.`)
}
if (duplicates(dataIds).length || duplicates(exerciseIds).length || missingReferences.length) {
  throw new Error(`Content integrity issue. Duplicate DATA: ${duplicates(dataIds).join(', ')}; duplicate EX: ${duplicates(exerciseIds).join(', ')}; missing DATA references: ${missingReferences.join(', ')}`)
}

console.log(`Content OK: ${dataIds.length} DATA entries, ${exerciseIds.length} exercises, all prerequisite references resolve.`)

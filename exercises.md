# Dev Grid — Catálogo inicial de ejercicios

## Propósito y reglas

Fuente canónica de enunciados de práctica solicitada para Dev Grid. Contiene 100 ejercicios iniciales: 25 por nivel. Se podrá ampliar sin cambiar el contrato de `main.md`.

- Trazabilidad: `MAIN-004`, `MAIN-005`, `MAIN-008`, `MAIN-009`, `MAIN-010`, `MAIN-014`, `MAIN-019`.
- Niveles: `bajo`, `medio`, `alto`, `experto`.
- Lenguajes previstos por la app: Python, PHP y JavaScript. Un reto independiente del lenguaje debe tener la misma semántica y los mismos casos esperados en los tres.
- Los campos de resultado esperado describen valores o propiedades que se deben obtener; no incluyen código ni procedimiento de resolución.
- Cada ejercicio incluye temas previos recomendados, vinculados con conceptos de `data.md`; son sugerencias de preparación y no bloquean el acceso al reto.
- Convenciones globales: índices desde cero; comparaciones de texto sensibles a mayúsculas salvo indicación; conservar orden cuando se solicite; entradas válidas según condiciones explícitas.

## Nivel bajo (25)

### EX-001 — Suma de dos números

- **Categoría:** fundamentos
- **Temas previos recomendados:** DATA-002 — tipos y variables; DATA-003 — expresiones y operadores.
- **Descripción:** calcular la suma de dos números enteros.
- **Condiciones:** `-10^6 ≤ a,b ≤ 10^6`.
- **Resultado esperado:** el único entero `a + b`.

### EX-002 — Área de rectángulo

- **Categoría:** fundamentos
- **Temas previos recomendados:** DATA-002 — tipos y variables; DATA-003 — expresiones y operadores.
- **Descripción:** obtener el área de un rectángulo.
- **Condiciones:** ancho y alto son enteros no negativos.
- **Resultado esperado:** `ancho × alto`.

### EX-003 — Par o impar

- **Categoría:** condicionales
- **Temas previos recomendados:** DATA-003 — comparaciones y booleanos; DATA-004 — decisiones y ramas.
- **Descripción:** clasificar un entero según su paridad.
- **Condiciones:** entrada: un entero.
- **Resultado esperado:** `"par"` si es divisible por 2; `"impar"` en otro caso.

### EX-004 — Mayor de dos valores

- **Categoría:** condicionales
- **Temas previos recomendados:** DATA-003 — comparaciones y booleanos; DATA-004 — decisiones y ramas.
- **Descripción:** devolver el mayor de dos enteros, incluyendo empates.
- **Condiciones:** dos enteros.
- **Resultado esperado:** el valor numérico máximo.

### EX-005 — Clasificar temperatura

- **Categoría:** condicionales
- **Temas previos recomendados:** DATA-003 — comparaciones y booleanos; DATA-004 — decisiones y ramas.
- **Descripción:** clasificar una temperatura en grados Celsius.
- **Condiciones:** menos de 10 es fría; de 10 inclusive a menos de 25 es templada; 25 o más es cálida.
- **Resultado esperado:** `"fría"`, `"templada"` o `"cálida"` según los intervalos.

### EX-006 — Conteo de 1 a N

- **Categoría:** bucles
- **Temas previos recomendados:** DATA-004 — bucles y límites; DATA-002 — variables y operadores.
- **Descripción:** producir la secuencia de enteros de 1 a N.
- **Condiciones:** `0 ≤ N ≤ 1000`; para N=0 la secuencia es vacía.
- **Resultado esperado:** `[1, 2, …, N]` en orden creciente.

### EX-007 — Suma de una lista

- **Categoría:** bucles/colecciones
- **Temas previos recomendados:** DATA-004 — bucles; DATA-007 — recorrido y suma de colecciones.
- **Descripción:** sumar todos los enteros de una lista.
- **Condiciones:** lista con cero o más enteros.
- **Resultado esperado:** un entero igual a la suma; lista vacía produce `0`.

### EX-008 — Contar vocales

- **Categoría:** cadenas
- **Temas previos recomendados:** DATA-002 — cadenas y caracteres; DATA-007 — recorrido de secuencias.
- **Descripción:** contar vocales en una cadena.
- **Condiciones:** contar `a,e,i,o,u` en ambas capitalizaciones; ignorar otros caracteres.
- **Resultado esperado:** cantidad entera de vocales.

### EX-009 — Invertir una cadena

- **Categoría:** cadenas
- **Temas previos recomendados:** DATA-002 — cadenas y caracteres; DATA-007 — recorrido de secuencias.
- **Descripción:** devolver los caracteres de una cadena en orden inverso.
- **Condiciones:** longitud entre 0 y 10 000; tratar cada carácter de la entrada como unidad.
- **Resultado esperado:** cadena invertida; por ejemplo `"sol"` produce `"los"`.

### EX-010 — Mínimo de una lista

- **Categoría:** colecciones
- **Temas previos recomendados:** DATA-050 — arrays/listas; DATA-007 — recorrido, filtros y preservación de orden.
- **Descripción:** encontrar el menor valor de una lista de enteros.
- **Condiciones:** la lista contiene al menos un entero.
- **Resultado esperado:** el menor entero presente.

### EX-011 — Máximo de una lista

- **Categoría:** colecciones
- **Temas previos recomendados:** DATA-050 — arrays/listas; DATA-007 — recorrido, filtros y preservación de orden.
- **Descripción:** encontrar el mayor valor de una lista de enteros.
- **Condiciones:** la lista contiene al menos un entero.
- **Resultado esperado:** el mayor entero presente.

### EX-012 — Filtrar positivos

- **Categoría:** colecciones
- **Temas previos recomendados:** DATA-050 — arrays/listas; DATA-007 — recorrido, filtros y preservación de orden.
- **Descripción:** devolver los valores estrictamente positivos de una lista.
- **Condiciones:** conservar el orden original; cero no es positivo.
- **Resultado esperado:** sublista con exactamente los valores mayores que cero.

### EX-013 — Contar apariciones

- **Categoría:** colecciones
- **Temas previos recomendados:** DATA-050 — arrays/listas; DATA-007 — recorrido, filtros y preservación de orden.
- **Descripción:** contar cuántas veces aparece un valor objetivo.
- **Condiciones:** lista de enteros y entero objetivo.
- **Resultado esperado:** número de elementos iguales al objetivo.

### EX-014 — Tabla de multiplicar

- **Categoría:** bucles
- **Temas previos recomendados:** DATA-004 — bucles y límites; DATA-002 — variables y operadores.
- **Descripción:** generar los productos de un entero por 1 hasta 10.
- **Condiciones:** entero `n` entre -1000 y 1000.
- **Resultado esperado:** diez valores `[n×1, n×2, …, n×10]`.

### EX-015 — Factorial acotado

- **Categoría:** fundamentos/matemática
- **Temas previos recomendados:** DATA-003 — operaciones aritméticas; DATA-004 — bucles y condiciones.
- **Descripción:** calcular el factorial de N.
- **Condiciones:** `0 ≤ N ≤ 12`; `0! = 1`.
- **Resultado esperado:** entero `N!`.

### EX-016 — FizzBuzz

- **Categoría:** condicionales/bucles
- **Temas previos recomendados:** DATA-003 — divisibilidad y condiciones; DATA-004 — repetición.
- **Descripción:** clasificar los enteros de 1 a N con reglas de divisibilidad.
- **Condiciones:** múltiplos de 3 y 5 se clasifican como `"FizzBuzz"`; solo 3 como `"Fizz"`; solo 5 como `"Buzz"`; los demás como su representación decimal.
- **Resultado esperado:** secuencia de N elementos con la clasificación para cada entero.

### EX-017 — Palíndromo simple

- **Categoría:** cadenas
- **Temas previos recomendados:** DATA-002 — cadenas y caracteres; DATA-007 — recorrido de secuencias.
- **Descripción:** determinar si una palabra se lee igual al derecho y al revés.
- **Condiciones:** solo letras minúsculas, sin espacios.
- **Resultado esperado:** booleano verdadero cuando la palabra es palíndroma, falso en otro caso.

### EX-018 — Eliminar duplicados adyacentes

- **Categoría:** cadenas
- **Temas previos recomendados:** DATA-002 — cadenas y caracteres; DATA-007 — recorrido de secuencias.
- **Descripción:** comprimir repeticiones consecutivas dejando una aparición de cada carácter seguido.
- **Condiciones:** no eliminar repeticiones separadas por otros caracteres.
- **Resultado esperado:** `"aaabbcca"` produce `"abca"`.

### EX-019 — Conversión Celsius a Fahrenheit

- **Categoría:** fundamentos
- **Temas previos recomendados:** DATA-002 — tipos y variables; DATA-003 — expresiones y operadores.
- **Descripción:** convertir una temperatura usando `F = C × 9/5 + 32`.
- **Condiciones:** Celsius puede ser decimal; salida numérica sin redondeo adicional requerido.
- **Resultado esperado:** valor Fahrenheit según la fórmula.

### EX-020 — Número dentro de un rango

- **Categoría:** condicionales
- **Temas previos recomendados:** DATA-003 — comparaciones y booleanos; DATA-004 — decisiones y ramas.
- **Descripción:** verificar si un valor está en un intervalo cerrado.
- **Condiciones:** límites `min ≤ max`.
- **Resultado esperado:** verdadero si `min ≤ x ≤ max`; falso en otro caso.

### EX-021 — Producto punto de dos vectores

- **Categoría:** colecciones/matemática
- **Temas previos recomendados:** DATA-050 — arrays; DATA-003 — operaciones aritméticas sobre posiciones correspondientes.
- **Descripción:** sumar los productos de componentes correspondientes.
- **Condiciones:** dos listas numéricas de igual longitud.
- **Resultado esperado:** `Σ(a[i] × b[i])`; dos listas vacías producen 0.

### EX-022 — Índices de coincidencias

- **Categoría:** búsqueda lineal
- **Temas previos recomendados:** DATA-067 — búsqueda lineal; DATA-050 — arrays e índices desde cero.
- **Descripción:** obtener todas las posiciones donde aparece el objetivo.
- **Condiciones:** índices desde cero; conservar orden.
- **Resultado esperado:** lista de índices coincidentes, vacía si no hay coincidencias.

### EX-023 — Unir dos listas

- **Categoría:** colecciones
- **Temas previos recomendados:** DATA-050 — arrays/listas; DATA-007 — recorrido, filtros y preservación de orden.
- **Descripción:** concatenar dos listas sin alterar su contenido.
- **Condiciones:** mantener duplicados y orden.
- **Resultado esperado:** elementos de la primera lista seguidos de los de la segunda.

### EX-024 — Cuenta regresiva

- **Categoría:** bucles
- **Temas previos recomendados:** DATA-004 — bucles y límites; DATA-002 — variables y operadores.
- **Descripción:** producir enteros desde N hasta 0 inclusive.
- **Condiciones:** `0 ≤ N ≤ 10 000`.
- **Resultado esperado:** secuencia `[N, N-1, …, 0]`.

### EX-025 — Promedio de notas

- **Categoría:** fundamentos/colecciones
- **Temas previos recomendados:** DATA-050 — arrays/listas; DATA-007 — recorrer y agregar valores.
- **Descripción:** calcular el promedio de una lista de notas.
- **Condiciones:** lista no vacía; notas entre 0 y 100.
- **Resultado esperado:** suma dividida por cantidad, como número real.

## Nivel medio (25)

### EX-026 — Búsqueda binaria

- **Categoría:** búsqueda
- **Temas previos recomendados:** DATA-007 — colecciones; DATA-067 — búsqueda lineal y condiciones de borde.
- **Descripción:** localizar un objetivo en una lista ordenada ascendentemente.
- **Condiciones:** valores enteros; si hay duplicados se acepta cualquier índice coincidente; objetivo ausente se representa como `-1`.
- **Resultado esperado:** índice válido del objetivo o `-1`.

### EX-027 — Ordenamiento por inserción

- **Categoría:** ordenamiento
- **Temas previos recomendados:** DATA-007 — colecciones; DATA-061/062/063 — criterios básicos de ordenamiento.
- **Descripción:** ordenar una lista de enteros ascendentemente.
- **Condiciones:** preservar todos los elementos y duplicados.
- **Resultado esperado:** lista no decreciente con el mismo multiconjunto de entrada.

### EX-028 — Ordenamiento por selección

- **Categoría:** ordenamiento
- **Temas previos recomendados:** DATA-007 — colecciones; DATA-061/062/063 — criterios básicos de ordenamiento.
- **Descripción:** ordenar valores numéricos ascendentemente.
- **Condiciones:** lista vacía y de un elemento deben ser válidas.
- **Resultado esperado:** lista ordenada ascendentemente con los mismos elementos.

### EX-029 — Merge de listas ordenadas

- **Categoría:** ordenamiento/colecciones
- **Temas previos recomendados:** DATA-050 — arrays; DATA-061/065 — orden y mezcla de colecciones.
- **Descripción:** combinar dos listas ascendentes en una lista ordenada.
- **Condiciones:** conservar duplicados; ambas listas pueden estar vacías.
- **Resultado esperado:** unión ordenada que contiene todos los elementos de ambas entradas.

### EX-030 — Segundo mayor distinto

- **Categoría:** colecciones
- **Temas previos recomendados:** DATA-050 — arrays/listas; DATA-007 — recorrido, filtros y preservación de orden.
- **Descripción:** obtener el segundo valor mayor distinto de una lista.
- **Condiciones:** al menos dos valores distintos; si no existe, el resultado es `null`.
- **Resultado esperado:** segundo elemento de los valores únicos ordenados descendentemente, o `null`.

### EX-031 — Par de suma objetivo

- **Categoría:** colecciones
- **Temas previos recomendados:** DATA-050 — arrays/listas; DATA-007 — recorrido, filtros y preservación de orden.
- **Descripción:** determinar si existen dos posiciones distintas cuyos valores suman el objetivo.
- **Condiciones:** cada posición puede usarse una sola vez.
- **Resultado esperado:** booleano de existencia.

### EX-032 — Anagrama

- **Categoría:** cadenas
- **Temas previos recomendados:** DATA-002 — cadenas y caracteres; DATA-007 — recorrido de secuencias.
- **Descripción:** decidir si dos cadenas contienen las mismas letras con las mismas frecuencias.
- **Condiciones:** letras minúsculas sin espacios ni signos.
- **Resultado esperado:** booleano; por ejemplo `"roma"` y `"amor"` producen verdadero.

### EX-033 — Balanceo de paréntesis

- **Categoría:** pila/cadenas
- **Temas previos recomendados:** DATA-052 — pila; DATA-002 — cadenas; balanceo y anidamiento de símbolos.
- **Descripción:** comprobar si cada `(` tiene cierre `)` correcto y en orden.
- **Condiciones:** la cadena contiene solo paréntesis redondos.
- **Resultado esperado:** verdadero para `"(()())"`; falso para `"())("`.

### EX-034 — Cola con operaciones

- **Categoría:** cola
- **Temas previos recomendados:** DATA-053 — cola FIFO; DATA-007 — secuencia de operaciones.
- **Descripción:** aplicar operaciones `encolar(x)`, `desencolar()` y `frente()`.
- **Condiciones:** las operaciones de retirar/consultar solo se solicitan si hay elementos.
- **Resultado esperado:** lista de valores devueltos por cada operación de consulta o retiro, en orden.

### EX-035 — Pila con mínimo

- **Categoría:** pila
- **Temas previos recomendados:** DATA-052 — pila LIFO; DATA-007 — secuencias de operaciones.
- **Descripción:** procesar `push(x)`, `pop()` y `min()` sobre una pila no vacía al consultar.
- **Condiciones:** `min()` no debe retirar el valor mínimo.
- **Resultado esperado:** cada `min()` devuelve el menor valor existente en ese instante; `pop()` devuelve la cima.

### EX-036 — Frecuencia de palabras

- **Categoría:** mapa/cadenas
- **Temas previos recomendados:** DATA-055 — mapas; DATA-002 — normalización y tokens de texto.
- **Descripción:** contar palabras en una oración separada por espacios.
- **Condiciones:** convertir a minúsculas y eliminar puntuación `.,!?` de los extremos de cada token.
- **Resultado esperado:** mapa palabra→cantidad.

### EX-037 — Rotar lista a la derecha

- **Categoría:** colecciones
- **Temas previos recomendados:** DATA-050 — arrays/listas; DATA-007 — recorrido, filtros y preservación de orden.
- **Descripción:** rotar los elementos k posiciones hacia la derecha.
- **Condiciones:** `k ≥ 0`; lista vacía permanece vacía; k puede ser mayor que la longitud.
- **Resultado esperado:** lista rotada con orden circular correcto.

### EX-038 — Intersección de listas

- **Categoría:** conjuntos/colecciones
- **Temas previos recomendados:** DATA-055 — conjuntos; DATA-050 — listas, duplicados y orden.
- **Descripción:** devolver valores presentes en ambas listas.
- **Condiciones:** cada valor aparece una sola vez en salida; ordenar ascendentemente.
- **Resultado esperado:** intersección única ordenada.

### EX-039 — Unión de intervalos

- **Categoría:** ordenamiento
- **Temas previos recomendados:** DATA-007 — colecciones; DATA-061/062/063 — criterios básicos de ordenamiento.
- **Descripción:** combinar intervalos que se superponen o se tocan.
- **Condiciones:** intervalos cerrados `[inicio, fin]`; inicio ≤ fin; salida ordenada.
- **Resultado esperado:** lista mínima de intervalos disjuntos equivalentes a la cobertura de entrada.

### EX-040 — Elemento más frecuente

- **Categoría:** mapas/colecciones
- **Temas previos recomendados:** DATA-054/055 — mapas y frecuencia; DATA-050 — listas y recorridos.
- **Descripción:** encontrar el valor con mayor frecuencia.
- **Condiciones:** lista no vacía; en empate gana el menor valor numérico.
- **Resultado esperado:** valor elegido por frecuencia máxima y desempate indicado.

### EX-041 — MCD de dos enteros

- **Categoría:** matemática/Euclides
- **Temas previos recomendados:** DATA-074 — algoritmo de Euclides; DATA-003 — resto y divisibilidad.
- **Descripción:** calcular el máximo común divisor no negativo.
- **Condiciones:** enteros no negativos, no ambos cero.
- **Resultado esperado:** mayor entero que divide a ambos; por ejemplo MCD(48,18)=6.

### EX-042 — N-ésimo Fibonacci iterativo

- **Categoría:** matemática
- **Temas previos recomendados:** DATA-003 — operadores; DATA-004 — bucles y casos límite numéricos.
- **Descripción:** hallar el término n de la sucesión con F(0)=0 y F(1)=1.
- **Condiciones:** `0 ≤ n ≤ 45`.
- **Resultado esperado:** valor entero F(n).

### EX-043 — Primalidad por prueba de divisores

- **Categoría:** matemática
- **Temas previos recomendados:** DATA-003 — operadores; DATA-004 — bucles y casos límite numéricos.
- **Descripción:** determinar si un entero es primo.
- **Condiciones:** `0 ≤ n ≤ 10^9`; los valores menores que 2 no son primos.
- **Resultado esperado:** booleano de primalidad exacta.

### EX-044 — Conversión decimal a binario

- **Categoría:** representación numérica
- **Temas previos recomendados:** DATA-002 — enteros y cadenas; bases posicionales y divisiones con resto.
- **Descripción:** representar un entero no negativo en base 2.
- **Condiciones:** `0 ≤ n ≤ 10^9`; representar cero como `"0"`.
- **Resultado esperado:** cadena binaria sin ceros iniciales innecesarios.

### EX-045 — Matriz transpuesta

- **Categoría:** matrices
- **Temas previos recomendados:** DATA-050 — arrays; DATA-007 — índices y recorrido por filas/columnas.
- **Descripción:** intercambiar filas por columnas de una matriz rectangular.
- **Condiciones:** filas de igual longitud; admitir matriz de cero filas.
- **Resultado esperado:** matriz donde el elemento de fila i, columna j pasa a fila j, columna i.

### EX-046 — Suma de diagonales

- **Categoría:** matrices
- **Temas previos recomendados:** DATA-050 — arrays; DATA-007 — índices y recorrido por filas/columnas.
- **Descripción:** sumar la diagonal principal de una matriz cuadrada.
- **Condiciones:** matriz de tamaño n×n.
- **Resultado esperado:** suma de `matriz[i][i]` para `0 ≤ i < n`.

### EX-047 — Palíndromo normalizado

- **Categoría:** cadenas
- **Temas previos recomendados:** DATA-002 — cadenas y caracteres; DATA-007 — recorrido de secuencias.
- **Descripción:** determinar si una frase es palíndroma ignorando espacios y mayúsculas.
- **Condiciones:** comparar caracteres alfanuméricos; signos y espacios se ignoran.
- **Resultado esperado:** booleano de palíndromo bajo esa normalización.

### EX-048 — Compresión de tramos

- **Categoría:** cadenas/run-length
- **Temas previos recomendados:** DATA-077 — codificación run-length; DATA-007 — recorrido de cadenas.
- **Descripción:** contar tramos consecutivos con formato carácter seguido de cantidad.
- **Condiciones:** cadena de letras; incluir cantidad incluso si es 1.
- **Resultado esperado:** `"aaabbc"` produce `"a3b2c1"`.

### EX-049 — Búsqueda lineal con centinela lógico

- **Categoría:** búsqueda
- **Temas previos recomendados:** DATA-007 — colecciones; DATA-067 — búsqueda lineal y condiciones de borde.
- **Descripción:** hallar la primera posición de un objetivo sin alterar la lista.
- **Condiciones:** lista de enteros; duplicados devuelven el menor índice.
- **Resultado esperado:** índice de primera aparición o `-1`.

### EX-050 — Evaluar suma de una expresión RPN

- **Categoría:** pila
- **Temas previos recomendados:** DATA-052 — pila LIFO; DATA-007 — secuencias de operaciones.
- **Descripción:** evaluar una expresión postfix con enteros y operadores `+` y `*`.
- **Condiciones:** expresión válida, tokens separados por espacios, división no permitida.
- **Resultado esperado:** único entero resultante de la expresión.

## Nivel alto (25)

### EX-051 — Merge sort

- **Categoría:** ordenamiento/divide y vencerás
- **Temas previos recomendados:** DATA-065 — merge sort; DATA-080 — recursión y división en subproblemas.
- **Descripción:** ordenar una lista de enteros de forma ascendente.
- **Condiciones:** preservar duplicados; lista de hasta 100 000 elementos.
- **Resultado esperado:** lista ordenada con exactamente los mismos elementos.

### EX-052 — Quicksort de tres vías

- **Categoría:** ordenamiento
- **Temas previos recomendados:** DATA-007 — colecciones; DATA-061/062/063 — criterios básicos de ordenamiento.
- **Descripción:** ordenar una lista con muchos valores repetidos.
- **Condiciones:** ascendente; la salida debe conservar frecuencias exactas.
- **Resultado esperado:** secuencia no decreciente equivalente en multiconjunto a la entrada.

### EX-053 — Heap sort

- **Categoría:** ordenamiento/montículo
- **Temas previos recomendados:** DATA-056 — montículos; DATA-064 — heap sort y propiedad de heap.
- **Descripción:** ordenar una lista de enteros mediante el criterio de heap sort.
- **Condiciones:** lista puede contener negativos y duplicados.
- **Resultado esperado:** lista ordenada ascendentemente con mismas frecuencias.

### EX-054 — K elementos más frecuentes

- **Categoría:** mapas/montículo
- **Temas previos recomendados:** DATA-054 — mapas de frecuencias; DATA-056 — montículos y orden de prioridad.
- **Descripción:** devolver los k valores más frecuentes.
- **Condiciones:** ordenar por frecuencia descendente y, en empate, valor ascendente; `0 ≤ k ≤ cantidad de valores únicos`.
- **Resultado esperado:** lista de k valores según ese orden.

### EX-055 — Ventana deslizante: máximo

- **Categoría:** colecciones/ventana deslizante
- **Temas previos recomendados:** DATA-050 — arrays; DATA-007 — subarreglos contiguos y ventanas.
- **Descripción:** calcular el máximo de cada ventana contigua de tamaño k.
- **Condiciones:** `1 ≤ k ≤ n`.
- **Resultado esperado:** lista de `n-k+1` máximos en orden de ventana.

### EX-056 — Subcadena sin caracteres repetidos

- **Categoría:** cadenas/ventana deslizante
- **Temas previos recomendados:** DATA-002 — cadenas; DATA-007 — ventanas contiguas y conteos.
- **Descripción:** hallar la longitud máxima de una subcadena contigua sin caracteres repetidos.
- **Condiciones:** cadena de hasta 100 000 caracteres.
- **Resultado esperado:** entero con la longitud máxima.

### EX-057 — Distancias BFS

- **Categoría:** grafos/BFS
- **Temas previos recomendados:** DATA-059 — lista de adyacencia; DATA-053 — cola FIFO; DATA-069 — BFS.
- **Descripción:** calcular la distancia mínima en aristas desde un origen a todos los vértices de un grafo no ponderado.
- **Condiciones:** vértices numerados `0..V-1`; grafo dirigido; vértices inalcanzables usan `null`.
- **Resultado esperado:** arreglo de distancias con origen 0 y valores mínimos en aristas.

### EX-058 — Componentes conexas

- **Categoría:** grafos/DFS
- **Temas previos recomendados:** DATA-059 — grafos no dirigidos; DATA-070 — DFS y componentes conexas.
- **Descripción:** contar componentes conexas en un grafo no dirigido.
- **Condiciones:** puede haber vértices aislados; no hay aristas duplicadas.
- **Resultado esperado:** cantidad de componentes, contando cada aislado como una.

### EX-059 — Detección de ciclo dirigido

- **Categoría:** grafos/DFS
- **Temas previos recomendados:** DATA-059 — grafos no dirigidos; DATA-070 — DFS y componentes conexas.
- **Descripción:** determinar si un grafo dirigido contiene algún ciclo.
- **Condiciones:** vértices `0..V-1`; puede estar desconectado.
- **Resultado esperado:** booleano verdadero si existe un ciclo en cualquier componente.

### EX-060 — Orden topológico

- **Categoría:** grafos/DAG
- **Temas previos recomendados:** DATA-059 — grafos dirigidos; DATA-070 — DFS; concepto de dependencias y orden topológico.
- **Descripción:** producir un orden topológico de un grafo dirigido acíclico.
- **Condiciones:** puede haber varios órdenes válidos; solo se reciben DAGs.
- **Resultado esperado:** permutación de vértices donde cada arista u→v tiene u antes que v.

### EX-061 — Camino mínimo con Dijkstra

- **Categoría:** grafos/caminos mínimos
- **Temas previos recomendados:** DATA-059 — grafos ponderados; DATA-071 — Dijkstra; DATA-072 — Bellman-Ford y pesos negativos.
- **Descripción:** calcular distancias mínimas desde un origen.
- **Condiciones:** pesos no negativos; grafo dirigido; nodos no alcanzables usan `null`.
- **Resultado esperado:** arreglo de distancias óptimas, con distancia 0 al origen.

### EX-062 — Bellman-Ford y ciclo negativo

- **Categoría:** grafos/caminos mínimos
- **Temas previos recomendados:** DATA-059 — grafos ponderados; DATA-071 — Dijkstra; DATA-072 — Bellman-Ford y pesos negativos.
- **Descripción:** calcular distancias desde un origen y detectar ciclo negativo alcanzable.
- **Condiciones:** pesos enteros, pueden ser negativos; el ciclo solo cuenta si es alcanzable desde el origen.
- **Resultado esperado:** indicador de ciclo negativo alcanzable y distancias válidas si no existe.

### EX-063 — Unión-Find con consultas

- **Categoría:** estructuras de datos
- **Temas previos recomendados:** DATA-050 — arrays; DATA-054 — mapas; DATA-055 — conjuntos y operaciones de actualización.
- **Descripción:** procesar un conjunto de uniones y consultas de conectividad.
- **Condiciones:** n elementos numerados `0..n-1`; consultas después de las operaciones previas.
- **Resultado esperado:** booleano por consulta indicando si los dos elementos comparten conjunto.

### EX-064 — Kruskal: peso del árbol de expansión mínima

- **Categoría:** grafos/árbol de expansión
- **Temas previos recomendados:** DATA-059 — grafos ponderados; DATA-060 — Disjoint Set Union; DATA-064 — ordenar aristas.
- **Descripción:** hallar el peso total mínimo que conecta todos los vértices de un grafo no dirigido.
- **Condiciones:** pesos no negativos; si el grafo no es conexo, informar `null`.
- **Resultado esperado:** suma de pesos de un árbol de expansión mínimo o `null` si no existe.

### EX-065 — K-means en dos dimensiones

- **Categoría:** agrupamiento
- **Temas previos recomendados:** DATA-076 — k-means, distancia euclidiana y cálculo de promedios.
- **Descripción:** asignar puntos a centros dados y devolver nuevos centros como medias.
- **Condiciones:** coordenadas reales; k centros no vacíos tras asignación; distancia euclidiana; empates se asignan al centro de menor índice.
- **Resultado esperado:** asignación de cada punto y coordenadas medias de cada grupo.

### EX-066 — Caminos únicos en una grilla

- **Categoría:** programación dinámica
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-080 — subproblemas; estado y transición de DP.
- **Descripción:** contar caminos desde esquina superior izquierda hasta inferior derecha moviéndose solo derecha o abajo.
- **Condiciones:** grilla rectangular sin obstáculos; dimensiones positivas.
- **Resultado esperado:** número entero de caminos válidos.

### EX-067 — Cambio mínimo de monedas

- **Categoría:** programación dinámica
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-080 — subproblemas; estado y transición de DP.
- **Descripción:** hallar el mínimo número de monedas para sumar un monto.
- **Condiciones:** denominaciones positivas ilimitadas; si es imposible devolver `-1`; monto entre 0 y 10 000.
- **Resultado esperado:** mínimo de monedas o `-1`.

### EX-068 — Subconjunto con suma objetivo

- **Categoría:** programación dinámica
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-080 — subproblemas; estado y transición de DP.
- **Descripción:** decidir si algún subconjunto de valores alcanza la suma objetivo.
- **Condiciones:** enteros no negativos; cada posición puede usarse una vez.
- **Resultado esperado:** booleano de existencia.

### EX-069 — Subsecuencia común más larga

- **Categoría:** programación dinámica/cadenas
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-002 — cadenas y prefijos; subproblemas bidimensionales.
- **Descripción:** calcular la longitud de una subsecuencia común más larga entre dos cadenas.
- **Condiciones:** subsecuencia no necesita ser contigua; cadenas de longitud hasta 1000.
- **Resultado esperado:** longitud entera LCS.

### EX-070 — Distancia de edición

- **Categoría:** programación dinámica/cadenas
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-002 — cadenas y prefijos; subproblemas bidimensionales.
- **Descripción:** calcular inserciones, eliminaciones o sustituciones mínimas para transformar una cadena en otra.
- **Condiciones:** cada operación cuesta 1; cadenas de hasta 1000 caracteres.
- **Resultado esperado:** distancia mínima entera.

### EX-071 — Máxima suma de subarreglo

- **Categoría:** programación dinámica
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-080 — subproblemas; estado y transición de DP.
- **Descripción:** encontrar la mayor suma de un subarreglo contiguo no vacío.
- **Condiciones:** lista no vacía; puede contener solo números negativos.
- **Resultado esperado:** suma máxima alcanzable.

### EX-072 — Torre de Hanoi: cantidad de movimientos

- **Categoría:** recursión
- **Temas previos recomendados:** DATA-005 — funciones y caso base; DATA-079/080 — recursión y Hanoi.
- **Descripción:** calcular la cantidad mínima de movimientos para n discos.
- **Condiciones:** `0 ≤ n ≤ 60`.
- **Resultado esperado:** `2^n - 1`.

### EX-073 — Torre de Hanoi: lista de movimientos

- **Categoría:** recursión
- **Temas previos recomendados:** DATA-005 — funciones y caso base; DATA-079/080 — recursión y Hanoi.
- **Descripción:** describir movimientos para trasladar n discos de A a C usando B.
- **Condiciones:** `0 ≤ n ≤ 12`; ningún disco grande puede quedar sobre uno menor.
- **Resultado esperado:** lista legal de `2^n-1` pares origen/destino que termina con todos los discos en C.

### EX-074 — Codificación run-length con escapes

- **Categoría:** compresión
- **Temas previos recomendados:** DATA-077 — run-length encoding; DATA-002 — cadenas y representación.
- **Descripción:** codificar cadenas usando secuencias de longitud y símbolo.
- **Condiciones:** alfabeto incluye dígitos y separador `:`; cada tramo se serializa como `cantidad:símbolo;`.
- **Resultado esperado:** representación inequívoca que al decodificarse reproduce exactamente la cadena original.

### EX-075 — Validar codificación prefijo

- **Categoría:** árboles/Huffman
- **Temas previos recomendados:** DATA-056 — montículos; DATA-078 — códigos prefijo de Huffman.
- **Descripción:** determinar si un conjunto de códigos binarios es prefijo, es decir, ningún código es prefijo propio de otro.
- **Condiciones:** códigos no vacíos formados por `0` y `1`.
- **Resultado esperado:** booleano verdadero si el conjunto cumple la propiedad prefijo.

## Nivel experto (25)

### EX-076 — Árbol de expansión mínima con desempate

- **Categoría:** grafos/Kruskal
- **Temas previos recomendados:** DATA-059 — grafos ponderados; DATA-060 — Disjoint Set Union; DATA-064 — ordenar.
- **Descripción:** devolver las aristas de un árbol de expansión mínima.
- **Condiciones:** grafo no dirigido; ordenar aristas candidatas por `(peso, min(u,v), max(u,v))`; devolver `null` si no es conexo.
- **Resultado esperado:** exactamente V−1 aristas sin ciclos, conectando todos los vértices y con peso mínimo; ante empates, resultado reproducible según orden indicado.

### EX-077 — A* en una grilla con obstáculos

- **Categoría:** grafos/búsqueda heurística
- **Temas previos recomendados:** DATA-059 — grafos y vecinos; DATA-073 — A* y heurística Manhattan; DATA-050 — matrices/grillas.
- **Descripción:** encontrar una ruta entre inicio y destino en grilla de cuatro direcciones.
- **Condiciones:** cada paso cuesta 1; heurística Manhattan; desempate por fila y luego columna; celdas bloqueadas no transitables.
- **Resultado esperado:** ruta de longitud mínima como lista de coordenadas incluyendo inicio y destino, o lista vacía si no hay ruta.

### EX-078 — Dijkstra con reconstrucción de camino

- **Categoría:** grafos/caminos mínimos
- **Temas previos recomendados:** DATA-059 — grafos ponderados; DATA-071 — Dijkstra; DATA-072 — Bellman-Ford y pesos negativos.
- **Descripción:** encontrar camino mínimo ponderado desde origen a destino.
- **Condiciones:** pesos no negativos; si hay empate, entre caminos de igual costo elegir el lexicográficamente menor según secuencia de IDs.
- **Resultado esperado:** costo mínimo y secuencia de vértices del camino, o `null` si destino inalcanzable.

### EX-079 — Bellman-Ford: clasificar destinos afectados

- **Categoría:** grafos/caminos mínimos
- **Temas previos recomendados:** DATA-059 — grafos ponderados; DATA-071 — Dijkstra; DATA-072 — Bellman-Ford y pesos negativos.
- **Descripción:** identificar destinos cuya distancia no tiene mínimo finito por ciclo negativo alcanzable.
- **Condiciones:** grafo dirigido con pesos enteros; origen dado.
- **Resultado esperado:** conjunto de vértices alcanzables desde un ciclo negativo alcanzable, y distancias finitas para los demás alcanzables.

### EX-080 — Componentes fuertemente conexas

- **Categoría:** grafos
- **Temas previos recomendados:** DATA-059 — vértices, aristas y representación; DATA-069/070 — BFS y DFS.
- **Descripción:** particionar vértices de un grafo dirigido en componentes fuertemente conexas.
- **Condiciones:** IDs de vértice enteros; el orden de componentes no importa, pero cada vértice aparece exactamente una vez.
- **Resultado esperado:** partición donde dos vértices pertenecen al mismo grupo si y solo si se alcanzan mutuamente.

### EX-081 — Puentes de un grafo no dirigido

- **Categoría:** grafos
- **Temas previos recomendados:** DATA-059 — vértices, aristas y representación; DATA-069/070 — BFS y DFS.
- **Descripción:** devolver las aristas cuya eliminación aumenta el número de componentes conexas.
- **Condiciones:** grafo simple, no dirigido y posiblemente desconectado.
- **Resultado esperado:** conjunto de puentes expresados como pares ordenados `(menor, mayor)`.

### EX-082 — Articulaciones de un grafo

- **Categoría:** grafos
- **Temas previos recomendados:** DATA-059 — vértices, aristas y representación; DATA-069/070 — BFS y DFS.
- **Descripción:** identificar vértices cuya eliminación aumenta la cantidad de componentes conexas.
- **Condiciones:** grafo no dirigido simple, posiblemente desconectado.
- **Resultado esperado:** conjunto de IDs de vértices de articulación.

### EX-083 — Flujo máximo

- **Categoría:** grafos/flujo
- **Temas previos recomendados:** DATA-059 — grafos dirigidos; capacidades, conservación de flujo y caminos aumentantes.
- **Descripción:** hallar el flujo máximo desde una fuente a un sumidero.
- **Condiciones:** capacidades enteras no negativas; grafo dirigido; fuente distinta del sumidero.
- **Resultado esperado:** valor máximo de flujo que conserva capacidad y balance en cada nodo intermedio.

### EX-084 — Coincidencia bipartita máxima

- **Categoría:** grafos/matching
- **Temas previos recomendados:** DATA-059 — grafos bipartitos; matching, caminos alternantes y restricciones de unicidad.
- **Descripción:** emparejar la mayor cantidad de vértices entre dos particiones según aristas disponibles.
- **Condiciones:** grafo bipartito; cada vértice puede participar en como máximo una pareja.
- **Resultado esperado:** matching de cardinalidad máxima, sin parejas no permitidas ni vértices repetidos.

### EX-085 — Problema de mochila 0/1

- **Categoría:** programación dinámica/optimización
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-007 — estados; restricciones de mochila 0/1.
- **Descripción:** maximizar valor total de objetos sin exceder capacidad.
- **Condiciones:** cada objeto se toma cero o una vez; pesos enteros positivos; en empate, devolver menor peso total y luego menor máscara de índices lexicográfica.
- **Resultado esperado:** valor máximo, peso usado y conjunto válido de índices según el desempate.

### EX-086 — Cadena de multiplicación de matrices

- **Categoría:** programación dinámica
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-080 — subproblemas; estado y transición de DP.
- **Descripción:** determinar el mínimo número de multiplicaciones escalares para una cadena de matrices compatibles.
- **Condiciones:** dimensiones positivas `[p0,…,pn]`; las matrices son `p[i-1]×p[i]`.
- **Resultado esperado:** costo mínimo de multiplicaciones escalares.

### EX-087 — Edit distance con reconstrucción

- **Categoría:** programación dinámica/cadenas
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-002 — cadenas y prefijos; subproblemas bidimensionales.
- **Descripción:** obtener una secuencia mínima de operaciones que transforma una cadena en otra.
- **Condiciones:** insertar, eliminar o sustituir cuesta 1; desempate de operaciones: match, sustituir, eliminar, insertar.
- **Resultado esperado:** distancia mínima y secuencia válida de operaciones con longitud igual a la distancia.

### EX-088 — Subsecuencia creciente más larga

- **Categoría:** programación dinámica
- **Temas previos recomendados:** DATA-049 — recurrencias; DATA-080 — subproblemas; estado y transición de DP.
- **Descripción:** hallar una subsecuencia estrictamente creciente de longitud máxima.
- **Condiciones:** puede haber soluciones múltiples; devolver la lexicográficamente menor secuencia de valores, y si persiste empate, menor secuencia de índices.
- **Resultado esperado:** longitud máxima, valores y posiciones de una subsecuencia válida según desempate.

### EX-089 — Segmento de suma cero

- **Categoría:** prefijos/mapas
- **Temas previos recomendados:** DATA-054 — mapas hash; sumas de prefijo y detección de estados repetidos.
- **Descripción:** encontrar un subarreglo contiguo de suma cero de mayor longitud.
- **Condiciones:** si hay empate, elegir menor índice inicial y luego menor índice final; si no existe, devolver `null`.
- **Resultado esperado:** índices inclusivos y longitud del segmento elegido, o `null`.

### EX-090 — Mediana de dos listas ordenadas

- **Categoría:** búsqueda binaria
- **Temas previos recomendados:** DATA-068 — búsqueda binaria; DATA-050 — arrays ordenados e índices.
- **Descripción:** hallar la mediana de dos listas ordenadas conjuntamente.
- **Condiciones:** al menos una lista no vacía; longitud total puede ser par o impar; valores enteros.
- **Resultado esperado:** mediana central; si longitud total es par, promedio real de los dos valores centrales.

### EX-091 — LRU Cache

- **Categoría:** diseño de estructuras
- **Temas previos recomendados:** DATA-054 — mapas hash; DATA-056 — montículos; DATA-009 — mutabilidad e invariantes.
- **Descripción:** procesar operaciones `get` y `put` en caché de capacidad fija con política menos recientemente usada.
- **Condiciones:** cada acceso exitoso y actualización cambia recencia; `get` ausente devuelve `-1`; capacidad puede ser 0.
- **Resultado esperado:** resultados de `get` en orden y estado final de claves desde más a menos recientes.

### EX-092 — LFU Cache con desempate LRU

- **Categoría:** diseño de estructuras
- **Temas previos recomendados:** DATA-054 — mapas hash; DATA-056 — montículos; DATA-009 — mutabilidad e invariantes.
- **Descripción:** simular una caché que expulsa primero la clave menos frecuentemente usada.
- **Condiciones:** entre frecuencias iguales expulsa la menos recientemente usada; get exitoso y put de clave existente incrementan frecuencia.
- **Resultado esperado:** respuestas de consultas y estado final con frecuencias y orden de recencia correcto.

### EX-093 — Mediana en flujo

- **Categoría:** montículos
- **Temas previos recomendados:** DATA-056 — heap; DATA-050 — arrays e índices de árbol binario.
- **Descripción:** tras cada inserción devolver la mediana de los valores vistos.
- **Condiciones:** flujo no vacío al consultar; con cantidad par, mediana es promedio de los dos valores centrales.
- **Resultado esperado:** secuencia de medianas en el orden de inserción.

### EX-094 — Segment tree: suma y actualización

- **Categoría:** estructuras de datos
- **Temas previos recomendados:** DATA-050 — arrays; DATA-054 — mapas; DATA-055 — conjuntos y operaciones de actualización.
- **Descripción:** procesar consultas de suma inclusiva de rango y actualización puntual.
- **Condiciones:** índices válidos; las consultas reflejan todas las actualizaciones anteriores.
- **Resultado esperado:** lista de sumas, una por consulta de rango.

### EX-095 — Fenwick tree: conteos de prefijo

- **Categoría:** estructuras de datos
- **Temas previos recomendados:** DATA-050 — arrays; DATA-054 — mapas; DATA-055 — conjuntos y operaciones de actualización.
- **Descripción:** procesar incrementos puntuales y consultas de suma de prefijo.
- **Condiciones:** arreglo inicial de enteros; prefijo incluye índice consultado; índices desde cero.
- **Resultado esperado:** lista de valores de prefijo en el instante de cada consulta.

### EX-096 — KMP: búsqueda de patrón

- **Categoría:** cadenas/algoritmos
- **Temas previos recomendados:** DATA-107 — KMP y tabla de prefijos; DATA-002 — cadenas e índices.
- **Descripción:** hallar todas las posiciones iniciales de un patrón en un texto.
- **Condiciones:** coincidencias solapadas incluidas; patrón vacío devuelve todas las posiciones entre caracteres `0..longitud(texto)`.
- **Resultado esperado:** lista ascendente de índices de inicio de cada coincidencia.

### EX-097 — Trie con prefijos

- **Categoría:** árboles/cadenas
- **Temas previos recomendados:** DATA-058 — trie, prefijos y recorridos de árboles; DATA-007 — colecciones.
- **Descripción:** procesar inserciones de palabras y consultas de prefijo.
- **Condiciones:** alfabeto de letras minúsculas; devolver palabras coincidentes en orden lexicográfico y sin duplicados.
- **Resultado esperado:** lista lexicográfica de palabras insertadas que comienzan con el prefijo consultado.

### EX-098 — Huffman: costo ponderado óptimo

- **Categoría:** compresión/Huffman
- **Temas previos recomendados:** DATA-078 — Huffman y códigos prefijo; DATA-056 — montículos.
- **Descripción:** calcular el costo total de longitud ponderada de un código Huffman para frecuencias dadas.
- **Condiciones:** frecuencias positivas; costo es `Σ frecuencia[símbolo] × longitud(código[símbolo])`; un único símbolo usa longitud 1.
- **Resultado esperado:** costo mínimo total; no se requiere devolver códigos.

### EX-099 — Validación de paréntesis múltiples

- **Categoría:** pilas/parseo
- **Temas previos recomendados:** DATA-052 — pila LIFO; DATA-003 — símbolos y DATA-013 — invariantes de anidamiento.
- **Descripción:** validar agrupación de `()`, `[]` y `{}`.
- **Condiciones:** la cadena contiene solo estos seis caracteres; cierres deben corresponder al último abierto.
- **Resultado esperado:** booleano verdadero si todos los pares están correctamente anidados y cerrados.

### EX-100 — Backtracking: combinaciones con suma objetivo

- **Categoría:** backtracking
- **Temas previos recomendados:** DATA-080 — recursión y backtracking; DATA-007 — colecciones y restauración de estado.
- **Descripción:** enumerar subconjuntos de candidatos que suman un objetivo.
- **Condiciones:** candidatos enteros positivos y distintos; cada uno se usa como máximo una vez; salida de subconjuntos ordenada lexicográficamente.
- **Resultado esperado:** lista completa, sin duplicados, de subconjuntos cuya suma es el objetivo; lista vacía si no hay solución.

## Criterio pedagógico orientativo de niveles

- **Bajo:** una regla o recorrido sencillo, entradas pequeñas y contrato directo.
- **Medio:** combinación de estructuras básicas, límites explícitos y casos borde comunes.
- **Alto:** varias decisiones, análisis de complejidad, grafos o programación dinámica de alcance moderado.
- **Experto:** estructuras avanzadas, múltiples invariantes, desempates exactos o reconstrucción de resultados.

La dificultad debe reflejar razonamiento requerido y no depender de trucos del lenguaje. Una persona puede resolver cada ejercicio en cualquiera de los tres lenguajes anunciados salvo que el enunciado indique lo contrario.

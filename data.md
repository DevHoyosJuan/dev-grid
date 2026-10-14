# Dev Grid — Corpus educativo inicial

## Propósito y estado

Este documento es la fuente canónica del conocimiento educativo que consume Dev Grid. Es un corpus inicial curado, extensible por unidades, no una afirmación de contener literalmente todo el conocimiento existente sobre programación. Los cambios de alcance del producto pertenecen a `main.md`; el contenido pedagógico detallado vive aquí.

- Idioma inicial: español.
- Estado: contenido inicial para revisión; no sustituye documentación oficial ni asesoramiento de seguridad.
- Trazabilidad: `MAIN-002`, `MAIN-003`, `MAIN-011`, `MAIN-012`, `MAIN-014`, `MAIN-016`, `MAIN-018`, `MAIN-019`.
- No incluir soluciones de ejercicios en este archivo; sus enunciados y resultados viven en `excersice.md`.

## Convenciones de una unidad

Cada unidad de conocimiento debería incluir: ID estable (`DATA-*`), categoría, resumen, explicación, vocabulario, ejemplo neutral o pseudocódigo si ayuda, errores frecuentes, relaciones con otras unidades y fuentes/revisión cuando se incorporen referencias externas. La complejidad debe indicar qué variable mide, mejor/promedio/peor caso cuando corresponda y supuestos. Evitar presentar un ejemplo pedagógico como recomendación de producción.

## Índice de categorías

1. Fundamentos de programación.
2. Paradigmas y programación orientada a objetos.
3. Principios SOLID y buenas prácticas.
4. Arquitectura y organización del software.
5. Patrones de diseño.
6. Complejidad y notación asintótica.
7. Estructuras de datos.
8. Algoritmos y técnicas de resolución.
9. Pruebas, depuración y calidad.
10. Seguridad y criptografía educativa.
11. Programación asíncrona y concurrencia.
12. Desarrollo de interfaces y organización de estilos.

## 1. Fundamentos de programación

### DATA-001 — Algoritmo, programa y proceso

**Concepto ampliado:** Un algoritmo es una entidad matemática y conceptual: una secuencia finita, inequívoca y determinista de pasos diseñados para transformar una entrada en una salida y resolver un problema. Es independiente del lenguaje. Un programa es la materialización de ese algoritmo expresada en un lenguaje de programación formal (código fuente). Por último, un proceso es la instancia dinámica y viva de ese programa cuando el sistema operativo lo carga en la memoria RAM para su ejecución, asignándole recursos como un espacio de memoria, un PID (Process ID) y un hilo de ejecución.

**Ejemplo:**

- **Algoritmo:** "Para saber si un número es par, divídelo por 2; si el resto es 0, es par".
- **Programa:** El archivo `script.js` guardado en tu disco con el código `const esPar = (n) => n % 2 === 0;`
- **Proceso:** La ejecución de `script.js` en Node.js, consumiendo 30MB de memoria RAM en este momento exacto.

### DATA-002 — Valores, tipos y variables

**Concepto ampliado:** Un valor es la unidad mínima de información (ej. `42` o `"Ana"`). Su tipo es un metadato crucial que dicta al compilador o intérprete cuánta memoria asignar y qué conjunto de operaciones son semánticamente válidas (no puedes dividir una cadena de texto). Una variable es un identificador simbólico y legible por humanos que el sistema mapea a una dirección física de memoria donde reside el valor. Los lenguajes varían en cómo manejan esto: tipado estático (el tipo se conoce en compilación) o dinámico (se evalúa en ejecución).

**Ejemplo:**

```python
# Python tiene tipado dinámico pero fuerte.
edad = 25          # 'edad' es la variable, 25 el valor, entero (int) el tipo
nombre = "Ana"     # 'nombre' es la variable, cadena (str) el tipo

# Las operaciones están restringidas por el tipo:
# print(edad + nombre)  # Esto arrojaría un TypeError
```

### DATA-003 — Expresiones y operadores

**Concepto ampliado:** Una expresión es cualquier bloque de código que se evalúa para retornar un único valor, a diferencia de una "declaración" (statement) que realiza una acción pero no necesariamente devuelve algo. Los operadores instruyen cálculos o evaluaciones (aritméticos, lógicos, de bits). Un comportamiento fundamental es la "evaluación de cortocircuito" (short-circuiting): en una operación lógica (`AND`, `OR`), el motor detiene la evaluación de la expresión en el momento en que el resultado final ya está garantizado, lo cual se usa frecuentemente para evitar errores en tiempo de ejecución.

**Ejemplo:**

```javascript
let usuario = null;

// Cortocircuito: Como 'usuario' es null (falso), la segunda parte NUNCA se evalúa.
// Esto evita un error de tipo "Cannot read properties of null".
if (usuario && usuario.tienePermisos) {
    console.log("Acceso concedido");
}
```

### DATA-004 — Decisiones y repetición

**Concepto ampliado:** Son las estructuras que alteran el flujo de control secuencial. Las decisiones (`if`, `switch`) bifurcan la ejecución basándose en evaluaciones booleanas. Las repeticiones (`for`, `while`) ejecutan ciclos sobre un bloque de memoria. Es crítico diseñar bucles con condiciones de salida garantizadas (para evitar bucles infinitos que congelen el proceso) y considerar que anidamientos profundos aumentan drásticamente la complejidad y dificultan el mantenimiento.

**Ejemplo:**

```java
int intentos = 0;
// Bucle con condición de salida clara basada en estado mutable
while (intentos < 3) {
    boolean conexionExitosa = intentarConexion();
    if (conexionExitosa) { // Decisión
        break; // Modifica el flujo rompiendo la repetición
    }
    intentos++; // Prevención de bucle infinito
}
```

### DATA-005 — Funciones y contratos

**Concepto ampliado:** Una función encapsula comportamiento reutilizable. El "contrato" de una función (Design by Contract) establece reglas estrictas: Precondiciones (estado válido requerido antes de la ejecución), Postcondiciones (garantías del resultado) e Invariantes (estado que no debe corromperse). Es importante distinguir parámetros (variables definidas en la firma de la función) de argumentos (datos reales pasados en la invocación). Si usa recursividad, exige un "caso base" para desenrollar la pila de llamadas y evitar un `StackOverflow`.

**Ejemplo:**

```typescript
// Contrato explícito mediante tipos y validaciones
function retirarDinero(saldoActual: number, montoARetirar: number): number {
    // Precondición
    if (montoARetirar <= 0) throw new Error("El monto debe ser mayor a 0");
    if (montoARetirar > saldoActual) throw new Error("Fondos insuficientes");
    
    // Postcondición: el nuevo saldo es retornado
    return saldoActual - montoARetirar;
}
```

### DATA-006 — Alcance, estado y efectos

**Concepto ampliado:** El alcance (scope) dicta el contexto léxico donde un nombre (variable/función) existe y es accesible. El estado es la memoria retenida por la aplicación en un momento dado. Un "efecto secundario" (side effect) ocurre cuando una función muta estado fuera de su alcance local (escribir en BD, mutar variable global, hacer una petición HTTP). Una "función pura" es determinista: dados los mismos argumentos, devuelve siempre el mismo resultado sin producir efectos secundarios, lo que la hace trivial de testear.

**Ejemplo:**

```javascript
let total = 0; // Estado global

// Función IMPURA: Muta estado externo y su resultado depende del contexto
function agregarImpuro(valor) {
    total += valor; 
    return total;
}

// Función PURA: Solo depende de sus inputs, no afecta el exterior
function agregarPuro(acumulado, valor) {
    return acumulado + valor;
}
```

### DATA-007 — Colecciones e iteración

**Concepto ampliado:** Las colecciones agrupan datos en memoria (arrays, sets, mapas, listas enlazadas). Iterar es el proceso de atravesar esta estructura. Los lenguajes modernos favorecen enfoques funcionales o declarativos (como `map`, `filter`, `reduce`), donde se especifica *qué* hacer con cada elemento en lugar de *cómo* controlar el puntero del bucle. Al transformar colecciones, es vital saber si la operación es destructiva (muta la colección original) o inmutable (devuelve una nueva).

**Ejemplo:**

```python
usuarios = [
    {"nombre": "Ana", "activo": True},
    {"nombre": "Luis", "activo": False},
    {"nombre": "Juan", "activo": True}
]

# Iteración declarativa: filtramos sin mutar la lista original
usuarios_activos = list(filter(lambda u: u["activo"], usuarios))
```

### DATA-008 — Errores y excepciones

**Concepto ampliado:** Representan estados de falla en el sistema. Pueden ser manejados como valores de retorno explícitos (común en lenguajes como Go o Rust) o mediante interrupciones del flujo normal lanzando Excepciones (Java, Python, JS). Atrapar un error (`catch/except`) conlleva la responsabilidad de solucionarlo, registrarlo (log) o envolverlo con más contexto y relanzarlo; "tragar" el error (atraparlo y no hacer nada) es un antipatrón grave que enmascara problemas sistémicos.

**Ejemplo:**

```javascript
try {
    const config = JSON.parse(leerArchivoConfig());
} catch (error) {
    // Manejo: Proveer contexto y un plan de respaldo (fallback)
    console.error("Fallo al parsear config. Usando valores por defecto.", error.message);
    usarConfiguracionPorDefecto();
}
```

### DATA-009 — Mutabilidad, copia y referencias

**Concepto ampliado:** Los tipos primitivos suelen asignarse por valor (copia independiente), pero los objetos y arreglos se asignan por referencia (la variable apunta a la dirección de memoria original). Esto crea *aliasing*: múltiples variables apuntando a un mismo objeto; mutar una, muta todas. Para evitarlo se usan copias. Una "copia superficial" (shallow copy) solo duplica el primer nivel, mientras que una "copia profunda" (deep copy) clona recursivamente todos los objetos anidados.

**Ejemplo:**

```javascript
const original = { perfil: { edad: 20 }, nombre: "Bob" };

// Referencia (Aliasing)
const ref = original; 

// Copia superficial (Shallow Copy)
const copiaSuperficial = { ...original }; 

// Copia profunda (Deep Copy)
const copiaProfunda = structuredClone(original); 

copiaSuperficial.perfil.edad = 99; // ¡Modifica también a 'original' porque comparten la ref de 'perfil'!
copiaProfunda.perfil.edad = 50;    // Seguro, no afecta al original
```

### DATA-010 — Módulos, dependencias y abstracción

**Concepto ampliado:** Los módulos son unidades de código que agrupan responsabilidades afines para dividir un sistema grande en piezas manejables. Una dependencia se genera cuando un módulo requiere de otro para funcionar. La abstracción es el límite arquitectónico entre módulos: expone una API pública y estable (lo que hace) mientras oculta los detalles de implementación internos (cómo lo hace). Esto permite reemplazar implementaciones enteras sin romper los sistemas que dependen de ellas.

**Ejemplo:**

```python
# --- modulo_db.py ---
# Detalle de implementación (oculto / privado conceptualmente)
def _conectar_postgres(): 
    pass 

# Abstracción pública (exportada)
def guardar_usuario(datos):
    db = _conectar_postgres()
    # lógica de guardado...

# --- main.py ---
# El consumidor depende de la abstracción, sin importar si es Postgres o MySQL
from modulo_db import guardar_usuario 
guardar_usuario({"nombre": "Alice"})
```

### DATA-010.5 — Tipado Estático vs. Dinámico

**Concepto ampliado:** Define cuándo y cómo el lenguaje verifica las reglas de tipo. En tipado **estático** (Java, TypeScript, C#), la validación ocurre en tiempo de compilación; el programa no se ejecutará si hay errores de tipos. En tipado **dinámico** (JavaScript, Python, Ruby), la validación ocurre durante la ejecución, brindando más flexibilidad pero requiriendo mayor cobertura de pruebas para evitar fallos (crashes) en producción.

**Ejemplo:**

```typescript
// Tipado Estático (TypeScript): El error salta en el editor antes de ejecutar
let edad: number = 25;
// edad = "Veinticinco"; // Error de compilación: Type 'string' is not assignable to type 'number'
```

## 2. Paradigmas y programación orientada a objetos

### DATA-011 — Paradigmas

**Concepto ampliado:** Un paradigma es una filosofía o marco conceptual que dicta cómo estructurar y razonar sobre el código.

- **Imperativo:** Se centra en el *cómo*. Se detallan los pasos exactos y el control del flujo (ej. C, Ensamblador).
- **Declarativo:** Se centra en el *qué*. Se describe el resultado deseado y el motor subyacente decide cómo lograrlo (ej. SQL, HTML).
- **Orientado a Objetos (POO):** Modela el dominio como entidades que agrupan estado (atributos) y comportamiento (métodos), interactuando mediante paso de mensajes.
- **Funcional:** Trata la computación como evaluación de funciones matemáticas puras, evitando el estado compartido y la mutabilidad.
Hoy en día, la mayoría de los lenguajes (Python, JS, C#) son multiparadigma y permiten combinar estas filosofías.

**Ejemplo:**

```javascript
const numeros = [1, 2, 3, 4, 5];

// Enfoque Imperativo (detalla el CÓMO iterar y mutar estado)
const pares = [];
for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) pares.push(numeros[i]);
}

// Enfoque Declarativo/Funcional (detalla QUÉ resultado queremos)
const paresFuncional = numeros.filter(n => n % 2 === 0);
```

### DATA-012 — Clases, objetos e instancias

**Concepto ampliado:** Una clase es un plano arquitectónico, un molde estático definido en el código fuente que describe la estructura y capacidades de un tipo de dato. Un objeto (o instancia) es la manifestación concreta de esa clase en la memoria RAM (heap) durante la ejecución. Cada instancia posee su propia **identidad** (dirección en memoria), su propio **estado** (valores específicos de sus atributos en un momento dado) y comparte el **comportamiento** (métodos) con las demás instancias de su clase.

**Ejemplo:**

```python
# La Clase (el molde)
class Usuario:
    def __init__(self, nombre):
        self.nombre = nombre # Estado
        
    def saludar(self):       # Comportamiento
        return f"Hola, soy {self.nombre}"

# Las Instancias (objetos vivos en memoria)
usuario1 = Usuario("Ana")
usuario2 = Usuario("Carlos")

print(usuario1.saludar()) # Tienen identidades y estados distintos
```

### DATA-013 — Encapsulación e invariantes

**Concepto ampliado:** Un error común es creer que encapsular es simplemente hacer las variables `private` y generar `getters` y `setters` automáticos. La verdadera encapsulación consiste en **proteger las invariantes** de un objeto. Una invariante es una regla de negocio que siempre debe ser verdadera (ej. "el saldo nunca puede ser negativo" o "la fecha de fin debe ser posterior a la de inicio"). El objeto debe ser el único responsable de mutar su estado, validando las reglas antes de permitir un cambio, impidiendo que consumidores externos lo dejen en un estado corrupto o inválido.

**Ejemplo:**

```java
public class CuentaBancaria {
    private decimal saldo; // Oculto al mundo exterior

    // Constructor que establece un estado inicial válido
    public CuentaBancaria(decimal depositoInicial) {
        if (depositoInicial < 0) throw new Exception("Inválido");
        this.saldo = depositoInicial;
    }

    // El método protege la invariante: no permite saldos negativos
    public void retirar(decimal monto) {
        if (monto <= 0 || monto > this.saldo) {
            throw new IllegalArgumentException("Operación inválida");
        }
        this.saldo -= monto;
    }
}
```

### DATA-014 — Abstracción, composición y delegación

**Concepto ampliado:**

- La **abstracción** oculta la complejidad interna, exponiendo solo una interfaz simple (ej. presionar el pedal del acelerador sin saber de inyección de combustible).
- La **composición** es el principio de construir objetos complejos ensamblando objetos más simples (relación "Tiene-Un"), en lugar de crear grandes jerarquías de herencia.
- La **delegación** ocurre cuando el objeto principal recibe una petición, pero le pasa el trabajo real a uno de sus componentes internos para que la resuelva.

**Ejemplo:**

```typescript
// Composición: El Auto "tiene un" Motor
class Motor {
    arrancar() { console.log("Motor en marcha..."); }
}

class Auto {
    private motor: Motor;

    constructor() {
        this.motor = new Motor(); // Se compone de un Motor
    }

    encenderAuto() {
        // Delegación: El auto le delega la responsabilidad de arrancar al motor
        this.motor.arrancar(); 
    }
}
```

### DATA-015 — Herencia y polimorfismo

**Concepto ampliado:** La **herencia** permite que una clase derive de otra, adquiriendo sus métodos y propiedades (relación "Es-Un"). Sin embargo, genera un acoplamiento muy fuerte. El **polimorfismo** (del griego "muchas formas") es la capacidad de tratar diferentes objetos a través de una interfaz común, permitiendo que el mismo método se comporte de manera distinta según el objeto que lo ejecuta (resolución dinámica o *dynamic dispatch*).

**Ejemplo:**

```csharp
// Interfaz común
public abstract class Notificador {
    public abstract void Enviar(string mensaje);
}

public class EmailNotificador : Notificador {
    public override void Enviar(string mensaje) { /* Lógica SMTP */ }
}

public class SMSNotificador : Notificador {
    public override void Enviar(string mensaje) { /* Lógica Twilio */ }
}

// Polimorfismo en acción: El sistema no sabe si es Email o SMS, solo llama a Enviar()
public void Alerta(Notificador notificador) {
    notificador.Enviar("Sistema caído"); 
}
```

### DATA-016 — Cohesión y acoplamiento

**Concepto ampliado:** Son las dos métricas arquitectónicas más importantes.

- **Cohesión:** Mide cuán enfocadas están las responsabilidades de un módulo. Alta cohesión significa que la clase hace una sola cosa y la hace bien. Baja cohesión significa que la clase es un "cajón de sastre" con responsabilidades no relacionadas.
- **Acoplamiento:** Mide el grado de interdependencia entre módulos. Alto acoplamiento significa que si cambias la Clase A, inevitablemente rompes la Clase B.
El objetivo universal del diseño de software es lograr **alta cohesión y bajo acoplamiento**.

**Ejemplo:**

```php
// MALO: Baja Cohesión y Alto Acoplamiento
class Empleado {
    public function calcularSalario() { /* lógica */ }
    public function guardarEnBaseDeDatos() { /* lógica SQL hardcodeada */ } // No debería saber de bases de datos
}

// BUENO: Alta Cohesión
class CalculadoraSalario {
    public function calcular(Empleado $e) { /* lógica pura */ }
}

class EmpleadoRepository {
    public function guardar(Empleado $e) { /* solo lógica SQL */ }
}
```

### Conceptos Agregados: Complementos de POO

### DATA-016.5 — Interfaces vs. Clases Abstractas

**Concepto ampliado:** Aunque ambas se usan para lograr polimorfismo, tienen propósitos distintos. Una **Interfaz** define un contrato estricto de comportamiento (QUÉ debe hacer una clase) sin proveer ninguna implementación ni estado. Una **Clase Abstracta** puede proveer código base reutilizable y estado interno compartido (atributos), pero no puede ser instanciada directamente, obligando a sus hijos a completar los detalles faltantes.

### DATA-016.6 — Mixins y Traits

**Concepto ampliado:** Lenguajes que no soportan herencia múltiple (como PHP, Ruby o Dart) proveen Traits o Mixins. Son conjuntos de métodos que pueden ser inyectados directamente en una o varias clases ortogonales (que no comparten herencia). Sirven para compartir comportamiento horizontalmente sin forzar una jerarquía artificial.

**Ejemplo:**

```php
trait Loggeable {
    public function log($msg) { echo "[LOG] " . $msg; }
}

class Usuario {
    use Loggeable; // Inyecta el comportamiento
}

$u = new Usuario();
$u->log("Usuario creado"); // El método existe gracias al trait
```

## 3. SOLID y buenas prácticas

### DATA-017 — Responsabilidad única (SRP - Single Responsibility Principle)

**Concepto ampliado:** Una clase, módulo o función debe tener una, y solo una, razón para cambiar. Robert C. Martin (Uncle Bob) aclara que esta "razón" se refiere a los *actores* del sistema. Si dos departamentos distintos (ej. Contabilidad y DBA) pueden pedirte cambios que afecten al mismo archivo, estás violando el SRP. Esto se evalúa mediante la cohesión: si agrupas lógicas que cambian por diferentes motivos, el código se vuelve frágil.

**Ejemplo:**

```python
# MALO: La clase cambia si se modifica el cálculo (RRHH) o si cambia el formato del recibo (UI)
class Empleado:
    def calcular_pago(self): pass
    def imprimir_recibo_pdf(self): pass

# BUENO: Separación de responsabilidades
class Empleado:
    def calcular_pago(self): pass

class ImpresoraRecibos:
    def imprimir_pdf(self, empleado): pass
```

### DATA-018 — Abierto/cerrado (OCP - Open/Closed Principle)

**Concepto ampliado:** Las entidades de software deben estar "abiertas para su extensión, pero cerradas para su modificación". Es decir, debes poder agregar nuevo comportamiento escribiendo *nuevo* código, no modificando el código que ya funciona y está en producción. Esto se logra abusando de abstracciones (interfaces) y polimorfismo. Modificar sentencias `switch` o cadenas de `if/else` constantemente es el síntoma clásico de violar este principio.

**Ejemplo:**

```java
// MALO: Cada vez que hay un nuevo método, debes modificar esta clase.
class Checkout {
    void procesar(String metodo) {
        if (metodo.equals("Tarjeta")) { /* ... */ }
        else if (metodo.equals("PayPal")) { /* ... */ }
    }
}

// BUENO: Abierto a la extensión (agregas clases), cerrado a la modificación de 'Checkout'
interface MetodoPago { void pagar(); }
class Checkout {
    void procesar(MetodoPago metodo) { metodo.pagar(); }
}
```

### DATA-019 — Sustitución de Liskov (LSP - Liskov Substitution Principle)

**Concepto ampliado:** Formulado por Barbara Liskov, establece que las clases derivadas deben poder sustituir a sus clases base sin alterar el comportamiento correcto del programa. Un subtipo no debe exigir precondiciones más estrictas (ej. rechazar un parámetro que el padre aceptaba) ni debilitar las postcondiciones. Violar LSP a menudo se ve cuando una clase hija lanza una excepción `NotImplementedException` para un método que heredó pero no sabe cómo usar.

**Ejemplo:**

```csharp
// MALO: El PatoDePlastico rompe el contrato de "Ave"
public class Ave {
    public virtual void Volar() { /* vuela */ }
}

public class PatoDePlastico : Ave {
    public override void Volar() {
        throw new Exception("Los patos de plástico no vuelan"); // ¡Violación de LSP!
    }
}
// Solución: Separar en interfaces como IVolador.
```

### DATA-020 — Segregación de interfaces (ISP - Interface Segregation Principle)

**Concepto ampliado:** Ningún cliente debería verse forzado a depender de métodos que no utiliza. Las "interfaces gordas" (fat interfaces) agrupan demasiadas capacidades distintas. Si una clase implementa una interfaz pero deja varios métodos vacíos o devuelve errores porque no los necesita, la interfaz debe segregarse (dividirse) en contratos más pequeños y específicos.

**Ejemplo:**

```typescript
// MALO: Interfaz gorda
interface Trabajador {
    trabajar(): void;
    comer(): void;
}

class Robot implements Trabajador {
    trabajar() { console.log("Procesando"); }
    comer() { throw new Error("Los robots no comen"); } // Violación
}

// BUENO: Interfaces segregadas
interface Laborable { trabajar(): void; }
interface Alimentable { comer(): void; }

class Robot implements Laborable { /* solo implementa trabajar() */ }
```

### DATA-021 — Inversión de dependencias (DIP - Dependency Inversion Principle)

**Concepto ampliado:** Los módulos de alto nivel (políticas de negocio) no deben depender de los módulos de bajo nivel (detalles de infraestructura como bases de datos o APIs). Ambos deben depender de abstracciones (interfaces). DIP es el principio arquitectónico; la Inyección de Dependencias (DI) es simplemente la técnica/patrón para lograrlo (pasando la dependencia por el constructor).

**Ejemplo:**

```php
// MALO: El servicio (alto nivel) depende directamente de MySQL (detalle de bajo nivel)
class UsuarioService {
    private $db;
    public function __construct() {
        $this->db = new MySQLConnection(); // Acoplamiento rígido
    }
}

// BUENO: Depende de una abstracción. Se puede inyectar MongoConnection o MySQLConnection.
interface DatabaseConnection {}

class UsuarioService {
    private $db;
    public function __construct(DatabaseConnection $db) {
        $this->db = $db;
    }
}
```

### DATA-022 — Legibilidad, nombres y formato

**Concepto ampliado:** El código se lee unas 10 veces más de lo que se escribe. Nombres intencionales (que revelan propósito) son mejores que los comentarios. Los comentarios deben explicar el *porqué* (decisiones de negocio, workarounds) y no el *qué* (lo cual debería ser evidente por el código). Un formato consistente reduce la carga cognitiva del lector.

**Ejemplo:**

```javascript
// MALO
let d; // tiempo transcurrido en días
const r = 10; // límite

// BUENO (El código se documenta a sí mismo)
let diasTranscurridos = 0;
const LIMITE_DIAS_PRUEBA = 10;

// COMENTARIO ÚTIL (Explica el porqué)
// Usamos Math.floor en lugar de Math.round por la regulación fiscal X.
const total = Math.floor(subtotal);
```

### DATA-023 — Duplicación y abstracción

**Concepto ampliado:** Relacionado con el principio DRY (Don't Repeat Yourself). Sin embargo, hay una trampa común: la *duplicación accidental*. Si dos fragmentos de código son idénticos hoy, pero representan reglas de negocio de departamentos distintos (que mutarán por razones diferentes en el futuro), abstraerlos en una sola función creará un acoplamiento terrible. Abstrae el conocimiento, no solo los caracteres de texto.

**Ejemplo:**

```python
# Cuidado con abstraer prematuramente:
# Validar la edad de un 'Usuario' y los años de antigüedad de un 'Edificio'
# podrían usar el mismo código hoy: `if valor < 0: raise Error`
# Pero son conceptos distintos. Juntarlos en un `validar_numero_positivo` general 
# puede oscurecer casos particulares futuros (ej. si Edificio permite 0 pero Usuario requiere > 18).
```

### DATA-024 — Principio de menor sorpresa y simplicidad

**Concepto ampliado:** Una función, clase o API debe hacer exactamente lo que su nombre sugiere, sin efectos secundarios ocultos. Si tienes un método llamado `getUsuario()`, el programador que lo consuma esperará que solo retorne datos; si ese método silenciosamente crea un usuario en la base de datos si no lo encuentra, causará sorpresa y bugs. A esto se le suma el principio KISS (Keep It Simple, Stupid): la complejidad debe justificarse.

**Ejemplo:**

```java
// Sorpresa Oculta (Antipatrón)
public boolean validarPassword(String pass) {
    if (pass.length() > 8) {
        this.sesion.loguear(); // EFECTO SECUNDARIO OCULTO. ¡El nombre solo decía "validar"!
        return true;
    }
    return false;
}
```

### DATA-024.5 — DRY, KISS y YAGNI

**Concepto ampliado:** El triángulo de oro de la mantenibilidad en metodologías ágiles:

- **DRY (Don't Repeat Yourself):** Cada pieza de conocimiento del dominio debe tener una única representación autoritativa en el sistema.
- **KISS (Keep It Simple, Stupid):** Evitar la sobreingeniería (ej. implementar 5 patrones de diseño para un script que solo lee un archivo).
- **YAGNI (You Aren't Gonna Need It):** No programes características pensando "por si acaso lo necesitamos en el futuro". El código no utilizado es deuda técnica pasiva que igual debes compilar, testear y mantener.

## 4. Arquitectura y organización

### DATA-025 — MVC (Model-View-Controller)

**Concepto ampliado:** Model-View-Controller separa el estado y las reglas de negocio (Modelo), la presentación al usuario (Vista) y la coordinación de entradas/salidas (Controlador). El anti-patrón más común es el "Controlador Gordo" (*Fat Controller*), donde la lógica de negocio, consultas a base de datos y validaciones ocurren en el controlador. El modelo **no** es solo una representación de una tabla de base de datos (como un ORM tradicional nos hace creer), sino donde debe vivir la lógica pura del dominio. MVC es una topología de presentación, no una arquitectura de sistema completo.

**Ejemplo (Anti-patrón vs Buen diseño en un Controlador):**

```typescript
// ❌ MAL: Controlador Gordo (mezcla HTTP, lógica y base de datos)
class UserController {
  async register(req, res) {
    if (!req.body.email) return res.status(400).send("Falta email");
    const exists = await db.query("SELECT * FROM users WHERE email = ?", [req.body.email]);
    if (exists) return res.status(400).send("El email ya existe");
    // ... más lógica, hash de password, guardado, envío de email ...
  }
}

// ✅ BIEN: Controlador Delgado (Solo coordina HTTP y delega)
class UserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async register(req, res) {
    try {
      // El controlador solo traduce de HTTP a un DTO y delega al Caso de Uso
      const user = await this.registerUserUseCase.execute(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
```

### DATA-026 — Arquitectura hexagonal (Puertos y Adaptadores)

**Concepto ampliado:** Su objetivo es aislar la lógica de negocio central (el dominio) de las tecnologías externas (bases de datos, frameworks web, APIs de terceros). El centro de la aplicación se comunica con el exterior únicamente a través de **Puertos** (Interfaces abstractas). El exterior se conecta al centro a través de **Adaptadores** (Implementaciones concretas de esas interfaces). La regla de oro es que las dependencias siempre apuntan hacia adentro: el dominio no sabe nada de SQL, HTTP o Redis.

**Ejemplo (Puerto y Adaptador en TypeScript):**

```typescript
// 1. PUERTO (Vive en la capa de Dominio, no sabe de bases de datos)
export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}

// 2. ADAPTADOR (Vive en Infraestructura, depende de un ORM o Driver)
export class PostgresUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await db.query("INSERT INTO users...", [user.id, user.email]);
  }
  async findByEmail(email: string): Promise<User | null> { /* ... */ }
}
```

### DATA-027 — Capas y límites

**Concepto ampliado:** Una arquitectura por capas (Layered Architecture) organiza el código en niveles de abstracción horizontales: **Presentación** (UI/HTTP), **Aplicación** (Casos de uso), **Dominio** (Lógica core) e **Infraestructura** (BBDD, herramientas). Cada límite debe tener reglas de cruce estrictas. Si la capa de Presentación llama directamente a la de Infraestructura, se rompe el límite y se genera acoplamiento (*Spaghetti code*). Una capa adicional solo tiene sentido si protege un límite conceptual (ej. un DTO mapper).

**Ejemplo (Estructura de directorios respetando límites):**

```text
src/
 ├─ Domain/          (Reglas de negocio, Entidades, Interfaces de Repositorios)
 ├─ Application/     (Casos de Uso, DTOs)
 ├─ Infrastructure/  (Adaptadores SQL, Integración con APIs externas)
 └─ Presentation/    (Controladores REST, GraphQL resolvers)
```

### DATA-028 — Dominio y casos de uso

**Concepto ampliado:** El **Dominio** contiene los conceptos irrefutables del negocio (Entidades, Objetos de Valor e Invariantes). No depende de ningún framework. Un **Caso de Uso** (o Servicio de Aplicación) es el director de orquesta que representa una acción específica que el actor puede realizar en el sistema. Recupera entidades desde repositorios, invoca métodos del dominio para mutar el estado y guarda los cambios.

**Ejemplo (Caso de Uso orquestando el Dominio):**

```typescript
// Entidad de Dominio (pura, sin dependencias externas)
class Account {
  constructor(public id: string, private balance: number) {}
  
  withdraw(amount: number) {
    if (amount > this.balance) throw new Error("Fondos insuficientes");
    this.balance -= amount;
  }
}

// Caso de Uso (Capa de aplicación)
class WithdrawMoneyUseCase {
  constructor(private accountRepo: AccountRepository) {}

  async execute(accountId: string, amount: number) {
    const account = await this.accountRepo.findById(accountId);
    account.withdraw(amount); // La regla de negocio se evalúa en la Entidad
    await this.accountRepo.save(account);
  }
}
```

### DATA-029 — Monolito modular y servicios distribuidos

**Concepto ampliado:** Un **Monolito** despliega todo el código en un único proceso. Un **Monolito Modular** mantiene esto, pero aísla los dominios internamente (con directorios o paquetes estrictos) para evitar el acoplamiento. Un **Sistema Distribuido** (Microservicios) divide el sistema en procesos independientes que se comunican por red. Los microservicios introducen los problemas de la red: latencia, fallos de comunicación y consistencia eventual. Separar en microservicios debe responder a necesidades de escalabilidad organizacional o técnica comprobables, no a modas; un monolito modular suele ser superior para equipos pequeños y medianos.

**Ejemplo (Comparación de comunicación):**

```typescript
// Monolito Modular (Llamada en memoria, rápida, transaccional)
const invoice = await invoiceModule.generate(userId);

// Microservicios (Llamada de red, latencia, requiere manejo de fallos)
const response = await fetch('http://invoice-service/api/generate', { ... });
if (!response.ok) {
  // Manejo de retries, circuit breakers, compensaciones (Sagas)
}
```

### DATA-030 — Contratos y separación de responsabilidades

**Concepto ampliado:** Un contrato técnico (Interface, DTO, Schema) documenta las expectativas formales entre dos límites. Separar responsabilidades implica que la forma en que los datos se almacenan (Modelo de BD) no debe ser la misma en que se procesan (Entidad de Dominio), ni en la que se exponen (Respuesta HTTP). Exponer el modelo de base de datos directamente a la API acopla la vista a la persistencia y puede filtrar datos sensibles.

**Ejemplo (Uso de DTOs para respetar contratos):**

```typescript
// El modelo interno (con contraseña) NUNCA debe salir de la API
class User {
  id: string;
  email: string;
  passwordHash: string; 
}

// DTO de Salida (Contrato explícito con el consumidor de la API)
class UserResponseDTO {
  id: string;
  email: string;

  static fromEntity(user: User): UserResponseDTO {
    return { id: user.id, email: user.email };
  }
}
```

### DATA-030.5 — CQRS (Command Query Responsibility Segregation) [Adición]

**Concepto ampliado:** Es un patrón arquitectónico que separa las operaciones que mutan el estado (Commands / Escrituras) de las que leen el estado (Queries / Lecturas). En sistemas complejos, el modelo óptimo para validar reglas de negocio al escribir suele ser muy ineficiente para consultar datos. CQRS permite usar un modelo estructurado (DDD) para las escrituras, y vistas desnormalizadas o incluso bases de datos distintas (ej. PostgreSQL para comandos, ElasticSearch o Redis para queries) para lecturas rápidas.

**Ejemplo conceptual:**

- **Command:** `CreateOrderCommand` -> Pasa por validaciones estrictas del Dominio -> Guarda en BD relacional.
- **Query:** `GetOrderSummaryQuery` -> No pasa por el dominio -> Hace un simple `SELECT` o lee de una tabla desnormalizada enfocada a velocidad.

## 5. Patrones de diseño

Los patrones de diseño son soluciones estandarizadas y reutilizables a problemas recurrentes de arquitectura y diseño orientado a objetos. No constituyen librerías ni código ejecutable directo, sino plantillas conceptuales que deben adaptarse al contexto específico del dominio.

---

### DATA-031 — Factory Method / Factory

**Propósito y explicación profunda:**
El patrón Factory desvincula la creación de una familia de objetos de su consumo directo. El cliente solicita una instancia basada en un criterio o abstracción sin conocer la clase concreta que se instanciará ni la lógica de ensamblaje subyacente.

- **Cuándo usarlo:** Cuando la clase exacta que se debe crear depende de datos en tiempo de ejecución, configuraciones dinámicas o reglas de negocio complejas; o cuando se desea delegar a subclases la decisión de qué objeto concreto instanciar.
- **Cuándo evitarlo:** En casos triviales donde la instanciación es directa (`new Objeto()`) y no existe variabilidad; introducir factorías indiscriminadas genera sobreingeniería (*FactoryFactory* antipattern).
- **Trade-offs:** Incrementa la flexibilidad y respeta el principio Open/Closed (OCP), a costa de añadir capas adicionales de abstracción y mayor número de clases.

**Ejemplo práctico (TypeScript):**

```typescript
interface Notificador {
  enviar(destinatario: string, mensaje: string): Promise<void>;
}

class EmailNotificador implements Notificador {
  async enviar(destinatario: string, mensaje: string): Promise<void> {
    console.log(`Email enviado a ${destinatario}: ${mensaje}`);
  }
}

class SMSNotificador implements Notificador {
  async enviar(destinatario: string, mensaje: string): Promise<void> {
    console.log(`SMS enviado a ${destinatario}: ${mensaje}`);
  }
}

// Factoría con lógica de decisión centralizada
class NotificadorFactory {
  static crear(tipo: 'email' | 'sms'): Notificador {
    switch (tipo) {
      case 'email':
        return new EmailNotificador();
      case 'sms':
        return new SMSNotificador();
      default:
        throw new Error(`Tipo de notificador no soportado: ${tipo}`);
    }
  }
}
```

**Errores comunes / Anti-patrones:**

- Condicionales dispersos por el código en lugar de encapsular la selección de tipos en la factoría.
- Hacer que la factoría devuelva clases concretas en lugar de interfaces o contratos abstractos, anulando el polimorfismo.

---

### DATA-032 — Builder

**Propósito y explicación profunda:**
Separa la construcción de un objeto complejo de su representación final, permitiendo producir distintos tipos y representaciones empleando el mismo proceso de construcción paso a paso.

- **Cuándo usarlo:** Al instanciar objetos con constructores "telescópicos" (múltiples parámetros opcionales y nulos), o cuando el objeto resultante debe validar invariantes compuestas solo tras finalizar todos los pasos de inicialización.
- **Cuándo evitarlo:** Para objetos planos (DTOs simples) o estructuras inmutables con dos o tres campos predecibles.
- **Trade-offs:** Elimina constructores confusos y estados intermedios mutables incompletos, pero requiere escribir clases constructoras dedicadas.

**Ejemplo práctico (TypeScript):**

```typescript
class ConsultaSQL {
  tabla: string = '';
  columnas: string[] = ['*'];
  condiciones: string[] = [];

  obtenerQuery(): string {
    const where = this.condiciones.length ? ` WHERE ${this.condiciones.join(' AND ')}` : '';
    return `SELECT ${this.columnas.join(', ')} FROM ${this.tabla}${where};`;
  }
}

class ConsultaSQLBuilder {
  private consulta = new ConsultaSQL();

  enTabla(tabla: string): this {
    this.consulta.tabla = tabla;
    return this;
  }

  conColumnas(...columnas: string[]): this {
    this.consulta.columnas = columnas;
    return this;
  }

  donde(condicion: string): this {
    this.consulta.condiciones.push(condicion);
    return this;
  }

  construir(): ConsultaSQL {
    if (!this.consulta.tabla) {
      throw new Error("Invariante violada: la tabla es obligatoria");
    }
    return this.consulta;
  }
}

// Uso fluido
const query = new ConsultaSQLBuilder()
  .enTabla("usuarios")
  .conColumnas("id", "email")
  .donde("activo = 1")
  .construir()
  .obtenerQuery();
```

**Errores comunes / Anti-patrones:**

- Dejar el objeto en un estado inconsistente antes de invocar el método terminal `construir()` o `build()`.
- Usar un Builder cuando bastaría con un objeto literal de configuración o argumentos tipados opcionales.

---

### DATA-033 — Strategy

**Propósito y explicación profunda:**
Define una familia de algoritmos, encapsula cada uno de ellos bajo una interfaz común y los hace intercambiables en tiempo de ejecución. Permite que el algoritmo varíe independientemente de los clientes que lo utilizan.

- **Cuándo usarlo:** Cuando existen múltiples variantes de una misma operación lógica (ej. cálculos de impuestos, algoritmos de compresión, motores de tarificación) y se quiere evitar sentencias condicionales (`if/switch`) anidadas.
- **Cuándo evitarlo:** Si solo existe una implementación y no hay indicios reales de variabilidad en las reglas de negocio.
- **Trade-offs:** Cumple estrictamente con el principio Open/Closed; sin embargo, incrementa el número total de clases/interfaces y los clientes deben comprender las implicaciones de cada estrategia.

**Ejemplo práctico (PHP):**

```php
<?php

interface EstrategiaDescuento {
    public function calcular(float $monto): float;
}

class DescuentoBlackFriday implements EstrategiaDescuento {
    public function calcular(float $monto): float {
        return $monto * 0.70; // 30% de descuento
    }
}

class SinDescuento implements EstrategiaDescuento {
    public function calcular(float $monto): float {
        return $monto;
    }
}

class Carrito {
    public function __construct(private EstrategiaDescuento $estrategia) {}

    public function setEstrategia(EstrategiaDescuento $estrategia): void {
        $this->estrategia = $estrategia;
    }

    public function calcularTotal(float $subtotal): float {
        return $this->estrategia->calcular($subtotal);
    }
}
```

**Errores comunes / Anti-patrones:**

- Exponer detalles internos del contexto a las estrategias, acoplando ambos componentes bidireccionalmente.
- Crear una estrategia que depende de efectos secundarios fuera de su interfaz de cálculo.

---

### DATA-034 — Observer / Publish-Subscribe

**Propósito y explicación profunda:**
Establece una relación de dependencia uno a muchos entre objetos, de manera que cuando un objeto (Sujeto/Emisor) cambia de estado o genera un evento, todos sus dependientes (Observadores/Suscriptores) son notificados automáticamente.

- **Cuándo usarlo:** Cuando un cambio en un componente requiere actualizar un conjunto variable de otros componentes sin acoplarse directamente a ellos (ej. logging, métricas, re-renderizado de interfaces reactivas).
- **Cuándo evitarlo:** En flujos secuenciales estrictos donde el orden de ejecución es crítico y debe ser síncrono y predecible.
- **Trade-offs:** Desacopla el emisor de los receptores. En contrapartida, puede ocasionar fugas de memoria (*lapsed listener problem*) si los observadores no se desuscriben al finalizar su ciclo de vida, además de dificultar el seguimiento del flujo de ejecución durante la depuración.

**Ejemplo práctico (TypeScript):**

```typescript
interface Observador<T> {
  actualizar(evento: T): void;
}

class EmisorEventos<T> {
  private suscriptores: Set<Observador<T>> = new Set();

  suscribir(obs: Observador<T>): void {
    this.suscriptores.add(obs);
  }

  desuscribir(obs: Observador<T>): void {
    this.suscriptores.delete(obs);
  }

  notificar(evento: T): void {
    for (const obs of this.suscriptores) {
      obs.actualizar(evento);
    }
  }
}

// Implementación concreta
const auditoria: Observador<string> = {
  actualizar: (evento) => console.log(`[AUDIT]: ${evento}`)
};

const emisor = new EmisorEventos<string>();
emisor.suscribir(auditoria);
emisor.notificar("Orden #101 creada");
```

**Errores comunes / Anti-patrones:**

- No limpiar las referencias a los suscriptores cuando ya no se necesitan, impidiendo que el recolector de basura (GC) libere memoria.
- Lanzar excepciones no controladas dentro de un observador que bloqueen o cancelen la notificación a los observadores subsiguientes.

---

### DATA-035 — Adapter

**Propósito y explicación profunda:**
Convierte la interfaz de una clase existente en otra interfaz que el cliente espera, permitiendo que colaboren clases que de otro modo no podrían debido a contratos o firmas incompatibles.

- **Cuándo usarlo:** Al integrar librerías de terceros, SDKs heredados o servicios externos sin acoplar la arquitectura de la aplicación a sus firmas nativas.
- **Cuándo evitarlo:** Cuando se tiene control total sobre el código fuente original y resulta más coherente refactorizar directamente la clase base.
- **Trade-offs:** Mantiene el código de dominio limpio e independiente de interfaces externas. Sin embargo, añade una capa indirecta de llamadas que debe mantenerse si la API externa sufre variaciones.

**Ejemplo práctico (TypeScript):**

```typescript
// Contrato esperado por nuestro dominio
interface ProcesadorPagoDominio {
  debitar(usuarioId: string, centavos: number): Promise<boolean>;
}

// SDK externo incompatible con nuestras firmas
class StripeSDKLegacy {
  chargeDirect(cents: number, customerToken: string): { success: boolean } {
    return { success: true };
  }
}

// Adaptador
class StripeAdapter implements ProcesadorPagoDominio {
  constructor(private readonly stripe: StripeSDKLegacy) {}

  async debitar(usuarioId: string, centavos: number): Promise<boolean> {
    // Traduce la firma del dominio a la firma esperada por el SDK
    const resultado = this.stripe.chargeDirect(centavos, usuarioId);
    return resultado.success;
  }
}
```

**Errores comunes / Anti-patrones:**

- Mezclar lógica de negocio dentro del adaptador; este debe limitarse a la conversión de interfaces y mapeo de datos.
- Propagar tipos específicos del SDK externo hacia adentro de las firmas del dominio.

---

### DATA-036 — Facade

**Propósito y explicación profunda:**
Proporciona una interfaz simplificada, unificada y de alto nivel a un subsistema complejo compuesto por múltiples clases, librerías o dependencias.

- **Cuándo usarlo:** Para proteger al código cliente de subsistemas densos con dependencias intrincadas, reduciendo la curva de aprendizaje y el acoplamiento.
- **Cuándo evitarlo:** Si la abstracción simplificada oculta parámetros y capacidades que el cliente necesita modular frecuentemente.
- **Trade-offs:** Reduce la superficie de contacto con subsistemas complejos. Puede convertirse en un objeto "Dios" (*God Object*) si acumula métodos arbitrarios sin cohesión.

**Ejemplo práctico (JavaScript/TypeScript):**

```typescript
class ServicioAutenticacion { validarToken(token: string) { return true; } }
class ServicioInventario { verificarStock(item: string) { return true; } }
class ServicioFacturacion { facturar(item: string) { return "FAC-123"; } }

// Fachada que unifica el flujo de compra
class CompraFacade {
  constructor(
    private auth = new ServicioAutenticacion(),
    private inventario = new ServicioInventario(),
    private facturacion = new ServicioFacturacion()
  ) {}

  realizarPedido(token: string, item: string): boolean {
    if (!this.auth.validarToken(token)) throw new Error("No autorizado");
    if (!this.inventario.verificarStock(item)) throw new Error("Sin stock");
    
    this.facturacion.facturar(item);
    return true;
  }
}
```

**Errores comunes / Anti-patrones:**

- Hacer que el Facade intente reemplazar por completo el subsistema, impidiendo el acceso a bajo nivel a componentes avanzados que legítimamente lo requieran.

---

### DATA-037 — Decorator

**Propósito y explicación profunda:**
Añade dinámicamente nuevas responsabilidades o comportamientos a un objeto envolviéndolo en otra instancia compatible con el mismo contrato, sin modificar la clase original ni recurrir a la herencia.

- **Cuándo usarlo:** Cuando se necesitan agregar responsabilidades transversales (caching, logging, reintentos, compresión) de forma componible y acumulable.
- **Cuándo evitarlo:** Cuando la secuencia de envolturas altera el estado interno de manera no predecible o cuando la clase a decorar tiene una interfaz demasiado amplia.
- **Trade-offs:** Cumple el principio Single Responsibility (SRP) y favorece la composición. Por contra, dificulta la inspección de tipos en tiempo de ejecución (ej. `instanceof`) y depurar capas anidadas puede ser complejo.

**Ejemplo práctico (TypeScript):**

```typescript
interface RepositorioDatos {
  obtener(clave: string): Promise<string>;
}

class RepositorioRemoto implements RepositorioDatos {
  async obtener(clave: string): Promise<string> {
    return `Datos desde API para ${clave}`;
  }
}

// Decorador que añade capa de caché transparente
class CacheRepositorioDecorator implements RepositorioDatos {
  private cache = new Map<string, string>();

  constructor(private readonly decorado: RepositorioDatos) {}

  async obtener(clave: string): Promise<string> {
    if (this.cache.has(clave)) {
      return `[CACHE] ${this.cache.get(clave)}`;
    }
    const valor = await this.decorado.obtener(clave);
    this.cache.set(clave, valor);
    return valor;
  }
}
```

**Errores comunes / Anti-patrones:**

- Depender del orden estricto de las envolturas sin documentar la precedencia esperada entre decoradores.
- Crear decoradores que modifican la signatura de los métodos de la interfaz base.

---

### DATA-038 — Repository

**Propósito y explicación profunda:**
Media entre las capas de dominio y de mapeo de datos (persistencia), simulando el comportamiento de una colección en memoria de objetos de dominio. Oculta las consultas SQL, llamadas NoSQL u operaciones directas del ORM.

- **Cuándo usarlo:** En arquitecturas por capas (Hexagonal, Clean, DDD) para desacoplar las reglas de negocio del motor de base de datos concreto.
- **Cuándo evitarlo:** En aplicaciones CRUD ultra simples basadas en Active Record puro donde no existen invariantes de dominio que proteger.
- **Trade-offs:** Hace al dominio completamente testeable mediante dobles de prueba (mocks/in-memory). Añade boilerplate al requerir interfaces y clases de mapeo especializadas.

**Ejemplo práctico (TypeScript):**

```typescript
// Entidad pura
class Usuario {
  constructor(readonly id: string, readonly email: string) {}
}

// Contrato de dominio
interface UsuarioRepository {
  guardar(usuario: Usuario): Promise<void>;
  buscarPorId(id: string): Promise<Usuario | null>;
}

// Implementación concreta en infraestructura
class PostgresUsuarioRepository implements UsuarioRepository {
  async guardar(usuario: Usuario): Promise<void> {
    console.log(`INSERT INTO usuarios VALUES ('${usuario.id}', '${usuario.email}')`);
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return new Usuario(id, "usuario@dominio.com");
  }
}
```

**Errores comunes / Anti-patrones:**

- Retornar objetos nativos del ORM o filas SQL crudas en lugar de entidades del dominio.
- Filtrar por métodos específicos de infraestructura en la interfaz del repositorio (ej. `buscarPorQueryElasticsearch(...)`).

---

### DATA-039 — Command

**Propósito y explicación profunda:**
Encapsula una solicitud o acción como un objeto independiente, conteniendo toda la información necesaria para ejecutarla, posponerla, registrarla o revertirla (*undo*).

- **Cuándo usarlo:** Para encolar operaciones, implementar historiales de operaciones deshechas/rehacer, crear registros de auditoría o desacoplar el emisor que dispara una acción del receptor que la ejecuta.
- **Cuándo evitarlo:** En llamadas síncronas directas de métodos donde no se necesita estado, registro ni capacidad de diferimiento.
- **Trade-offs:** Modularidad alta y soporte nativo para transacciones y colas; sin embargo, incrementa sensiblemente la cantidad de clases requeridas.

**Ejemplo práctico (TypeScript):**

```typescript
interface Comando {
  ejecutar(): void;
  deshacer(): void;
}

class EditorTexto {
  contenido: string = "";
}

class InsertarTextoComando implements Comando {
  constructor(
    private editor: EditorTexto,
    private textoAInsertar: string
  ) {}

  ejecutar(): void {
    this.editor.contenido += this.textoAInsertar;
  }

  deshacer(): void {
    this.editor.contenido = this.editor.contenido.slice(0, -this.textoAInsertar.length);
  }
}

// Historial ejecutor
class GestorComandos {
  private historial: Comando[] = [];

  ejecutar(comando: Comando): void {
    comando.ejecutar();
    this.historial.push(comando);
  }

  deshacerUltimo(): void {
    const comando = this.historial.pop();
    if (comando) comando.deshacer();
  }
}
```

**Errores comunes / Anti-patrones:**

- Mantener referencias desactualizadas del contexto en el comando que impidan liberar memoria o generen estados inconsistentes al revertir.

---

### DATA-040 — State

**Propósito y explicación profunda:**
Permite a un objeto alterar su comportamiento cuando su estado interno cambia, dando la apariencia de que el objeto ha cambiado de clase. Modela máquinas de estados finitos (FSM) de manera limpia.

- **Cuándo usarlo:** Cuando un objeto tiene comportamientos radicalmente distintos según su estado actual y el código está plagado de condicionales masivos (`if (estado === 'BORRADOR') ... else if (estado === 'PUBLICADO')`).
- **Cuándo evitarlo:** Si la máquina de estados cuenta con únicamente dos estados y transiciones simples sin comportamientos diferenciados.
- **Trade-offs:** Elimina ramificaciones condicionales extensas y concentra las reglas de transición en clases específicas. Puede resultar excesivo si la cantidad de estados crece dinámicamente sin estructura clara.

**Ejemplo práctico (TypeScript):**

```typescript
interface EstadoPedido {
  pagar(contexto: Pedido): void;
  cancelar(contexto: Pedido): void;
}

class Pedido {
  constructor(private estado: EstadoPedido) {}

  cambiarEstado(nuevoEstado: EstadoPedido): void {
    this.estado = nuevoEstado;
  }

  pagar(): void { this.estado.pagar(this); }
  cancelar(): void { this.estado.cancelar(this); }
}

class EstadoPendiente implements EstadoPedido {
  pagar(contexto: Pedido): void {
    console.log("Pago registrado con éxito.");
    contexto.cambiarEstado(new EstadoCompletado());
  }

  cancelar(contexto: Pedido): void {
    console.log("Pedido cancelado.");
    contexto.cambiarEstado(new EstadoCancelado());
  }
}

class EstadoCompletado implements EstadoPedido {
  pagar(): void { throw new Error("El pedido ya está abonado."); }
  cancelar(): void { throw new Error("No se puede cancelar un pedido completado."); }
}

class EstadoCancelado implements EstadoPedido {
  pagar(): void { throw new Error("No se puede pagar un pedido cancelado."); }
  cancelar(): void { throw new Error("El pedido ya está cancelado."); }
}
```

**Errores comunes / Anti-patrones:**

- Dejar que el cliente externo gestione las transiciones entre estados en lugar de mantener las transiciones protegidas dentro de las clases de estado o el contexto.

---

### DATA-041 — Template Method

**Propósito y explicación profunda:**
Define el esqueleto de un algoritmo en una clase base (método plantilla), permitiendo que las subclases redefinan ciertos pasos del algoritmo sin modificar su estructura general invariante.

- **Cuándo usarlo:** Cuando múltiples procesos comparten la misma secuencia exacta de pasos, pero varían únicamente en detalles concretos de implementación de uno o dos de esos pasos.
- **Cuándo evitarlo:** Cuando la composición pura (Strategy) ofrezca un acoplamiento menor que la herencia vertical.
- **Trade-offs:** Evita duplicación de código en la estructura del proceso. No obstante, fuerza una jerarquía rígida y viola frecuentemente el principio de Liskov si las clases hijas modifican la semántica de los pasos base.

**Ejemplo práctico (TypeScript):**

```typescript
abstract class PipelineDatos {
  // Método plantilla inmutable que orquesta la secuencia
  public readonly procesar = (): void => {
    this.extraer();
    this.transformar();
    this.cargar();
  };

  protected abstract extraer(): void;
  protected abstract transformar(): void;

  // Paso común por defecto
  protected cargar(): void {
    console.log("Guardando datos limpios en la base central.");
  }
}

class PipelineCSV extends PipelineDatos {
  protected extraer(): void { console.log("Leyendo archivo CSV local."); }
  protected transformar(): void { console.log("Parseando strings delimitados."); }
}
```

**Errores comunes / Anti-patrones:**

- Sobrescribir el método plantilla principal en la clase hija, destruyendo el esqueleto garantizado.

---

### DATA-042 — Dependency Injection (DI)

**Propósito y explicación profunda:**
Técnica y patrón de ensamblaje en el cual un objeto recibe sus dependencias desde el exterior en lugar de instanciarlas internamente mediante `new`. Facilita el cumplimiento de la Inversión de Dependencias (DIP).

- **Cuándo usarlo:** En prácticamente cualquier arquitectura moderna modular que pretenda ser desacoplada, testeable y configurable.
- **Cuándo evitarlo:** En utilidades funcionales estáticas o cálculos puros que carecen de dependencias externas de I/O o estado.
- **Trade-offs:** Máxima testeabilidad (permite inyectar mocks/stubs) y bajo acoplamiento. Requiere configuración explícita (a menudo apoyada en contenedores IoC) que puede aumentar la complejidad inicial del cableado.

**Ejemplo práctico (TypeScript):**

```typescript
interface Mailer {
  send(to: string, msg: string): void;
}

// El servicio no sabe cómo se crea Mailer, lo recibe por constructor (Constructor Injection)
class UserService {
  constructor(private readonly mailer: Mailer) {}

  register(email: string): void {
    // Lógica de registro...
    this.mailer.send(email, "Bienvenido a la plataforma");
  }
}
```

**Errores comunes / Anti-patrones:**

- *Service Locator:* En lugar de inyectar la dependencia exacta, pasar un contenedor global del que las clases extraen lo que necesitan, ocultando las dependencias reales del componente.

---

### DATA-043 — Singleton

**Propósito y explicación profunda:**
Garantiza que una clase tenga únicamente una instancia en todo el ciclo de vida de la aplicación y proporciona un punto de acceso global a dicha instancia.

- **Cuándo usarlo:** Para recursos que físicamente no pueden o no deben duplicarse (ej. un manejador de hardware exclusivo o un despachador de registros muy puntual).
- **Cuándo evitarlo:** Para compartir estado global entre módulos o abstraer conexiones a bases de datos; suele transformarse en un antipatrón en sistemas modernos.
- **Trade-offs:** Control estricto de acceso a recursos únicos. A cambio, introduce acoplamiento implícito, dificulta enormemente la paralelización de tests unitarios y enmascara dependencias ocultas.

**Ejemplo práctico (TypeScript):**

```typescript
class ConfiguracionApp {
  private static instancia: ConfiguracionApp | null = null;
  public readonly apiKey: string;

  private constructor() {
    this.apiKey = "SECRET_API_KEY_1234";
  }

  static obtenerInstancia(): ConfiguracionApp {
    if (!ConfiguracionApp.instancia) {
      ConfiguracionApp.instancia = new ConfiguracionApp();
    }
    return ConfiguracionApp.instancia;
  }
}

// Uso
const config = ConfiguracionApp.obtenerInstancia();
```

**Errores comunes / Anti-patrones:**

- Utilizar Singleton como sinónimo de variables globales mutables, generando condiciones de carrera en entornos multihilo o asíncronos.

---

### DATA-044 — Chain of Responsibility

**Propósito y explicación profunda:**
Pasa una solicitud a lo largo de una cadena de manejadores potenciales. Cada manejador decide si procesa la solicitud, si realiza transformaciones y si la pasa al siguiente eslabón de la cadena.

- **Cuándo usarlo:** En procesamiento de middleware HTTP, filtros de autenticación y autorización secuenciales, o pipelines de saneamiento de datos.
- **Cuándo evitarlo:** Si la ejecución de cada manejador depende de bifurcaciones no lineales o cuando cada petición debe ser atendida obligatoriamente por un único componente conocido de antemano.
- **Trade-offs:** Desacopla el emisor de los múltiples receptores potenciales. Sin embargo, no hay garantía de que la solicitud sea atendida si ningún eslabón la maneja y llega al final de la cadena.

**Ejemplo práctico (TypeScript):**

```typescript
interface RequestContext {
  usuario?: string;
  rol?: string;
}

abstract class Handler {
  private siguiente: Handler | null = null;

  enlazarCon(siguiente: Handler): Handler {
    this.siguiente = siguiente;
    return siguiente;
  }

  manejar(req: RequestContext): boolean {
    if (this.siguiente) {
      return this.siguiente.manejar(req);
    }
    return true; // Fin de la cadena alcanzado con éxito
  }
}

class AuthHandler extends Handler {
  manejar(req: RequestContext): boolean {
    if (!req.usuario) {
      console.log("Rechazado: Usuario no autenticado.");
      return false;
    }
    return super.manejar(req);
  }
}

class RoleHandler extends Handler {
  manejar(req: RequestContext): boolean {
    if (req.rol !== "ADMIN") {
      console.log("Rechazado: Permisos insuficientes.");
      return false;
    }
    return super.manejar(req);
  }
}

// Montaje del pipeline
const pipeline = new AuthHandler();
pipeline.enlazarCon(new RoleHandler());

pipeline.manejar({ usuario: "Ana", rol: "GUEST" }); // Cortocircuita en RoleHandler
```

**Errores comunes / Anti-patrones:**

- Crear bucles cíclicos accidentales en la cadena de manejadores que deriven en recursión infinita.

---

### DATA-045 — Iterator

**Propósito y explicación profunda:**
Provee una forma de acceder secuencialmente a los elementos de un objeto agregado o colección sin exponer su estructura de datos subyacente (árbol, lista enlazada, matriz, tabla hash).

- **Cuándo usarlo:** Al diseñar colecciones complejas donde se desea ocultar los detalles de almacenamiento al usuario del recorrido, o soportar múltiples estrategias de recorrido simultáneas sobre la misma estructura.
- **Cuándo evitarlo:** Para arrays y listas simples en lenguajes que ya integran protocolos nativos de iteración (`Iterable`/`Iterator` en JS/Java/Python).
- **Trade-offs:** Estandariza la forma de recorrer estructuras dispares. Requiere mantener el puntero de estado de la iteración.

**Ejemplo práctico (JavaScript nativo vía Symbol.iterator):**

```javascript
class ColeccionLibros {
  constructor() {
    this.libros = [];
  }

  agregar(titulo) {
    this.libros.push(titulo);
  }

  // Implementación del protocolo Iterator nativo
  [Symbol.iterator]() {
    let indice = 0;
    const items = this.libros;

    return {
      next() {
        if (indice < items.length) {
          return { value: items[indice++], done: false };
        }
        return { done: true };
      }
    };
  }
}

// Uso limpio y declarativo
const estante = new ColeccionLibros();
estante.agregar("Clean Code");
estante.agregar("Refactoring");

for (const libro of estante) {
  console.log(libro);
}
```

**Errores comunes / Anti-patrones:**

- Mutar concurrentemente la colección de base mientras se encuentra abierta una iteración activa sin invalidar adecuadamente el iterador (*fail-fast*).

---

### DATA-045.5 — Specification (Patrón Moderno Complementario)

**Propósito y explicación profunda:**
Encapsula una regla de negocio o criterio de selección en un objeto booleano reutilizable que puede combinarse con otras especificaciones mediante operadores lógicos (`AND`, `OR`, `NOT`). Forma parte habitual del diseño táctico en Domain-Driven Design (DDD).

- **Cuándo usarlo:** Para validaciones de negocio complejas, consultas de selección de entidades en memoria o armado modular de predicados para repositorios.
- **Cuándo evitarlo:** Si las reglas de negocio son estáticas, triviales y no se combinan dinámicamente en distintos casos de uso.
- **Trade-offs:** Mantiene el dominio altamente expresivo, reutilizable y comprobable de forma aislada. Puede resultar en una sobrecarga de clases para validaciones aisladas.

**Ejemplo práctico (TypeScript):**

```typescript
interface Especificacion<T> {
  esSatisfechaPor(candidato: T): boolean;
  y(otra: Especificacion<T>): Especificacion<T>;
}

abstract class BaseEspecificacion<T> implements Especificacion<T> {
  abstract esSatisfechaPor(candidato: T): boolean;

  y(otra: Especificacion<T>): Especificacion<T> {
    return new YEspecificacion(this, otra);
  }
}

class YEspecificacion<T> extends BaseEspecificacion<T> {
  constructor(private spec1: Especificacion<T>, private spec2: Especificacion<T>) {
    super();
  }

  esSatisfechaPor(candidato: T): boolean {
    return this.spec1.esSatisfechaPor(candidato) && this.spec2.esSatisfechaPor(candidato);
  }
}

// Reglas de dominio concretas
interface Cliente {
  edad: number;
  esPremium: boolean;
}

class MayorDeEdadSpec extends BaseEspecificacion<Cliente> {
  esSatisfechaPor(c: Cliente): boolean { return c.edad >= 18; }
}

class ClientePremiumSpec extends BaseEspecificacion<Cliente> {
  esSatisfechaPor(c: Cliente): boolean { return c.esPremium; }
}

// Composición limpia de reglas
const clienteAptoCredito = new MayorDeEdadSpec().y(new ClientePremiumSpec());
console.log(clienteAptoCredito.esSatisfechaPor({ edad: 25, esPremium: true })); // true
```

**Errores comunes / Anti-patrones:**

- Mezclar lógica de ejecución o efectos secundarios (ej. actualizar registros) dentro del método de evaluación de la especificación; su único propósito debe ser evaluar una condición lógica.

## 6. Complejidad y notación asintótica

### DATA-046 — Big O, Omega y Theta

**Concepto ampliado:** Estas notaciones matemáticas describen cómo crece el tiempo de ejecución o el uso de memoria de un algoritmo a medida que el tamaño de la entrada ($n$) tiende a infinito, ignorando constantes.

- **Big O (**$O$**):** Define una cota superior asintótica. Garantiza que el algoritmo *no crecerá más rápido que* esto.

- **Omega (**$\Omega$**):** Define una cota inferior asintótica. Garantiza que el algoritmo *tomará al menos* este tiempo.

- **Theta (**$\Theta$**):** Define una cota ajustada. Ocurre cuando las cotas superior e inferior convergen en la misma función matemática.

**Aclaración crucial:** Es un error común equiparar Big O con el "peor caso". Big O simplemente acota una función. Puedes calcular el Big O del *mejor caso*, el Big O del *caso promedio* y el Big O del *peor caso*.

**Ejemplo:**

```typescript
// Búsqueda lineal en un arreglo
function buscar(arreglo, objetivo) {
    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] === objetivo) return i;
    }
    return -1;
}

```

- **Mejor caso:** El elemento está en la primera posición. Tiempo: $\Omega(1)$ y $O(1)$.

- **Peor caso:** El elemento está al final o no existe. Tiempo: $O(n)$.

### DATA-047 — Tiempo y espacio

**Concepto ampliado:** Analizar un algoritmo requiere medir dos dimensiones críticas:

- **Complejidad Temporal:** ¿Cuántas operaciones elementales se ejecutan en relación a $n$?

- **Complejidad Espacial:** ¿Cuánta memoria RAM extra requiere el algoritmo para ejecutarse?
  Es vital distinguir entre la memoria que ocupa la entrada original (que no cuenta en el análisis de eficiencia del algoritmo en sí) y el **espacio auxiliar** (variables temporales, llamadas recursivas en el *call stack*, copias de arreglos) que el algoritmo crea durante su ejecución.

**Ejemplo (Diferencia Espacial):**

```python
# Algoritmo 1: Invierte usando espacio auxiliar O(n)
def invertir_con_copia(arreglo):
    nuevo_arreglo = []
    for i in range(len(arreglo) - 1, -1, -1):
        nuevo_arreglo.append(arreglo[i]) # Crea una estructura nueva proporcional a 'n'
    return nuevo_arreglo

# Algoritmo 2: Invierte in-place. Espacio auxiliar O(1)
def invertir_in_place(arreglo):
    izq, der = 0, len(arreglo) - 1
    while izq < der:
        arreglo[izq], arreglo[der] = arreglo[der], arreglo[izq] # Solo usa variables temporales constantes
        izq += 1
        der -= 1
    return arreglo

```

### DATA-048 — Órdenes frecuentes

**Concepto ampliado:** Clasificación de los órdenes de crecimiento típicos de los algoritmos de programación de mayor a menor eficiencia:

1. $O(1)$ **Constante:** Acceso a un índice de arreglo o tabla hash. El tamaño de entrada no importa.

2. $O(\log n)$ **Logarítmico:** Búsqueda binaria. En cada iteración, el espacio de búsqueda se reduce a la mitad. Muy eficiente.

3. $O(n)$ **Lineal:** Recorrer una lista una vez.

4. $O(n \log n)$ **Linealítmico o Cuasilineal:** Algoritmos eficientes de ordenamiento como Merge Sort o Quick Sort.

5. $O(n^2)$ **Cuadrático:** Doble bucle anidado iterando sobre la misma colección. Comienza a ser inviable con miles de registros (ej. Bubble Sort).

6. $O(2^n)$ **Exponencial:** Algoritmos recursivos ingenuos que duplican el trabajo en cada paso (ej. Fibonacci sin memorización). Inviable para inputs mayores a \~40.

7. $O(n!)$ **Factorial:** Generar todas las permutaciones posibles. Totalmente inviable más allá de pequeños inputs (ej. Problema del viajante ingenuo).

**Ejemplo visual de crecimiento:**

```typescript
// O(1)
const obtenerPrimerElemento = (arr) => arr[0]; 

// O(n)
const imprimirTodos = (arr) => arr.forEach(item => console.log(item)); 

// O(n^2) - Advertencia de rendimiento
const encontrarPares = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[i], arr[j]);
        }
    }
};

```

### DATA-049 — Recurrencias y amortización

**Concepto ampliado:**

- **Recurrencias:** Expresan el costo de un algoritmo recursivo en función del tamaño del problema y sus subproblemas. Se resuelven matemáticamente mediante herramientas como el *Teorema Maestro* para deducir su Big O final.

- **Análisis Amortizado:** Se utiliza cuando un algoritmo tiene operaciones que habitualmente son muy rápidas, pero que ocasionalmente son muy lentas. En lugar de decir que el peor caso es representativo, se promedia el costo de una secuencia de operaciones, garantizando un costo "promedio garantizado" por operación.

**Ejemplo (Listas Dinámicas):**
Cuando agregas elementos a una lista dinámica (como un arreglo en JS o un `ArrayList` en Java), casi siempre la inserción es $O(1)$. Sin embargo, cuando el arreglo interno se llena, el sistema debe crear uno nuevo del doble de tamaño y copiar todos los elementos, lo cual es $O(n)$.
Debido a que esta operación lenta ($O(n)$) ocurre muy raramente, el **costo amortizado** de insertar un elemento sigue considerándose $O(1)$.

### DATA-049.5 — Complejidad Ciclomática (Patrón Complementario)

**Concepto ampliado:** Mientras que el análisis asintótico (Big O) mide el rendimiento a gran escala para el procesador, la **Complejidad Ciclomática** mide el esfuerzo de mantenimiento para el programador. Se calcula contando la cantidad de caminos linealmente independientes que puede tomar el flujo de ejecución de una función (basado en la teoría de grafos).
Cada vez que agregas un `if`, `while`, `for`, `catch` o un operador lógico (`&&`, `||`), la complejidad ciclomática aumenta en 1.

- **1 a 10:** Método simple, bajo riesgo.

- **11 a 20:** Método complejo, riesgo moderado. Considerar refactorizar.

- **> 20:** Método incomprensible, alto riesgo, imposible de testear adecuadamente.

**Ejemplo:**

```typescript
// Complejidad Ciclomática = 1 (Un solo camino posible)
public string Saludar() {
    return "Hola";
}

// Complejidad Ciclomática = 3 (El camino por defecto + 2 desvíos por los if)
public string Clasificar(int edad) {
    if (edad < 18) {
        return "Menor";
    }
    if (edad > 65) {
        return "Jubilado";
    }
    return "Adulto";
}
```

## 7. Estructuras de datos

### DATA-050 — Array/formación y lista dinámica

**Concepto ampliado:** Un **Array** estático asigna un bloque contiguo de memoria. Esto le otorga una ventaja mecánica enorme: la **localidad de caché** (Cache Locality), haciendo que la CPU lea datos secuenciales extremadamente rápido. Su acceso indexado es `O(1)`. Una **Lista Dinámica** (ej. `ArrayList` en Java, `List` en Python o arrays en JS) envuelve un array estático; cuando se llena, asigna un nuevo array (usualmente el doble de grande), copia los elementos y descarta el viejo. Por esto, añadir al final es `O(1)` amortizado, aunque la expansión puntual cueste `O(n)`. Las inserciones/eliminaciones en el medio exigen desplazar todos los elementos posteriores, costando `O(n)`.

**Ejemplo (Concepto de redimensionamiento dinámico):**

```typescript
class DynamicArray {
  private data: any[];
  private capacity: number;
  private size: number = 0;

  constructor(initialCapacity = 2) {
    this.capacity = initialCapacity;
    this.data = new Array(this.capacity);
  }

  push(element: any) {
    if (this.size === this.capacity) {
      this.resize(); // Costo O(n) que ocurre raramente
    }
    this.data[this.size] = element;
    this.size++; // Costo O(1) la mayor parte del tiempo
  }

  private resize() {
    this.capacity *= 2; // Duplicar capacidad
    const newData = new Array(this.capacity);
    for (let i = 0; i < this.size; i++) newData[i] = this.data[i];
    this.data = newData;
  }
}
```

### DATA-051 — Lista enlazada (Linked List)

**Concepto ampliado:** A diferencia de los arrays, sus elementos (Nodos) no están contiguos en memoria, sino que cada uno guarda una referencia (puntero) al siguiente. Esto arruina la localidad de caché, pero permite que insertar o eliminar un nodo, *si ya tienes la referencia a él*, sea `O(1)` (solo cambias punteros, no desplazas nada). Buscar un elemento por índice requiere recorrer desde el inicio, costando `O(n)`. Las variantes doblemente enlazadas guardan referencia al nodo anterior, facilitando recorridos bidireccionales a cambio de más memoria.

**Ejemplo (Lista simplemente enlazada):**

```typescript
class Node {
  constructor(public value: any, public next: Node | null = null) {}
}

class LinkedList {
  public head: Node | null = null;

  insertAtBeginning(value: any) {
    const newNode = new Node(value);
    newNode.next = this.head; // Apunta al antiguo primer elemento
    this.head = newNode;      // Ahora el nuevo es la cabeza (O(1))
  }
}
```

### DATA-052 — Pila (Stack)

**Concepto ampliado:** Es una estructura lineal **LIFO** (Last In, First Out). Solo interactúas con el último elemento añadido (la cima o *top*). `push` (insertar) y `pop` (quitar) son `O(1)`. Es la base del funcionamiento del *Call Stack* de los lenguajes de programación, los mecanismos de "Deshacer" (Undo) en editores, el recorrido DFS en grafos y el análisis sintáctico de expresiones (ej. verificar paréntesis balanceados).

**Ejemplo (Uso típico para validar paréntesis):**

```typescript
function isValid(s: string): boolean {
  const stack = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
  
  for (let char of s) {
    if (['(', '{', '['].includes(char)) {
      stack.push(char); // O(1)
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}
```

### DATA-053 — Cola y deque (Queue & Deque)

**Concepto ampliado:** La Cola es una estructura **FIFO** (First In, First Out). Los elementos entran por atrás y salen por adelante. **Advertencia:** Usar un array simple en JS/Python y hacer `shift()` o `pop(0)` para sacar el primer elemento es un error catastrófico en rendimiento (`O(n)` porque desplaza todos los elementos). Una cola real se implementa con punteros o listas enlazadas para lograr O(1). Un **Deque** (Double-Ended Queue) permite O(1) en ambos extremos. Casos de uso: Colas de tareas (RabbitMQ), Event Loop, recorrido BFS.

**Ejemplo (Cola eficiente con punteros):**

```typescript
class Queue {
  private items: Record<number, any> = {};
  private headIndex = 0;
  private tailIndex = 0;

  enqueue(item: any) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue() {
    if (this.headIndex === this.tailIndex) return null; // Vacía
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex]; // Liberar memoria
    this.headIndex++;
    return item; // O(1) puro
  }
}
```

### DATA-054 — Tabla hash (Hash Table)

**Concepto ampliado:** Asocia claves con valores aplicando una función de dispersión (*Hash function*) a la clave, que genera un índice en un array interno. Esto permite buscar, insertar y borrar en `O(1)` promedio. El problema central son las **colisiones** (dos claves generan el mismo índice). Se manejan mediante *Chaining* (Listas enlazadas en cada índice) u *Open Addressing* (Buscar el siguiente hueco libre). Si la tabla se llena demasiado (alto *Load Factor*), la tabla debe re-hashearse en una más grande, lo que cuesta `O(n)`.

**Ejemplo (Manejo conceptual de Chaining):**

```typescript
class HashTable {
  private table = new Array(50); // Array base

  private hash(key: string): number {
    let sum = 0;
    for (let i = 0; i < key.length; i++) sum += key.charCodeAt(i);
    return sum % this.table.length;
  }

  set(key: string, value: any) {
    const index = this.hash(key);
    if (!this.table[index]) this.table[index] = [];
    this.table[index].push({ key, value }); // Chaining para evitar colisiones
  }
}
```

### DATA-055 — Conjunto y mapa (Set & Map)

**Concepto ampliado:** Un **Map** es una interfaz para estructuras de clave-valor. Un **Set** es una colección de valores únicos (como las matemáticas). Ambas interfaces se implementan por debajo usando **Tablas Hash** (ej. `HashSet`/`HashMap` con O(1) sin orden) o **Árboles Balanceados** (ej. `TreeSet`/`TreeMap` con O(log n) donde los elementos están siempre ordenados).

**Ejemplo (Eliminar duplicados con Set en O(n)):**

```typescript
const numbers = [1, 2, 2, 3, 4, 4, 5];
// El Set evalúa la igualdad bajo el capó (O(1) por inserción)
const uniqueNumbers = [...new Set(numbers)]; // [1, 2, 3, 4, 5]

const map = new Map();
map.set('objKey', { data: 1 }); // Map de JS permite cualquier tipo como clave
```

### DATA-056 — Montículo / heap (Priority Queue)

**Concepto ampliado:** Un Heap es un árbol binario casi completo que satisface la propiedad del montículo: en un Max-Heap, el padre siempre es mayor o igual a sus hijos (y viceversa en un Min-Heap). Su mayor ventaja es que no necesita referencias engorrosas; **se representa en un array plano**, donde los hijos del índice `i` están en `2i+1` y `2i+2`. Encontrar el máximo/mínimo es `O(1)` (es la raíz). Insertar o extraer cuesta `O(log n)` mediante operaciones de hundimiento (*sift down*) o flotación (*sift up*).

**Ejemplo (Cálculo de posiciones en el Array):**

```typescript
// Si representamos un heap en un array: [100, 19, 36, 17, 3, 25, 1, 2, 7]
function getParentIndex(i: number) { return Math.floor((i - 1) / 2); }
function getLeftChildIndex(i: number) { return 2 * i + 1; }
function getRightChildIndex(i: number) { return 2 * i + 2; }
```

### DATA-057 — Árbol binario de búsqueda (BST)

**Concepto ampliado:** Un árbol donde cada nodo tiene hasta dos hijos. **Invariante:** Todos los nodos en el subárbol izquierdo son menores que la raíz, y los del derecho son mayores. La búsqueda se comporta como una búsqueda binaria `O(log n)`. Sin embargo, si insertas elementos ya ordenados (1, 2, 3, 4), el árbol se degenera convirtiéndose en una lista enlazada recta, degradando la búsqueda a `O(n)`. Por eso el BST puro rara vez se usa en producción.

**Ejemplo (Lógica de inserción):**

```typescript
class TreeNode {
  constructor(public value: number, public left = null, public right = null) {}
}

function insert(root: TreeNode | null, value: number): TreeNode {
  if (!root) return new TreeNode(value);
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}
```

### DATA-058 — Árboles balanceados y trie

**Concepto ampliado:** Los árboles balanceados (**AVL**, **Red-Black Tree**) solucionan la falla del BST. Aplican reglas matemáticas estrictas en cada inserción/eliminación: si detectan que una rama se hace mucho más larga que otra, aplican "rotaciones" automáticas para mantener la altura en `O(log n)`.
El **Trie** (Árbol de prefijos) es distinto: cada nodo almacena un carácter. Es la estructura suprema para diccionarios, sistemas de autocompletado y rutas de enrutadores web (React Router). Buscar cuesta `O(L)`, donde `L` es el largo de la palabra (independiente de cuántos millones de palabras haya guardadas).

**Ejemplo (Nodo de un Trie):**

```typescript
class TrieNode {
  children: Record<string, TrieNode> = {};
  isEndOfWord: boolean = false;
}
// Insertar "cat": Raíz -> 'c' -> 'a' -> 't' (isEndOfWord = true)
```

### DATA-059 — Grafo (Graph)

**Concepto ampliado:** Estructura formada por Vértices (Nodos) y Aristas (Conexiones). Modela redes sociales, mapas, dependencias. Se representa de dos formas:

1. **Matriz de Adyacencia:** Array 2D. Buscar si existe una conexión es `O(1)`, pero ocupa mucha memoria `O(V²)`. Útil en grafos densos.
2. **Lista de Adyacencia:** Un Map o Array de arrays. Solo guarda las conexiones reales. Usa `O(V+E)` memoria. Óptimo para la mayoría de los casos reales (grafos dispersos).

**Ejemplo (Lista de Adyacencia usando Map):**

```typescript
class Graph {
  private adjacencyList = new Map<string, string[]>();

  addVertex(v: string) {
    if (!this.adjacencyList.has(v)) this.adjacencyList.set(v, []);
  }

  addEdge(v1: string, v2: string) { // Grafo no dirigido
    this.adjacencyList.get(v1)!.push(v2);
    this.adjacencyList.get(v2)!.push(v1);
  }
}
```

### DATA-060 — Disjoint Set Union (Union-Find)

**Concepto ampliado:** Es una estructura especializada para resolver un solo problema muy rápido: determinar si dos elementos pertenecen al mismo conjunto o grupo, y unirlos si no es así. Es la base del algoritmo de Kruskal y detección de ciclos. Su magia radica en dos técnicas: **Union by Rank** (pegar el árbol pequeño bajo el grande) y **Path Compression** (al hacer `find`, aplastar el árbol haciendo que los nodos apunten directamente a la raíz). Logra un tiempo amortizado casi constante `O(α(n))`.

**Ejemplo (Implementación con compresión de camino):**

```typescript
class DSU {
  private parent: number[] = [];
  
  constructor(size: number) {
    for (let i = 0; i < size; i++) this.parent[i] = i; // Cada uno es su propia raíz
  }

  find(i: number): number {
    if (this.parent[i] === i) return i;
    // Compresión de camino: actualiza el padre apuntando a la raíz
    return this.parent[i] = this.find(this.parent[i]);
  }

  union(i: number, j: number) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) this.parent[rootI] = rootJ; // Versión simplificada
  }
}
```

### DATA-060.5 — Filtro de Bloom (Bloom Filter) [Adición]

**Concepto ampliado:** Es una estructura de datos probabilística que responde a una sola pregunta: *"¿Está este elemento en el conjunto?"*. Usa una tabla de bits y múltiples funciones Hash. Si dice **NO**, el elemento 100% seguro no está. Si dice **SÍ**, es *posible* que esté (falso positivo). La ventaja: requiere una fracción ínfima de memoria comparado con un Set. Las bases de datos y CDNs lo usan para evitar consultas inútiles al disco (ej. "¿existe este username?") antes de hacer el esfuerzo de leer la DB.

**Ejemplo Conceptual:**

```text
Array de Bits: [ 0, 0, 0, 0, 0, 0, 0, 0 ]
Hash1("juan") -> pos 2. Hash2("juan") -> pos 5.
Set Bits:      [ 0, 0, 1, 0, 0, 1, 0, 0 ]

Consulta("pedro"): Hash1 da 2, Hash2 da 7. Como la pos 7 es 0, "pedro" NO existe (sin siquiera ir a BD).
```

## 8. Algoritmos y técnicas

### Ordenamiento

**Concepto general (Estabilidad):** Un algoritmo es *estable* si dos elementos con el mismo valor mantienen el orden relativo original tras ordenarse. Esto es clave al ordenar por múltiples criterios (ej. ordenar por apellido y luego por nombre).

#### DATA-061 — Burbuja (Bubble Sort)

**Concepto ampliado:** Compara pares adyacentes y los intercambia si están desordenados. Complejidad `O(n²)`. Es estable. Su única utilidad práctica ocurre si se le añade una optimización (una bandera `swapped`) que detiene el algoritmo en `O(n)` si el arreglo ya estaba ordenado.

**Ejemplo (Burbuja optimizada):**

```typescript
function bubbleSort(arr: number[]) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);
}
```

#### DATA-062 — Selección (Selection Sort)

**Concepto ampliado:** Busca el mínimo de la porción no ordenada y lo coloca al final de la porción ordenada. Siempre es `O(n²)`, incluso si el arreglo ya está ordenado. Es inestable. Útil solo si las escrituras en memoria son extremadamente costosas, ya que hace como máximo `O(n)` intercambios.

#### DATA-063 — Inserción (Insertion Sort)

**Concepto ampliado:** Toma cada elemento y lo inserta en su posición correcta dentro del sub-arreglo izquierdo ya ordenado. Complejidad `O(n²)`. Es estable y sumamente rápido en arreglos pequeños o casi ordenados (cercano a `O(n)`). Motores como V8 lo usan para arreglos menores a 10 elementos.

#### DATA-064 — Heap sort

**Concepto ampliado:** Convierte el arreglo en un Max-Heap (`O(n)`), luego extrae repetidamente la raíz y repara el heap. Garantiza `O(n log n)` en todos los casos y opera in-place (espacio auxiliar `O(1)`). Es inestable.

#### DATA-065 — Merge sort

**Concepto ampliado:** Divide recursivamente el arreglo a la mitad y luego "mezcla" las partes ordenando. Garantiza `O(n log n)`. Es estable. Su desventaja es que requiere memoria auxiliar `O(n)` para crear los arreglos temporales durante la mezcla.

#### DATA-066 — Quicksort

**Concepto ampliado:** Elige un "pivote" y particiona el arreglo: menores a la izquierda, mayores a la derecha. Promedio `O(n log n)`. Tiene excelente localidad de caché y opera in-place, lo que lo hace el más rápido en la práctica. Si se elige mal el pivote (ej. un arreglo ya ordenado y pivote en el extremo), degenera al peor caso `O(n²)`.

---

### Búsqueda y grafos

#### DATA-067 — Búsqueda lineal

**Concepto ampliado:** Examina desde el índice 0 hasta `n-1`. Complejidad `O(n)`. Única opción para datos no ordenados.

#### DATA-068 — Búsqueda binaria

**Concepto ampliado:** Requiere datos ordenados. Divide el espacio a la mitad en cada paso. Complejidad `O(log n)`. Un error común es calcular el medio como `(low + high) / 2`, lo que causa *Integer Overflow* en arreglos inmensos. La forma segura es `low + Math.floor((high - low) / 2)`.

**Ejemplo:**

```typescript
function binarySearch(arr: number[], target: number): number {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
```

#### DATA-069 — BFS (Búsqueda en Anchura)

**Concepto ampliado:** Explora nivel por nivel usando una **Cola (Queue)**. Garantiza encontrar el camino más corto en grafos *no ponderados* (donde toda arista vale 1).

#### DATA-070 — DFS (Búsqueda en Profundidad)

**Concepto ampliado:** Explora una rama entera hasta el final antes de retroceder, usando una **Pila (Stack)** o recursión. Ideal para buscar ciclos o realizar ordenamiento topológico.

#### DATA-071 — Dijkstra

**Concepto ampliado:** Encuentra caminos mínimos en grafos con pesos usando una Cola de Prioridad (Min-Heap). Es *Greedy*. Falla catastróficamente si existen aristas con pesos negativos.

#### DATA-072 — Bellman-Ford

**Concepto ampliado:** Relaja todas las aristas repetidamente. Más lento que Dijkstra (`O(VE)`), pero soporta pesos negativos y puede detectar *ciclos negativos* (bucle infinito de reducción de costo).

#### DATA-073 — A*

**Concepto ampliado:** Expansión guiada de Dijkstra. Introduce una heurística `h(n)` (estimación al destino). Si la heurística es admisible (nunca sobrestima el costo real), garantiza el camino óptimo. Usado en pathfinding de videojuegos.

---

### Matemática, compresión y recursión

#### DATA-074 — Euclides

**Concepto ampliado:** Calcula el Máximo Común Divisor (MCD). Basado en la operación módulo.

**Ejemplo:**

```typescript
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
```

#### DATA-075 — Primalidad

**Concepto ampliado:** Para saber si `N` es primo, basta probar divisores hasta su raíz cuadrada `O(√N)`. Si `N` es divisible por algo mayor a su raíz, el otro factor forzosamente debe ser menor a la raíz.

#### DATA-076 — K-means

**Concepto ampliado:** Algoritmo de clustering. Asigna puntos al centroide más cercano y luego recalcula la posición del centroide. Puede estancarse en óptimos locales dependiendo de la ubicación inicial aleatoria.

#### DATA-077 — Run-length encoding (RLE)

**Concepto ampliado:** Comprime reemplazando rachas. `AAAABBB` -> `4A3B`. Si los datos no tienen rachas (ej. `ABC`), el algoritmo expande el tamaño final.

#### DATA-078 — Huffman

**Concepto ampliado:** Compresión basada en frecuencias. Letras muy comunes ('E') reciben códigos binarios muy cortos (ej. `01`). Letras raras ('Z') reciben códigos largos. Usa un árbol para garantizar que ningún código sea prefijo de otro.

#### DATA-079 — Torre de Hanoi

**Concepto ampliado:** Rompecabezas que ilustra recursión compleja y crecimiento exponencial. Mover N discos requiere `O(2ⁿ)` pasos (`2ⁿ - 1`).

#### DATA-080 — Recursión y backtracking

**Concepto ampliado:** Recursión explora posibilidades; el backtracking es el mecanismo de "deshacer". Si una rama de decisión es inválida, restaura el estado anterior y prueba otra rama (poda).

**Ejemplo conceptual:**

```typescript
function solve(state) {
  if (isGoal(state)) return state;
  for (let choice of getChoices(state)) {
    if (isValid(choice, state)) {
      apply(choice, state);
      if (solve(state)) return state;
      undo(choice, state); // BACKTRACKING
    }
  }
  return null;
}
```

## 9. Pruebas, depuración y calidad

### DATA-081 — Casos de prueba y oráculos

**Concepto ampliado:** Un caso de prueba evalúa un comportamiento específico del sistema. El **oráculo** es el mecanismo (humano, heurístico o algorítmico) que sabe cuál debería ser la respuesta correcta para compararla con la salida real. Una métrica peligrosa es la "cobertura de líneas" (Line Coverage): tener un 100% de cobertura significa que todas las líneas se ejecutaron durante los tests, pero no garantiza que la lógica de negocio sea correcta. Las pruebas bien estructuradas suelen seguir el patrón **AAA (Arrange, Act, Assert)**: Preparar el estado, Ejecutar la acción, y Comprobar el resultado.

**Ejemplo (Patrón AAA en Jest/TypeScript):**

```typescript
test('No permite retirar más del saldo disponible', () => {
  // 1. Arrange (Preparar)
  const cuenta = new CuentaBancaria(100); // Saldo inicial 100
  
  // 2. Act (Actuar)
  const intentoRetiro = () => cuenta.retirar(150);
  
  // 3. Assert (Comprobar contra el oráculo)
  expect(intentoRetiro).toThrow("Fondos insuficientes");
  expect(cuenta.obtenerSaldo()).toBe(100); // Invariante: el saldo no debió mutar
});
```

### DATA-082 — Pruebas unitarias, integración y extremo a extremo (E2E)

**Concepto ampliado:** Conforman la "Pirámide de Pruebas".

- **Unitarias:** Prueban una sola función o clase en total aislamiento. Son rapidísimas (milisegundos). Dependencias externas (bases de datos, APIs) se simulan mediante *Mocks* o *Stubs*.
- **Integración:** Prueban cómo colaboran dos o más unidades, incluyendo los límites externos (ej. la aplicación guardando datos reales en una base de datos de prueba en memoria o Docker).
- **Extremo a Extremo (E2E):** Prueban el flujo completo desde la perspectiva del usuario (ej. levantando un navegador con Cypress o Playwright, haciendo clic en botones y validando la UI). Son lentas y frágiles, pero otorgan la mayor confianza.

**Ejemplo (Diferencia conceptual):**

```typescript
// Prueba Unitaria: Falsificamos (Mock) la base de datos
const mockDB = { save: jest.fn() };
const service = new UserService(mockDB);
service.register("test@test.com");
expect(mockDB.save).toHaveBeenCalled(); // Solo verificamos que se intentó guardar

// Prueba de Integración: Usamos una base de datos real (ej. SQLite en memoria)
const realDB = await TestDatabase.setup();
const service = new UserService(realDB);
await service.register("test@test.com");
const user = await realDB.query("SELECT * FROM users");
expect(user.email).toBe("test@test.com"); // Verificamos el efecto secundario real
```

### DATA-083 — Propiedades e invariantes (Property-based Testing)

**Concepto ampliado:** Las pruebas tradicionales usan valores "harcodeados" (ej. `sumar(2, 2) == 4`). Las **pruebas basadas en propiedades** (popularizadas por Haskell/QuickCheck) definen reglas universales (invariantes) que el código debe cumplir siempre, y luego bombardean la función con miles de entradas aleatorias extremas (cadenas gigantes, nulos, negativos) para intentar romperla.

**Ejemplo (Test de propiedades conceptual):**

```typescript
import fc from 'fast-check'; // Librería de Property-based testing en JS

test('La suma es conmutativa', () => {
  // Genera miles de pares de enteros aleatorios
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (a, b) => {
      // Invariante matemática: a + b SIEMPRE debe ser igual a b + a
      expect(sumar(a, b)).toEqual(sumar(b, a)); 
    })
  );
});
```

### DATA-084 — Depuración (Debugging)

**Concepto ampliado:** La depuración no debe ser un proceso de "prueba y error" ciego (Shotgun debugging). Debe seguir el **método científico**:

1. Aislar y reproducir el fallo de forma consistente.
2. Formular una hipótesis de por qué ocurre.
3. Usar herramientas (Debuggers, Breakpoints, Logs estructurados) para confirmar la hipótesis inspeccionando la memoria.
4. Aplicar la solución y escribir un test de regresión para evitar que el bug vuelva a aparecer en el futuro.

**Ejemplo (Logs útiles vs inútiles):**

```typescript
// ❌ MAL: Pobre contexto, difícil de buscar en un sistema de logs (como Datadog o Kibana)
console.log("Error al procesar pago");

// ✅ BIEN: Log estructurado, aporta contexto sin exponer secretos (tarjetas)
console.error(JSON.stringify({
  event: "PAYMENT_FAILED",
  userId: "12345",
  gateway: "Stripe",
  reason: error.message,
  timestamp: new Date().toISOString()
}));
```

### DATA-085 — Refactorización

**Concepto ampliado:** Según Martin Fowler, refactorizar es alterar la estructura interna del código sin cambiar su comportamiento observable externo. **No se pueden agregar nuevas funcionalidades (features) ni arreglar bugs mientras se refactoriza**.
El ciclo profesional seguro se basa en TDD (Test-Driven Development) o la regla *Red-Green-Refactor*:

1. Debes tener tests pasando (verde).
2. Modificas la estructura del código para hacerlo más limpio o eficiente.
3. Vuelves a correr los tests. Si fallan, rompiste el comportamiento y no fue una refactorización exitosa.

**Ejemplo (Refactorización segura garantizada por tests):**

```typescript
// ANTES (Funciona, pasa los tests, pero es difícil de leer)
function calc(a, b, op) {
  if (op === 'ADD') return a + b;
  if (op === 'SUB') return a - b;
}

// DESPUÉS (Refactorizado a un patrón Strategy/Diccionario)
// Si los tests siguen pasando, la refactorización fue exitosa.
const operations = {
  'ADD': (a, b) => a + b,
  'SUB': (a, b) => a - b
};
function calc(a, b, op) {
  return operations[op](a, b);
}
```

## 10. Seguridad y criptografía educativa

*Nota importante: Esta sección explica conceptos fundamentales. En entornos de producción, nunca intentes implementar tus propios algoritmos criptográficos ("Don't roll your own crypto"). Utiliza siempre librerías estándar mantenidas, como `libsodium`, `bcrypt` o las APIs criptográficas nativas del lenguaje.*

### DATA-086 — Modelo de amenaza y defensa en profundidad

**Concepto ampliado:** Un modelo de amenaza (como la metodología STRIDE) es un ejercicio de arquitectura para anticipar cómo un atacante podría comprometer el sistema. La **Defensa en Profundidad** (Defense in Depth) asume que cualquier control de seguridad puede fallar, por lo que se diseñan múltiples capas de protección redundantes (modelo de queso suizo). Si un atacante burla el firewall, se topa con la autenticación; si burla la autenticación, se topa con el control de acceso a nivel de fila de la base de datos. Otro pilar es el **Principio de Menor Privilegio**: un proceso o usuario solo debe tener los permisos estrictamente necesarios para su tarea.

**Ejemplo (Defensa en profundidad en una API):**

```typescript
// Capa 1: Validación de límites (Evita inyección y datos malformados)
import { z } from 'zod';
const schema = z.object({ email: z.string().email(), monto: z.number().positive() });

app.post('/transferir', (req, res) => {
  const data = schema.parse(req.body); // Falla rápido si el input es inválido

  // Capa 2: Autenticación y Autorización (Menor privilegio)
  if (!req.user || req.user.role !== 'VERIFIED_CLIENT') throw new Error("No autorizado");

  // Capa 3: Lógica de dominio transaccional (El ORM previene SQL Injection por defecto)
  // Capa 4: Base de datos configurada con un usuario que NO tiene permisos para hacer DROP TABLE.
});
```

### DATA-087 — Cifrado simétrico y asimétrico

**Concepto ampliado:**

- **Simétrico (Ej. AES-256):** Usa la *misma* clave para cifrar y descifrar. Es extremadamente rápido y apto para grandes volúmenes de datos (ej. discos duros, bases de datos). El problema es cómo compartir esa clave de forma segura con el destinatario.
- **Asimétrico (Ej. RSA, ECC):** Usa un par de claves matemáticamente enlazadas: una **Pública** (que todos pueden ver y se usa para cifrar) y una **Privada** (que solo el dueño posee y se usa para descifrar). Es muy lento, por lo que suele usarse solo para cifrar pequeñas claves simétricas que luego asegurarán el canal.
- **Regla de oro:** Cifrar garantiza *confidencialidad*, pero no garantiza que los datos no hayan sido modificados en tránsito (integridad) o quién los envió (autenticidad).

### DATA-088 — Hash criptográfico, contraseña y sal

**Concepto ampliado:** Una función hash (ej. SHA-256) toma una entrada de cualquier tamaño y produce una cadena de longitud fija casi imposible de revertir (resistencia a preimagen) y donde es casi imposible que dos entradas den el mismo resultado (resistencia a colisiones).
**Contraseñas:** Guardar contraseñas en texto plano es negligencia grave. Usar hashes rápidos como MD5 o SHA-256 también lo es, porque los atacantes usan tarjetas gráficas para calcular miles de millones de hashes por segundo. Se deben usar funciones de derivación lentas y costosas (como **bcrypt** o **Argon2**) que incluyen un factor de costo. La **Sal** (Salt) es un valor aleatorio que se añade a la contraseña antes del hash para inutilizar los ataques de tablas precalculadas (Rainbow Tables).

**Ejemplo (Uso correcto de bcrypt en Node.js):**

```javascript
const bcrypt = require('bcrypt');

// Registro de usuario
async function registrar(passwordPlano) {
  const saltRounds = 12; // Factor de trabajo (hace el cálculo intencionalmente lento)
  // bcrypt genera la sal automáticamente y la incluye en el string final
  const hash = await bcrypt.hash(passwordPlano, saltRounds); 
  await db.saveUser({ hash });
}

// Login
async function login(passwordPlano, hashEnBaseDeDatos) {
  // Compara la contraseña con el hash de forma segura
  const coincide = await bcrypt.compare(passwordPlano, hashEnBaseDeDatos);
  return coincide;
}
```

### DATA-089 — MAC y firmas digitales

**Concepto ampliado:**

- **MAC (Message Authentication Code):** Como un HMAC. Usa una clave simétrica compartida y un algoritmo hash. Garantiza que el mensaje no fue alterado (integridad) y provino de alguien con la clave (autenticidad). Muy usado en APIs (ej. JWT signatures).
- **Firma Digital:** Es el equivalente asimétrico. Cifras el *hash* del documento con tu **Clave Privada**. Cualquiera con tu Clave Pública puede descifrar ese hash y verificar que coincide con el documento. Provee el principio de "No Repudio": nadie más pudo haber generado esa firma.

**Ejemplo (Prevención de ataques de tiempo al comparar firmas):**

```javascript
const crypto = require('crypto');

function verificarFirmaSegura(firmaRecibida, firmaEsperada) {
  // ❌ MAL: `firmaRecibida === firmaEsperada`
  // El operador `===` falla en el primer carácter distinto, permitiendo a un atacante
  // adivinar la firma midiendo los microsegundos que tarda la comparación (Timing Attack).
  
  // ✅ BIEN: Tiempo constante
  return crypto.timingSafeEqual(Buffer.from(firmaRecibida), Buffer.from(firmaEsperada));
}
```

### DATA-090 — Intercambio de claves y TLS

**Concepto ampliado:** ¿Cómo establecen dos partes una clave secreta a través de una red pública (internet) donde alguien está escuchando? Mediante el intercambio de claves de **Diffie-Hellman**. Permite a ambas partes combinar datos públicos y privados para llegar a un mismo secreto sin jamás transmitirlo por la red.
**TLS (Transport Layer Security, sucesor de SSL):** Es el protocolo detrás de HTTPS. Usa Diffie-Hellman asimétrico para acordar una clave secreta, y luego cambia a cifrado simétrico (AES) para transmitir los datos rápidamente, todo mientras verifica la identidad del servidor mediante certificados.

### DATA-091 — Certificados y confianza

**Concepto ampliado:** Un certificado digital (estándar X.509) es esencialmente una Clave Pública "firmada" digitalmente por una entidad de confianza llamada Autoridad Certificadora (CA, como Let's Encrypt o DigiCert). Esto previene ataques de intermediario (Man-in-the-Middle).
Si entras a `tu-banco.com`, el servidor te envía su clave pública. Tu navegador no confía en la clave por sí sola; verifica que esa clave tenga la firma de una CA preinstalada en tu sistema operativo. Si la firma es válida, y el certificado no está expirado, aparece el "candado verde".

### DATA-092 — Aleatoriedad, nonces y reutilización

**Concepto ampliado:** En criptografía, usar números pseudoaleatorios predecibles (como `Math.random()` en JS o `rand()` en PHP) destruye la seguridad del sistema. Se deben usar generadores criptográficamente seguros (CSPRNG) que recolectan entropía real del sistema operativo.
Un **Nonce** (Number Used Once) es un valor que nunca debe repetirse bajo la misma clave. Se usa en tokens y vectores de inicialización (IV) para asegurar que cifrar el mismo texto dos veces genere resultados distintos, impidiendo ataques de repetición (Replay Attacks).

**Ejemplo (Aleatoriedad segura vs insegura):**

```javascript
const crypto = require('crypto');

// ❌ MAL: Predecible, la semilla suele basarse en el reloj del sistema
const tokenInseguro = Math.random().toString(36).substring(2);

// ✅ BIEN: CSPRNG (Generador de Números Pseudoaleatorios Criptográficamente Seguro)
const tokenSeguro = crypto.randomBytes(32).toString('hex');
```

## 11. Programación asíncrona y concurrencia

### DATA-093 — Sincronía, asincronía y concurrencia

**Concepto ampliado:**

- **Sincronía:** El código se ejecuta línea por línea. La línea 2 no empieza hasta que la línea 1 termina. Si la línea 1 es leer un archivo de 5GB, todo el programa se congela.
- **Asincronía:** Permite iniciar una tarea lenta (como una petición a la base de datos) y "dejarla en segundo plano", continuando con la ejecución del resto del programa. Cuando la tarea lenta termina, el sistema es notificado.
- **Concurrencia vs. Paralelismo:** (Una distinción clásica en entrevistas). La *concurrencia* es sobre la **estructura** del programa: lidiar con muchas cosas a la vez (ej. un mozo atendiendo varias mesas, intercalando su atención). El *paralelismo* es sobre la **ejecución**: hacer literalmente muchas cosas en el mismo instante físico (ej. dos mozos atendiendo dos mesas al mismo tiempo en un procesador multi-núcleo). Node.js es altamente concurrente pero (usualmente) no paralelo; lenguajes como Go o C# pueden ser ambos.

### DATA-094 — Event loop y colas de tareas

**Concepto ampliado:** En entornos de un solo hilo (como Node.js o el navegador), el *Event Loop* es el motor que hace posible la asincronía sin usar paralelismo real.
Consta del *Call Stack* (pila de llamadas de tu código), las *Web APIs / C++ APIs* (que hacen el trabajo pesado en el sistema operativo) y las *Colas de Tareas* (Macrotask y Microtask queues).
**El peligro:** Si escribes una operación matemática gigante en el hilo principal (ej. un `for` de mil millones de iteraciones), el Call Stack se bloquea. Mientras esté bloqueado, el Event Loop no puede procesar clics de usuarios, ni respuestas de red, "congelando" toda la aplicación.

**Ejemplo (Bloqueo del Event Loop):**

```javascript
// ❌ MAL: Esto bloquea el hilo principal. Ningún evento asíncrono se procesará.
function calcularPrimosGigantes() {
    for (let i = 0; i < 10000000000; i++) { /* CPU intensivo */ }
}

// ✅ BIEN: Delegar trabajo intensivo a un Web Worker (Navegador) o Worker Thread (Node)
const worker = new Worker('calculoPesado.js');
worker.onmessage = (resultado) => console.log(resultado);
```

### DATA-095 — Promesas y async/await

**Concepto ampliado:** Una Promesa es un objeto que representa el resultado eventual (o el fallo) de una operación asíncrona. Tiene tres estados: `Pending` (pendiente), `Fulfilled` (resuelta) o `Rejected` (rechazada).
`async/await` es "azúcar sintáctico" sobre las promesas que hace que el código asíncrono se lea como si fuera síncrono, evitando el famoso *Callback Hell* o largas cadenas de `.then()`. Sin embargo, un error común es olvidar manejar el rechazo, lo que resulta en excepciones fatales (Unhandled Promise Rejections).

**Ejemplo (Manejo correcto de errores y concurrencia):**

```javascript
// Manejo secuencial (Lento si no dependen entre sí)
async function obtenerDatos() {
    try {
        const user = await fetchUser(); // Tarda 1s
        const posts = await fetchPosts(); // Tarda 1s. Total: 2s
    } catch (error) {
        console.error("Algo falló:", error);
    }
}

// Manejo concurrente (Rápido: ambas inician al mismo tiempo)
async function obtenerDatosOptimizados() {
    try {
        const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]); // Total: 1s
    } catch (error) {
        // Si una falla, Promise.all salta directo al catch
    }
}
```

### DATA-096 — Concurrencia, carreras e invariantes

**Concepto ampliado:** Una **Condición de Carrera** (Race Condition) ocurre cuando la corrección del sistema depende del orden impredecible en que terminan dos operaciones concurrentes.
En el frontend, el caso más clásico es un buscador interactivo (Typeahead): el usuario escribe "A" (se lanza petición 1, que resulta ser lenta) y luego escribe "B" (se lanza petición 2, que es muy rápida). La respuesta 2 llega y muestra datos, pero segundos después llega la respuesta 1 y sobrescribe la pantalla con datos viejos e incorrectos.

**Ejemplo (Solución a condición de carrera en UI):**

```javascript
let currentRequestId = 0;

async function realizarBusqueda(query) {
    const requestId = ++currentRequestId; // Marcador único para esta petición
    
    const resultados = await api.buscar(query);
    
    // Invariante: Solo actualizar la UI si esta petición sigue siendo la última solicitada
    if (requestId === currentRequestId) {
        renderizar(resultados);
    }
}
```

### DATA-097 — Operaciones idempotentes, reintentos y cancelación

**Concepto ampliado:**

- **Idempotencia:** Una operación es idempotente si ejecutarla una vez tiene el mismo efecto que ejecutarla cien veces. En HTTP, `GET`, `PUT` y `DELETE` deben ser idempotentes. `POST` no lo es (crea duplicados).
- **Reintentos:** Solo debes reintentar automáticamente operaciones que sabes que son idempotentes o seguras.
- **Cancelación:** En aplicaciones modernas, si el usuario navega a otra página antes de que termine una petición de red, la petición debe cancelarse para liberar memoria y evitar errores de estado.

**Ejemplo (Cancelación de peticiones con AbortController):**

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Iniciamos la petición
fetch('/api/datos-pesados', { signal })
    .then(res => res.json())
    .catch(err => {
        if (err.name === 'AbortError') console.log("Petición cancelada por el usuario");
    });

// Si el usuario cierra el modal o cambia de ruta:
controller.abort(); // Detiene la conexión de red inmediatamente
```

### DATA-098 — Flujo de datos asíncrono y backpressure

**Concepto ampliado:** Cuando procesas grandes cantidades de datos (ej. un video de 10GB o un archivo CSV inmenso), leerlo todo en memoria (Buffer) colapsará el servidor (`Out of Memory`).
Los **Streams** resuelven esto leyendo y enviando los datos en pequeños fragmentos (chunks) a medida que llegan.
El **Backpressure** (Contrapresión) es un mecanismo de seguridad: si el componente que *lee* los datos es más rápido que el componente que los *procesa/escribe*, los datos se acumularán en memoria. El backpressure pausa automáticamente la lectura hasta que el escritor esté listo para recibir más.

**Ejemplo (Streams y Backpressure implícito en Node.js):**

```javascript
const fs = require('fs');

app.get('/descargar-video', (req, res) => {
    // ❌ MAL: Lee 5GB en la memoria RAM del servidor de golpe.
    // fs.readFile('video.mp4', (err, data) => res.send(data));

    // ✅ BIEN: Lee un fragmento pequeño del disco y lo empuja a la red.
    // El método `.pipe()` maneja el Backpressure automáticamente:
    // si la conexión a internet del cliente es lenta, Node.js pausa la lectura del disco.
    const readStream = fs.createReadStream('video.mp4');
    readStream.pipe(res);
});
```

## 12. Desarrollo de interfaces y organización de estilos

### DATA-099 — Separación entre contenido, estructura, presentación y comportamiento

**Concepto ampliado:** Es el principio fundacional de la web. El **HTML** debe ser puramente semántico (describir *qué* es el dato, no cómo se ve). El **CSS** maneja la presentación visual. El **JavaScript** dicta el comportamiento dinámico.
Un anti-patrón extremadamente común hoy en día (incluso usando React o Vue) es reinventar controles nativos creando un `<div>` y agregándole un evento `onClick`. Esto destruye la accesibilidad: un `<div>` no es enfocable con la tecla Tab, los lectores de pantalla no anuncian que es un elemento interactivo, y no se activa al presionar la tecla "Enter" o "Espacio".

**Ejemplo (Anti-patrón vs Semántica correcta):**

```html
<!-- ❌ MAL: Un div disfrazado de botón. Inaccesible por defecto. -->
<div class="boton-bonito" onclick="enviarFormulario()">Enviar</div>

<!-- ✅ BIEN: Usa el elemento semántico nativo. -->
<button type="submit" class="boton-bonito" onClick="enviarFormulario()">
  Enviar
</button>
```

### DATA-100 — Cascada, especificidad y herencia CSS

**Concepto ampliado:** La "Cascada" (la 'C' en CSS) determina qué regla gana cuando hay conflictos. El motor del navegador calcula la **Especificidad** otorgando "puntos" invisibles:

1. Estilos en línea (`style="..."`) ganan a todo.
2. IDs (`#header`) ganan a las clases.
3. Clases, pseudo-clases y atributos (`.btn`, `:hover`, `[type="text"]`) ganan a las etiquetas.
4. Etiquetas (`div`, `p`) tienen el menor peso.
El uso de `!important` rompe el flujo natural de la cascada y se considera un anti-patrón de mantenimiento, ya que la única forma de sobrescribir un `!important` es con *otro* `!important` aún más específico.

**Ejemplo:**

```css
/* Especificidad: 0, 1, 1 (1 clase, 1 etiqueta) */
.tarjeta p { color: red; } 

/* Especificidad: 0, 2, 0 (2 clases). ESTA REGLA GANA. */
.tarjeta .texto-destacado { color: blue; }
```

### DATA-101 — BEM (Block, Element, Modifier)

**Concepto ampliado:** Antes de la popularización de CSS-in-JS, CSS Modules o Tailwind, el alcance global de CSS causaba que los estilos colisionaran constantemente. BEM es una convención estricta de nombres que "aplana" la especificidad (casi todo es una sola clase) y auto-documenta la relación estructural en el DOM.

- **Block:** El componente independiente (`.card`).
- **Element:** Una parte dependiente del bloque (`.card__title`).
- **Modifier:** Una variación visual o de estado (`.card--destacada`).

**Ejemplo:**

```html
<article class="mensaje mensaje--exito">
  <h2 class="mensaje__titulo">Operación completada</h2>
  <button class="mensaje__boton-cerrar">X</button>
</article>
```

### DATA-102 — Atomic Design

**Concepto ampliado:** Creado por Brad Frost, es una metodología para crear Sistemas de Diseño (Design Systems). Divide la UI en una jerarquía química:

- **Átomos:** Componentes indivisibles (un `<button>`, un `<input>`, una paleta de colores).
- **Moléculas:** Agrupación de átomos con un propósito (un `<input>` y un `<button>` forman un *SearchForm*).
- **Organismos:** Secciones complejas e independientes (un Header completo).
- **Plantillas y Páginas:** La estructura de la vista y la instancia final con datos reales.
*Ojo:* Es un modelo mental para diseño gráfico y estructuración de librerías de UI; no siempre es necesario reflejarlo 1:1 en la arquitectura de carpetas de tu código fuente.

### DATA-103 — Patrón Context/Container (Smart vs Dumb Components)

**Concepto ampliado:** Popularizado en el ecosistema React. Divide los componentes en dos tipos:

1. **Componentes Contenedores (Smart):** Se encargan de "cómo funcionan las cosas". Hacen *fetching* de datos, se conectan a Redux/Zustand, y manejan el estado. No tienen (idealmente) CSS propio.
2. **Componentes Presentacionales (Dumb):** Se encargan de "cómo se ven las cosas". Reciben datos y *callbacks* exclusivamente vía *props*. Son puros, fáciles de testear e ideales para un Storybook.
Aunque los React Hooks flexibilizaron esta regla (permitiendo inyectar lógica dentro de la vista mediante custom hooks), la separación conceptual entre "gestión de estado" y "pintado de UI" sigue siendo la mejor práctica.

**Ejemplo (React):**

```jsx
// CONTENEDOR (Smart): Sabe de APIs y Estado
function UserProfileContainer({ userId }) {
  const { data, loading } = useFetchUser(userId);
  if (loading) return <Spinner />;
  return <UserProfile user={data} onFollow={() => api.follow(userId)} />;
}

// PRESENTACIONAL (Dumb): Solo pinta lo que le dan
function UserProfile({ user, onFollow }) {
  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <button onClick={onFollow}>Seguir</button>
    </div>
  );
}
```

### DATA-104 — Responsive design y diseño fluido

**Concepto ampliado:** El **Responsive Design** utiliza Media Queries (`@media`) para mutar el layout (ej. pasar de una grilla de 3 columnas a 1) en puntos de quiebre (breakpoints). La regla de oro es crear breakpoints basados en *cuando el contenido se rompe*, no en anchos arbitrarios de dispositivos como "iPhone 14".
El **Diseño Fluido** es un paso más allá: utiliza unidades relativas (`vw`, `vh`, `rem`, `%`) y funciones CSS modernas como `clamp()`, `min()` o `calc()` para que los elementos se expandan o encojan suavemente como un líquido, reduciendo la necesidad de múltiples media queries rígidas.

### DATA-105 — Componentes, composición y estados de interfaz

**Concepto ampliado:** Una UI no es estática. A menudo los desarrolladores olvidan modelar explícitamente los estados de carga o error, causando fallos visuales. Una vista suele tener 5 estados base: *Initial (Vacío)*, *Loading (Cargando)*, *Success (Datos)*, *Error*, y *Disabled*.
Un buen modelo de estado previene combinaciones imposibles (ej. que la UI muestre el estado `isLoading: true` y a la vez `error: 'Fallo de red'`). Esto se mitiga en TypeScript usando Tipos de Unión Discriminada.

**Ejemplo (Evitando estados imposibles en TypeScript):**

```typescript
// ❌ MAL: Permite combinaciones inválidas (loading = true Y error = "Fallo")
interface StateMalo { data: any; loading: boolean; error: string | null; }

// ✅ BIEN: Máquina de estados (Unión discriminada). 
// El compilador no te dejará acceder a 'error' si el status es 'LOADING'.
type StateBueno = 
  | { status: 'LOADING' }
  | { status: 'SUCCESS'; data: User[] }
  | { status: 'ERROR'; error: Error };
```

### DATA-106 — Accesibilidad semántica (a11y) en interfaces

**Concepto ampliado:** Accesibilidad (a11y) garantiza que la aplicación pueda ser usada por personas con discapacidades (visuales, motrices, cognitivas). Implica seguir los lineamientos de la WCAG:

1. **Navegación por teclado:** Todo elemento interactivo debe ser alcanzable con "Tab" y activable con "Enter/Espacio", mostrando un `:focus` visible.
2. **Contraste:** Texto y fondo deben tener un ratio de contraste mínimo (ej. 4.5:1 para texto normal).
3. **WAI-ARIA (Accessible Rich Internet Applications):** Atributos HTML especiales (`aria-hidden`, `aria-expanded`, `role="dialog"`) que otorgan contexto a los lectores de pantalla (Screen Readers) cuando los elementos semánticos nativos no son suficientes.

### DATA-107 — Knuth-Morris-Pratt (KMP)

**Concepto ampliado:** Es un algoritmo avanzado de búsqueda de subcadenas (String Matching). Si buscas la palabra "ANA" dentro de "BANANA", el enfoque ingenuo `O(n * m)` comparará caracter por caracter y, si falla, retrocederá el puntero de búsqueda en el texto principal y empezará de nuevo.
KMP precalcula una tabla **LPS** (Longest Prefix which is also Suffix) del patrón que estás buscando. Esta tabla le dice al algoritmo *exactamente cuántos caracteres puede saltar* sin perder coincidencias previas, garantizando que el puntero del texto principal nunca retroceda. Esto logra una complejidad lineal de `O(n + m)`.

**Ejemplo (La utilidad de la tabla LPS):**

```text
Texto:  A B A B D A B A C D A B A B C
Patrón: A B A B C
LPS:   [0 0 1 2 0]

Si el patrón falla en la letra 'C' (índice 4), la tabla LPS dice que los últimos 2 caracteres ('A B') ya formaban un prefijo válido. 
En lugar de reiniciar la búsqueda desde el índice 1 del texto, el algoritmo simplemente mueve el patrón hacia adelante alineando el prefijo, ahorrando docenas de comparaciones inútiles.
```

## 13. Bases de Datos y Persistencia

### DATA-108 — Bases de datos Relacionales (SQL) vs NoSQL

**Concepto ampliado:** Las bases de datos relacionales organizan los datos en tablas con esquemas estrictos y relaciones forzadas mediante claves foráneas. Son ideales cuando la consistencia y la estructura de los datos no cambian frecuentemente. Las bases NoSQL (documentales, clave-valor, grafos) permiten esquemas dinámicos, favorecen la desnormalización (guardar datos anidados) y están optimizadas para escalamiento horizontal rápido y grandes volúmenes de datos no estructurados.

**Ejemplo (Normalización vs Desnormalización):**

```sql
-- SQL (Normalizado): Requiere un JOIN para obtener los datos completos
SELECT u.name, a.city FROM users u JOIN addresses a ON u.id = a.user_id;
```

```json
// NoSQL Documental (Desnormalizado): El dato se lee de un solo tirón (ej. MongoDB)
{
  "_id": "1",
  "name": "Juan",
  "address": { "city": "Tucumán" }
}
```

### DATA-109 — Propiedades ACID

**Concepto ampliado:** ACID es un conjunto de propiedades que garantizan la fiabilidad de las transacciones en bases de datos (especialmente SQL).

- **Atomicidad (Atomicity):** La transacción es "todo o nada". Si un paso falla, se hace un *rollback* completo de todo lo anterior.
- **Consistencia (Consistency):** La base de datos pasa de un estado válido a otro (respetando restricciones, triggers y constraints).
- **Aislamiento (Isolation):** Múltiples transacciones concurrentes no interfieren entre sí. (Niveles clásicos: Read Uncommitted, Read Committed, Repeatable Read, Serializable).
- **Durabilidad (Durability):** Una vez que la transacción hace *commit*, el cambio persiste y sobrevive incluso si el servidor se apaga repentinamente.

### DATA-110 — Índices y Planes de Ejecución

**Concepto ampliado:** Un índice es una estructura de datos (generalmente un Árbol-B o un Hash) que mejora drásticamente la velocidad de las operaciones de lectura en una tabla. El *trade-off* es que consumen espacio en disco y hacen que las escrituras (`INSERT`, `UPDATE`, `DELETE`) sean más lentas, ya que el índice debe actualizarse. Leer el *Execution Plan* de la base de datos permite entender si una consulta está usando eficientemente el índice (*Index Scan*) o si está leyendo toda la tabla registro por registro (*Full Table Scan*).

**Ejemplo:**

```sql
-- Si buscamos mucho por email, sin un índice esto es un Full Table Scan O(N)
SELECT * FROM users WHERE email = 'ejemplo@mail.com';

-- Crear el índice cambia la complejidad de búsqueda a O(log N)
CREATE INDEX idx_users_email ON users(email);
```

### DATA-111 — Teorema CAP

**Concepto ampliado:** Establece que en un sistema de datos distribuido es imposible garantizar simultáneamente más de dos de las siguientes tres características:

- **Consistencia (Consistency):** Todos los nodos ven exactamente los mismos datos al mismo tiempo.
- **Disponibilidad (Availability):** Cada petición recibe una respuesta (sin error), aunque no sea la versión más reciente del dato.
- **Tolerancia a particiones (Partition Tolerance):** El sistema sigue funcionando aunque se caiga la red que comunica a los nodos.
En la práctica, las redes siempre fallan, por lo que la "Partición" (P) es inevitable. Los arquitectos deben elegir entre construir sistemas **CP** (favorecer exactitud, como bases de datos financieras) o sistemas **AP** (favorecer que el sistema nunca rechace peticiones, como redes sociales).

### DATA-112 — ORM/ODM y el problema de N+1 consultas

**Concepto ampliado:** Los ORM (Object-Relational Mapping) abstraen las consultas SQL permitiendo usar objetos del lenguaje de programación. Facilitan el desarrollo pero pueden ocultar ineficiencias graves. El problema "N+1" ocurre cuando se hace una consulta inicial para obtener N registros y luego, iterativamente, N consultas adicionales para obtener las relaciones de cada uno, destruyendo el rendimiento por la latencia de red repetida. Se soluciona usando *Eager Loading* (carga ansiosa).

**Ejemplo:**

```typescript
// ❌ MAL: Hace 1 consulta por los usuarios, y N consultas separadas por los posts (N+1)
const users = await User.find();
for (let user of users) {
  console.log(await user.getPosts()); // Se dispara un nuevo SELECT en la BD por cada iteración
}

// ✅ BIEN: Eager Loading (Hace solo 2 consultas o un JOIN eficiente)
const users = await User.find({ relations: ['posts'] });
```

---

## 14. APIs y Protocolos de Red

### DATA-113 — REST y Niveles de Madurez de Richardson

**Concepto ampliado:** REST (Representational State Transfer) es un estilo arquitectónico para sistemas distribuidos. El modelo de madurez de Richardson evalúa qué tan "RESTful" es una API:

- **Nivel 0:** Solo usa HTTP como túnel de transporte a un único endpoint (estilo SOAP).
- **Nivel 1 (Recursos):** Usa múltiples URIs para representar recursos distintos (`/users`, `/orders`).
- **Nivel 2 (Verbos HTTP):** Usa correctamente los métodos (`GET`, `POST`, `PUT`, `DELETE`) y los códigos de estado HTTP (200, 201, 404, 500).
- **Nivel 3 (HATEOAS):** Las respuestas incluyen enlaces (hypermedia) a las siguientes acciones posibles, permitiendo que el cliente navegue la API dinámicamente sin hardcodear rutas.

### DATA-114 — GraphQL y Overfetching

**Concepto ampliado:** GraphQL es un lenguaje de consulta para APIs. Resuelve dos grandes deficiencias de REST: el *Overfetching* (el servidor devuelve un JSON gigante cuando el cliente solo necesitaba un dato) y el *Underfetching* (el cliente debe hacer múltiples peticiones a distintos endpoints para armar una vista completa). En GraphQL, existe un solo endpoint y el cliente solicita exactamente la estructura de datos que necesita.

**Ejemplo:**

```graphql
# El cliente pide exactamente los campos que va a usar en la vista, ahorrando ancho de banda
query {
  user(id: "123") {
    name
    posts {
      title
    }
  }
}
```

### DATA-115 — WebSockets y Comunicación Bidireccional

**Concepto ampliado:** HTTP tradicional es un protocolo unidireccional y sin estado: el cliente siempre debe iniciar la petición. Para aplicaciones en tiempo real (chats, trading, juegos multi-jugador), estar preguntando al servidor constantemente si hay datos nuevos (*Polling*) consume demasiados recursos. **WebSockets** soluciona esto estableciendo una conexión TCP persistente, bidireccional y de baja latencia donde tanto el servidor como el cliente pueden empujar mensajes en cualquier momento, omitiendo la pesada cabecera HTTP en cada intercambio.

## Referencias y crecimiento del corpus

Los conceptos anteriores son síntesis didácticas iniciales. Al añadir afirmaciones técnicas dependientes de versiones, parámetros recomendados o estándares, registrar fuente primaria, versión/fecha de revisión y alcance. No agregar material copiado extensamente; resumir con atribución.

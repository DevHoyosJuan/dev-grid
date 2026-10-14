# Dev Grid — frontend increment v1.1

Date: 2026-10-14. Authorized by the user's correction request. Baseline: main.md v1.0 and front-end.md; this increment takes precedence for the explicitly changed behavior. Work item: CHG-001.

- DG-CHG-001: First version has no sessions. Preserve account/access controls behind a disabled presentation flag; neither the access badge nor account avatar is visible or keyboard reachable.
- DG-CHG-002: Every page footer credits “Desarrollado por DevHoyosJuan”.
- DG-CHG-003: Library retains category chips and adds a readable vertical category list, with selected state and a clear all-categories action.
- DG-CHG-004: Concept details show the title once and the complete canonical body, without repeating its summary below the title. Code examples preserve indentation, language, lists and tables; raw HTML remains inert text.
- DG-CHG-005: Parse all DATA identifiers, including fractional IDs and fourth-level headings, from the updated data.md without fixed corpus counts.
- DG-CHG-006: All algorithms in the algorithm chapter plus KMP have distinct deterministic graphical examples, pseudocode and an algorithm-specific flowchart with labeled decisions and loops. Previous/next/reset restore complete states; Hanoi visibly preserves peg order and disk rules. Provide at least two example inputs per algorithm and configurable Hanoi disk count.
- DG-CHG-007: Deferred by the user to the next task. Lógica y Estructuras Discretas will require user-provided UTN-FRT files; no section or course material is added in this increment.

## Acceptance scenarios

1. Given any page, account controls are hidden and the author credit appears in its footer.
2. Given the Library, selecting a vertical category filters the same units as its chip; a concept shows its explanation once and examples as formatted blocks.
3. Given updated data.md, every DATA heading becomes exactly one unit and examples remain intact.
4. Given any algorithm, both example inputs generate coherent graphical steps, pseudocode and a complete flowchart; boundaries disable previous/next appropriately.
5. Given Hanoi with 3 disks, exactly 7 legal moves transfer the tower; stepping backward restores the previous pegs.
6. Given a 320 px viewport, page width does not exceed the viewport; diagrams and code may scroll only inside labeled containers. Controls work with keyboard and reduced motion.
7. Lógica y Estructuras Discretas remains a future work item awaiting the user files.

## Validation plan

Unit tests: Markdown parsing, complete algorithm catalog and deterministic invariants (sorting, graph distances, searches, compression, clustering, Hanoi). Integration: hidden controls, categories, examples, complete catalog and logic pending state. Browser: desktop/mobile/intermediate, keyboard, console, flowchart and Hanoi visual inspection.

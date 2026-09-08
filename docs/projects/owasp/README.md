# XSS Training Lab

## Overview: Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) ist eine Sicherheitslücke, bei der ein Angreifer
schädlichen JavaScript-Code in eine Webseite einschleust, der dann im Browser
eines Opfers ausgeführt wird. Möglich wird dies, wenn eine Anwendung
Nutzereingaben entgegennimmt und diese ungefiltert (ohne Escaping) wieder in
die Seite einbaut. Je nach Art der Schwachstelle unterscheidet man u. a.:

- **Reflected XSS** — der Payload wird über die URL (z. B. einen
  Query-Parameter) an den Server gesendet und direkt in der Antwort
  zurückgespiegelt, ohne gespeichert zu werden.
- **Stored XSS** — der Payload wird dauerhaft auf dem Server gespeichert
  (z. B. in einem Kommentarfeld) und bei jedem Seitenaufruf erneut ausgeführt.
- **DOM-based XSS** — die Schwachstelle entsteht rein clientseitig im
  JavaScript-Code, ohne dass der Server involviert ist.

Zentral für das Verständnis jeder XSS-Variante ist das Konzept von
**Source** (wo der Payload eingegeben wird) und **Sink** (wo er ausgeführt
wird) — mehr dazu in der verlinkten Dokumentation.

## Levels

| Level      | Dokumentation                                     |
|------------|---------------------------------------------------|
| google xss | [google xss challenge](./google-xss-challenge.md) |
| baby xss   | [baby xss challenge](./baby-xss-challenge.md)     |


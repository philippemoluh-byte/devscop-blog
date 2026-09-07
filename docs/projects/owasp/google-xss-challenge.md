# Cross-Site Scripting (XSS) — Level 1: FourOrFour

## Grundprinzip: Source und Sink

> Beim Cross-Site Scripting dreht sich alles um zwei Schlüsselelemente: eine **Source** und einen **Sink**. Die Source ist der Ort, an dem du deinen Payload (meistens ein Skript) einfügst. Der Sink ist die Stelle, an der dieser Payload ausgeführt wird. Ein erfolgreicher Angriff besteht darin, deinen Code von der Source zum Sink zu übertragen und dort auszuführen.

# Table of Contents

- [Funktionsprinzip von Level 1 (FourOrFour)](#funktionsprinzip-von-level-1-fourorfour)
    - [Warum das gefährlich ist](#warum-das-gefährlich-ist)
    - [Wichtige Konzepte aus der Aufgabe](#wichtige-konzepte-aus-der-aufgabe)
    - [Beispiel-Payload](#beispiel-payload)
- [Level 2: Persistence is key (XSS)](#level-2-persistence-is-key-xss)
    - [Der simple Angriffsversuch](#der-simple-angriffsversuch)
    - [Umgehen von Schutzmaßnahmen](#umgehen-von-schutzmaßnahmen)
    - [Kernaussage](#kernaussage)
- [Level 3: That Sinking Feeling…](#level-3-that-sinking-feeling)
    - [Queryparameter](#queryparameter)
    - [Quellcodeanalyse](#quellcodeanalyse)
    - [Funktionsanalyse und Sicherheitslücke](#funktionsanalyse-und-sicherheitslücke)
    - [Kernaussage](#kernaussage-1)
- [Level 4: Context matters](#level-4-context-matters)
    - [Standardpayload](#standardpayload)
    - [Netzwerktools](#netzwerktools)
    - [Quellcodemanipulation](#quellcodemanipulation)
    - [Kernaussage](#kernaussage-2)
- [Level 5: Breaking protocol](#level-5-breaking-protocol)
    - [Quellcodeanalyse](#quellcodeanalyse-1)
    - [Script-Injection](#script-injection)
    - [Kernaussage](#kernaussage-3)
- [Level 5: Follow the white rabbit](#level-5-follow-the-white-rabbit)
    - [Quellcodeanalyse](#quellcodeanalyse-2)
    - [MimeType](#mimetype)
    - [XSS Payloads](#xss-payloads)
    - [Kernaussage](#kernaussage-4)
- [Anmeldung und Cookie-Speicherung (Google XSS Game)](#anmeldung-und-cookie-speicherung-google-xss-game)
    - [Nutzung von "Edit this cookie"](#nutzung-von-edit-this-cookie)
    - [Manipulation des Cookie-Werts](#manipulation-des-cookie-werts)
    - [Cookie-Sicherheitseinstellung](#cookie-sicherheitseinstellung)
    - [Fazit](#fazit)


## Funktionsprinzip von Level 1 (FourOrFour)

**Die Schwachstelle:** Reflected XSS (nicht-persistentes Cross-Site-Scripting)

**Ablauf:**

1. Die Seite hat ein Suchfeld (**Source**), dessen Eingabe als Query-Parameter in der URL landet: `?query=<Suchanfrage>`
2. Der Server nimmt diesen Wert **ungefiltert** und baut ihn direkt in die HTML-Ergebnisseite ein (z. B. "Ergebnisse für: [Eingabe]") — hier befindet sich der **Sink**
3. Da keine Bereinigung (Escaping/Sanitizing) stattfindet, interpretiert der Browser eingefügten HTML/JS-Code als echten Code statt als reinen Text
4. Fügt man `<script>alert('Gehackt')</script>` ein, wird dieses Skript beim Laden der Seite ausgeführt → Alert-Fenster erscheint → Angriff erfolgreich

Der Payload hat also erfolgreich den Weg von der Source (Textfeld/URL-Parameter) zum Sink (HTML-Ausgabe der Ergebnisseite) zurückgelegt.

### Warum das gefährlich ist

Das Prinzip "Eingabe → wird direkt in Seite eingebaut → wird als Code ausgeführt" ist die Grundlage jeder XSS-Schwachstelle. In einem echten Angriffsszenario könnte man statt eines harmlosen `alert()` z. B. Session-Cookies stehlen oder den Nutzer umleiten.

### Wichtige Konzepte aus der Aufgabe

| Konzept | Bedeutung |
|---|---|
| **Frames & DevTools** | Manche Ziel-Seiten laufen in einem `<iframe>`. Über Rechtsklick → Untersuchen → Tab "Sources" → "Frames" kannst du den eigentlichen Quellcode der eingebetteten Seite einsehen (auch separat öffnen). |
| **URL-Encoding** | Sonderzeichen wie `<`, `>`, `'` müssen manchmal kodiert werden (z. B. `%3C` statt `<`), damit die URL korrekt übertragen wird und der Payload überhaupt ankommt. |
| **Escaping** | Die eigentliche Verteidigung: Zeichen wie `<`, `>`, `"`, `'` sollten serverseitig in ihre HTML-Entities (`&lt;`, `&gt;` etc.) umgewandelt werden, bevor sie in die Seite eingebaut werden (also am Sink). Fehlt dieses Escaping, entsteht die Lücke, die dieses Level ausnutzt. |

### Beispiel-Payload

```
<script>alert('Gehackt')</script>
```

---

**Kurz gesagt:** Das Level demonstriert den einfachsten Fall von reflected XSS — der Payload gelangt ungefiltert von der Source (Suchfeld/URL) zum Sink (HTML-Ausgabe), weil fehlendes Escaping der Nutzereingabe die Tür öffnet.


## Level 2: Persistence is key (XSS)

Cross-Site Scripting (XSS) ist eine häufige Sicherheitslücke in Webanwendungen. Ein typisches Beispiel ist ein Gästebuch auf einer Webseite: Fügt ein Angreifer dort schädlichen Code ein, wird dieser bei jedem Seitenbesuch für **alle** Besucher ausgeführt.

### Der simple Angriffsversuch

Die direkte Eingabe von JavaScript-Code wie:

```html
<script>alert('GEHACKT')</script>
```

in ein Textfeld ist ein einfacher Weg, einen Angriff zu starten. Allerdings funktioniert dies nicht immer, da viele moderne Webseiten gegen solche einfachen Angriffe geschützt sind — in diesem Fall durch die Nutzung des `<blockquote>`-Elements, das die Ausführung von `<script>`-Tags verhindert.

### Umgehen von Schutzmaßnahmen

Solche Schutzmaßnahmen lassen sich oft umgehen. Statt eines `<script>`-Tags kann das `onerror`-Attribut eines Bild-Elements genutzt werden:

```html
<img src="..." onerror="alert('GEHACKT')"/>
```

Wenn die Bildquelle nicht gefunden wird, wird der JavaScript-Code im `onerror`-Attribut ausgeführt — der Filter, der `<script>`-Tags blockiert, greift hier nicht.

### Kernaussage

Einfache HTML-Filter (z. B. das Einbetten in bestimmte Tags) reichen nicht aus, um XSS zuverlässig zu verhindern. Angreifer können über alternative HTML-Attribute wie `onerror` trotzdem Schadcode einschleusen.

## Level 3: That Sinking Feeling…

Bei jeder XSS-Attacke sind eine **Source** und eine **Sink** beteiligt. In diesem Level wird eine Cloudanwendung mit eingebettetem iFrame untersucht — Bilder-Klicks verändern Link und iFrame-Inhalt, es gibt jedoch **keine Textfelder** für Skript-Eingaben.

### Queryparameter

Die Webseite besitzt einen Queryparameter, der sich je nach Interaktion ändert. Ein direkter Versuch, Skript-Code (URL-encoded) über diesen Parameter zu injizieren, führt hier **nicht** zum Erfolg.

### Quellcodeanalyse

Über **Strg + U** lässt sich der komplette Quellcode einsehen. Darin wird die Sink identifiziert: die JavaScript-Funktion `chooseTab()`.

### Funktionsanalyse und Sicherheitslücke

Die Funktion `chooseTab()` fügt ein Bild über ein `<img>`-Tag ein — hier liegt die Schwachstelle: Das `onerror`-Attribut kann genutzt werden, um JavaScript einzubetten.

Wichtig: Die Variable `num` in `chooseTab(num)` wird immer aus dem URL-Parameter geladen. Über den passenden Wert für `num` lässt sich somit ein `onerror`-Attribut einschleusen.

### Kernaussage

Nicht jede XSS-Lücke lässt sich über offensichtliche Eingabefelder finden — hier steckt die Schwachstelle in einer JavaScript-Funktion, die Eingaben aus einem URL-Parameter ungefiltert in ein `<img>`-Tag einbaut.

## Level 4: Context matters

Eine einfache Webseite mit einem Textfeld für einen Timer. Die eingegebene Zahl erscheint auch als Queryparameter in der URL.

### Standardpayload

Erste Versuche mit gängigen Standardpayloads schlagen fehl.

### Netzwerktools

Die Chrome-Netzwerktools zeigen: Beim Start eines neuen Timers liefert der Server eine neue Seite zurück. Der Quellcode wird dabei serverseitig anhand des Queryparameters generiert und in eine JavaScript-Funktion eingebaut. Diese Funktion selbst lässt sich nicht direkt manipulieren — interessant ist jedoch ein Bild-Tag, das über ein `onload`-Attribut aufgerufen wird. Hier besteht die Möglichkeit, stattdessen ein `onerror`-Attribut einzuschleusen.

### Quellcodemanipulation

Einzelne Sonderzeichen wie ein Hochkomma (`'`) werden serverseitig encodiert und lassen sich nicht direkt einschleusen. Folgender Payload funktioniert jedoch:

```
3');alert('XSS
```

**Hintergrund:** Nur einzelne Hochkommas werden escaped — Klammern und Semikolons hingegen nicht. Selbst wenn Hochkommas entfernt werden, lässt sich die alternative Zeichenkombination `\'` nutzen, die im `onload`-Attribut trotzdem korrekt als Hochkomma interpretiert wird.

### Kernaussage

Serverseitiges Escaping schützt nur, wenn **alle** relevanten Zeichen (nicht nur Anführungszeichen, sondern auch Klammern, Semikolons und alternative Zeichendarstellungen) konsequent gefiltert werden. Der Kontext, in dem eine Eingabe interpretiert wird (hier: innerhalb eines `onload`-Attributs), entscheidet darüber, welche Zeichen tatsächlich gefährlich sind.

## Level 5: Breaking protocol

Eine Webseite, auf der eine E-Mail-Adresse eingegeben werden kann. Erste Standardangriffe direkt im Textfeld führen nicht zum Erfolg.

### Quellcodeanalyse

Der Klick auf **"Next"** erweist sich als einfacher Link auf eine weitere Seite. Ein Blick auf die Query-Parameter zeigt: Der Parameter `next=welcome` definiert das `href`-Attribut des "Next"-Links. Verändert man diesen Parameter in der Adressleiste, lässt sich der generierte HTML-Code der Seite beeinflussen.

### Script-Injection

Ein direktes Einschleusen von JavaScript-Code über den Parameter funktioniert nicht — der eingefügte Code wird nicht ausgeführt.

Der Ansatz gelingt jedoch über das `href`-Attribut selbst: Wird der Parameter so gestaltet, dass das `href`-Attribut mit einem `javascript:`-Protokoll überschrieben wird, führt ein Klick auf den Link den eingeschleusten JavaScript-Code aus.

### Kernaussage

Es handelt sich um eine **Reflected-XSS-Schwachstelle**: Der schädliche Code wird nicht direkt auf der Seite ausgeführt, sondern erst durch eine Nutzerinteraktion (Klick auf den manipulierten Link) ausgelöst. Die Schwachstelle liegt darin, dass ein URL-Parameter ungefiltert in ein `href`-Attribut übernommen wird, wodurch sich das Protokoll (`javascript:` statt `http:`) austauschen lässt.

## Level 5: Follow the white rabbit

Diese Challenge enthält kein Eingabefeld. Stattdessen zeigt die Seite eine Fehlermeldung, dass eine JavaScript-Datei nicht gefunden werden konnte. Diese Datei taucht auch in der URL-Leiste auf — ein Hinweis darauf, dass sich über die URL fremder Code einschleusen lässt.

### Quellcodeanalyse

Der Wert hinter dem `#`-Zeichen in der URL wird tatsächlich als Skript auf der Seite geladen. Eingaben, die mit `http(s)` beginnen, werden jedoch herausgefiltert — direktes Einbinden externer URLs ist somit nicht möglich.

### MimeType

Trotz des Filters lässt sich JavaScript über den **mimeType** `data` injizieren, mit dem sich Text oder Code direkt einbetten lässt:

```
#data:text/javascript,alert('XSS')
```

### XSS Payloads

Als praktischer Tipp: Eine Google-Suche nach "XSS Payloads" liefert brauchbare Beispiele zum Ausprobieren. Auch eine Suche nach "XSS" auf Twitter ist eine gute Quelle für aktuelle Payloads.

### Kernaussage

Filter, die nur bestimmte Muster (z. B. `http(s)`-URLs) blockieren, reichen nicht aus, wenn alternative Wege wie das `data:`-URI-Schema mit passendem MIME-Type ungefiltert bleiben. Auch ohne klassisches Eingabefeld können URL-Fragmente (`#...`) als Angriffsvektor dienen, wenn sie ungeprüft als Skriptquelle geladen werden.

## Anmeldung und Cookie-Speicherung (Google XSS Game)

Beim Google XSS Game ist keine Anmeldung erforderlich. Stattdessen wird der Fortschritt über Cookies direkt im Browser gespeichert — so wird nachvollzogen, welche Levels bereits abgeschlossen wurden.

### Nutzung von "Edit this cookie"

Die Browsererweiterung **"Edit this cookie"** zeigt für jedes Level ein Cookie mit einem kryptischen Wert. Dieser Wert entscheidet, ob ein Level als "bestanden" gilt.

### Manipulation des Cookie-Werts

- Wird das Cookie gelöscht, gilt das Level nicht mehr als bestanden.
- Wird es wieder hinzugefügt, gilt das Level erneut als abgeschlossen.

Das zeigt, wie verwundbar rein cookie-basierte Fortschrittsverfolgung sein kann.

### Cookie-Sicherheitseinstellung

In den Spieloptionen sollte die Einstellung **"Strict"** ausgewählt werden — sie spielt eine wichtige Rolle für die Sicherheit der Cookie-Daten.

### Fazit

Das Beispiel zeigt, wie leicht Systeme manipuliert werden können, die sich allein auf Cookies für Authentifizierung oder Statusverfolgung verlassen. Es empfiehlt sich, sich mit sichereren Methoden zur Speicherung und Überprüfung von Benutzerdaten auseinanderzusetzen.

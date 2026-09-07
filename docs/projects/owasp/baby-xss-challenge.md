# Baby XSS Challenge: Einführung

Nach dem Google XSS Game folgt als nächste Herausforderung das **Baby XSS Spiel**. Es liefert die Grundlagen für den Einstieg in die erste Challenge.


# Table of Contents

- [Challenge 1: Das Setup](#challenge-1-das-setup)
    - [Durchführung des Angriffs: Standardangriff](#durchführung-des-angriffs-standardangriff)
    - [Kernaussage](#kernaussage)
- [Baby XSS 02: DOM Based XSS Attacke](#baby-xss-02-dom-based-xss-attacke)
    - [Finden der Source im JS-Code](#finden-der-source-im-js-code)
    - [DecodeURI Funktion](#decodeuri-funktion)
    - [Zweite Standardattacke](#zweite-standardattacke)
    - [Kernaussage](#kernaussage-1)
- [Baby XSS 03: Verstehen der Challenge](#baby-xss-03-verstehen-der-challenge)
    - [PHP Code: Einsatz von htmlspecialchars()](#php-code-einsatz-von-htmlspecialchars)
    - [Href und JavaScript: Code ohne HTML-Klammern](#href-und-javascript-code-ohne-html-klammern)
    - [Fehlerhafter JavaScript-Code: Probleme mit Unterpfaden](#fehlerhafter-javascript-code-probleme-mit-unterpfaden)
    - [Kernaussage](#kernaussage-2)
    - [Alternativer Angriffsweg](#alternativer-angriffsweg)
        - [Externe Skripte und GitHub](#externe-skripte-und-github)
        - [Payload-Erstellung mit VS Code](#payload-erstellung-mit-vs-code)
        - [Vorteile der Methode](#vorteile-der-methode)
        - [Kernaussage](#kernaussage-3)
- [Einschränkung von Eingabezeichen & JSFuck](#einschränkung-von-eingabezeichen--jsfuck)
    - [Keine Alphabete und Ziffern](#keine-alphabete-und-ziffern)
    - [JSFuck: Esoterische Programmierung](#jsfuck-esoterische-programmierung)
    - [Herausforderungen bei der Code-Verkürzung](#herausforderungen-bei-der-code-verkürzung)
    - [Lernziele: Der Teufel steckt im Detail](#lernziele-der-teufel-steckt-im-detail)
- [No Quotes Challenge: XSS-Payloads ohne Hochkommas](#no-quotes-challenge-xss-payloads-ohne-hochkommas)
    - [Zahl zu String: Der Weg über Zeichencodes](#zahl-zu-string-der-weg-über-zeichencodes)
    - [eval(): Dynamische Code-Ausführung](#eval-dynamische-code-ausführung)
    - [Kernaussage](#kernaussage-4)

## Challenge 1: Das Setup

Die erste Aufgabe besteht aus einem einfachen Texteingabefeld. Besonderheit hier: Der gesamte Quellcode inklusive PHP-Code ist einsehbar — anders als in der Praxis, wo der Backend-Code normalerweise nicht zugänglich ist. Dieser Einblick zeigt genau den Aufbau der Webseite und erleichtert die Planung eines gezielten Angriffs.

### Durchführung des Angriffs: Standardangriff

Da der Quellcode bekannt ist, lässt sich direkt ein Standardangriff durchführen, um die Schwachstelle der Seite zu identifizieren und auszunutzen.

### Kernaussage

Der direkte Zugriff auf den Quellcode (inkl. Backend-Logik) macht es leicht nachvollziehbar, wie Eingaben verarbeitet werden — ein guter Ausgangspunkt, um zu lernen, wie XSS-Schwachstellen systematisch aufgespürt werden können, bevor man ohne Quellcode-Einblick arbeiten muss.

## Baby XSS 02: DOM Based XSS Attacke

Im Unterschied zu anderen XSS-Szenarien gibt es hier **keine offensichtlichen Eingabefelder** — das macht die Challenge kniffliger.

### Finden der Source im JS-Code

Der erste Lösungsschritt besteht darin, die relevante Datenquelle (Source) zu finden. Der JavaScript-Code zeigt, dass `location.hash` den Hashwert aus der URL ausliest und direkt in den HTML-Code einfügt. Der PHP-Code spielt in diesem Beispiel keine Rolle.

### DecodeURI Funktion

Eine Besonderheit ist der Einsatz der Funktion `decodeURI(q)`, die einfache Angriffsversuche verhindert.

### Zweite Standardattacke

Trotz fehlendem Eingabefeld und dem Schutz durch `decodeURI(q)` gelingt die zweite Standardattacke. Das zeigt: Eine DOM-basierte XSS-Attacke ist weiterhin möglich, auch wenn naheliegende Schutzmaßnahmen vorhanden sind.

### Kernaussage

DOM-basiertes XSS entsteht, wenn clientseitiger JavaScript-Code Daten aus unsicheren Quellen (wie `location.hash`) ungefiltert in die Seite einfügt — unabhängig davon, ob ein sichtbares Eingabefeld existiert. Einzelne Schutzfunktionen wie `decodeURI()` reichen dabei nicht zwangsläufig aus, um alle Angriffsvarianten zu blockieren.

## Baby XSS 03: Verstehen der Challenge

Die Webseite enthält ein Eingabefeld, in das ein Link zu einer anderen Webseite eingegeben werden kann. Nach der Eingabe erscheinen oben drei Hyperlinks zu den Unterseiten `/friends`, `/post` und `/settings`.

### PHP Code: Einsatz von htmlspecialchars()

Die Seite nutzt die PHP-Funktion `htmlspecialchars()`, um HTML-Sonderzeichen zu escapen. Dadurch können spitze Klammern oder Hochkommata nicht direkt zum Einschleusen von Schadcode genutzt werden — der PHP-Code macht die Seite in dieser Hinsicht sicherer.

### Href und JavaScript: Code ohne HTML-Klammern

Trotz dieser Schutzmaßnahme lässt sich JavaScript über das `href`-Attribut der Links ausführen — ganz ohne spitze Klammern:

```
javascript:alert('XSS');
```

### Fehlerhafter JavaScript-Code: Probleme mit Unterpfaden

Ein Problem: Der jeweilige Unterpfad (`/friends`, `/post`, `/settings`) wird automatisch an den eingegebenen Link angehängt, was zu ungültigem Code führt:

```
javascript:alert('XSS');/friends
```

**Lösung:** Ein zusätzliches `/` am Ende des Payloads sorgt dafür, dass der angehängte Pfad zu einem Kommentar wird und der Code gültig bleibt:

```
javascript:alert('XSS');/
```

### Kernaussage

Escaping-Funktionen wie `htmlspecialchars()` schützen zuverlässig vor klassischen HTML-Injections über spitze Klammern und Anführungszeichen, verhindern aber nicht die Ausführung von Code über das `javascript:`-Protokoll in `href`-Attributen. Zusätzlich zeigt dieses Beispiel, wie serverseitig angehängte Pfade durch geschicktes Payload-Design (Kommentarzeichen) neutralisiert werden können.

### Alternativer Angriffsweg

Diese spezielle XSS-Schwachstelle wurde in ähnlicher Form sogar auf Webseiten wie der der NATO gefunden. Das Kernproblem: Ein Skript wird von einer **nicht existierenden Webseite** eingebunden. Da die Zielseite nicht existiert, lässt sich der fehlende Link durch bösartigen Code ersetzen.

#### Externe Skripte und GitHub

Der Angriff lässt sich durchführen, indem ein externes Skript erstellt und z. B. auf GitHub gehostet wird. Entscheidend ist dabei, die **"RAW"-Datei** des Skripts einzubinden — so lässt sich der bösartige Code auf der Zielseite ausführen, ohne ihn direkt einzubetten.

#### Payload-Erstellung mit VS Code

Der eigentliche Payload ist ein kleiner Code-Schnipsel (erstellt in VS Code), der lediglich das größere externe Skript nachlädt und ausführt. Ist dieser Payload einmal platziert, lassen sich Änderungen künftig direkt am externen Skript vornehmen — eine erneute Injektion ist nicht nötig.

#### Vorteile der Methode

- Ein großes, externes Skript kann eingebunden werden, statt den gesamten Code direkt zu injizieren.
- Das externe Skript lässt sich beliebig oft ändern, ohne den ursprünglichen Payload erneut einschleusen zu müssen.
- Das macht den Angriff flexibler und schwerer zu entdecken.

#### Kernaussage

Fehlende oder tote externe Ressourcen (z. B. nicht mehr existierende verlinkte Skripte) stellen ein reales Sicherheitsrisiko dar: Ein Angreifer kann die Lücke übernehmen und darüber dauerhaft und flexibel Schadcode nachladen, statt einen statischen Payload einzuschleusen.

## Einschränkung von Eingabezeichen & JSFuck

### Keine Alphabete und Ziffern

Eingabefelder können so konfiguriert sein, dass sie bestimmte Zeichen (z. B. Buchstaben oder Zahlen) nicht akzeptieren — unerwünschte Zeichen werden dabei oft durch Leerzeichen ersetzt. Wichtig: Solche Einschränkungen beeinflussen zwar die Eingabe, erhöhen aber nicht zwangsläufig die Sicherheit.

### JSFuck: Esoterische Programmierung

**JSFuck** ist eine esoterische, auf JavaScript basierende Programmiersprache. Das Besondere: Mit nur sechs Zeichen — `[]!+()` — lassen sich beliebige JavaScript-Programme darstellen. Für Sicherheitsexperten ist das relevant, um zu verstehen, wie Code auf ungewöhnliche Weise umgangen und dargestellt werden kann.

### Herausforderungen bei der Code-Verkürzung

Die Beschränkung auf sechs Zeichen macht JSFuck-Code oft sehr lang — der einfache Befehl `alert("XSS")` wird zu einer **10.823 Zeichen** langen Darstellung. Das kann in URLs mit begrenzter Länge problematisch werden.

**Möglichkeiten zur Verkürzung:**
- `alert(document.domain)` statt eines String-Literals verwenden (kein String nötig)
- Die Option "Run in parent scope" entfernen, um den Code weiter zu kürzen

### Lernziele: Der Teufel steckt im Detail

Einfaches Escapen bestimmter Zeichen reicht nicht aus, um sich zuverlässig gegen Angriffe zu schützen. Sicherheit erfordert auch Kenntnis weniger offensichtlicher Tricks und Techniken wie JSFuck — nur wer die Methoden von Angreifern kennt, kann wirksame Gegenmaßnahmen entwickeln.

## Einschränkung von Eingabezeichen & JSFuck

### Keine Alphabete und Ziffern

Eingabefelder können so konfiguriert sein, dass sie bestimmte Zeichen (z. B. Buchstaben oder Zahlen) nicht akzeptieren — unerwünschte Zeichen werden dabei oft durch Leerzeichen ersetzt. Wichtig: Solche Einschränkungen beeinflussen zwar die Eingabe, erhöhen aber nicht zwangsläufig die Sicherheit.

### JSFuck: Esoterische Programmierung

**JSFuck** ist eine esoterische, auf JavaScript basierende Programmiersprache. Das Besondere: Mit nur sechs Zeichen — `[]!+()` — lassen sich beliebige JavaScript-Programme darstellen. Für Sicherheitsexperten ist das relevant, um zu verstehen, wie Code auf ungewöhnliche Weise umgangen und dargestellt werden kann.

### Herausforderungen bei der Code-Verkürzung

Die Beschränkung auf sechs Zeichen macht JSFuck-Code oft sehr lang — der einfache Befehl `alert("XSS")` wird zu einer **10.823 Zeichen** langen Darstellung. Das kann in URLs mit begrenzter Länge problematisch werden.

**Möglichkeiten zur Verkürzung:**
- `alert(document.domain)` statt eines String-Literals verwenden (kein String nötig)
- Die Option "Run in parent scope" entfernen, um den Code weiter zu kürzen

### Lernziele: Der Teufel steckt im Detail

Einfaches Escapen bestimmter Zeichen reicht nicht aus, um sich zuverlässig gegen Angriffe zu schützen. Sicherheit erfordert auch Kenntnis weniger offensichtlicher Tricks und Techniken wie JSFuck — nur wer die Methoden von Angreifern kennt, kann wirksame Gegenmaßnahmen entwickeln.

## No Quotes Challenge: XSS-Payloads ohne Hochkommas

Wenn Filtermechanismen gegen XSS die Verwendung von Hochkommas verhindern, wird das Umgehen dieser Schutzmaßnahme deutlich trickreicher. Diese Lektion behandelt die **"No Quotes Challenge"** und ihre Lösung.

### Zahl zu String: Der Weg über Zeichencodes

Statt Strings direkt zu verwenden, lassen sich Zahlen(-folgen) nutzen, um Filter zu umgehen, die nach bestimmten Zeichenketten suchen. Ein String wie `alert('XSS')` wird dazu in eine Zahlenfolge (Zeichencodes) umgewandelt. Mit der JavaScript-Funktion `String.fromCharCode()` lässt sich diese Zahlenfolge zur Laufzeit wieder in den ursprünglichen String zurückverwandeln.

Hilfreich ist hier der Einsatz von KI-Modellen wie ChatGPT, die bei der Umsetzung unterstützen können: Der benötigte String `alert('XSS')` wird per ChatGPT als CharCode-Folge generiert und anschließend innerhalb der `eval()`-Funktion als Payload übergeben, um die Challenge zu lösen.

### eval(): Dynamische Code-Ausführung

Die JavaScript-Funktion `eval()` ist ein mächtiges, aber riskantes Werkzeug: Sie führt JavaScript-Code aus, der als String vorliegt. Das ist nützlich, wenn Code dynamisch generiert oder aus einer externen Quelle abgerufen wird — birgt aber erhebliches Missbrauchspotenzial.

### Kernaussage

Filter, die sich nur auf bestimmte Zeichen (wie Hochkommas) konzentrieren, lassen sich umgehen, indem verbotene Zeichen zur Laufzeit aus unverdächtigen Zahlenwerten rekonstruiert werden (z. B. via `String.fromCharCode()`). In Kombination mit `eval()` entsteht so ein flexibler Angriffsweg, der klassische zeichenbasierte Filter aushebelt.

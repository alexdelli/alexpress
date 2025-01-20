---
title: "Risolvere il Bufferbloat con OPNsense"
url: "risolvere_il_bufferbloat_con_opnsense"
author: "Alexdelli"
date: "2025-01-20"
categories :
  - "tecnologia"
  - "informatica"
tags :
  - "opnsense"
  - "bufferbloat"
  - "FQ_CoDel"
cover : "/images/featured.png"
featured : "/images/featured.png"
useRelativeCover : false
slug : "Risolvere il Bufferbloat con OPNsense"
type : "post"
---


Bufferbloat: Cos'è e Come Risolverlo con OPNsense

Ciao a tutti! Avete mai notato che la vostra connessione internet a volte sembra andare a rilento, anche se avete una buona banda? Magari durante una videochiamata, un gioco online o semplicemente mentre navigate? Il problema potrebbe essere il Bufferbloat, un nemico subdolo della velocità e della reattività della rete.

Che cos'è il Bufferbloat?

Il Bufferbloat è un problema di eccessiva latenza causata da router o altri dispositivi di rete che accumulano troppi dati in memoria

. Quando un router non riesce a inviare immediatamente i dati attraverso una connessione lenta, li mette in "coda" o in "buffer". Questa coda può diventare molto lunga, causando ritardi anche di diversi secondi

.

Immaginate di essere in autostrada: se c'è un imbuto e le macchine si fermano, tutte le altre che arrivano dopo dovranno rallentare e formare una coda. Questo è quello che succede con il Bufferbloat: il traffico "nuovo" deve aspettare dietro i dati già in coda, causando ritardi e una sensazione generale di lentezza

.

Perché il Bufferbloat è un problema?

Il Bufferbloat impatta negativamente l'esperienza dell'utente, causando:

•

Lag nei giochi online

.

•

Interruzioni nelle videochiamate e nelle chiamate vocali

.

•

Lentezza generale della navigazione e dei download

.

Come Combattere il Bufferbloat?

La soluzione al Bufferbloat è usare algoritmi di Active Queue Management (AQM) e Smart Queue Management (SQM). Questi algoritmi gestiscono le code di dati in modo intelligente, evitando che diventino troppo lunghe e causando latenza. Uno degli algoritmi AQM più efficaci è FQ\_CoDel (Flow Queueing with Controlled Delay)

.

Cos'è FQ\_CoDel?

FQ\_CoDel è un algoritmo che organizza i pacchetti di dati in code separate per ogni "flusso" di traffico

. Invece di trattare tutti i pacchetti allo stesso modo, FQ\_CoDel dà la priorità ai flussi più piccoli, garantendo che anche le comunicazioni meno intense non vengano bloccate dai grandi download

.

FQ\_CoDel funziona così:

•

Organizza i pacchetti: divide i pacchetti in code separate in base al flusso di traffico

.

•

Invia i pacchetti: invia i pacchetti in piccoli "lotti" in modo "round-robin" (a turno), in modo che ogni flusso riceva la sua quota di banda

.

•

Controllo del flusso: misura il tempo che un pacchetto passa in coda ("tempo di permanenza"). Se un flusso invia troppi dati, FQ\_CoDel rallenta il flusso per evitare che la coda si allunghi troppo

.

Abilitare FQ\_CoDel in OPNsense: Guida Passo Passo

OPNsense è un firewall open source che supporta FQ\_CoDel e ti permette di migliorare la tua connessione. Ecco come configurarlo:

1.

Vai a Firewall -> Shaper -> Pipes: Attiva la "Modalità avanzata".

2.

Crea una pipe per il download:

◦

Clicca sul pulsante "+" (in basso a destra) per creare una nuova pipe

.

◦

Abilita la pipe.

◦

Imposta la larghezza di banda all'85% della velocità di download fornita dal tuo ISP. Ad esempio, se hai una 100 Mbit/s, imposta 85 Mbit/s

. Puoi regolare questo valore in seguito

.

◦

Scegli Mbit/s come unità di misura della banda.

◦

Lascia vuoto il campo della coda (le code si configurano separatamente).

◦

Seleziona FQ\_CoDel come tipo di scheduler

.

◦

Abilita CoDel ECN

.

◦

Lascia vuoto FQ-CoDel quantum (usa il valore predefinito).

◦

Lascia vuoto FQ-CoDel limit (usa il valore predefinito).

◦

Lascia vuoto FQ-CoDel flows (usa il valore predefinito)

.

◦

Aggiungi una descrizione, ad esempio "Download".

3.

Crea una pipe per l'upload: Segui la stessa procedura, ma imposta la larghezza di banda all'85% della velocità di upload e usa "Upload" come descrizione

.

4.

Crea una coda per il download:

◦

Vai alla scheda Queues e clicca sul pulsante "+" per creare una nuova coda

.

◦

Abilita la coda.

◦

Seleziona la pipe Download creata in precedenza.

◦

Imposta il peso a 100 (FQ\_CoDel ignora il peso, ma è necessario inserire un valore)

.

◦

Lascia vuoti gli altri campi.

◦

Aggiungi una descrizione, ad esempio "Download-Queue"

.

5.

Crea una coda per l'upload: Segui la stessa procedura, ma seleziona la pipe Upload e usa "Upload-Queue" come descrizione

.

6.

Crea una regola per il download:

◦

Vai alla scheda Rules e clicca sul pulsante "+" per creare una nuova regola

.

◦

Abilita la regola.

◦

Inserisci 1 come sequenza

.

◦

Seleziona l'interfaccia connessa a internet (WAN).

◦

Seleziona il protocollo IP

.

◦

Lascia sorgente e destinazione su "any".

◦

Imposta la direzione su "in" (per il download)

.

◦

Seleziona la coda Download-Queue.

◦

Aggiungi una descrizione, ad esempio "Download-Rule".

7.

Crea una regola per l'upload: Segui la stessa procedura, ma imposta la sequenza a 2, la direzione a "out" (per l'upload) e seleziona la coda Upload-Queue

.

8.

Applica le modifiche: Clicca sul pulsante "Applica" per attivare le nuove regole di traffic shaping

.

Testare il Bufferbloat

Dopo aver configurato FQ\_CoDel, puoi testare la tua connessione usando uno dei seguenti siti:

•

Waveform Speed Test: https://www.waveform.com/tools/bufferbloat

.

•

Cloudflare: https://speed.cloudflare.com/

.

•

Speedtest.net: http://speedtest.net

.

Questi siti misurano la latenza durante il download e l'upload. Se hai configurato correttamente FQ\_CoDel, dovresti notare una latenza molto più bassa rispetto a prima

.

Regolare Fine FQ\_CoDel

FQ\_CoDel è progettato per funzionare bene "out of the box"

, tuttavia, puoi fare qualche aggiustamento per ottimizzare ulteriormente la tua connessione:

•

Larghezza di banda: dopo aver creato le pipe e le code, esegui un test di velocità e aumenta la larghezza di banda di download e upload finché la latenza non aumenta. A quel punto, riduci di poco le impostazioni

.

•

Quantum: è un valore che dovrebbe corrispondere all'MTU della tua interfaccia WAN

. Per una connessione ethernet, questo valore è generalmente di 1514

.

•

Target: indica il tempo massimo di permanenza dei pacchetti in coda. Impostalo al tempo medio di andata e ritorno (RTT) che misuri usando il comando ping verso l'ISP

.

•

Interval: determina quanto spesso viene misurato il tempo di permanenza in coda. Un valore di 100 ms è di solito un buon punto di partenza

.

•

Limit: il valore di default di 10240 pacchetti è eccessivo, ed è meglio ridurlo a 1000 per connessioni inferiori a 10 Gbit/s

. Tuttavia, in FreeBSD (il sistema operativo alla base di OPNsense), ci sono alcuni bug che possono causare problemi di CPU se si riduce troppo questo valore, quindi per ora è consigliabile lasciare il valore predefinito

.

•

Flows: determina il numero di code usate per suddividere i flussi di traffico. Non impostare un valore troppo elevato, o il router potrebbe bloccarsi

.

•

ECN: abilita la marcatura dei pacchetti ECN per i flussi TCP che supportano ECN. Disabilita ECN per le connessioni di upload inferiori a 4 Mbit/s se vuoi prestazioni VoIP ottimali

.

Conclusioni

Il Bufferbloat è un problema reale che può rovinare l'esperienza di navigazione. Abilitare FQ\_CoDel in OPNsense è un ottimo modo per combatterlo e migliorare la reattività della tua rete. Spero che questa guida ti sia utile!

Se hai domande, non esitare a chiedere!
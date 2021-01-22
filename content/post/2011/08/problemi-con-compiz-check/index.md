---
title: "Problemi con Compiz-check?"
date: "2011-08-08"
categories: 
  - "argomenti-extra-ciclismo"
tags: 
  - "ati"
  - "card"
  - "check"
  - "compiz"
  - "driver"
  - "graphic"
  - "linux"
  - "mint"
  - "problema"
  - "vesa"
coverImage: "2541344496_b1e24ed32f.jpg"
---

Nel caso compiz-check vi dia come risultato: The vesa driver is not capable of running Compiz, you need to install the proper driver for your graphics card. Credo di aver capito dove sia il problema, anche se sto cercando di capire questo cambiamento, probabilmente potrebbe essere fatto a monte da qualche parte. Nello script compiz-check (/ usr / lib / linuxmint / xfcemintDesktop / desktopeffects / compiz-check)alle righe 241-246, si greppa attraverso il registro Xorg per vedere dove vengono caricati/scaricati i driver :

> if grep Loading $XORG\_LOG | grep -q "${i}\_drv\\.so" && ! grep Unloading $XORG\_LOG | grep -q "${i}\_drv\\.so" ; then DRV=$i fi done

Quando si guarda in Xorg.0.log, vedrete che, mentre il nome del file del driver viene utilizzato durante il processo di caricamento, solo il nome del driver viene utilizzato durante le operazioni di scarico. Un esempio dal mio log di Xorg:

> $ grep Unloading /var/log/Xorg.0.log \[ 33.143\] (II) Unloading vesa \[ 33.143\] (II) Unloading fbdev

modificando la riga 243 così:

> ! grep Unloading $XORG\_LOG | grep -q "${i}" ; then

lo script rileva correttamente il mio driver e completa il controllo compitibilità compiz.

# Hilflosenentschädigung (AHV) Online‑Rechner

Ein statisches Micro‑Tool, das den voraussichtlichen Anspruch auf AHV‑Hilflosenentschädigung
(Stand 2025) ermittelt.

## Deployment (Vercel)

1. **Fork / clone** dieses Repositories.
2. Verbinde das Repo in deinem Vercel‑Dashboard.
3. Build‑Vorgabe `Framework = Other`.  
   Vercel erkennt die `index.html` automatisch als statisches Frontend.

> **Tipp:** Der Rechner lässt sich anschließend per  
> `<iframe src="https://<deine‑subdomain>.vercel.app" width="100%" height="640" frameborder="0"></iframe>`  
> in jede WordPress‑Seite einbetten.

## Lokal testen

```bash
npx serve .
```

Dann `http://localhost:3000` im Browser öffnen.
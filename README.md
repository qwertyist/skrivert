# skrivert

ett verktyg för att producera undertexter och dylikt i realtid

## designidé

- ska erbjuda samma funktionalitet online och offline (en s.k. "PWA", med rimliga undantag)
- ska gå att köra på vilken enhet som helst
- ska lagra merparten av användardatan lokalt
- ska ha vyer för skapande och visning av både löpande text och undertexter
- ska möjliggöra för användaren att konfigurera beteende, kortkommandon, utseende mm
- ska eftersträva att följa OWASPs standard för säker utveckling och ta hänsyn till gällande lagstiftning för sekretess och personuppgiftshantering
- ska eftersträva att följa WCAG 2 och gällande svenska regler och riktlinjer för webbtillgänglighet

## .env-variabler

- PUBLIC_SE_BASELIST={id från svensk baslista i pocketbase}

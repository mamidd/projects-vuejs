Prima di poter far funzionare l'app, occorre andare su Firebase, sezione Database e modificare le regole del database con questo json:
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
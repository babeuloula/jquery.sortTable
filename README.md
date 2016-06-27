# jquery.sortTable
Trier facilement les données de vos tableaux HTML

## Options
- sort (array) : Tableau des positions des `<th/>` dans le `<thead/>` qui sont à trier
- default (object) :
  - index (int) : Quel `<th/>` doit être trier par défaut
  - sort (string) : Dans quel ordre doit-il être trié (*asc* ou *desc*)
- icons (object) : 
  - asc (string) : Classe CSS du span pour un tri croissant
  - desc (string) : Classe CSS du span pour aucun tri décroissant
  - none (string) : Classe CSS du span pour aucun tri
  - color (string) : Couleur de l'icône
- tooltip (boolean) : Mettre ou non des tooltips

## HTML
Le tableau HTML doit obligatoirement contenu les balises `<thead/>` et `<tbody/>`.

Dans la balise `<thead/>`, il ne doit y avoir que des `<th/>` et aucun `<td/>`;

## Fonctions
- refresh : Rafraichi le tri du tableau
```javascript
var sortTable = $("table").sortTable({
  sort: [0, 1]
});

sortTable.refresh();
```


# Eseuri frontend starter

Acest proiect utilizează `pnpm`.

Instalează dependency-urile:

```sh
pnpm i
```

Rulează serverul de development:

```sh
pnpm run dev
```

Compilează fișierele pentru producție:

```sh
pnpm run build
```

Servește fișierele de producție:

```sh
pnpm run serve-vite
```

Formatează codul:

```sh
pnpm run format
```

## Probleme

Configurarea funcționează foarte bine, nu există probleme la încărcarea conținutului, refresh, build în general.

Există totuși o particularitate la procesarea CSS: variantele Tailwind
(`hover:`, `focus:` etc.) se pot folosi numai în clase. În combinație cu
directiva `@apply` build-ul va esua. De exemplu, următorul cod nu va
fi compilat cu succes:

```css
.class {
  @apply bg-white border rounded;
  @apply hover:bg-red;
}
```

Pentru a obține același efect, folosiți pseudo-selectorii clasici CSS:

```css
.class {
  @apply bg-white border rounded;
}

.class:hover {
  @apply bg-red;
}
```

<script>
  import { Router } from '@roxi/routify'
  import { routes } from '../.routify/routes'
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Cardo&family=Carme&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Router {routes} />

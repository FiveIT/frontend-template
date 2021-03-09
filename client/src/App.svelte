<script lang="ts">
  import { Router } from '@roxi/routify'
  import { routes } from '../.routify/routes'
  import Window from './components/Window.svelte'
</script>

<Router {routes} />

<Window />

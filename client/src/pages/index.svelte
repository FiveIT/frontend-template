<script>
  import { metatags } from '@roxi/routify'
  import { debounce } from 'lodash-es'

  import Logo from '../components/Logo.svelte'

  metatags.title = 'Eseuri'
  metatags.description = 'De fapt curiozități despre pisici'

  /**
   * @type {string[]}
   */
  const facts = []

  const fetchFacts = (length, threshold) => {
    if (length <= threshold) {
      return fetch('https://cat-fact.herokuapp.com/facts/random?amount=10')
        .then(res => res.json())
        .then(res => res.map(fact => fact.text))
    }
    return Promise.resolve([])
  }

  let fact

  const prefetchFacts = threshold =>
    fetchFacts(facts.length, threshold).then(nf => facts.push(...nf))

  const getFact = () => (fact = prefetchFacts(0).then(() => facts.pop()))

  getFact()
</script>

<main
  class="flex flex-col items-center space-y-3 w-full h-screen p-32 bg-white"
>
  <h1 class="text-xs"><Logo /></h1>
  <p class="content text-gray">
    Modifică fișierul și observă schimbările în timp real, fără reîmprospătare.
  </p>
  {#await fact}
    <p class="content text-blue">Se obține o curiozitate despre pisici...</p>
  {:then text}
    <p class="content">{text}</p>
  {:catch}
    <p class="content text-red">Ceva rău s-a întâmplat!</p>
  {/await}
  <button
    class="p-5 rounded-xl bg-white border content transition cursor-pointer outline-none hover:(bg-orange border-orange text-white)"
    on:click={debounce(getFact, 2000, { leading: true })}
    on:hover={() => prefetchFacts(5)}>Curiozitate nouă</button
  >
</main>

<style>
  .content {
    @apply font-sans text-xl tracking-tighter max-w-prose text-center subpixel-antialiased;
  }

  button {
    margin-top: auto !important;
  }
</style>

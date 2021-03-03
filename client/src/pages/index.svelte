<script>
  /**
   * @type {Promise<string[]>[]}
   */
  let responses = []
  /**
   * @type {string[]}
   */
  let response
  /**
   * @type {Promise<string>}
   */
  let fact

  let fetchStatus = ''

  const getFact = async () => {
    const length = response?.length ?? 0
    if (length < 5) {
      if (responses.length < 2) {
        fetchStatus = 'fetching'
        const res = fetch(
          'https://cat-fact.herokuapp.com/facts/random?amount=10'
        )
          .then(res => res.json())
          .then(res => ((fetchStatus = ''), res.map(r => r.text)))
          .catch(err => {
            fetchStatus = 'error'
            throw err
          })
        responses.push(res)
      }
      if (length === 0) {
        response = await responses.shift()
      }
    }
    return response.shift()
  }

  fact = getFact()
</script>

<main class="flex flex-col items-center p-32 w-full h-screen bg-white">
  <div class="flex flex-col space-y-3 items-center">
    <h1
      class="font-serif tracking-tighter text-8xl subpixel-antialiasing font-bold select-none"
    >
      Eseuri<span
        class="text-orange transition"
        class:text-blue={fetchStatus === 'fetching'}
        class:text-red={fetchStatus === 'error'}>.</span
      >
    </h1>
    <p class="text text-gray">
      Modifică documentul și observă schimbările în timp real, fără
      reîmprospătare.
    </p>
    {#await fact}
      <p class="text text-blue">Se obtine o curiozitate despre pisici</p>
    {:then text}
      <p class="text">{text}</p>
    {:catch}
      <p class="text text-red">Ceva rău s-a întâmplat!</p>
    {/await}
  </div>
  <button
    class="text p-6 border rounded-xl mt-auto transition focus:outline-none hover:border-orange hover:bg-orange hover:text-white cursor-pointer bg-white"
    on:click={() => (fact = getFact())}>Curiozitate nouă</button
  >
</main>

<style>
  .text {
    @apply font-sans tracking-tighter text-xl subpixel-antialiasing text-center max-w-prose;
  }
</style>

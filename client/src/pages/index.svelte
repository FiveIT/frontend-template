<script>
  import { Carousel } from 'renderless-svelte'
  import Queue from '../queue'
  import * as routify from '@roxi/routify'

  routify.metatags.title = 'Cat facts'

  /**
   * @type {Promise<string[]>[]}
   */
  let responses = []
  /**
   * @type {string[]}
   */
  let response

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
  /**
   * @type {Queue<Promise<string>>}
   */
  let history = new Queue(10)

  const pushHistory = () => {
    history.push(getFact())
    history = history
  }

  pushHistory()

  let controls
  /**
   * Creates a function that calls the leftHandler if the left
   * key is pressed, or otherwise calls the rightHandler.
   *
   * @param {() => void} leftHandler
   * @param {() => void} rightHandler
   *
   * @returns {(ev: KeyboardEvent) => void} The new event handler
   */
  const keydownHandler = (leftHandler, rightHandler) => ev => {
    switch (ev.code) {
      case 'KeyH':
      case 'ArrowLeft':
        leftHandler()
        break
      case 'KeyL':
      case 'ArrowRight':
        rightHandler()
        break
    }
  }
</script>

<main class="flex flex-col items-center p-10vh w-full min-h-screen bg-white">
  <Carousel
    items={history.array()}
    let:payload
    bind:controls
    let:currentIndex
    let:setIndex
  >
    <div class="flex flex-col items-center space-y-3 w-full min-h-full">
      <h1
        class="font-serif tracking-tighter text-8xl subpixel-antialiasing font-bold select-none m-0"
      >
        Cat facts<span
          class="text-orange transition"
          class:text-blue={fetchStatus === 'fetching'}
          class:text-red={fetchStatus === 'error'}>.</span
        >
      </h1>
      {#await payload}
        <p class="text text-blue">Retrieving a cat fact...</p>
      {:then text}
        <p class="text">{text}</p>
      {:catch}
        <p class="text text-red">Something terribly bad happened!</p>
      {/await}
    </div>
    <div class="flex space-x-3 items-center mt-auto">
      <button
        class="control"
        on:click={controls.previous}
        disabled={currentIndex === 0}>Previous</button
      >
      <button
        class="control"
        on:click={controls.next}
        disabled={currentIndex === history.length - 1}>Next</button
      >
    </div>
    <button
      class="mt-4"
      on:click={() => (pushHistory(), setIndex(history.length - 1))}
      >New fact</button
    >
  </Carousel>
</main>

<svelte:window on:keydown={keydownHandler(controls.previous, controls.next)} />

<style>
  .text {
    @apply font-sans tracking-tighter text-xl subpixel-antialiasing text-center max-w-prose;
  }

  button {
    @apply text p-6 border rounded-xl transition bg-white cursor-pointer select-none;
    @apply hover:border-orange hover:bg-orange hover:text-white;
    @apply focus:outline-none focus-visible:border-orange focus-visible:bg-orange focus-visible:text-white;
  }

  .control {
    @apply p-3 select-none;
    @apply hover:border-blue hover:bg-blue;
    @apply focus-visible:border-blue focus-visible:bg-blue;
    @apply disabled:pointer-events-none disabled:opacity-50;
  }
</style>

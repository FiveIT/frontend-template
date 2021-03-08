<script lang="ts">
  import { Carousel } from 'renderless-svelte'
  import type { CarouselControls } from 'renderless-svelte'
  import Queue from '../queue'
  import { metatags } from '@roxi/routify'

  metatags.title = 'Cat facts'

  const responses: Promise<string[]>[] = []
  let response: string[]
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
          .then((res: { text: string }[]) => {
            fetchStatus = ''
            return res.map(r => r.text)
          })
          .catch(err => {
            fetchStatus = 'error'
            throw err
          })
        responses.push(res)
      }
      if (length === 0) {
        response = await responses.shift()!
      }
    }
    return response.shift()!
  }

  let history = new Queue<Promise<string>>(10)
  let items: any[]

  const pushHistory = () => {
    history.push(getFact())
    items = history.array() as any[]
  }

  pushHistory()

  type Handler = () => void

  let controls: CarouselControls

  const keydownHandler = (left: Handler, right: Handler) => (
    ev: KeyboardEvent
  ) => {
    switch (ev.code) {
      case 'KeyH':
      case 'ArrowLeft':
        left()
        break
      case 'KeyL':
      case 'ArrowRight':
        right()
        break
    }
  }
</script>

<main class="flex flex-col items-center p-10vh w-full min-h-screen bg-white">
  <Carousel {items} let:payload bind:controls let:currentIndex let:setIndex>
    <div class="flex flex-col items-center space-y-sm w-full min-h-full">
      <h1
        class="font-serif tracking-tighter text-xl subpixel-antialiasing font-bold select-none m-0"
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
        class="control text"
        on:click={controls.previous}
        disabled={currentIndex === 0}>Previous</button
      >
      <button
        class="control text"
        on:click={controls.next}
        disabled={currentIndex === history.length - 1}>Next</button
      >
    </div>
    <button
      class="mt-4 text"
      on:click={() => (pushHistory(), setIndex(history.length - 1))}
      >New fact</button
    >
  </Carousel>
</main>

<style>
  :global(html) {
    font-size: 18px;
  }

  .text {
    @apply font-sans tracking-tighter text-base subpixel-antialiasing text-center max-w-prose;
  }

  button {
    @apply p-6 border rounded-xl transition bg-white cursor-pointer select-none outline-none;
  }

  button:hover,
  button:focus-visible {
    @apply border-orange bg-orange text-white;
  }

  .control {
    @apply p-3;
  }

  .control:hover,
  .control:focus-visible {
    @apply border-blue bg-blue;
  }

  .control:disabled {
    @apply pointer-events-none opacity-50;
  }
</style>

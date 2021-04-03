<script>
  import Text from '$/components/text/Inline.svelte'
  export let disabled = false
</script>

<button
  {disabled}
  on:click
  class="blur p-sm border rounded transition bg-white bg-opacity-50 cursor-pointer select-none outline-none hover:(bg-blue border-blue text-white) focus-visible:(bg-blue border-blue text-white) disabled:(pointer-events-none opacity-50)">
  <Text>
    <slot />
  </Text>
</button>

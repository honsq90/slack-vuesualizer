<script lang="ts" setup>
import type { MarkdownLeaf } from '~~/types/Message';

defineProps<{ node: MarkdownLeaf }>()
</script>

<template>
  <span
    class="italic"
    v-text="node.text"
  />
</template>

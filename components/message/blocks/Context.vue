<script lang="ts" setup>
import type { ContextLeaf } from "~~/types/Message";

const props = defineProps<{ node: ContextLeaf }>()

</script>

<template>
  <MessageBlock
      v-for="(element, i) in node.elements"
      :key="i"
      :node="element"
  />
</template>

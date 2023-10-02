<script lang="ts" setup>
import type { SectionLeaf } from "~~/types/Message";

const props = defineProps<{ node: SectionLeaf }>()

</script>

<template>
  <MessageBlock
      v-for="(element, i) in node.fields"
      :key="i"
      :node="element"
  />
</template>

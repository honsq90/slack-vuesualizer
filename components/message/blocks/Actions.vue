<script lang="ts" setup>
import type { ActionsLeaf } from "~~/types/Message";

const props = defineProps<{ node: ActionsLeaf }>()

</script>

<template>
  <div class="d-flex flex-wrap gap-1">
    <MessageBlock
        v-for="(element, i) in node.elements"
        :key="i"
        :node="element"
    />
  </div>
</template>

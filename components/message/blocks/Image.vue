<script lang="ts" setup>
import type { ImageLeaf } from "~~/types/Message";

const props = defineProps<{ node: ImageLeaf }>()

</script>

<template>
  <i>
    {{node.title?.text}}
  </i>
  <img :src="node.image_url" :alt="node.alt_text" class="max-w-[438px] w-fit"/>
</template>

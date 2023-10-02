<script lang="ts" setup>
import type { ButtonLeaf } from '~~/types/Message';

defineProps<{ node: ButtonLeaf }>();
</script>

<template>
  <button class="btn btn-sm btn-outline rounded">{{node.text.text}}</button>
</template>

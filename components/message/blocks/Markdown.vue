<script lang="ts" setup>
import type { MarkdownLeaf } from '~~/types/Message';
import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
});

defineProps<{ node: MarkdownLeaf }>();
</script>

<template>
  <span v-html="markdown.render(node.text)"/>
</template>

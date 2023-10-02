<script lang="ts" setup>
import type { EmojiLeaf } from '~/types/Message'

const props = defineProps<{ node: EmojiLeaf }>()

const name = computed(() => props.node.name)

const { emojiUnicode } = useEmoji(name)
</script>

<template>
  <img v-if="emojiUnicode.includes(node.name)" :src="`http://localhost:5000/static/emojis/${node.name}.png`" class="max-h-[14px]" :title="node.name" :alt="node.name">
  <span v-else :title="node.name" v-html="emojiUnicode" />
</template>

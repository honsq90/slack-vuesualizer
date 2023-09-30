<script lang="ts" setup>
import type { Block } from '~/types/Message'

const props = defineProps<{ node: Block }>();

const nodeBlock = computed(() => props.node.Raw ? JSON.parse(props.node.Raw) : props.node)
const nodeType = computed(() => props.node.Type ? props.node.Type : props.node.type)

</script>

<template>
  <MessageBlocksRichText
    v-if="nodeType === 'rich_text'"
    :key="node.block_id"
    :node="nodeBlock"
  />
  <MessageBlocksRichTextSection
    v-else-if="nodeType === 'rich_text_section'"
    :node="nodeBlock"
  />
  <MessageBlocksText v-else-if="nodeType === 'text'" :node="nodeBlock" />
  <MessageBlocksEmoji v-else-if="nodeType === 'emoji'" :node="nodeBlock" />
  <MessageBlocksLink v-else-if="nodeType === 'link'" :node="nodeBlock" />
  <MessageBlocksUser v-else-if="nodeType === 'user'" :node="nodeBlock" />
  <MessageBlocksBroadcast v-else-if="nodeType === 'broadcast'" :node="nodeBlock" />
  <MessageBlocksRichTextQuote
    v-else-if="nodeType === 'rich_text_quote'"
    :node="nodeBlock"
  />
  <MessageBlocksRichTextList
    v-else-if="nodeType === 'rich_text_list'"
    :node="nodeBlock"
  />
  <MessageBlocksChannel v-else-if="nodeType === 'channel'" :node="nodeBlock" />
  <MessageBlocksRichTextPreformatted
    v-else-if="nodeType === 'rich_text_preformatted'"
    :node="nodeBlock"
  />
  <p v-else class="text-warning">
    {{ node }}
  </p>
</template>

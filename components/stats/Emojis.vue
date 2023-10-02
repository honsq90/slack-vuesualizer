<script lang="ts" setup>
import { Entry } from "@zip.js/zip.js";

const { data } = await useFetch('/api/emojis', {
  headers: useRequestHeaders(['cookie']),
});
const file = ref<File>();
const fileInvalid = ref(false);
const entries = ref<Entry[]>([]);
const { readZip, parseAttachment } = useZip();

watch(file, async () => {
  if (!file.value)
    return;

  entries.value = await readZip(file.value);

  entries.value
      .filter(e => !e.directory && e.filename.endsWith(".png"))
      .map(async (entry) => {
        const attachment = await parseAttachment(entry);
        const formData = new FormData();
        formData.append('file', attachment);
        const emojiName = entry.filename.replace("emojis/", "").replace(".png", "");
        await $fetch(`http://localhost:5000/upload/emoji/${emojiName}`, {
          method: 'POST',
          body: formData,
        })
            .catch((e) => {
              console.error(`Failed to save ${emojiName}`, e);
            });
      });
});

</script>

<template>
  <StatsBase>
    <template #content>
      <div>emojis</div>
      <UploadFileForm v-model="file" :invalid="fileInvalid"/>
    </template>
    <template #title>
      {{ data }}
    </template>
  </StatsBase>
</template>
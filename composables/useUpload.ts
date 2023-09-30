import { Sema } from 'async-sema'
import type { Entry } from '@zip.js/zip.js'

export const useUpload = () => {
  const queue = ref(new Set<string>())
  const done = ref(new Set<string>())
  const errors = ref(new Set<string>())
  const retriable = ref(false)

  const { parseData, parseAttachment } = useZip()

  const list = ref<HTMLElement>()

  const sema = new Sema(3)

  const uploadChannel = async (channel: string, entries: Entry[]) => {
    try {
      await sema.acquire()
      queue.value.add(channel)
      const channelEntries = entries.filter(
        e => !e.directory && e.filename.startsWith(`${channel}/`) && !e.filename.includes("/attachments/"),
      )

      const channelAttachmentEntries = entries.filter(
          e => !e.directory && e.filename.startsWith(`${channel}/attachments/`),
      )

      console.log(`${channelAttachmentEntries.length} attachments to upload for ${channel}...`)

      await Promise.all(
        channelAttachmentEntries.map(async entry => {
          const attachment = await parseAttachment(entry);
          const formData = new FormData();
          formData.append('file', attachment);
          return $fetch(`/api/import/channel/${entry.filename}`, {
            method: 'POST',
            body: formData
          })
        })
      )

      const data = await parseData(channelEntries)

      // split into groups to prevent request from being too large for Vercel to handle
      const groups = []
      const size = 500

      for (let i = 0; i < data.length; i += size)
        groups.push(data.slice(i, i + size))

      await Promise.all(
        groups.map(group =>
          $fetch(`/api/import/channel/${channel}`, {
            method: 'POST',
            body: { data: group },
          }),
        ),
      )

      done.value.add(channel)
    }
    catch (e) {
      console.error(e)
      errors.value.add(channel)
    }
    finally {
      queue.value.delete(channel)
      sema.release()
    }
  }

  const uploadWorkspaceData = async (channels: string[], entries: Entry[]) => {
    try {
      queue.value.add('vuesualizer-workspace')
      const workspaceEntries = entries.filter(
        e => {
          return !e.filename.includes('/') && !e.directory && !e.filename.includes("/attachments/")
        },
      )
      let data = await Promise.all(
        workspaceEntries.map(async e => ({
          name: e.filename.split('.json')[0],
          data: await parseData([e]),
        })),
      )

      // remove channels that are not to be imported
      data = data.map((d) => {
        if (d.name !== 'channels')
          return d

        d.data = d.data.filter(c => channels.includes(c.name))
        return d
      })

      // guard against empty datasets
      data = data.filter(d => !(d.data.length === 1 && d.data[0] === ''))

      await $fetch('/api/import/workspace', {
        method: 'POST',
        body: { data },
      })

      done.value.add('vuesualizer-workspace')
    }
    catch (e) {
      errors.value.add('vuesualizer-workspace')
      throw e
    }
    finally {
      queue.value.delete('vuesualizer-workspace')
    }
  }

  const doUpload = async (channels: string[], entries: Entry[]) => {
    retriable.value = false

    if (!done.value.has('vuesualizer-workspace'))
      await uploadWorkspaceData(channels, entries)

    const channelsToUpload = channels.filter(
      channel => !done.value.has(channel),
    )

    await Promise.all(channelsToUpload.map(channel => uploadChannel(channel, entries)))

    if (done.value.size === channels.length + 1)
      return true

    retriable.value = true
    return false
  }

  return {
    queue,
    done,
    errors,
    retriable,
    list,
    doUpload,
  }
}

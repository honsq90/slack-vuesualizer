import { writeFile } from "fs/promises";

export default defineEventHandler(async (event) => {
  const channel = decodeURIComponent(event.context.params!.channel)
  const filename = decodeURIComponent(event.context.params!.filename)
  const files = await readMultipartFormData(event);

  console.log(files)
  console.log(`Saving ${filename} for ${channel}`)
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Image Not Found',
    });
  }

  for (let i = 0; i < files.length; i++) {
    if (files[i].name === 'file') {
      const data = files[i].data;
      const filePath = `./public/attachments/${filename}`;
      await writeFile(filePath, data);
    }
  }
  event.node.res.statusCode = 201
  return 'ok'
})

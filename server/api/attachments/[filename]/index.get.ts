import { mongo } from '~/server/utils/mongo';
import type { Attachment } from "~/types/Attachment";

export default defineEventHandler(async (event) => {
    const filename = decodeURIComponent(event.context.params!.filename);
    const db = await mongo(event.context.mongouuid);
    const attachment = await db.collection<Attachment>('attachments').findOne({ filename });

    if (!attachment)
        throw createError({ statusCode: 404, statusMessage: 'Attachment not found' });
    appendResponseHeader(event, "Content-Disposition", "inline");
    appendResponseHeader(event, "Content-Type", attachment.type);
    return Buffer.from(attachment.data, "base64");
});

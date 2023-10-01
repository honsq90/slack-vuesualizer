import { mongo } from '~/server/utils/mongo';
import { Slackmoji } from "~/types/Slackmoji";

export default defineEventHandler(async (event) => {
    const name = decodeURIComponent(event.context.params!.name);
    const db = await mongo(event.context.mongouuid);
    const slackmoji = await db.collection<Slackmoji>('emojis').findOne({ name });

    if (!slackmoji)
        throw createError({ statusCode: 404, statusMessage: 'Emoji not found' });
    return Buffer.from(slackmoji.data, "base64");
});

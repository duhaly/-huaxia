import { defineCollection } from '@nocobase/database';

export default defineCollection({
    name: 'dataeaseEmbeding',
    fields: [
        { type: 'string', name: 'appId' },
        { type: 'string', name: 'appSecret' },
        { type: 'string', name: 'account' }],
});
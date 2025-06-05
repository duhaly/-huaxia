import { defineCollection } from '@nocobase/database';

export default defineCollection({
    name: 'dataeaseEmbeding',
    title: '{{t("Dataease Embeding")}}',
    shared: true,
    logging: true,
    createdBy: true,
    updatedBy: true,
    sortable: true,
    fields: [
        {
            type: 'string', name: 'appId', interface: 'input',
            uiSchema: {
                type: 'string',
                title: '{{t("appId")}}',
                'x-component': 'Input',
            },
        },
        {
            type: 'string', name: 'appSecret', interface: 'input',
            uiSchema: {
                type: 'string',
                title: '{{t("appSecret")}}',
                'x-component': 'Input',
            },
        },
        {
            type: 'string', name: 'account', interface: 'input',
            uiSchema: {
                type: 'string',
                title: '{{t("account")}}',
                'x-component': 'Input',
            },
        }],
});
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema, useField, useFieldSchema } from '@formily/react';
import { uid } from '@formily/shared';
import {
  SchemaToolbar,
  SchemaSettingsDivider,
  SchemaSettingsModalItem,
  SchemaSettingsRemove,
  useAPIClient,
  useDesignable,
  useFormBlockContext,
  useCollectionRecord,
  useVariableOptions,
} from '@nocobase/client';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DataeaseEmbedingDesigner = () => {
  const field = useField();
  const fieldSchema = useFieldSchema();
  const { t } = useTranslation();
  const { dn } = useDesignable();
  const api = useAPIClient();
  const { url, height = '60vh' } = fieldSchema['x-component-props'] || {};

  const submitHandler = async ({ url, height }) => {
    const componentProps = fieldSchema['x-component-props'] || {};
    componentProps['height'] = height;
    componentProps['url'] = url;

    fieldSchema['x-component-props'] = componentProps;
    field.componentProps = { ...componentProps };
    field.data = { v: uid() };
    dn.emit('patch', {
      schema: {
        'x-uid': fieldSchema['x-uid'],
        'x-component-props': componentProps,
      },
    });
  };
  const { form } = useFormBlockContext();
  const record = useCollectionRecord();
  const scope = useVariableOptions({
    collectionField: { uiSchema: fieldSchema },
    form,
    record,
    uiSchema: fieldSchema,
    noDisabled: true,
  });
  return (
    <>
      <SchemaToolbar></SchemaToolbar>
      <SchemaSettingsModalItem
        title={t('Edit Dataease Embeding')}
        asyncGetInitialValues={async () => {
          const values = {
            url,
            height,
          };
          return values;
        }}
        schema={
          {
            type: 'object',
            title: t('Edit Dataease Embeding'),
            properties: {
              url: {
                title: t('URL'),
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Variable.TextArea',
                'x-component-props': {
                  scope,
                },
                required: true,
              },
              height: {
                title: t('Height'),
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                required: true,
              },
            },
          } as ISchema
        }
        onSubmit={submitHandler}
      />
      <SchemaSettingsDivider />
      <SchemaSettingsRemove
        removeParentsIfNoChildren
        breakRemoveOn={{
          'x-component': 'Grid',
        }}
      />
    </>
  );
};

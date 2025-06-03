/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { PicRightOutlined } from '@ant-design/icons';
import { SchemaInitializerItem, useSchemaInitializer, useSchemaInitializerItem } from '@nocobase/client';
import React from 'react';

export const DataeaseEmbedingBlockInitializer = () => {
  const { insert } = useSchemaInitializer();
  const itemConfig = useSchemaInitializerItem();
  return (
    <SchemaInitializerItem
      {...itemConfig}
      icon={<PicRightOutlined />}
      onClick={() => {
        insert({
          type: 'void',
          'x-settings': 'blockSettings:dataease-embeding',
          'x-decorator': 'BlockItem',
          'x-decorator-props': {
            name: 'dataease-embeding',
          },
          'x-component': 'DataeaseEmbeding',
          'x-component-props': {},
        });
      }}
    />
  );
};

/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaComponentOptions } from '@nocobase/client';
import React from 'react';
import { ArrayItems } from '@formily/antd-v5';

import { DataeaseEmbeding } from './DataeaseEmbeding';
import { DataeaseEmbedingBlockInitializer } from './DataeaseEmbedingBlockInitializer';

export const DataeaseEmbedingBlockProvider = (props: any) => {
  return (
    <SchemaComponentOptions components={{ DataeaseEmbeding, DataeaseEmbedingBlockInitializer, ArrayItems }}>
      {props.children}
    </SchemaComponentOptions>
  );
};

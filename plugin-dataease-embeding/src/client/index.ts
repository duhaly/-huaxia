/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { DataeaseEmbedingBlockProvider } from './DataeaseEmbedingBlockProvider';
import { dataeaseEmbedingBlockSchemaSettings, dataeaseEmbedingBlockSchemaSettings_deprecated } from './schemaSettings';

export class PluginBlockDataeaseEmbedingClient extends Plugin {
  async load() {
    this.app.schemaSettingsManager.add(dataeaseEmbedingBlockSchemaSettings_deprecated);
    this.app.schemaSettingsManager.add(dataeaseEmbedingBlockSchemaSettings);
    this.app.use(DataeaseEmbedingBlockProvider);
    const blockInitializers = this.app.schemaInitializerManager.get('page:addBlock');
    blockInitializers?.add('otherBlocks.dataeaseEmbeding', {
      title: '{{t("Dataease Embeding")}}',
      Component: 'DataeaseEmbedingBlockInitializer',
    });

    const createFormBlockInitializers = this.app.schemaInitializerManager.get('popup:addNew:addBlock');
    createFormBlockInitializers?.add('otherBlocks.dataeaseEmbeding', {
      title: '{{t("Dataease Embeding")}}',
      Component: 'DataeaseEmbedingBlockInitializer',
    });

    const recordBlockInitializers = this.app.schemaInitializerManager.get('popup:common:addBlock');
    recordBlockInitializers?.add('otherBlocks.dataeaseEmbeding', {
      title: '{{t("Dataease Embeding")}}',
      Component: 'DataeaseEmbedingBlockInitializer',
    });

    const recordFormBlockInitializers = this.app.schemaInitializerManager.get('RecordFormBlockInitializers');
    recordFormBlockInitializers?.add('otherBlocks.dataeaseEmbeding', {
      title: '{{t("Dataease Embeding")}}',
      Component: 'DataeaseEmbedingBlockInitializer',
    });

    this.app.schemaInitializerManager.addItem('mobilePage:addBlock', 'otherBlocks.dataeaseEmbeding', {
      title: '{{t("Dataease Embeding")}}',
      Component: 'DataeaseEmbedingBlockInitializer',
    });

    this.app.schemaInitializerManager.addItem('mobile:addBlock', 'otherBlocks.dataeaseEmbeding', {
      title: '{{t("Dataease Embeding")}}',
      Component: 'DataeaseEmbedingBlockInitializer',
    });
  }
}

export default PluginBlockDataeaseEmbedingClient;

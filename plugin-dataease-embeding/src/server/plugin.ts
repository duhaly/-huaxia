import { Plugin } from '@nocobase/server';
import { generate } from './actions/generate';

export class PluginDataeaseEmbedingServer extends Plugin {

  resoureName = 'dataeaseEmbeding';

  async afterAdd() { }

  async beforeLoad() {
    this.app.resourceManager.define({
      name: this.resoureName,
      actions: {
        generate,
      },
      only: ['generate'],
    });
  }

  async load() {
    this.app.acl.allow(this.resoureName, 'generate', 'loggedIn');
  }

  async install() { }

  async afterEnable() { }

  async afterDisable() { }

  async remove() { }
}

export default PluginDataeaseEmbedingServer;


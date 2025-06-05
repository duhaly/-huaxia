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
      // only: ['generate'],
      
    });
  }

  async load() {
    this.app.acl.allow(this.resoureName, 'generate', 'loggedIn');
  }

  async install() {
    const repo = this.db.getRepository<any>('collections');
    if (repo) {
      await repo.db2cm('dataeaseEmbeding')
    }
  }

  async afterEnable() {
    const repo = this.db.getRepository<any>('collections');
    if (repo) {
      await repo.db2cm('dataeaseEmbeding')
    }
  }

  async afterDisable() { }

  async remove() { }
}

export default PluginDataeaseEmbedingServer;


import { Plugin } from '@nocobase/server';
export declare class PluginDataeaseEmbedingServer extends Plugin {
    resoureName: string;
    afterAdd(): Promise<void>;
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    install(): Promise<void>;
    afterEnable(): Promise<void>;
    afterDisable(): Promise<void>;
    remove(): Promise<void>;
}
export default PluginDataeaseEmbedingServer;

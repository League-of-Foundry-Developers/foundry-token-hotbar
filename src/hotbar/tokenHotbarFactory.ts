import { Settings } from '../utils/settings';
import { TokenHotbar } from './tokenHotbar';
import { HotbarFlagsFactory, FlagStrategyFactory } from '../flags/factory';
import { ConsoleLogger } from '../utils/logger';

export class TokenHotbarFactory {
    constructor(private settings: Settings) {}

    create(tokenId: string): TokenHotbar {
        const hotbarFlags = new HotbarFlagsFactory(this.settings);
        const keyStrategy = new FlagStrategyFactory(this.settings, game, canvas);
        return new TokenHotbar(
            tokenId,
            game.macros.entities,
            hotbarFlags.create(),
            keyStrategy.createFlagKeyStrategy(),
            new ConsoleLogger(this.settings));
    }
} 

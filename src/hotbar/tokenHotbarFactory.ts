import { Settings } from '../utils/settings';
import { TokenHotbar } from './tokenHotbar';
import { HotbarFlagsFactory, FlagStrategyFactory } from '../flags/factory';
import { ConsoleLogger } from '../utils/logger';

export class TokenHotbarFactory {
    create(settings: Settings, tokenId: string): TokenHotbar {
        const hotbarFlags = new HotbarFlagsFactory(settings);
        const keyStrategy = new FlagStrategyFactory(settings, game, canvas);
        return new TokenHotbar(
            tokenId,
            game.macros.entities,
            hotbarFlags.create(),
            keyStrategy.createFlagKeyStrategy(),
            new ConsoleLogger(settings));
    }
} 

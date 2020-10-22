import { Settings } from '../utils/settings';
import { TokenHotbar } from './tokenHotbar';
import { HotbarFlagsFactory, FlagStrategyFactory } from '../flags/factory';
import { ConsoleLogger } from '../utils/logger';
import { DeselectedHotbar } from './deselectedHotbar';
import { ModuleHotbarFlags } from '../flags/hotbarFlags';
import { UserFlagsStrategy } from '../flags/flagStrategies';
import { Hotbar, TokenBarRemover } from './hotbar';

export class TokenHotbarFactory {
    constructor(private settings: Settings) {}

    create(tokenId?: string): Hotbar {
        const logger = new ConsoleLogger(this.settings);
        if (!tokenId) {
            return new DeselectedHotbar(
                game.macros.entities,
                new ModuleHotbarFlags(
                    new UserFlagsStrategy(game.user, game.actors, canvas.tokens),
                    logger),
                logger);

        }

        const hotbarFlags = new HotbarFlagsFactory(this.settings);
        const keyStrategy = new FlagStrategyFactory(this.settings, game, canvas);
        return new TokenHotbar(
            tokenId,
            game.macros.entities,
            hotbarFlags.create(),
            keyStrategy.createFlagKeyStrategy(),
            new ConsoleLogger(this.settings));
    }

    createRemover(tokenId: string): TokenBarRemover {
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

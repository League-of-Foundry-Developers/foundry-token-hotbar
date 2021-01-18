import { Settings } from '../utils/settings';
import { HotbarFlags, ModuleHotbarFlags } from './hotbarFlags';
import { IdentityFlagsStrategy, UserFlagsStrategy, LinkedFlagsStrategy, AlwaysLinkedFlagsStrategy, FlagsStrategy } from './flagStrategies';
import { Game, Canvas } from '../utils/foundry';
import { ConsoleLogger } from '../utils/logger';

export class HotbarFlagsFactory {
    constructor(private settings: Settings) { }

    public create(): HotbarFlags {
        const factory = new FlagStrategyFactory(this.settings, game, canvas);
        return new ModuleHotbarFlags(factory.createFlagStrategy(), new ConsoleLogger(this.settings));
    }
}

/**
 * Given the settings, provide the appropriate strategy of:
 * 1. where to save the Token Hotbar,
 * 2. which key to use to save the Token Hotbar (generally the id of the returned entity).
 */
export class FlagStrategyFactory {

    constructor(private settings: Settings, private game: Game, private canvas: Canvas) { }

    public createFlagStrategy(): FlagsStrategy  {
        if (this.settings.shareHotbar) {
            if (this.settings.alwaysLinkToActor) {
                return new AlwaysLinkedFlagsStrategy(this.game.actors, this.canvas.tokens);
            }
            if (this.settings.linkToLinkedActor) {
                return new LinkedFlagsStrategy(this.game.actors, this.canvas.tokens);
            }
            return new IdentityFlagsStrategy(this.game.actors, this.canvas.tokens);
        }
        return new UserFlagsStrategy(this.game.user, this.game.actors, this.canvas.tokens);
    }

    public createFlagKeyStrategy(): FlagsStrategy {
        if (this.settings.alwaysLinkToActor)
            return new AlwaysLinkedFlagsStrategy(this.game.actors, this.canvas.tokens);

        if (this.settings.linkToLinkedActor)
            return new LinkedFlagsStrategy(this.game.actors, this.canvas.tokens);

        return new IdentityFlagsStrategy(this.game.actors, this.canvas.tokens);
    }
}

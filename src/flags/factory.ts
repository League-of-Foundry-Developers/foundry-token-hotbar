import { Settings } from '../settings';
import { FoundryHotbarFlags, HotbarFlags } from './hotbarFlags';
import { IdentityFlagsStrategy, UserFlagsStrategy, LinkedFlagsStrategy, AlwaysLinkedFlagsStrategy, FlagsStrategy } from './flagStrategies';

export class HotbarFlagsFactory {
    constructor(private settings: Settings) { }

    public create(): HotbarFlags {
        const factory = new FlagStrategyFactory(this.settings, game, canvas);
        return new FoundryHotbarFlags(factory.createFlagStrategy());
    }
}

export class FlagStrategyFactory {

    constructor(private settings: Settings, private game: any, private canvas: any) { }

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

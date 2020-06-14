import { Settings } from '../settings';
import { FoundryHotbarFlags } from './hotbarFlags';
import { IdentityFlagsStrategy, UserFlagsStrategy, LinkedFlagsStrategy, AlwaysLinkedFlagsStrategy } from './flagStrategies';

export class HotbarFlagsFactory {
    constructor(private settings: Settings) { }

    public create() {
        const factory = new FlagStrategyFactory(this.settings, game, canvas);
        return new FoundryHotbarFlags(factory.createFlagStrategy());
    }
}

// Configuration combinations
// shared |  link | always |  entity   | key
//    1   |   0   |    0   |  identity | identity
//    1   |   1   |    0   |  link     | link
//    1   |   -   |    1   |  actor    | actor
//    0   |   0   |    0   |  user     | identity
//    0   |   1   |    0   |  user     | link
//    0   |   -   |    1   |  user     | actor
export class FlagStrategyFactory {

    constructor(private settings: Settings, private game: any, private canvas: any) { }

    public createFlagStrategy() {
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

    public createFlagKeyStrategy() {
        if (this.settings.alwaysLinkToActor)
            return new AlwaysLinkedFlagsStrategy(this.game.actors, this.canvas.tokens);

        if (this.settings.linkToLinkedActor)
            return new LinkedFlagsStrategy(this.game.actors, this.canvas.tokens);

        return new IdentityFlagsStrategy(this.game.actors, this.canvas.tokens);
    }
}

import { Settings } from '../settings';
import { FoundryHotbarFlags } from './hotbarFlags';
import { SharedAlwaysLinkedFlagsStrategy, SharedLinkedFlagsStrategy, DefaultFlagsStrategy } from './flagStrategies';
import { SharedFlagKeyStrategy, LinkedFlagKeyStrategy, AlwaysLinkedFlagKeyStrategy, DefaultFlagKeyStrategy } from './flagKeyStrategies';

export class HotbarFlagsFactory {
    constructor(private settings: Settings) { }

    public create() {
        const flagStrategy = this.createFlagStrategy();
        return new FoundryHotbarFlags(flagStrategy);  
    }

    private createFlagStrategy() {
        return new FlagStrategyFactory(this.settings).create();
    }
}

export class FlagStrategyFactory {

    constructor(private settings: Settings) { }

    public create() {
        if (this.settings.shareHotbar) {
            if (this.settings.alwaysLinkToActor) {
                return new SharedAlwaysLinkedFlagsStrategy();
            }
            if (this.settings.linkToLinkedActor) {
                return new SharedLinkedFlagsStrategy();
            }
        }
        return new DefaultFlagsStrategy();
    }
}

export class FlagKeyFactory {
    constructor(private settings: Settings) { }

    public create() {
        if (this.settings.shareHotbar)
            return new SharedFlagKeyStrategy();
        
        if (this.settings.alwaysLinkToActor)
            return new AlwaysLinkedFlagKeyStrategy();

        if (this.settings.linkToLinkedActor)
            return new LinkedFlagKeyStrategy();

        return new DefaultFlagKeyStrategy();
    }
}
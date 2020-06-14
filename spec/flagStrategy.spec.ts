
import 'jasmine';
import { UserFlagsStrategy, IdentityFlagsStrategy, LinkedFlagsStrategy, AlwaysLinkedFlagsStrategy } from '../src/flags/flagStrategies';
import { IActor, IToken } from '../src/foundry';
import { TestFlaggable, TestToken } from './helpers/TestToken';

describe('SharedFlagsStrategy', () => {
    it('should return the user (token)', () => {
        const user = new TestFlaggable('user-1');
        const actors = new Map<string, IActor>();
        const tokens = new Map<string, IToken>();

        const strategy = new UserFlagsStrategy(user, actors, tokens);

        expect(strategy.get('token-1')).toEqual(user);
    });

    it('should return the user (actor)', () => {
        const user = new TestFlaggable('user-1');
        const actors = new Map<string, IActor>();
        const tokens = new Map<string, IToken>();

        const strategy = new UserFlagsStrategy(user, actors, tokens);

        expect(strategy.get('actor-1')).toEqual(user);
    });
});

describe('LinkedFlagsStrategy', () => {
    const actors = new Map<string, IActor>();
    const tokens = new Map<string, IToken>();

    const strategy = new LinkedFlagsStrategy(actors, tokens);

    it('should return the id of the actor when linked', () => {
        const actor = new TestFlaggable('actor-1');
        const token = new TestToken('token-1', actor);
        actors.set(actor.id, actor);
        tokens.set(token.id, token);

        expect(strategy.get(token.id)).toEqual(actor);
    });

    it('should return the id of the token when unlinked', () => {
        const actor = new TestFlaggable('actor-1');
        const token = new TestToken('token-1', actor);
        token.data.actorLink = false;

        actors.set(actor.id, actor);
        tokens.set(token.id, token);

        expect(strategy.get(token.id)).toEqual(token);
    });

    it('should return the id of the actor', () => {
        const actor = new TestFlaggable('actor-1');
        const token = new TestToken('token-1', actor);

        actors.set(actor.id, actor);
        tokens.set(token.id, token);

        expect(strategy.get(actor.id)).toEqual(actor);
    });
});

describe('AlwaysLinkedFlagStrategy', () => {
    const actors = new Map<string, IActor>();
    const tokens = new Map<string, IToken>();

    const strategy = new AlwaysLinkedFlagsStrategy(actors, tokens);


    it('should return the id of the actor when linked', () => {
        const actor = new TestFlaggable('actor-1');
        const token = new TestToken('token-1', actor);
        actors.set(actor.id, actor);
        tokens.set(token.id, token);

        expect(strategy.get(token.id)).toEqual(actor);
    });

    it('should return the id of the actor when unlinked', () => {
        const actor = new TestFlaggable('actor-1');
        const token = new TestToken('token-1', actor);
        token.data.actorLink = false;

        actors.set(actor.id, actor);
        tokens.set(token.id, token);

        expect(strategy.get(token.id)).toEqual(actor);
    });

    it('should return the id of the actor', () => {
        const actor = new TestFlaggable('actor-1');
        const token = new TestToken('token-1', actor);

        actors.set(actor.id, actor);
        tokens.set(token.id, token);

        expect(strategy.get(actor.id)).toEqual(actor);
    });
});

describe('IdentityFlagKeyStrategy', () => {
    it('should return the entity (token)', () => {
        const actors = new Map<string, IActor>();
        const tokens = new Map<string, IToken>();

        const strategy = new IdentityFlagsStrategy(actors, tokens);
        const actor = new TestFlaggable('actor-1');
        const token = new TestToken('token-1', actor);
        token.data.actorLink = false;

        actors.set(actor.id, actor);
        tokens.set(token.id, token);

        expect(strategy.get(token.id)).toEqual(token);
    });

    it('should return the entity (actor)', () => {
        const actors = new Map<string, IActor>();
        const tokens = new Map<string, IToken>();

        const strategy = new IdentityFlagsStrategy(actors, tokens);
        const actor = new TestFlaggable('actor-1');
        const token = new TestToken('token-1', actor);
        token.data.actorLink = false;

        actors.set(actor.id, actor);
        tokens.set(token.id, token);

        expect(strategy.get(actor.id)).toEqual(actor);
    });
});
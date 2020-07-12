import { Socket } from '../../src/utils/foundry';

export class TestSocket implements Socket {
    emit: (scope: 'module.TokenHotbar', msg: import('../../src/controller').UpdateMsg) => void
        = (scope, msg) => {
            return; 
        }

    on: (scope: 'module.TokenHotbar', callback: (msg: import('../../src/controller').UpdateMsg) => void) => void
        = (scope, callback) => {
            return; 
        }
}
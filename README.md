# Token Hotbar
Using this Foundry VTT module, you can assign one of the hotbar pages to remember macros per token.
If the token is a linked token, the hotbar will be linked to the actor.

## Installation
Install module and enter this url: https://raw.githubusercontent.com/janssen-io/foundry-token-hotbar/master/module.json

## Usage
1. Set your desired page in the module settings (default: 5)
2. Select a single token
3. Assign/remove some macros

![Demo](./img/thb-basics.gif)

### Settings
*Page:* the hotbar page to use as token hotbar.  
*Link to actor:* link the token hotbar to the linked actor, such that for each linked token of this actor, the same token hotbar will be displayed.  
*Always link to actor:* link the hotbar to the actor, even if the token itself is not linked.

## Changelog
### 2.0.x
- Token hotbars can now be shared. That is, any player that select the token will see the same token hotbar.
- Shared token hotbars can be locked, meaning only GMs can edit them.
- Fixed 🐛 Hotbar is not cleared when no tokens are controlled. Previous active hotbar is now shown.

![Demo](./img/thb-locked.gif)
![Demo](./img/thb-go-back-to-active.gif)

### 1.2.3
- Token hotbar can now be linked to actor even if token is unlinked
- Fixed 🐛 Token hotbar is not deleted with (unlinked) token
- Fixed 🐛 Token hotbar is not deleted with linked actor

### 1.1.0
- Token hotbar can now be linked to actor if token is linked (default: true)

### 1.0.0
- Basic functionality (separate hotbar per token)
- 🐛 Token hotbar is not deleted with token
- 🐛 Hotbar is not cleared when no tokens are controlled

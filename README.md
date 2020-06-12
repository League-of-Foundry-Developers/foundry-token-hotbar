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
![Demo](./img/thb-locked.gif)
![Demo](./img/thb-go-back-to-active.gif)

### Settings
*Page:* the hotbar page to use as token hotbar.  
*Link to actor:* link the token hotbar to the linked actor, such that for each linked token of this actor, the same token hotbar will be displayed.  
*Always link to actor:* link the hotbar to the actor, even if the token itself is not linked.
*Share the hotbar with other players:* every player will see the same hotbar for the particular token.
*Locked shared hotbar:* only GMs can modify hotbars (requires the above setting).

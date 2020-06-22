# Token Hotbar
Using this Foundry VTT module, you can assign one of the hotbar pages to remember macros per token.
If the token is a linked token, the hotbar will be linked to the actor.

## Installation
You can install the stable version of the module via the Foundry UI.
If you'd like to test the latest beta, you van use this manifest url:

```
https://fvtt.janssen.io/tokenhotbar/beta/module.json
```

## Usage
1. Set your desired page in the module settings (default: 5)
2. Select a single token
3. Assign/remove some macros

<p style:"text-align:center">

![Demo](./img/thb-basics.gif)

_Demo: page 5 dynamically changes based on the chosen token._

![Demo](./img/thb-shared.gif)

_Demo: the token hotbar can be shared between players. As the player on the right makes a change, the hotbar of the player on the left gets reloaded._

![Demo](./img/thb-locked.gif)

_Demo: the token hotbar page is locked for regular players._

![Demo](./img/thb-go-back-to-active.gif)

_Demo: the hotbar goes back to the last regular hotbar page on deselection._

</p>

### Settings
* *Page:* the hotbar page to use as token hotbar.
* *Link to actor:* link the token hotbar to the linked actor, such that for each linked token of this actor, the same token hotbar will be displayed.
* *Always link to actor:* link the hotbar to the actor, even if the token itself is not linked.
* *Share the hotbar with other players:* every player will see the same hotbar for the particular token.
* *Locked shared hotbar:* only GMs can modify hotbars (requires the above setting).

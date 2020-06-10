# Token Hotbar
Using this Foundry VTT module, you can assign one of the hotbar pages to remember macros per token.
If the token is a linked token, the hotbar will be linked to the actor.

## Installation
Install module and enter this url: https://raw.githubusercontent.com/janssen-io/foundry-token-hotbar/master/module.json

## Usage
1. Set your desired page in the module settings (default: 5)
2. Select a single token
3. Assign/remove some macros

![Demo](./token-hotbar.gif)

## Changelog
### 1.2.1
- Fixed 🐛 Token hotbar is not deleted with (unlinked) token

### 1.1.0
- Token hotbar can now be linked to actor if token is linked (default: true)

### 1.0.0
- Basic functionality (separate hotbar per token)
- 🐛 Token hotbar is not deleted with token
- 🐛 Hotbar is not cleared when no tokens are controlled

# Changelog
## 2.0.1
- Token hotbars can now be shared. That is, any player that select the token will see the same token hotbar.
- Shared token hotbars can be locked, meaning only GMs can edit them.
- Fixed 🐛 Hotbar is not cleared when no tokens are controlled. Previous active hotbar is now shown.
- 🔧 Converted code base to Typescript
- 🔧 Added unit tests
- 🔧 Use module name as flag key

![Demo](./img/thb-locked.gif)
![Demo](./img/thb-go-back-to-active.gif)

## 1.2.3
- Token hotbar can now be linked to actor even if token is unlinked
- Fixed 🐛 Token hotbar is not deleted with (unlinked) token
- Fixed 🐛 Token hotbar is not deleted with linked actor

## 1.1.0
- Token hotbar can now be linked to actor if token is linked (default: true)

## 1.0.0
- Basic functionality (separate hotbar per token)
- 🐛 Token hotbar is not deleted with token
- 🐛 Hotbar is not cleared when no tokens are controlled
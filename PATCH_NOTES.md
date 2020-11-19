Use UpdateUser hook and use delete syntax

I observed some changes since 0.7.7:
- preUpdateUser hook does not seem to be called anymore when updating the hotbar
- flags are merged rather than overwritten. Delete syntax (-=key: val)
  seems to be required now.

# rollup-plugin-add-userscript-header

A rollup plugin that adds a userscript header to a .js file.

## Tags

### Added from `package.json` file
By default, the plugin uses the following fields from the projects `package.json` file and adds tags accordingly:

| `package.json` field | tag                      |
|----------------------|--------------------------|
| name                 | @name                    |
| version              | @version                 |
| author               | @author                  |
| description          | @description             |
| license              | @license (unoffical tag) |
| homepage             | @homepage                |

#### @downloadURL & @updateURL
These tags get populated via the `repository` field combined with the `main` field.

The url is contructed like this: `<repo>/release/latest/download/<main>`

### @grant
> @grant directives do not need to be added manually.

The plugin checks the given code for occurrences and adds them automatically.
This includes the following:
- `GM.*` & `GM_*` calls
- `unsafeWindow`
- `window.close`
- `window.focus`
- `window.onurlchange`


### Other tags
You can specify more tags in `package.json` by adding a `userscriptMetadata` field.

Alternatively, you can pass them to the plugin directly through the `rollup.config.js` / `rollup.config.ts` file.

## Options
The only option to set is the `meta` option. It contains all the tags you want to set.

See the below for some examples!


## Examples

### `package.json`
```json
{
  "name": "GoodTwitter2",
  "version": "0.1.0",
  "description": "A try to make Twitter look good again.",
  "author": "schwarzkatz",
  "license": "MIT",
  "homepage": "https://github.com/Bl4Cc4t/GoodTwitter2#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Bl4Cc4t/GoodTwitter2.git"
  },
  "main": "dist/goodtwitter2.user.js",
  "userscriptMetadata": {
    "run-at": "document-start",
    "icon": "https://www.google.com/s2/favicons?sz=64&domain=twitter.com",
    "match": [
      "https://twitter.com/*",
      "https://mobile.twitter.com/*"
    ],
    "exclude": [
      "https://twitter.com/i/cards/*",
      "https://twitter.com/i/release_notes"
    ],
    "connect": [
      "api.twitter.com"
    ],
    "require": [
      "releases/latest/download/twitter.gt2eb.i18n.js"
    ],
    "resource": {
      "css": "releases/latest/download/twitter.gt2eb.style.css",
      "emojiRegex": "https://somesite.com/content/static/emoji-regex.txt"
    }
  }
}
```

### `rollup.config.js` / `rollup.config.ts`
Alternative to using `package.json`

```js
import addUserscriptHeader from "./packages/rollup-plugin-add-userscript-header"

export default {
  input: "./src/main.ts",
  plugins: [
    addUserscriptHeader({
      meta: metaOptions
    })
  ]
}
```

### Output header
The above examples place the following header into the output file:

```js
// ==UserScript==
// @name          GoodTwitter2
// @version       0.1.0
// @author        schwarzkatz
// @description   A try to make Twitter look good again.
// @license       MIT
// @homepage      https://github.com/Bl4Cc4t/GoodTwitter2#readme
// @run-at        document-start
// @grant         GM_addStyle
// @grant         GM_getResourceText
// @grant         unsafeWindow
// @match         https://mobile.twitter.com/*
// @match         https://twitter.com/*
// @exclude       https://twitter.com/i/cards/*
// @exclude       https://twitter.com/i/release_notes
// @connect       api.twitter.com
// @require       https://github.com/Bl4Cc4t/GoodTwitter2/releases/latest/download/twitter.gt2eb.i18n.js
// @resource      css https://github.com/Bl4Cc4t/GoodTwitter2/releases/latest/download/twitter.gt2eb.style.css
// @resource      emojiRegex https://somesite.com/content/static/emoji-regex.txt
// @icon          https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @updateURL     https://github.com/Bl4Cc4t/GoodTwitter2/releases/latest/download/dist/goodtwitter2.user.js
// @downloadURL   https://github.com/Bl4Cc4t/GoodTwitter2/releases/latest/download/dist/goodtwitter2.user.js
// ==/UserScript==
```

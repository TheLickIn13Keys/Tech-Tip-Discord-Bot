Fotology
==========
Fotology is a simple way to get the urls of images via Google Image Search.

The api is very simple:
```javascript
fotology(searchTerm, [options], callback);
```

To find pictures of cats:
```javascript
var fotology = require("fotology");
fotology("cats", function (imageURLs) {
    for (i in imageURLs)
        console.log imageURLs[i];
});
```

Options
-------
To modify behaviour, pass in an `options` object between the search term and callback. For example:
```javascript
let options = {
    size: "large", // large images only
    language: "fr", // French
    safe: true, // force safe search on
    color: "white" // white cats only please
}
fotology("cats", options, callback);
```

Option   | Description | Example value
-------  |-------------|-----------------
safe     | Safe search | true
size     | Image seize | "large"
language | Language    | "fr"
color    | Image color | "white"

### `safe`
By default, fotology uses moderate safe search, which is what you get on Google Images by default. It will mostly use safe search unless it thinks you do not want it.

To force safe search to be on all the time, set it as `true`.
```javascript
safe: true
```
To disable it, set it as false.

You cannot set safe search to moderate because it is a boolean type. The only way to use moderate safe search is by not passing it as an option, which fotology interprets as wanting moderate safe search.

### `size`
There are 4 possible sizes:
- small
- medium
- large
- huge

For example:
```javascript
size: "small"
```

By default, the size is not monitored for, so any size can be used.

### `language`
This modifies the language to use when making the search. By default, it uses English.

To modify the language, please pass it in like such:
```javascript
language: "fr"
```
for French and
```javascript
language: "de"
```
for German.

### `color`
By default, the images can be of any colour.

To get images of a specific colour only, please pick from and **ONE OF THESE ONLY**:
* black
* blue
* brown
* gray
* green
* orange
* pink
* purple
* red
* teal
* white
* yellow

Using a colour not in here will cause Google's servers to ignore you.

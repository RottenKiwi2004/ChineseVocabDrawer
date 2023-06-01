# 你好！

_Welcome to my little drawing board for reviewing Chinese vocabs and characters_

## Why this project might be beneficial?

It all started when I found myself struggling to remember both Chinese characters and Pinyin. I want a flashcard-style revising system, so I put all the words we learnt in class, classified them into chapters and get a randomised word to practice one by one.

## How to run the program?

_First, you must have Node.js installed_

```js
node --version
```

_Now run this command to install all dependencies_

```js
npm install
```

_Then start local server by running the following command_

```js
node .
```

_Next, go to http://localhost:3000_

If the server is running properly, the program should show up on website.

## To customise this for personal use

You can edit data.json and script.js

```js
// Change according to the total chapters you have
const totalChapter = ...;
```

Also, you have to manually add or remove checkbox from index.html and don't forget to change the number of chapter in these attrubutes: `name="ch{i}", onchange="encodeChapters(i, this.checked)"` and `for="ch{i}"` in `label`

```html
<input
  type="checkbox"
  name="ch1"
  width="20px"
  checked
  onchange="encodeChapters(1, this.checked)"
/><label for="ch1">1</label>
```

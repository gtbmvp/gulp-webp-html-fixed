# gulp-webp-html-fixed

**gulp-webp-html-fixed** parse HTML file using regular expression and replace all `<img>` , which src attributes match extensions argument, with `<picture>` element, also changing extensions to **.webp**
\*notice: it doesn't convert images in different formats, use [gulp-webp](https://www.npmjs.com/package/gulp-webp) to do it;

---

### Example

- Input: `<img class="logo__img" src="./img/logo.png" alt="" />`
- Output:

```
<picture>
    <source srcset="./img/logo.webp" type="image/webp">
    <img class="logo__img" src="./img/logo.png" alt="">
</picture>
```

### Installation

`npm install --save-dev gulp-webp-html-fixed`

### Usage

```
const { src, dest } = require('gulp');
const webpHtml = require("gulp-webp-html-fixed");

function html() {
  return src("./src/html/*.html")
        .pipe(webpHtml())
        // or
        .pipe(webpHtml(["jpg", "jpeg", "png"]))
        .pipe(dest("./public/html"))
}

exports.html = html;
```

### Extensions argument

Provide array with extensions to be converted, default value:
["jpg", "jpeg", "jpe", "jfif", "jif", "png", "gif"]

---

### Features

- doesn't modify `<img>` elements which are already inside `<picture>` using negative lookahead regexp;

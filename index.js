"use strict";
const { Transform } = require("stream");

module.exports = (
  extensions = ["jpg", "jpeg", "jpe", "jfif", "jif", "png", "gif"]
) => {
  /* 
  search for <img ... src="filename.extension" ... > not followed by </picture>
  (negative lookahead) to prevent processing img element inside <picture>
  (if picture elements are already present in code)
  */
  const regexp = /<img[^>]*?src=\"(\S+)\.(\w+)\"[^>]*>(?!\s*<\/picture>)/gi;

  /* function replacer for String.prototype.replace;
  match is full string matching regexp pattern;
  p1 is filepath without extension; p2 is file extension;
  */
  function webp(match, p1, p2) {
    if (extensions.includes(p2.toLowerCase())) {
      return `<picture>
          <source srcset="${p1}.webp" type="image/webp">
          ${match}
        </picture>`;
    } else {
      return match;
    }
  }

  const transformStream = new Transform({
    objectMode: true,

    transform(file, enc, callback) {
      const data = file.contents.toString();

      let newData = data.replace(regexp, webp);

      file.contents = Buffer.from(newData);

      callback(null, file);
    },
  });

  return transformStream;
};

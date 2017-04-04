// # Literate documentation for NPM modules
//
// Automatically generate documentation from a literate NPM module.
//
// I.e. to make a webpage for the module `solsort-util`, write the code as literate code, and add a html-file like:
// ```
// <!DOCTYPE html>
// <html>
//   <body>
//     <script src=https://unpkg.com/ldoc></script>
//     <script>ldoc('solsort-util');</script>
//   </body>
// </html>
//
// ```
//
// ## Actual source code
//
import {Converter} from 'showdown';

let style = `<style>
div {
  font-family: sans-serif;
}
.ldocSource {
  width: 60ex;
}
pre,code {
  background: #ddd;
}
pre {
  margin: 2ex 0ex 2ex 0ex;
}
</style>`

window.ldoc = async function(moduleName, elem) {
  if(!elem) {
    elem = document.createElement('div');
    document.body.appendChild(elem);
  }

  async function unpkg(file) {
    try {
      file = await fetch('https://unpkg.com/' + moduleName + '/' + file);
      return await file.text();
    } catch(e) {
      return undefined;
    }
  }

  var pkg = JSON.parse(await unpkg('package.json'));
  var travis = await unpkg('.travis.yml');
  var mainSrc = await unpkg(pkg.main);
  mainSrc = ('\n' + mainSrc).replace(
    /\n/g, '\n    '
  )
    .replace(
    /\n *\/\/ ?/g, '\n'
  );

  var html = 
    style +
    `<div class=ldocSource>${(new Converter()).makeHtml(mainSrc)}</div>`;
  console.log(pkg, html);

  elem.innerHTML = html;
}



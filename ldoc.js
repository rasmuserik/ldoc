// # Literate JavaScript Documentation
//
// Automatically generate documentation from a literate code module.
// Just add `<script src=https://unpkg.com/ldoc></script>` to a html file,
// and it will load `./package.json`, find the `ldoc` or `main` property,
// and render that as intermixed markdown and source code, - like this document.
//

exports.main = () => {
  let elem = document.getElementById('app');
  writeDoc(elem);
}

let Converter = require('showdown').Converter;


let style = `<style>
div {
  font-family: sans-serif;
}
.ldocSource {
  width: 72ex;
}
pre,code {
  background: #eee;
}
pre {
  margin: 2ex 0ex 2ex 0ex;
}
</style>`;



async function writeDoc(elem) {
  async function get(file) {
    try {
      file = await fetch(file);
      return await file.text();
    } catch(e) {
      return undefined;
    }
  }

  var pkg = JSON.parse(await get('package.json'));
  var travis = await get('.travis.yml');
  var mainSrc = await get(pkg.name + '.js');
  mainSrc = ('\n' + mainSrc).replace(
    /\n/g, '\n    '
  )
    .replace(
      /\n *\/\/ ?/g, '\n'
    );

  var html = 
    style +
    `<div class=ldocSource>${(new Converter()).makeHtml(mainSrc)}</div>`;
  //console.log(pkg, html);

  elem.innerHTML = html;
}


let elem = document.getElementById('ldoc');
if(!elem) {
  elem = document.createElement('div');
  elem.id = 'ldoc';
  document.body.appendChild(elem);
}
writeDoc(elem);

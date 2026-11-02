// Compila o Sass customizado e copia o JS do Bootstrap para js/vendor/.
// Uso: npm run build
import * as sass from 'sass';
import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';

mkdirSync('css', { recursive: true });
mkdirSync('js/vendor', { recursive: true });

// 1) Sass -> CSS (apenas os módulos importados em scss/custom.scss)
const resultado = sass.compile('scss/custom.scss', {
  loadPaths: ['node_modules'],
  style: 'compressed',
  quietDeps: true,                // silencia avisos internos do Bootstrap
  silenceDeprecations: ['import'] // Bootstrap 5.3 ainda usa @import
});
writeFileSync('css/custom.css', resultado.css);

// 2) JS do Bootstrap (bundle já inclui o Popper)
copyFileSync(
  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  'js/vendor/bootstrap.bundle.min.js'
);

console.log('OK: css/custom.css e js/vendor/bootstrap.bundle.min.js gerados.');

// Código da demo. O Bootstrap já foi carregado e expõe o objeto global `bootstrap`.

// ------------------------------------------------------------
// 2. Estado visual no DOM
// Lemos classes e atributos ARIA diretamente dos elementos.
// ------------------------------------------------------------
const alvo = document.getElementById('detalhes');
const botao = document.getElementById('btn-detalhes');
const campoClasses = document.getElementById('estado-classes');
const campoAria = document.getElementById('estado-aria');
const log = document.getElementById('estado-log');

function atualizarPainel() {
  campoClasses.textContent = alvo.className;
  campoAria.textContent = botao.getAttribute('aria-expanded');
}

function registrar(evento) {
  const item = document.createElement('li');
  item.className = 'list-group-item px-0 py-1';
  item.textContent = evento;
  log.prepend(item);
  atualizarPainel();
}

// Eventos do plugin Collapse: show -> shown -> hide -> hidden
['show', 'shown', 'hide', 'hidden'].forEach((nome) => {
  alvo.addEventListener(`${nome}.bs.collapse`, () => registrar(`${nome}.bs.collapse`));
});
atualizarPainel();

// ------------------------------------------------------------
// 3. API JavaScript: Modal e Toast
// ------------------------------------------------------------
const toastEl = document.getElementById('toast-aviso');
const toastTexto = document.getElementById('toast-texto');

function mostrarAviso(mensagem) {
  toastTexto.textContent = mensagem;
  // getOrCreateInstance evita criar duas instâncias para o mesmo elemento
  bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 }).show();
}

document.getElementById('btn-confirmar').addEventListener('click', () => {
  const modalEl = document.getElementById('modal-exemplo');
  bootstrap.Modal.getInstance(modalEl).hide(); // instância criada via data-bs-toggle
  mostrarAviso('Item excluído.');
});

// ------------------------------------------------------------
// 4. Formulário: validação nativa + classe `was-validated`
// ------------------------------------------------------------
const form = document.getElementById('form-contato');

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  form.classList.add('was-validated');
  if (form.checkValidity()) {
    mostrarAviso('Formulário enviado.');
    form.reset();
    form.classList.remove('was-validated');
  }
});

// ------------------------------------------------------------
// 5. Tema claro/escuro (Bootstrap 5.3: atributo data-bs-theme)
// Os componentes leem variáveis CSS; trocar o atributo troca o tema inteiro.
// ------------------------------------------------------------
const raiz = document.documentElement;
const botaoTema = document.getElementById('btn-tema');

function aplicarTema(tema) {
  raiz.setAttribute('data-bs-theme', tema);
  botaoTema.textContent = tema === 'dark' ? 'Tema claro' : 'Tema escuro';
}

let temaInicial = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
try {
  temaInicial = localStorage.getItem('tema') || temaInicial;
} catch (e) {
  // armazenamento indisponível: segue com o tema do sistema
}
aplicarTema(temaInicial);

botaoTema.addEventListener('click', () => {
  const novo = raiz.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  aplicarTema(novo);
  try {
    localStorage.setItem('tema', novo);
  } catch (e) {
    // sem persistência
  }
});

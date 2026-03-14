(function () {
  const TOOLS = [
    { name: 'GUID Generator',       desc: 'Generate RFC 4122 v4 UUIDs in bulk.',               icon: '🔑', url: 'uuid-generator.html',         tags: ['uuid','guid','id','random'] },
    { name: 'Lorem Ipsum',          desc: 'Placeholder text by paragraphs or sentences.',        icon: '📝', url: 'lorem-ipsum-generator.html',  tags: ['lorem','placeholder','text','dummy'] },
    { name: 'Case Converter',       desc: 'camelCase, snake_case, CAPS, kebab-case and more.',   icon: 'Aa', url: 'case-converter.html',          tags: ['case','camel','snake','upper','lower','kebab'] },
    { name: 'JSON Formatter',       desc: 'Format, beautify and minify JSON.',                   icon: '🗂', url: 'json-formatter.html',          tags: ['json','format','beautify','minify','pretty'] },
    { name: 'JSON Validator',       desc: 'Validate JSON and pinpoint errors by line.',          icon: '✓',  url: 'json-validator.html',          tags: ['json','validate','lint','check'] },
    { name: 'Base64 Encoder',       desc: 'Encode and decode Base64 strings.',                   icon: '⇄',  url: 'base64-encoder.html',          tags: ['base64','encode','decode','binary'] },
    { name: 'URL Encoder',          desc: 'Percent-encode or decode URLs.',                      icon: '🔗', url: 'url-encoder.html',             tags: ['url','encode','decode','percent','query'] },
    { name: 'Timestamp Converter',  desc: 'Convert Unix timestamps to readable dates.',          icon: '⏱', url: 'timestamp-converter.html',     tags: ['timestamp','unix','epoch','date','time'] },
    { name: 'Regex Tester',         desc: 'Test regular expressions live with match highlights.',icon: '.*', url: 'regex-tester.html',            tags: ['regex','regexp','pattern','match','test'] },
    { name: 'Hash Generator',       desc: 'SHA-1, SHA-256, SHA-384, SHA-512 hashes.',            icon: '⬡',  url: 'hash-generator.html',          tags: ['hash','sha','md5','sha256','sha512','checksum'] },
    { name: 'Random String Generator', desc: 'Generate cryptographically random strings with custom charset.', icon: '🎲', url: 'random-string-generator.html', tags: ['random','string','token','secret','charset'] },
    { name: 'Password Generator',  desc: 'Generate strong random passwords with entropy score.',   icon: '🔐', url: 'password-generator.html',      tags: ['password','random','secure','strong','generator'] },
    { name: 'UUID Validator',       desc: 'Validate UUIDs and detect version and variant.',          icon: '✓',  url: 'uuid-validator.html',          tags: ['uuid','guid','validate','check','version'] },
    { name: 'JWT Decoder',          desc: 'Decode JWT tokens — header, payload, claims, and expiry.',icon: '🔓', url: 'jwt-decoder.html',             tags: ['jwt','token','decode','auth','claims','bearer','authorization'] },
    { name: 'Font Generator',         desc: 'Copy and paste fancy Unicode fonts — bold, italic, cursive, bubble, and more.', icon: '𝓐', url: 'font-generator.html', tags: ['font','fonts','copy paste','fancy','unicode','generator','style','text','cursive','bold'] },
    { name: 'YAML to JSON',           desc: 'Convert YAML to JSON or JSON to YAML — bidirectional, instant, client-side.',   icon: '⇅', url: 'yaml-to-json.html',    tags: ['yaml','json','convert','converter','yml','parse'] },
    { name: 'Background Changer',     desc: 'Remove and replace image backgrounds — transparent, white, black, or custom image.', icon: '🖼', url: 'bg-changer.html', tags: ['background','image','remove','replace','transparent','bg','photo','png','jpg','jpeg','webp'] },
  ];

  function init() {
    const input    = document.getElementById('nav-search-input');
    const dropdown = document.getElementById('nav-search-dropdown');
    const clearBtn = document.getElementById('nav-search-clear');
    if (!input || !dropdown || !clearBtn) return;

    let activeIdx = -1;

    function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function highlight(text, query) {
      if (!query) return text;
      return text.replace(new RegExp('(' + esc(query) + ')', 'gi'), '<em>$1</em>');
    }

    function render(query) {
      const q = query.trim().toLowerCase();
      activeIdx = -1;
      if (!q) { close(); return; }

      const results = TOOLS.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.includes(q))
      );

      if (!results.length) {
        dropdown.innerHTML = '<div class="nav-search-noresult">No tools match "' + query.trim() + '"</div>';
      } else {
        dropdown.innerHTML = results.map((t, i) =>
          `<a class="nav-search-result" href="${t.url}" data-idx="${i}">
            <div class="nav-search-icon">${t.icon}</div>
            <div class="nav-search-text">
              <div class="nav-search-name">${highlight(t.name, query.trim())}</div>
              <div class="nav-search-desc">${t.desc}</div>
            </div>
          </a>`
        ).join('');
      }
      dropdown.classList.add('open');
    }

    function close() {
      dropdown.classList.remove('open');
      dropdown.innerHTML = '';
      activeIdx = -1;
    }

    function setActive(idx) {
      const items = dropdown.querySelectorAll('.nav-search-result');
      items.forEach(el => el.classList.remove('active'));
      if (idx >= 0 && idx < items.length) {
        activeIdx = idx;
        items[idx].classList.add('active');
        items[idx].scrollIntoView({ block: 'nearest' });
      } else {
        activeIdx = -1;
      }
    }

    input.addEventListener('input', () => {
      render(input.value);
      clearBtn.classList.toggle('visible', input.value.length > 0);
    });

    input.addEventListener('keydown', e => {
      const items = dropdown.querySelectorAll('.nav-search-result');
      if (e.key === 'ArrowDown')  { e.preventDefault(); setActive(Math.min(activeIdx + 1, items.length - 1)); }
      if (e.key === 'ArrowUp')    { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
      if (e.key === 'Enter')      { e.preventDefault(); const t = items[activeIdx >= 0 ? activeIdx : 0]; if (t) t.click(); }
      if (e.key === 'Escape')     { close(); input.blur(); }
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.remove('visible');
      close();
      input.focus();
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.nav-search-wrap')) close();
    });

    input.addEventListener('focus', () => { if (input.value) render(input.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

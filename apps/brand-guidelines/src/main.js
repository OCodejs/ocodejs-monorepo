import './styles.css';

const assets = {
  lockup: 'https://raw.githubusercontent.com/OCodejs/ocodejs-monorepo/main/assets/OCODEJS_logo_O_round.png',
  icon: 'https://raw.githubusercontent.com/OCodejs/ocodejs-monorepo/main/assets/OCODEJS_app_icon.png',
  uniform: 'https://raw.githubusercontent.com/OCodejs/ocodejs-monorepo/main/assets/OCODEJS_design_01.png',
  card: 'https://raw.githubusercontent.com/OCodejs/ocodejs-monorepo/main/assets/OCODEJS_design_02_fixed.png',
  app: 'https://raw.githubusercontent.com/OCodejs/ocodejs-monorepo/main/assets/OCODEJS_design_04.png',
};

const colors = [
  { name: 'Midnight Black', hex: '#000000', role: 'Canvas / nền chính' },
  { name: 'Cloud White', hex: '#F7F7F7', role: 'Chữ chính / nền sáng' },
  { name: 'Metal Silver', hex: '#C9C9C9', role: 'Gradient biểu tượng' },
  { name: 'Electric Blue', hex: '#3155FF', role: 'Accent / focus / link' },
  { name: 'Muted Gray', hex: '#8A8A8A', role: 'Mô tả phụ / metadata' },
];

const navItems = [
  ['logo', 'Logo'],
  ['color', 'Color'],
  ['type', 'Type'],
  ['applications', 'Applications'],
  ['rules', 'Rules'],
];

const nav = navItems.map(([id, label]) => `<a href="#${id}" data-scroll="${id}">${label}</a>`).join('');

const colorCards = colors.map((color, index) => `
  <button class="color-card ${index === 0 ? 'is-dark' : ''}" data-copy="${color.hex}" aria-label="Sao chép ${color.hex}">
    <span class="color-swatch" style="--swatch:${color.hex}"></span>
    <span class="color-info"><strong>${color.name}</strong><small>${color.role}</small><code>${color.hex}</code></span>
    <span class="copy-mark">↗</span>
  </button>
`).join('');

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="site-shell">
    <div class="noise" aria-hidden="true"></div>
    <header class="topbar">
      <a class="brand" href="#top" aria-label="OCodejs Brand Guidelines">
        <img src="${assets.icon}" alt="OCodejs O symbol" />
        <span>OCODEJS <em>/</em> BRAND SYSTEM</span>
      </a>
      <nav class="desktop-nav" aria-label="Điều hướng chính">${nav}</nav>
      <button class="menu-toggle" aria-label="Mở menu" aria-expanded="false"><span></span><span></span></button>
    </header>
    <div class="mobile-nav" aria-hidden="true">${nav}</div>

    <main id="top">
      <section class="hero section-pad">
        <div class="hero-copy reveal">
          <p class="eyebrow"><span class="pulse-dot"></span> OCODEJS / BRAND GUIDELINES / 01.0</p>
          <h1>Make the<br /><span>web feel</span> <i>clear.</i></h1>
          <p class="hero-lede">Một hệ thống nhận diện tối giản cho framework hiện đại — nơi hình khối, tương phản và developer experience cùng nói chung một ngôn ngữ.</p>
          <div class="hero-actions">
            <a class="button button-light" href="#logo">Explore the system <span>↓</span></a>
            <button class="button button-ghost" data-copy="npx create-ocodejs-app@latest">npx create-ocodejs-app@latest <span class="copy-inline">□</span></button>
          </div>
        </div>
        <div class="hero-mark reveal delay-1">
          <div class="orbital orbital-a"></div><div class="orbital orbital-b"></div>
          <img src="${assets.lockup}" alt="OCodejs metallic O logo and wordmark" />
          <div class="mark-label"><span>PRIMARY MARK</span><b>O / 01</b></div>
        </div>
        <div class="hero-meta reveal delay-2"><span>BLACK CANVAS</span><span>METAL SILVER</span><span>ELECTRIC BLUE</span></div>
      </section>

      <section class="intro section-pad split-section" id="logo">
        <div class="section-kicker"><span>01</span><span>IDENTITY</span></div>
        <div class="split-content">
          <div><p class="eyebrow">01 / LOGO SYSTEM</p><h2>A mark with<br /><em>one clear job.</em></h2></div>
          <div class="section-body"><p>Biểu tượng O là một vòng tròn liên tục: chính xác, không thừa chi tiết và có thể nhận ra ngay cả khi thu nhỏ. Lockup đầy đủ kết hợp biểu tượng kim loại với wordmark OCODEJS để tạo nhịp điệu cân bằng.</p><a class="text-link" href="#applications">See it in context <span>↗</span></a></div>
        </div>
      </section>

      <section class="logo-stage section-pad">
        <div class="logo-stage-card">
          <div class="stage-grid"></div>
          <img src="${assets.lockup}" alt="Logo lockup OCODEJS" />
          <span class="measure measure-top">1 / 2 x</span><span class="measure measure-right">x</span>
          <span class="stage-note top-note">CLEAR SPACE / KEEP IT QUIET</span>
          <span class="stage-note bottom-note">PRIMARY LOCKUP / BLACK CANVAS</span>
        </div>
        <div class="logo-specs">
          <div class="spec"><span>SYMBOL</span><strong>O / CIRCLE</strong><small>Metal silver gradient</small></div>
          <div class="spec"><span>LOCKUP</span><strong>O + OCODEJS</strong><small>Do not separate the wordmark</small></div>
          <div class="spec"><span>MINIMUM</span><strong>120 PX</strong><small>Digital lockup width</small></div>
        </div>
      </section>

      <section class="palette section-pad" id="color">
        <div class="section-kicker"><span>02</span><span>COLOR</span></div>
        <div class="palette-head"><div><p class="eyebrow">02 / CORE PALETTE</p><h2>Color is a<br /><em>signal.</em></h2></div><p class="section-body">Nền đen là không gian chính. Trắng và bạc giữ hệ thống sắc nét. Xanh điện chỉ xuất hiện như một tín hiệu: link, focus, trạng thái và hành động.</p></div>
        <div class="color-grid">${colorCards}</div>
        <div class="gradient-panel"><div><span class="eyebrow">METAL GRADIENT / O SYMBOL</span><h3>White → Silver</h3><p>Gradient chỉ thuộc về biểu tượng O. Không kéo hiệu ứng chrome lên wordmark hoặc toàn bộ giao diện.</p></div><div class="gradient-ring"></div><div class="gradient-values"><code>#FFFFFF</code><code>#B8B8B8</code></div></div>
      </section>

      <section class="type-section section-pad" id="type">
        <div class="section-kicker"><span>03</span><span>TYPE</span></div>
        <div class="type-layout"><div><p class="eyebrow">03 / TYPOGRAPHY</p><h2>Quiet type.<br /><em>Sharp intent.</em></h2><p class="section-body">Sans-serif sạch cho UI và nội dung. Mono cho lệnh, API và những thứ cần cảm giác kỹ thuật.</p></div><div class="type-demo"><div class="type-row"><span>DISPLAY / 72</span><strong>Build better<br />web apps.</strong></div><div class="type-row"><span>BODY / 18</span><p>Khoảng cách thoáng, câu ngắn và độ tương phản đủ lớn để đọc tốt trên mọi màn hình.</p></div><div class="type-row"><span>CODE / MONO</span><code>npx create-ocodejs-app@latest</code></div></div></div>
      </section>

      <section class="applications section-pad" id="applications">
        <div class="section-kicker"><span>04</span><span>APPLICATIONS</span></div>
        <div class="applications-head"><div><p class="eyebrow">04 / IN THE REAL WORLD</p><h2>One system,<br /><em>many surfaces.</em></h2></div><p class="section-body">Một thương hiệu tốt không chỉ sống trong file logo. Nó phải tồn tại tự nhiên trên sản phẩm, vật phẩm và trải nghiệm số.</p></div>
        <div class="mockup-grid">
          <figure class="mockup-card mockup-wide"><img src="${assets.uniform}" alt="Bản thiết kế nhận diện OCodejs 01" /><figcaption><span>01 / BRAND STUDY</span><strong>Identity in focus.</strong><small>Primary mark / visual language</small></figcaption></figure>
          <figure class="mockup-card"><img src="${assets.card}" alt="Bản thiết kế nhận diện OCodejs 02" /><figcaption><span>02 / VISUAL SYSTEM</span><strong>Built with precision.</strong><small>Geometry / contrast / consistency</small></figcaption></figure>
          <figure class="mockup-card"><img src="${assets.app}" alt="Bản thiết kế nhận diện OCodejs 04" /><figcaption><span>03 / PRODUCT DIRECTION</span><strong>Designed to scale.</strong><small>Digital identity / product surfaces</small></figcaption></figure>
        </div>
      </section>

      <section class="rules section-pad" id="rules">
        <div class="section-kicker"><span>05</span><span>RULES</span></div>
        <div class="rules-head"><div><p class="eyebrow">05 / DO & DON'T</p><h2>Protect the<br /><em>recognition.</em></h2></div><p class="section-body">Nếu logo không còn được nhận ra ngay lập tức, hãy quay về ba điều: đúng tỷ lệ, đủ khoảng thở, đủ tương phản.</p></div>
        <div class="rules-grid"><div class="rule-card do"><div class="rule-icon">✓</div><h3>Keep it precise.</h3><p>Dùng đúng lockup, giữ nguyên tỷ lệ và để logo có khoảng trống xung quanh.</p><div class="rule-visual"><img src="${assets.icon}" alt="Logo O đúng chuẩn" /></div></div><div class="rule-card dont"><div class="rule-icon">×</div><h3>Don't decorate it.</h3><p>Không kéo giãn, xoay, đổi màu tùy ý, thêm slogan hoặc đặt trên nền thiếu tương phản.</p><div class="rule-visual wrong"><img src="${assets.icon}" alt="Ví dụ logo không nên sử dụng" /></div></div></div>
      </section>

      <section class="closing section-pad"><div class="closing-grid"></div><div class="closing-inner"><img src="${assets.icon}" alt="OCodejs icon" /><p class="eyebrow">END OF SYSTEM / BEGIN OF BUILD</p><h2>Make something<br /><em>worth shipping.</em></h2><a class="button button-light" href="#top">Back to top <span>↑</span></a></div></section>
    </main>
    <footer class="footer"><span>© OCodejs / Brand Guidelines 01.0</span><span>Designed for the modern web</span><a href="https://github.com/OCodejs/ocodejs-monorepo/tree/main/assets" target="_blank" rel="noreferrer">Source assets ↗</a></footer>
    <div class="toast" role="status" aria-live="polite">Copied</div>
  </div>
`;

const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
}

document.querySelectorAll('[data-copy]').forEach((el) => {
  el.addEventListener('click', async () => {
    const value = el.dataset.copy;
    try { await navigator.clipboard.writeText(value); showToast(`Copied ${value}`); }
    catch { showToast(value); }
  });
});

document.querySelectorAll('[data-scroll]').forEach((el) => {
  el.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById(el.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.mobile-nav')?.classList.remove('open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const mobile = document.querySelector('.mobile-nav');
  const open = mobile.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
  mobile.setAttribute('aria-hidden', String(!open));
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('in-view');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal, .section-kicker, .split-content, .palette-head, .type-layout, .applications-head, .rules-head, .mockup-card, .rule-card').forEach((el) => observer.observe(el));

/* eslint-disable */
// @ts-nocheck
'use client';
//
// Migrated from Folder B's barrier-protocol.html lines 2521-2859.
// Same pattern as /acne, /even-tone, /renewal.

import { useEffect } from 'react';

export default function BarrierClient() {
  useEffect(() => {
  // ─────────────────── CONFIG ───────────────────
  const CONCERN = 'hydration';
  const BUNDLE = {
    sku: 'barrier-protocol',
    name: 'The Barrier Protocol',
    items: ['prep', 'ha', 'spf'],
    listSum: 5699,
    price: 4799,
    savings: 900,
    savingsPct: 16,
  };
  const PRODUCTS = {
    prep:   { name: 'Radiance Prep Cleanser',       price: 1799, list: 2000, image: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/Prep.png?v=1773743330' },
    rescue: { name: 'Clarifying Rescue Face Wash',  price: 1799, list: 2000, image: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/wash.png?v=1773743070' },
    vitc:   { name: 'Vitamin CE Ferrulic Serum',    price: 2250, list: 2950, image: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/3390b799-35fe-425b-bae9-41e4c8e41139.png?v=1773338016' },
    acne:   { name: 'Clarifying Acne Serum',        price: 2100, list: 3000, image: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/Generated_Image_March_13_2026_-_3_48AM.png?v=1773743197' },
    ha:     { name: 'Hyaluronic Acid Serum',        price: 2000, list: 2500, image: 'https://clartemd.com.pk/cdn/shop/files/d9a4c8e3-fcbb-4411-b5a3-fb59422d0040.png' },
    reti:   { name: 'Retinol Serum',                price: 2000, list: 2500, image: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/Gemini_Generated_Image_rwcfs4rwcfs4rwcf.png?v=1773881855' },
    light:  { name: 'Radiance Lightening Cream',    price: 2500, list: 4500, image: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/Generated_Image_March_13_2026_-_3_37AM.png?v=1773743441' },
    spf:    { name: 'Barrier Restore SPF 50+',      price: 1900, list: 2500, image: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/91edf02b-ef9c-4062-a6b9-f0975d941393.png?v=1773337514' },
  };
  const CROSS_SELLS = [
    { sku: 'vitc',  why: 'Once the barrier is restored, layer Vit C in the morning to brighten.' },
    { sku: 'reti',  why: 'For mature sensitive skin, introduce retinol gently after week twelve.' },
    { sku: 'acne',  why: 'If hormonal breakouts emerge once skin tolerates it.' },
    { sku: 'light', why: 'For sun spots or post-acne marks — once redness has fully settled.' },
  ];
  const AI_PROMPT = 'Generate a photorealistic projection of this person\'s skin after 12 weeks of consistent barrier-repair treatment with a gentle pH 5.5 cleanser + Hyaluronic Acid + ceramides + B5 + SPF 50 regimen, with NO active ingredients. Show: reduced redness and inflammation, plumper hydrated skin, calmer complexion, smaller-appearing pores from improved hydration, healthier glow. Critical: keep identity, ethnicity, age, hair, lighting, framing, and pose IDENTICAL. The goal is calmer, more hydrated, less reactive skin — not dramatic transformation.';
  const FREE_SHIP_MIN = 4000;

  let bundleInCart = false;
  let crossSellCart = {};
  let uploadedImageBlob = null;
  let uploadedImageURL = null;
  let lastAiSessionId = null;

  function renderCrossSell() {
    const grid = document.getElementById('crossSellGrid');
    grid.innerHTML = CROSS_SELLS.map((cs, i) => {
      const p = PRODUCTS[cs.sku];
      const added = crossSellCart[cs.sku];
      return `
        <article class="cs-card ${added ? 'added' : ''}" id="cs-${cs.sku}">
          <div class="cs-image${p.image ? '' : ' empty'}">
            ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy" />` : ''}
          </div>
          <div class="cs-num">0${i+5}</div>
          <div class="cs-name">${p.name}</div>
          <p class="cs-why">${cs.why}</p>
          <div class="cs-row">
            <span class="cs-price">Rs. ${p.price.toLocaleString()}</span>
            <button class="cs-add" onclick="toggleCrossSell('${cs.sku}')">${added ? '✓ Added' : '+ Add'}</button>
          </div>
        </article>
      `;
    }).join('');
  }
  function toggleCrossSell(sku) {
    if (crossSellCart[sku]) delete crossSellCart[sku];
    else crossSellCart[sku] = true;
    renderCrossSell(); renderCart();
  }
  function addBundleToCart() {
    bundleInCart = true;
    renderCart();
    window.dispatchEvent(new CustomEvent('clarte:add-bundle', { detail: { slug: BUNDLE.sku } }));
  }  (window as any).addBundleToCart = addBundleToCart;
  (window as any).toggleCrossSell = toggleCrossSell;


  function renderCart() {
    const items = [];
    if (bundleInCart) items.push({ name: BUNDLE.name + ' · 4-product kit', qty: 1, price: BUNDLE.price, listPrice: BUNDLE.listSum });
    Object.keys(crossSellCart).forEach(sku => { const p = PRODUCTS[sku]; items.push({ name: p.name, qty: 1, price: p.price, listPrice: p.list }); });
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const listSubtotal = items.reduce((s, i) => s + (i.listPrice || i.price) * i.qty, 0);
    const discount = listSubtotal - subtotal;
    const freeShip = subtotal >= FREE_SHIP_MIN;
    const shipping = items.length === 0 ? 0 : (freeShip ? 0 : 250);
    const total = subtotal + shipping;

    const sumEl = document.getElementById('summaryItems');
    if (items.length === 0) {
      sumEl.innerHTML = `<p style="color:rgba(255,255,255,0.55); font-family: 'Fraunces',serif; font-style: italic; font-size:14px; text-align:center; padding:18px 0;">Add the Barrier Protocol to begin.</p>`;
    } else {
      sumEl.innerHTML = items.map(i => `
        <div class="ci">
          <div class="ci-name">${i.name}</div>
          <div class="ci-q">×${i.qty}</div>
          <div class="ci-p">Rs. ${(i.price * i.qty).toLocaleString()}</div>
        </div>
      `).join('');
    }
    document.getElementById('sumSubtotal').textContent = 'Rs. ' + subtotal.toLocaleString();
    const dr = document.getElementById('sumDiscountRow');
    if (discount > 0) { dr.classList.remove('hide'); document.getElementById('sumDiscountAmt').textContent = '−Rs. ' + discount.toLocaleString(); }
    else dr.classList.add('hide');
    document.getElementById('sumShipping').textContent = items.length === 0 ? '—' : (freeShip ? 'FREE' : 'Rs. 250');
    document.getElementById('sumTotal').textContent = 'Rs. ' + total.toLocaleString();
  }

  const STAGES = ['stageEmpty', 'stageUploaded', 'stageLoading', 'stageResult', 'stageError'];
  function showStage(id) { STAGES.forEach(s => document.getElementById(s).classList.toggle('hide', s !== id)); }

  const fileInput = document.getElementById('fileInput');
  const cameraInput = document.getElementById('cameraInput');
  const dropzone = document.getElementById('dropzone');
  // Labels with `for=` fire the input natively (preserves `capture` on mobile).
  // We only stop propagation so the dropzone's own click handler doesn't re-fire fileInput.
  document.getElementById('btnUpload').addEventListener('click', e => e.stopPropagation());
  document.getElementById('btnCamera').addEventListener('click', e => e.stopPropagation());
  document.getElementById('btnReplace').addEventListener('click', () => { resetUpload(); fileInput.click(); });
  document.getElementById('btnTryAgain').addEventListener('click', () => { resetUpload(); showStage('stageEmpty'); });
  document.getElementById('btnRetry').addEventListener('click', () => showStage('stageUploaded'));
  dropzone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', e => handleFile(e.target.files[0]));
  cameraInput.addEventListener('change', e => handleFile(e.target.files[0]));
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('drag'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag'));
  dropzone.addEventListener('drop', e => { e.preventDefault(); dropzone.classList.remove('drag'); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });

  function handleFile(file) {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { alert('File too large — please use an image under 8 MB.'); return; }
    if (!file.type.startsWith('image/')) { alert('Please submit an image (JPG, PNG, or WEBP).'); return; }
    uploadedImageBlob = file;
    if (uploadedImageURL) URL.revokeObjectURL(uploadedImageURL);
    uploadedImageURL = URL.createObjectURL(file);
    document.getElementById('previewImg').src = uploadedImageURL;
    document.getElementById('consent').checked = false;
    setGenerateEnabled(false);
    showStage('stageUploaded');
  }
  function resetUpload() {
    uploadedImageBlob = null;
    if (uploadedImageURL) { URL.revokeObjectURL(uploadedImageURL); uploadedImageURL = null; }
    fileInput.value = ''; cameraInput.value = '';
  }

  const consentEl = document.getElementById('consent');
  const btnGenerate = document.getElementById('btnGenerate');
  consentEl.addEventListener('change', () => setGenerateEnabled(consentEl.checked));
  function setGenerateEnabled(on) {
    btnGenerate.disabled = !on;
    btnGenerate.style.opacity = on ? '1' : '0.4';
    btnGenerate.style.cursor = on ? 'pointer' : 'not-allowed';
  }
  btnGenerate.addEventListener('click', startGeneration);

  const USE_MOCK = false;
  const AI_ENDPOINT = '/api/generate-after';
  const ORDER_ENDPOINT = '/api/create-order';

  const PROGRESS_STEPS = [
    { pct: 12, msg: 'Reading texture, tone, and inflammation markers…' },
    { pct: 28, msg: 'Mapping breakout topography…' },
    { pct: 46, msg: 'Modelling niacinamide and azelaic response…' },
    { pct: 64, msg: 'Projecting twelve-week dermal renewal…' },
    { pct: 80, msg: 'Reconstructing barrier function and hydration…' },
    { pct: 94, msg: 'Finalising the projection…' },
    { pct: 100, msg: 'Almost there…' },
  ];

  async function startGeneration() {
    if (!uploadedImageBlob) return;
    showStage('stageLoading');
    const fill = document.getElementById('progressFill');
    const msg = document.getElementById('progressMsg');
    let stepI = 0;
    const tick = setInterval(() => {
      if (stepI >= PROGRESS_STEPS.length) { clearInterval(tick); return; }
      const step = PROGRESS_STEPS[stepI++];
      fill.style.width = step.pct + '%';
      msg.style.opacity = 0;
      setTimeout(() => { msg.textContent = step.msg; msg.style.opacity = 1; }, 200);
    }, 2400);
    try {
      const afterUrl = USE_MOCK ? await mockGenerate(uploadedImageBlob) : await realGenerate(uploadedImageBlob);
      clearInterval(tick);
      document.getElementById('imgBefore').src = uploadedImageURL;
      document.getElementById('imgAfter').src = afterUrl;
      setupCompareSlider();
      showStage('stageResult');
    } catch (err) {
      clearInterval(tick); console.error(err);
      document.getElementById('errorMsg').textContent = err.message || 'We couldn\'t generate your preview. Please submit a clearer, front-facing photograph in even light.';
      showStage('stageError');
    }
  }

  function mockGenerate(blob) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const latency = 18000 + Math.random() * 4000;
        setTimeout(() => {
          try {
            const canvas = document.createElement('canvas');
            const maxW = 1024;
            const scale = Math.min(1, maxW / img.width);
            canvas.width = img.width * scale; canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            ctx.filter = 'brightness(1.06) contrast(0.96) saturate(1.07) blur(0.4px)';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';
            ctx.globalCompositeOperation = 'overlay';
            ctx.fillStyle = 'rgba(255, 240, 220, 0.06)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';
            resolve(canvas.toDataURL('image/jpeg', 0.92));
          } catch (e) { reject(e); }
        }, latency);
      };
      img.onerror = () => reject(new Error('Could not read your image. Please try a different file.'));
      img.src = URL.createObjectURL(blob);
    });
  }
  async function realGenerate(blob) {
    const base64 = await blobToBase64(blob);
    const res = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_base64: base64, mime_type: blob.type, concern: CONCERN, prompt: AI_PROMPT }),
    });
    if (!res.ok) { const t = await res.text().catch(()=>'' ); throw new Error(`Generation failed (${res.status}). ${t}`); }
    const data = await res.json();
    if (!data.image) throw new Error('No image returned by the AI.');
    if (data.ai_session_id) lastAiSessionId = data.ai_session_id;
    return data.image.startsWith('data:') ? data.image : `data:image/jpeg;base64,${data.image}`;
  }
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => { const result = r.result; const c = result.indexOf(','); resolve(c > -1 ? result.slice(c+1) : result); };
      r.onerror = reject; r.readAsDataURL(blob);
    });
  }
  function setupCompareSlider() {
    const compare = document.getElementById('compare');
    const before = document.getElementById('imgBefore');
    const handle = document.getElementById('handle');
    let dragging = false;
    function update(x) {
      const rect = compare.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    }
    function onDown(e) { dragging = true; const x = e.touches ? e.touches[0].clientX : e.clientX; update(x); }
    function onMove(e) { if (!dragging) return; const x = e.touches ? e.touches[0].clientX : e.clientX; update(x); }
    function onUp() { dragging = false; }
    compare.addEventListener('mousedown', onDown);
    compare.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
  }

  function showOrderError(msg) {
    let el = document.getElementById('orderError');
    if (!el) {
      el = document.createElement('div');
      el.id = 'orderError';
      el.style.cssText = 'margin-top:12px; padding:12px 14px; border:1px solid #c0392b; background:#fdecea; color:#922; border-radius:10px; font-size:14px; line-height:1.5;';
      const btn = document.getElementById('submitBtn');
      btn.parentNode.insertBefore(el, btn.nextSibling);
    }
    el.textContent = msg;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function clearOrderError() {
    const el = document.getElementById('orderError');
    if (el) el.remove();
  }

  document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!bundleInCart && Object.keys(crossSellCart).length === 0) { alert('Your bundle is empty. Please add the Barrier Protocol to continue.'); return; }
    const fd = new FormData(e.target);
    const items = [];
    if (bundleInCart) items.push({ sku: BUNDLE.sku, name: BUNDLE.name, qty: 1, price: BUNDLE.price });
    Object.keys(crossSellCart).forEach(sku => { const p = PRODUCTS[sku]; items.push({ sku, name: p.name, qty: 1, price: p.price }); });
    const subtotal = items.reduce((s, i) => s + i.price, 0);
    const freeShip = subtotal >= FREE_SHIP_MIN;
    const payload = {
      concern: CONCERN, page: 'barrier-protocol',
      contact: { name: fd.get('name'), phone: fd.get('phone'), email: fd.get('email') },
      shipping: { address: fd.get('address'), city: fd.get('city'), postal: fd.get('postal'), notes: fd.get('notes') },
      payment: fd.get('pay'),
      items,
      totals: { subtotal, shipping: freeShip ? 0 : 250, total: subtotal + (freeShip ? 0 : 250) },
      bundle_in_cart: bundleInCart, used_ai_preview: !!uploadedImageBlob,
      ts: new Date().toISOString(),
      ai_session_id: lastAiSessionId || undefined,
    };

    const btn = document.getElementById('submitBtn');
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'wait';
    btn.textContent = 'Placing order…';
    clearOrderError();

    try {
      const res = await fetch(ORDER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        const msg = data.error || `We couldn't place your order (status ${res.status}). Please try again, or WhatsApp us and we'll take it manually.`;
        showOrderError(msg);
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.cursor = '';
        btn.textContent = originalLabel;
        return;
      }
      document.getElementById('intakeGrid').classList.add('hide');
      document.getElementById('successBlock').classList.add('show');
      document.getElementById('successBlock').scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      showOrderError("Network issue — we couldn't reach the order system. Please check your connection and try again, or WhatsApp us.");
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.cursor = '';
      btn.textContent = originalLabel;
    }
  });

  function renderRxStrip() {
    const strip = document.getElementById('rxStrip');
    if (!strip) return;
    strip.innerHTML = BUNDLE.items.map(sku => {
      const p = PRODUCTS[sku];
      if (!p || !p.image) return `<div class="rx-strip-tile empty" aria-hidden="true"></div>`;
      return `<div class="rx-strip-tile"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>`;
    }).join('');
  }

  (function initStickyCta() {
    const el = document.getElementById('stickyCta');
    const intake = document.getElementById('intake');
    if (!el || !intake) return;
    const hero = document.querySelector('.hero');
    function update() {
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      const intakeTop = intake.getBoundingClientRect().top;
      const past = heroBottom < 80;
      const beforeIntake = intakeTop > window.innerHeight * 0.5;
      if (past && beforeIntake) el.classList.add('show');
      else el.classList.remove('show');
      el.setAttribute('aria-hidden', el.classList.contains('show') ? 'false' : 'true');
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  renderRxStrip();
  renderCrossSell();
  renderCart();
  }, []);

  return null;
}
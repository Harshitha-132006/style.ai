    // ── Custom Cursor ──────────────────────────────────────────────────────────
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    // ── Navbar scroll ─────────────────────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── Marquee setup ─────────────────────────────────────────────────────────
    const marqueeItems = [
      'AI-Powered Styling', 'Personalised Outfits', 'Trend Intelligence',
      'Vision Analysis', 'Colour Theory', 'Occasion Dressing',
      'Body-Type Fit', 'Curated Shopping', 'Style DNA Profiling',
    ];

    const track = document.getElementById('marqueeTrack');
    const allItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];
    track.innerHTML = allItems.map(item => `
      <span class="marquee-item">
        <span class="marquee-dot"></span>${item}
      </span>`).join('');

    // ── Scroll Reveal ─────────────────────────────────────────────────────────
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── Image Upload ──────────────────────────────────────────────────────────
    function handleFileSelect(input) {
      const file = input.files[0];
      if (!file) return;
      const box = document.getElementById('uploadBox');
      const reader = new FileReader();
      reader.onload = e => {
        box.innerHTML = `
          <img src="${e.target.result}" style="width:100%;height:140px;object-fit:cover;border-radius:2px;" />
          <div style="font-size:11px;color:var(--gold);margin-top:8px;text-align:center;">✓ ${file.name}</div>`;
      };
      reader.readAsDataURL(file);
    }

    // ── Demo Recommendation ───────────────────────────────────────────────────
    const loadingTexts = [
      'Consulting the style archives…',
      'Analysing your colour profile…',
      'Matching to current trends…',
      'Curating your perfect look…',
      'Adding final styling touches…',
    ];

    const demoOutfits = {
      "Casual": {
        headline: "The <em>Effortless Weekend</em> Edit",
        mantra: "Style is wearing what you love, the way only you can.",
        score: 93,
        pieces: [
          { icon:"👕", label:"Top", name:"Oversized linen shirt, off-white", why:"Breathable and effortlessly relaxed" },
          { icon:"👖", label:"Bottom", name:"Straight-leg dark denim", why:"The perfect casual-smart crossover" },
          { icon:"👟", label:"Shoes", name:"White leather low-top sneakers", why:"Clean, versatile, and timeless" },
          { icon:"✨", label:"Accessories", name:"Canvas tote + gold watch", why:"Functional meets understated luxe" },
        ],
        palette: [["#c9a84c","Gold"],["#f5f0e8","Ivory"],["#2b2b2b","Charcoal"],["#8b7355","Tan"]],
        tips: ["Tuck shirt loosely at front only for shape", "Roll sleeves for a casual, editorial look", "Keep jewellery minimal — one piece per zone"],
      },
      "Work / Office": {
        headline: "The <em>Power Dressing</em> Blueprint",
        mantra: "Command every room before you say a word.",
        score: 96,
        pieces: [
          { icon:"🧥", label:"Top", name:"Structured blazer, deep navy", why:"Authority and polish in one layer" },
          { icon:"👖", label:"Bottom", name:"Tailored wide-leg trousers, camel", why:"Modern silhouette that photographs beautifully" },
          { icon:"👟", label:"Shoes", name:"Pointed-toe loafers, cognac leather", why:"Grounds the outfit with sophistication" },
          { icon:"✨", label:"Accessories", name:"Slim leather folio + gold stud earrings", why:"Professional detail that elevates the whole look" },
        ],
        palette: [["#1a237e","Navy"],["#c9a84c","Gold"],["#bf8c40","Cognac"],["#f5f0e8","Cream"]],
        tips: ["A monochrome base lets accessories do the talking", "Tailoring is everything — invest in the right fit", "Match your belt to your shoes for a polished finish"],
      },
      "Date Night": {
        headline: "The <em>Evening Allure</em> Moment",
        mantra: "Dress for the story you want to tell.",
        score: 97,
        pieces: [
          { icon:"👗", label:"Dress", name:"Slip midi dress, champagne satin", why:"Effortlessly glamorous without trying too hard" },
          { icon:"👟", label:"Shoes", name:"Strappy heeled sandals, gold", why:"Adds height and catches the light beautifully" },
          { icon:"👜", label:"Bag", name:"Micro leather clutch, black", why:"Statement piece that contrasts the softness" },
          { icon:"✨", label:"Accessories", name:"Delicate chain necklace + ear cuffs", why:"Layered metallics for modern romance" },
        ],
        palette: [["#e8c97a","Champagne"],["#c9a84c","Gold"],["#1a1a1a","Onyx"],["#d4a5a5","Blush"]],
        tips: ["Let the fabric move — choose a silhouette with drape", "A bold lip replaces the need for extra jewellery", "Evening scent is the invisible accessory"],
      },
    };

    function generateRecommendation() {
      const occasion = document.getElementById('f-occasion').value;
      const gender   = document.getElementById('f-gender').value;

      const defEl  = document.getElementById('outputDefault');
      const loadEl = document.getElementById('outputLoading');
      const resEl  = document.getElementById('outputResult');

      defEl.style.display  = 'none';
      loadEl.style.display = 'flex';
      resEl.style.display  = 'none';

      let i = 0;
      const ltEl = document.getElementById('loadingText');
      const interval = setInterval(() => {
        i = (i + 1) % loadingTexts.length;
        ltEl.textContent = loadingTexts[i];
      }, 1400);

      setTimeout(() => {
        clearInterval(interval);
        loadEl.style.display = 'none';
        resEl.style.display  = 'block';

        const data = demoOutfits[occasion] || demoOutfits["Casual"];
        populateResult(data);
      }, 3200);
    }

    function populateResult(data) {
      document.getElementById('res-headline').innerHTML = data.headline;
      document.getElementById('res-mantra').textContent  = `"${data.mantra}"`;
      document.getElementById('res-score').textContent   = data.score;

      // Pieces
      const outfitEl = document.getElementById('res-outfit');
      outfitEl.innerHTML = data.pieces.map(p => `
        <div class="outfit-piece">
          <div class="piece-label">${p.icon} ${p.label}</div>
          <div class="piece-name">${p.name}</div>
          <div class="piece-why">${p.why}</div>
        </div>`).join('');

      // Palette
      const palEl = document.getElementById('res-palette');
      palEl.innerHTML = data.palette.map(([hex, name]) => `
        <div class="out-swatch" style="background:${hex};">
          <div class="out-swatch-name">${name}</div>
        </div>`).join('');

      // Tips
      document.getElementById('res-tips').innerHTML = `
        <strong style="color:var(--ivory);font-size:11px;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:8px;">💡 Styling Tips</strong>
        ${data.tips.map(t => `✦ ${t}`).join('<br>')}`;
    }

    // ── Drag over upload box ──────────────────────────────────────────────────
    const uploadBox = document.getElementById('uploadBox');
    if (uploadBox) {
      uploadBox.addEventListener('dragover', e => {
        e.preventDefault();
        uploadBox.style.borderColor = 'var(--gold)';
        uploadBox.style.background  = 'rgba(201,168,76,0.06)';
      });
      uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.borderColor = '';
        uploadBox.style.background  = '';
      });
      uploadBox.addEventListener('drop', e => {
        e.preventDefault();
        uploadBox.style.borderColor = '';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          const dt = new DataTransfer();
          dt.items.add(file);
          document.getElementById('fileInput').files = dt.files;
          handleFileSelect(document.getElementById('fileInput'));
        }
      });
    }

    // ── Smooth anchor scroll ──────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

/**
 * AgroGuía - Lógica de Aplicación (JavaScript ES6+ Vanilla)
 * SPA Router, Calculadoras Agrícolas, Cuaderno de Campo (CRUD + LocalStorage),
 * Buscador de Cultivos/Plagas y Sistema de Temas.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouter();
  initWeatherSimulation();
  initCropsModule();
  initPestsModule();
  initCalculatorsModule();
  initNotebookModule();
  initCalendarModule();
  initModals();
  updateDashboardMetrics();
});

/* ==========================================================================
   1. GESTIÓN DE TEMA (CLARO / OSCURO)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('agroguia_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('agroguia_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
}

/* ==========================================================================
   2. ENRUTADOR SPA (SINGLE PAGE APPLICATION)
   ========================================================================== */
function initRouter() {
  const navLinks = document.querySelectorAll('[data-view-target]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view-target');
      navigateToView(targetView);
    });
  });

  // Manejo de hash en la URL
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    navigateToView(hash, false);
  });

  // Inicializar en la vista adecuada
  const initialHash = window.location.hash.replace('#', '') || 'dashboard';
  navigateToView(initialHash, false);
}

function navigateToView(viewId, updateHash = true) {
  const views = document.querySelectorAll('.spa-view');
  const targetElement = document.getElementById(`view-${viewId}`);
  
  if (!targetElement) return;

  views.forEach(v => v.classList.remove('active'));
  targetElement.classList.add('active');

  // Actualizar estado de links activos
  document.querySelectorAll('[data-view-target]').forEach(link => {
    if (link.getAttribute('data-view-target') === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  if (updateHash) {
    window.location.hash = viewId;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   3. SIMULADOR DE CLIMA Y ALERTAS AGRÍCOLAS
   ========================================================================== */
function initWeatherSimulation() {
  const weatherTips = [
    "Condición óptima para labores de abonado foliar y monitoreo.",
    "Humedad relativa moderada: baja presión de hongos en follaje.",
    "Vientos suaves (8 km/h): excelente ventana para pulverizaciones.",
    "Radiación solar intensa: supervise la hidratación de plántulas en vivero.",
    "Rocío matutino alto: postergue el corte de forraje hasta el mediodía."
  ];

  const randomTip = weatherTips[Math.floor(Math.random() * weatherTips.length)];
  const weatherTipEl = document.getElementById('weatherDailyTip');
  if (weatherTipEl) {
    weatherTipEl.textContent = `💡 Consejo agronómico: ${randomTip}`;
  }
}

/* ==========================================================================
   4. MÓDULO DE CULTIVOS (CATÁLOGO, BÚSQUEDA Y DETALLES)
   ========================================================================== */
function initCropsModule() {
  const cropsContainer = document.getElementById('cropsGridContainer');
  const searchInput = document.getElementById('cropSearchInput');
  const categoryPills = document.querySelectorAll('#cropCategoryFilter .pill-btn');

  let currentCategory = 'all';
  let searchTerm = '';

  function renderCrops() {
    if (!cropsContainer) return;

    const filtered = AGRO_DATA.crops.filter(crop => {
      const matchesCategory = currentCategory === 'all' || crop.category === currentCategory;
      const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            crop.family.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            crop.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      cropsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🌾</div>
          <h4>No se encontraron cultivos</h4>
          <p>Prueba con otros términos de búsqueda o selecciona otra categoría.</p>
        </div>
      `;
      return;
    }

    cropsContainer.innerHTML = filtered.map(crop => `
      <div class="crop-card" onclick="openCropModal('${crop.id}')">
        <div>
          <div class="crop-card-top">
            <span class="crop-card-icon">${crop.icon}</span>
            <span class="badge badge-green">${crop.category.toUpperCase()}</span>
          </div>
          <h3 class="crop-title">${crop.name}</h3>
          <p class="crop-family">Familia: ${crop.family}</p>
          
          <div class="crop-specs-mini">
            <div class="spec-mini-item">
              <span class="label">🌡️ Temp. Óptima</span>
              <span class="value">${crop.optimalTemp}</span>
            </div>
            <div class="spec-mini-item">
              <span class="label">🧪 pH Ideal</span>
              <span class="value">${crop.idealPh}</span>
            </div>
            <div class="spec-mini-item">
              <span class="label">⏱️ Ciclo Cosecha</span>
              <span class="value">${crop.cycleDays}</span>
            </div>
            <div class="spec-mini-item">
              <span class="label">💧 Demanda Agua</span>
              <span class="value">${crop.waterRequirement.split('(')[0]}</span>
            </div>
          </div>
        </div>
        
        <button class="btn btn-outline" style="width: 100%; margin-top: 0.5rem;">
          Ver Ficha Técnica Completa →
        </button>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderCrops();
    });
  }

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      renderCrops();
    });
  });

  renderCrops();
}

window.openCropModal = function(cropId) {
  const crop = AGRO_DATA.crops.find(c => c.id === cropId);
  if (!crop) return;

  const modalTitle = document.getElementById('genericModalTitle');
  const modalBody = document.getElementById('genericModalBody');

  modalTitle.innerHTML = `<span style="font-size: 1.6rem; margin-right: 0.5rem;">${crop.icon}</span> ${crop.name}`;
  
  modalBody.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <p style="font-size: 1rem; line-height: 1.5; color: var(--text-primary);">
        ${crop.description}
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: var(--bg-card-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <div>
          <strong style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">🌱 Suelo recomendado:</strong>
          <p style="font-weight: 600; margin-top: 0.2rem;">${crop.soilType}</p>
        </div>
        <div>
          <strong style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">🧪 Rango de pH:</strong>
          <p style="font-weight: 600; margin-top: 0.2rem;">${crop.idealPh}</p>
        </div>
        <div>
          <strong style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">📏 Densidad y marco:</strong>
          <p style="font-weight: 600; margin-top: 0.2rem;">${crop.sowingDensity}</p>
          <small style="color: var(--text-muted);">Surco: ${crop.rowSpacing} | Planta: ${crop.plantSpacing}</small>
        </div>
        <div>
          <strong style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">🌾 Rendimiento estimado:</strong>
          <p style="font-weight: 600; margin-top: 0.2rem;">${crop.expectedYield}</p>
        </div>
      </div>

      <div>
        <h4 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--primary-700);">🎯 Cuidados Clave y Manejo:</h4>
        <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; color: var(--text-secondary);">
          ${crop.keyCare.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>

      <div style="background: var(--primary-100); padding: 0.85rem 1rem; border-radius: var(--radius-sm); color: var(--primary-800); font-size: 0.88rem;">
        <strong>🧪 Requerimiento Nutricional Base (N-P-K):</strong> ${crop.npkRatio}
      </div>
    </div>
  `;

  openModal('genericModal');
};

/* ==========================================================================
   5. MÓDULO DE PLAGAS Y ENFERMEDADES
   ========================================================================== */
function initPestsModule() {
  const pestsContainer = document.getElementById('pestsGridContainer');
  const searchInput = document.getElementById('pestSearchInput');
  const typePills = document.querySelectorAll('#pestTypeFilter .pill-btn');

  let currentType = 'all';
  let searchTerm = '';

  function renderPests() {
    if (!pestsContainer) return;

    const filtered = AGRO_DATA.pestsAndDiseases.filter(item => {
      const matchesType = currentType === 'all' || item.type === currentType;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.affectedCrops.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesType && matchesSearch;
    });

    if (filtered.length === 0) {
      pestsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🔬</div>
          <h4>No se encontraron coincidencias</h4>
          <p>Intenta buscar por el nombre de la plaga, síntoma o cultivo afectado.</p>
        </div>
      `;
      return;
    }

    pestsContainer.innerHTML = filtered.map(item => `
      <div class="pest-card">
        <div class="pest-header">
          <div class="pest-icon">${item.icon}</div>
          <div>
            <div style="display: flex; gap: 0.4rem; margin-bottom: 0.25rem;">
              <span class="badge ${item.type === 'plaga' ? 'badge-amber' : 'badge-purple'}">
                ${item.type.toUpperCase()}
              </span>
              <span class="badge badge-green">${item.category}</span>
            </div>
            <h3 style="font-size: 1.15rem;">${item.name}</h3>
          </div>
        </div>

        <div style="margin-bottom: 0.85rem; font-size: 0.82rem;">
          <strong style="color: var(--text-muted);">Cultivos atacados:</strong>
          <span style="font-weight: 600; color: var(--text-primary);"> ${item.affectedCrops.join(', ')}</span>
        </div>

        <div class="pest-symptoms">
          <strong style="color: var(--accent-red); display: block; margin-bottom: 0.2rem;">⚠️ Síntomas visibles:</strong>
          ${item.symptoms}
        </div>

        <div class="treatment-tabs">
          <div class="treatment-block">
            <h5 style="color: #059669;">🌿 Control Agroecológico / Orgánico</h5>
            <ul>
              ${item.organicTreatment.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>

          <div class="treatment-block" style="margin-top: 0.85rem;">
            <h5 style="color: #d97706;">🔬 Manejo Fitosanitario / Químico</h5>
            <ul>
              ${item.chemicalTreatment.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderPests();
    });
  }

  typePills.forEach(pill => {
    pill.addEventListener('click', () => {
      typePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentType = pill.getAttribute('data-type');
      renderPests();
    });
  });

  renderPests();
}

/* ==========================================================================
   6. SUITE DE CALCULADORAS AGRÍCOLAS
   ========================================================================== */
function initCalculatorsModule() {
  const calcTabs = document.querySelectorAll('.calc-tab-btn');
  const calcContainers = document.querySelectorAll('.calc-container');

  calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-calc-target');
      
      calcTabs.forEach(t => t.classList.remove('active'));
      calcContainers.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const activeCalc = document.getElementById(`calc-${targetId}`);
      if (activeCalc) activeCalc.classList.add('active');
    });
  });

  // 1. Calculadora de Densidad de Siembra
  const calcDensityForm = document.getElementById('calcDensityForm');
  if (calcDensityForm) {
    const runDensityCalc = () => {
      const area = parseFloat(document.getElementById('densityArea').value) || 0;
      const areaUnit = document.getElementById('densityAreaUnit').value;
      const rowSpacing = parseFloat(document.getElementById('densityRowSpacing').value) || 0;
      const plantSpacing = parseFloat(document.getElementById('densityPlantSpacing').value) || 0;
      const seedsPerHole = parseInt(document.getElementById('densitySeedsPerHole').value) || 1;
      const marginLoss = parseFloat(document.getElementById('densityMargin').value) || 10;

      // Normalizar área a m²
      const areaM2 = areaUnit === 'ha' ? area * 10000 : (areaUnit === 'mzn' ? area * 7000 : area);

      if (areaM2 <= 0 || rowSpacing <= 0 || plantSpacing <= 0) return;

      const areaPerPlant = (rowSpacing / 100) * (plantSpacing / 100);
      const totalPlants = Math.floor(areaM2 / areaPerPlant);
      const baseSeeds = totalPlants * seedsPerHole;
      const totalSeedsWithMargin = Math.ceil(baseSeeds * (1 + marginLoss / 100));
      const plantsPerM2 = (totalPlants / areaM2).toFixed(2);

      document.getElementById('resDensityTotalPlants').textContent = totalPlants.toLocaleString('es-ES');
      document.getElementById('resDensityTotalSeeds').textContent = `${totalSeedsWithMargin.toLocaleString('es-ES')} semillas`;
      document.getElementById('resDensityPerM2').textContent = `${plantsPerM2} pl/m²`;
      document.getElementById('resDensityAreaM2').textContent = `${areaM2.toLocaleString('es-ES')} m²`;
    };

    calcDensityForm.addEventListener('input', runDensityCalc);
    runDensityCalc();
  }

  // 2. Calculadora de Riego y Demanda Hídrica
  const calcIrrigationForm = document.getElementById('calcIrrigationForm');
  if (calcIrrigationForm) {
    const runIrrigationCalc = () => {
      const area = parseFloat(document.getElementById('irrigArea').value) || 0;
      const etc = parseFloat(document.getElementById('irrigEtc').value) || 5; // mm/día
      const soilType = document.getElementById('irrigSoilType').value;
      const efficiency = parseFloat(document.getElementById('irrigEfficiency').value) || 90; // %
      const emitterFlow = parseFloat(document.getElementById('irrigEmitterFlow').value) || 2; // L/h

      const soilFactor = AGRO_DATA.calculatorTemplates.soilFactors[soilType]?.waterFactor || 1.0;

      // 1 mm de lámina de agua sobre 1 m² = 1 Litro de agua
      const grossWaterLitersPerM2 = (etc * soilFactor) / (efficiency / 100);
      const totalLitersDay = Math.round(area * grossWaterLitersPerM2);
      const totalM3Day = (totalLitersDay / 1000).toFixed(2);
      const emitterHours = ((grossWaterLitersPerM2 / emitterFlow)).toFixed(1);

      document.getElementById('resIrrigTotalLiters').textContent = `${totalLitersDay.toLocaleString('es-ES')} L/día`;
      document.getElementById('resIrrigVolumeM3').textContent = `${totalM3Day} m³`;
      document.getElementById('resIrrigPerM2').textContent = `${grossWaterLitersPerM2.toFixed(1)} L/m²`;
      document.getElementById('resIrrigTimeEst').textContent = `~${emitterHours} hrs por sector`;
    };

    calcIrrigationForm.addEventListener('input', runIrrigationCalc);
    runIrrigationCalc();
  }

  // 3. Calculadora de Fertilización NPK
  const calcNpkForm = document.getElementById('calcNpkForm');
  if (calcNpkForm) {
    const runNpkCalc = () => {
      const areaHa = parseFloat(document.getElementById('npkArea').value) || 1;
      const reqN = parseFloat(document.getElementById('npkReqN').value) || 0;
      const reqP = parseFloat(document.getElementById('npkReqP').value) || 0;
      const reqK = parseFloat(document.getElementById('npkReqK').value) || 0;

      // Cálculo clásico de formulación simple:
      // 1. Cubrir P con DAP (18-46-0)
      const kgDap = reqP > 0 ? (reqP / 0.46) * areaHa : 0;
      const nFromDap = kgDap * 0.18;

      // 2. Cubrir N restante con Urea (46-0-0)
      const remainingN = Math.max(0, (reqN * areaHa) - nFromDap);
      const kgUrea = (remainingN / 0.46);

      // 3. Cubrir K con Cloruro de Potasio KCl (0-0-60)
      const kgKcl = reqK > 0 ? (reqK / 0.60) * areaHa : 0;

      const totalKgFertilizer = Math.round(kgDap + kgUrea + kgKcl);
      const sacks50Kg = Math.ceil(totalKgFertilizer / 50);

      document.getElementById('resNpkTotalKg').textContent = `${totalKgFertilizer.toLocaleString('es-ES')} kg`;
      document.getElementById('resNpkUrea').textContent = `${Math.round(kgUrea)} kg (~${Math.ceil(kgUrea/50)} sacos)`;
      document.getElementById('resNpkDap').textContent = `${Math.round(kgDap)} kg (~${Math.ceil(kgDap/50)} sacos)`;
      document.getElementById('resNpkKcl').textContent = `${Math.round(kgKcl)} kg (~${Math.ceil(kgKcl/50)} sacos)`;
      document.getElementById('resNpkSacks').textContent = `${sacks50Kg} sacos de 50kg`;
    };

    calcNpkForm.addEventListener('input', runNpkCalc);
    runNpkCalc();
  }

  // 4. Calculadora de Estimación de Cosecha
  const calcYieldForm = document.getElementById('calcYieldForm');
  if (calcYieldForm) {
    const runYieldCalc = () => {
      const totalPlants = parseFloat(document.getElementById('yieldPlants').value) || 0;
      const fruitsPerPlant = parseFloat(document.getElementById('yieldFruitsPerPlant').value) || 0;
      const avgWeightGr = parseFloat(document.getElementById('yieldAvgWeightGr').value) || 0;
      const pricePerKg = parseFloat(document.getElementById('yieldPricePerKg').value) || 0;

      const totalKg = (totalPlants * fruitsPerPlant * (avgWeightGr / 1000));
      const totalTon = (totalKg / 1000).toFixed(2);
      const grossIncome = (totalKg * pricePerKg).toLocaleString('es-ES', { style: 'currency', currency: 'USD' });

      document.getElementById('resYieldTotalKg').textContent = `${Math.round(totalKg).toLocaleString('es-ES')} kg`;
      document.getElementById('resYieldTotalTon').textContent = `${totalTon} Toneladas`;
      document.getElementById('resYieldIncome').textContent = grossIncome;
    };

    calcYieldForm.addEventListener('input', runYieldCalc);
    runYieldCalc();
  }
}

/* ==========================================================================
   7. CUADERNO DE CAMPO / BITÁCORA (CRUD + LOCALSTORAGE)
   ========================================================================== */
function initNotebookModule() {
  const notebookTableBody = document.getElementById('notebookTableBody');
  const addRecordForm = document.getElementById('addRecordForm');
  const filterLotSelect = document.getElementById('notebookLotFilter');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const printReportBtn = document.getElementById('printReportBtn');

  const defaultRecords = [
    {
      id: "rec-1",
      date: new Date().toISOString().split('T')[0],
      lot: "Lote 1 - Valle Norte",
      crop: "Maíz",
      activity: "Siembra",
      details: "Siembra con semilla certificada y fertilización de arranque DAP.",
      cost: 150,
      status: "completado"
    },
    {
      id: "rec-2",
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      lot: "Lote 2 - La Esperanza",
      crop: "Tomate",
      activity: "Fumigación",
      details: "Aplicación preventiva de Bacillus thuringiensis + Caldo Bordelés.",
      cost: 45,
      status: "pendiente"
    }
  ];

  function getRecords() {
    const saved = localStorage.getItem('agroguia_records');
    if (!saved) {
      localStorage.setItem('agroguia_records', JSON.stringify(defaultRecords));
      return defaultRecords;
    }
    try {
      return JSON.parse(saved);
    } catch {
      return defaultRecords;
    }
  }

  function saveRecords(records) {
    localStorage.setItem('agroguia_records', JSON.stringify(records));
    renderRecords();
    updateDashboardMetrics();
  }

  function renderRecords() {
    if (!notebookTableBody) return;
    const records = getRecords();
    const currentLotFilter = filterLotSelect ? filterLotSelect.value : 'all';

    const filtered = records.filter(r => currentLotFilter === 'all' || r.lot === currentLotFilter);

    if (filtered.length === 0) {
      notebookTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            <div class="empty-state-icon">📋</div>
            <h4>No hay registros en la bitácora</h4>
            <p>Haz clic en "Nuevo Registro" para agregar actividades de tu finca.</p>
          </td>
        </tr>
      `;
      return;
    }

    notebookTableBody.innerHTML = filtered.map(r => `
      <tr>
        <td><strong>${r.date}</strong></td>
        <td><span class="badge badge-green">${r.lot}</span></td>
        <td><strong>${r.crop || 'Varios'}</strong></td>
        <td>${getActivityBadge(r.activity)}</td>
        <td><small>${r.details}</small></td>
        <td><strong>$${Number(r.cost || 0).toLocaleString()}</strong></td>
        <td>
          <div style="display: flex; gap: 0.4rem; align-items: center;">
            <button class="btn btn-outline" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="toggleRecordStatus('${r.id}')">
              ${r.status === 'completado' ? '✅ Hecho' : '⏳ Pendiente'}
            </button>
            <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="deleteRecord('${r.id}')">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function getActivityBadge(activity) {
    const badges = {
      'Siembra': 'badge-green',
      'Riego': 'badge-blue',
      'Fertilización': 'badge-purple',
      'Fumigación': 'badge-amber',
      'Poda': 'badge-green',
      'Cosecha': 'badge-amber',
      'Otro': 'badge-purple'
    };
    return `<span class="badge ${badges[activity] || 'badge-green'}">${activity}</span>`;
  }

  window.deleteRecord = function(id) {
    if (confirm('¿Estás seguro de eliminar este registro del cuaderno de campo?')) {
      const records = getRecords().filter(r => r.id !== id);
      saveRecords(records);
    }
  };

  window.toggleRecordStatus = function(id) {
    const records = getRecords().map(r => {
      if (r.id === id) {
        return { ...r, status: r.status === 'completado' ? 'pendiente' : 'completado' };
      }
      return r;
    });
    saveRecords(records);
  };

  if (addRecordForm) {
    addRecordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newRec = {
        id: 'rec-' + Date.now(),
        date: document.getElementById('recDate').value || new Date().toISOString().split('T')[0],
        lot: document.getElementById('recLot').value,
        crop: document.getElementById('recCrop').value,
        activity: document.getElementById('recActivity').value,
        details: document.getElementById('recDetails').value,
        cost: parseFloat(document.getElementById('recCost').value) || 0,
        status: document.getElementById('recStatus').value
      };

      const records = getRecords();
      records.unshift(newRec);
      saveRecords(records);
      closeModal('addRecordModal');
      addRecordForm.reset();
    });
  }

  if (filterLotSelect) {
    filterLotSelect.addEventListener('change', renderRecords);
  }

  // Exportar a CSV
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const records = getRecords();
      if (records.length === 0) {
        alert('No hay registros para exportar.');
        return;
      }

      let csv = 'Fecha,Lote,Cultivo,Actividad,Detalles,Costo_USD,Estado\n';
      records.forEach(r => {
        const cleanDetails = (r.details || '').replace(/,/g, ';').replace(/\n/g, ' ');
        csv += `${r.date},"${r.lot}","${r.crop}","${r.activity}","${cleanDetails}",${r.cost},"${r.status}"\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cuaderno_campo_agroguia_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Imprimir reporte
  if (printReportBtn) {
    printReportBtn.addEventListener('click', () => {
      window.print();
    });
  }

  renderRecords();
}

/* ==========================================================================
   8. CALENDARIO ESTACIONAL Y TAREAS
   ========================================================================== */
function initCalendarModule() {
  const calendarContainer = document.getElementById('seasonalCalendarGrid');
  if (!calendarContainer) return;

  calendarContainer.innerHTML = AGRO_DATA.seasonalCalendar.map(season => `
    <div class="season-card">
      <div class="season-card-header">
        <span class="season-icon">${season.icon}</span>
        <div>
          <h3 style="font-size: 1.15rem;">${season.season}</h3>
          <span class="badge badge-amber">${season.months}</span>
        </div>
      </div>
      <p style="font-size: 0.85rem; margin-bottom: 0.85rem; font-weight: 600; color: var(--text-primary);">
        🎯 Enfoque: ${season.focus}
      </p>
      <ul>
        ${season.tasks.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

/* ==========================================================================
   9. ACTUALIZACIÓN DE MÉTRICAS DEL DASHBOARD
   ========================================================================== */
function updateDashboardMetrics() {
  const saved = localStorage.getItem('agroguia_records');
  let records = [];
  try {
    records = saved ? JSON.parse(saved) : [];
  } catch {
    records = [];
  }

  const activeLots = new Set(records.map(r => r.lot)).size;
  const pendingTasks = records.filter(r => r.status === 'pendiente').length;
  const totalExpenses = records.reduce((acc, curr) => acc + (parseFloat(curr.cost) || 0), 0);

  const activeLotsEl = document.getElementById('metricActiveLots');
  const pendingTasksEl = document.getElementById('metricPendingTasks');
  const totalExpensesEl = document.getElementById('metricTotalExpenses');
  const totalCropsEl = document.getElementById('metricTotalCrops');

  if (activeLotsEl) activeLotsEl.textContent = activeLots || 1;
  if (pendingTasksEl) pendingTasksEl.textContent = pendingTasks;
  if (totalExpensesEl) totalExpensesEl.textContent = `$${totalExpenses.toLocaleString()}`;
  if (totalCropsEl) totalCropsEl.textContent = AGRO_DATA.crops.length;
}

/* ==========================================================================
   10. CONTROL DE MODALES
   ========================================================================== */
function initModals() {
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-close');
      closeModal(modalId);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });
}

window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};

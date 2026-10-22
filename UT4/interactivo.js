/**
 * DIW · UT4: Contenido Interactivo
 * Lógica modular para demostraciones de HTMLMediaElement, SVG Dinámico,
 * bucles de animación (requestAnimationFrame), componentes Bootstrap y eventos táctiles.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMediaElementDemo();
  initSvgDynamicDemo();
  initAnimationLoopDemo();
  initBootstrapDemo();
  initTouchDemo();
});

/* ==========================================================================
   01. API HTMLMediaElement (Reproductor personalizado)
   ========================================================================== */
function initMediaElementDemo() {
  const media = document.getElementById('demo-audio-player');
  const btnPlay = document.getElementById('media-btn-play');
  const btnMute = document.getElementById('media-btn-mute');
  const seekBar = document.getElementById('media-seek');
  const volumeBar = document.getElementById('media-volume');
  const timeDisplay = document.getElementById('media-time');
  const statusBadge = document.getElementById('media-status-badge');

  if (!media || !btnPlay) return;

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // Play / Pause toggle
  btnPlay.addEventListener('click', () => {
    if (media.paused) {
      media.play().then(() => {
        btnPlay.textContent = '⏸ Pausar';
        btnPlay.setAttribute('aria-label', 'Pausar reproducción');
        if (statusBadge) statusBadge.textContent = 'Reproduciendo';
      }).catch(err => {
        console.warn('Reproducción bloqueada o fallo:', err);
      });
    } else {
      media.pause();
      btnPlay.textContent = '▶ Reproducir';
      btnPlay.setAttribute('aria-label', 'Iniciar reproducción');
      if (statusBadge) statusBadge.textContent = 'Pausado';
    }
  });

  // Mute / Unmute
  btnMute.addEventListener('click', () => {
    media.muted = !media.muted;
    btnMute.textContent = media.muted ? '🔇 Desmutear' : '🔊 Silenciar';
    btnMute.setAttribute('aria-label', media.muted ? 'Activar sonido' : 'Silenciar sonido');
  });

  // Volumen
  volumeBar.addEventListener('input', (e) => {
    media.volume = parseFloat(e.target.value);
    if (media.volume === 0) {
      media.muted = true;
      btnMute.textContent = '🔇 Desmutear';
    } else if (media.muted) {
      media.muted = false;
      btnMute.textContent = '🔊 Silenciar';
    }
  });

  // Actualización de tiempo (evento timeupdate)
  media.addEventListener('timeupdate', () => {
    if (!isNaN(media.duration) && media.duration > 0) {
      const progress = (media.currentTime / media.duration) * 100;
      seekBar.value = progress;
      timeDisplay.textContent = `${formatTime(media.currentTime)} / ${formatTime(media.duration)}`;
    }
  });

  // Barra de progreso interactiva (seek)
  seekBar.addEventListener('input', (e) => {
    if (!isNaN(media.duration) && media.duration > 0) {
      media.currentTime = (parseFloat(e.target.value) / 100) * media.duration;
    }
  });

  // Evento fin de medio
  media.addEventListener('ended', () => {
    btnPlay.textContent = '▶ Reproducir';
    if (statusBadge) statusBadge.textContent = 'Finalizado';
    seekBar.value = 0;
  });

  // Metadatos cargados
  media.addEventListener('loadedmetadata', () => {
    timeDisplay.textContent = `${formatTime(0)} / ${formatTime(media.duration)}`;
  });
}

/* ==========================================================================
   02. SVG Dinámico manipulado mediante el DOM
   ========================================================================== */
function initSvgDynamicDemo() {
  const svgCircle = document.getElementById('svg-dynamic-circle');
  const svgStatusText = document.getElementById('svg-state-label');
  const svgProgressArc = document.getElementById('svg-progress-arc');
  const btnToggleColor = document.getElementById('btn-svg-color');
  const btnToggleDash = document.getElementById('btn-svg-dash');
  const btnToggleSize = document.getElementById('btn-svg-scale');

  if (!svgCircle || !btnToggleColor) return;

  const colors = ['#eab84b', '#ef745f', '#1d9c91', '#39759b'];
  let colorIdx = 0;

  // Cambiar color de relleno por DOM
  btnToggleColor.addEventListener('click', () => {
    colorIdx = (colorIdx + 1) % colors.length;
    const newColor = colors[colorIdx];
    svgCircle.setAttribute('fill', newColor);
    svgCircle.style.fill = newColor;
    if (svgStatusText) {
      svgStatusText.textContent = `fill: ${newColor}`;
    }
  });

  // Animar trazo con stroke-dashoffset
  let progressState = 0;
  btnToggleDash.addEventListener('click', () => {
    progressState = (progressState + 25) % 125;
    // La circunferencia es ~283px (radio 45)
    const offset = 283 - (283 * (progressState / 100));
    svgProgressArc.style.strokeDashoffset = offset;
    if (svgStatusText) {
      svgStatusText.textContent = `Progreso: ${progressState}% (offset: ${Math.round(offset)}px)`;
    }
  });

  // Alternar escala
  let isScaled = false;
  btnToggleSize.addEventListener('click', () => {
    isScaled = !isScaled;
    svgCircle.classList.toggle('is-expanded', isScaled);
    if (svgStatusText) {
      svgStatusText.textContent = isScaled ? 'Transform: scale(1.15)' : 'Transform: scale(1.0)';
    }
  });

  // Clic directo en el nodo SVG
  svgCircle.addEventListener('click', () => {
    colorIdx = (colorIdx + 1) % colors.length;
    svgCircle.setAttribute('fill', colors[colorIdx]);
    if (svgStatusText) {
      svgStatusText.textContent = `Clic directo en <circle>: ${colors[colorIdx]}`;
    }
  });
}

/* ==========================================================================
   03. Bucles de animación (requestAnimationFrame y Canvas)
   ========================================================================== */
function initAnimationLoopDemo() {
  const canvas = document.getElementById('canvas-animacion');
  const btnToggleLoop = document.getElementById('btn-loop-toggle');
  const speedSlider = document.getElementById('loop-speed');
  const fpsDisplay = document.getElementById('loop-fps');

  if (!canvas || !btnToggleLoop) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let isRunning = true;
  let speed = 1.0;
  let phase = 0;
  let lastTime = performance.now();
  let frameCount = 0;
  let fps = 60;

  // Adaptar dimensiones reales del canvas a su display
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth || 500;
    canvas.height = 200;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function drawFrame(now) {
    if (!isRunning) return;

    // Cálculo de FPS
    frameCount++;
    if (now - lastTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = now;
      if (fpsDisplay) fpsDisplay.textContent = `${fps} FPS`;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo tenue
    ctx.fillStyle = '#14171a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rejilla técnica sutil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Dibujar onda 1 (Teal)
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#1d9c91';
    ctx.beginPath();
    const midY = canvas.height / 2;
    for (let x = 0; x < canvas.width; x++) {
      const y = midY + Math.sin((x * 0.02) + phase) * 45;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Dibujar onda 2 (Mustard armónica)
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#eab84b';
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const y = midY + Math.cos((x * 0.03) - (phase * 0.7)) * 25;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Avanzar fase del ciclo
    phase += 0.03 * speed;

    animationId = requestAnimationFrame(drawFrame);
  }

  // Comprobar preferencia de usuario por movimiento reducido
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    isRunning = false;
    btnToggleLoop.textContent = '▶ Reanudar bucle';
  } else {
    animationId = requestAnimationFrame(drawFrame);
  }

  btnToggleLoop.addEventListener('click', () => {
    isRunning = !isRunning;
    if (isRunning) {
      lastTime = performance.now();
      frameCount = 0;
      animationId = requestAnimationFrame(drawFrame);
      btnToggleLoop.textContent = '⏸ Pausar bucle';
    } else {
      cancelAnimationFrame(animationId);
      btnToggleLoop.textContent = '▶ Reanudar bucle';
      if (fpsDisplay) fpsDisplay.textContent = 'Pausado (0 FPS)';
    }
  });

  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      speed = parseFloat(e.target.value);
    });
  }
}

/* ==========================================================================
   04. Componentes interactivos con Bootstrap 5 y JavaScript
   ========================================================================== */
function initBootstrapDemo() {
  const modalEl = document.getElementById('demoModal');
  const btnJsOpen = document.getElementById('btn-js-open-modal');
  const consoleLog = document.getElementById('bs-event-console');

  function logEvent(msg) {
    if (!consoleLog) return;
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = 'console-entry';
    entry.innerHTML = `<span class="time">[${time}]</span> ${msg}`;
    consoleLog.prepend(entry);
    // Mantener máximo 5 entradas
    while (consoleLog.children.length > 5) {
      consoleLog.removeChild(consoleLog.lastChild);
    }
  }

  if (modalEl) {
    // Si bootstrap está cargado en ventana
    if (typeof bootstrap !== 'undefined') {
      const modalInstance = new bootstrap.Modal(modalEl);

      if (btnJsOpen) {
        btnJsOpen.addEventListener('click', () => {
          logEvent('Disparado programáticamente: <code>modalInstance.show()</code>');
          modalInstance.show();
        });
      }

      modalEl.addEventListener('show.bs.modal', () => {
        logEvent('Evento: <strong>show.bs.modal</strong> (inicio de apertura)');
      });
      modalEl.addEventListener('shown.bs.modal', () => {
        logEvent('Evento: <strong>shown.bs.modal</strong> (visible y foco asignado)');
      });
      modalEl.addEventListener('hide.bs.modal', () => {
        logEvent('Evento: <strong>hide.bs.modal</strong> (inicio de cierre)');
      });
      modalEl.addEventListener('hidden.bs.modal', () => {
        logEvent('Evento: <strong>hidden.bs.modal</strong> (cerrado y foco retornado)');
      });
    } else {
      // Fallback nativo accesible si el CDN no estuviera disponible sin conexión
      if (btnJsOpen) {
        btnJsOpen.addEventListener('click', () => {
          modalEl.classList.add('show');
          modalEl.style.display = 'block';
          document.body.classList.add('modal-open');
          logEvent('Modal abierto (modo fallback nativo)');
        });
      }
      const closeButtons = modalEl.querySelectorAll('[data-bs-dismiss="modal"]');
      closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          modalEl.classList.remove('show');
          modalEl.style.display = 'none';
          document.body.classList.remove('modal-open');
          logEvent('Modal cerrado (modo fallback nativo)');
        });
      });
    }
  }
}

/* ==========================================================================
   05. Eventos táctiles y verificación con DevTools
   ========================================================================== */
function initTouchDemo() {
  const pad = document.getElementById('touch-test-pad');
  const touchStatus = document.getElementById('touch-status-text');
  const touchCoords = document.getElementById('touch-coords-text');

  if (!pad || !touchStatus) return;

  function updateTouchInfo(type, e) {
    e.preventDefault(); // Evita scroll involuntario en el área de testeo
    touchStatus.textContent = `Evento: ${type}`;

    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = pad.getBoundingClientRect();
      const x = Math.round(touch.clientX - rect.left);
      const y = Math.round(touch.clientY - rect.top);
      touchCoords.textContent = `X: ${x}px, Y: ${y}px (Dedos: ${e.touches.length})`;
      pad.classList.add('is-touching');
    } else {
      touchCoords.textContent = 'Sin toques activos';
      pad.classList.remove('is-touching');
    }
  }

  pad.addEventListener('touchstart', (e) => updateTouchInfo('touchstart', e), { passive: false });
  pad.addEventListener('touchmove', (e) => updateTouchInfo('touchmove', e), { passive: false });
  pad.addEventListener('touchend', (e) => updateTouchInfo('touchend', e), { passive: false });
  pad.addEventListener('touchcancel', (e) => updateTouchInfo('touchcancel', e), { passive: false });

  // También admitir clic / ratón para testing de escritorio
  pad.addEventListener('mousedown', (e) => {
    const rect = pad.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    touchStatus.textContent = 'Simulación de puntero (mousedown)';
    touchCoords.textContent = `X: ${x}px, Y: ${y}px`;
    pad.classList.add('is-touching');
  });

  pad.addEventListener('mouseup', () => {
    touchStatus.textContent = 'Puntero liberado (mouseup)';
    pad.classList.remove('is-touching');
  });
}

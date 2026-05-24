/**
 * Live webcam capture via getUserMedia. Returns a Promise that resolves
 * with a JPEG Blob of the captured frame, or rejects if the user cancels
 * or denies camera permission.
 *
 * Why this exists: the legacy AI generator used a file input with
 * `capture="user"`, which opens the native camera UI on mobile but is
 * silently ignored on desktop (regular file picker). This module gives
 * a consistent live-preview-and-snap UX on every platform.
 *
 * Usage from a client component:
 *   const blob = await openLiveCamera();
 *   handleFile(blob);
 *
 * Caller catches the rejection to fall back to the file input.
 */
export function openLiveCamera(): Promise<Blob> {
  return new Promise(async (resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      reject(new Error('Camera not available on this device'));
      return;
    }

    let facingMode: 'user' | 'environment' = 'user';
    let stream: MediaStream | null = null;

    // ─── Build the modal ──────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Live camera capture');
    overlay.className = 'live-camera-overlay';

    const stage = document.createElement('div');
    stage.className = 'live-camera-stage';

    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.className = 'live-camera-video';

    const guide = document.createElement('div');
    guide.className = 'live-camera-guide';
    guide.setAttribute('aria-hidden', 'true');
    guide.innerHTML = `
      <span class="live-camera-corner tl"></span>
      <span class="live-camera-corner tr"></span>
      <span class="live-camera-corner bl"></span>
      <span class="live-camera-corner br"></span>
    `;

    const topBar = document.createElement('div');
    topBar.className = 'live-camera-topbar';
    topBar.innerHTML = `
      <span class="live-camera-status mono">— Live · awaiting capture</span>
      <button type="button" class="live-camera-close" aria-label="Close camera">×</button>
    `;

    const bottomBar = document.createElement('div');
    bottomBar.className = 'live-camera-bottombar';
    bottomBar.innerHTML = `
      <button type="button" class="live-camera-switch" aria-label="Switch camera">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>
        </svg>
      </button>
      <button type="button" class="live-camera-shutter" aria-label="Capture photo">
        <span class="live-camera-shutter-ring"></span>
      </button>
      <span class="live-camera-hint mono">Center your face · even light</span>
    `;

    stage.appendChild(video);
    stage.appendChild(guide);
    overlay.appendChild(topBar);
    overlay.appendChild(stage);
    overlay.appendChild(bottomBar);
    document.body.appendChild(overlay);

    // Disable page scroll while the camera is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function cleanup() {
      try {
        stream?.getTracks().forEach((t) => t.stop());
      } catch {
        /* ignore */
      }
      overlay.remove();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    }

    async function start(face: 'user' | 'environment') {
      try {
        stream?.getTracks().forEach((t) => t.stop());
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: face, width: { ideal: 1920 }, height: { ideal: 1920 } },
          audio: false,
        });
        video.srcObject = stream;
        // Mirror for front-facing only — feels natural like a selfie.
        video.style.transform = face === 'user' ? 'scaleX(-1)' : 'none';
      } catch (err) {
        cleanup();
        reject(err instanceof Error ? err : new Error('Camera access denied'));
      }
    }

    function capture() {
      if (!stream || !video.videoWidth || !video.videoHeight) return;
      const canvas = document.createElement('canvas');
      // Use the actual frame size so we don't lose resolution.
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        cleanup();
        reject(new Error('Could not capture frame'));
        return;
      }
      // Un-mirror the saved image even though the preview was mirrored —
      // the photo should match what a normal camera produces, not the
      // selfie-style mirror.
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          cleanup();
          if (blob) resolve(blob);
          else reject(new Error('Could not encode captured frame'));
        },
        'image/jpeg',
        0.92,
      );
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        cleanup();
        reject(new Error('cancelled'));
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        capture();
      }
    }

    window.addEventListener('keydown', onKey);

    overlay.querySelector('.live-camera-close')?.addEventListener('click', () => {
      cleanup();
      reject(new Error('cancelled'));
    });

    overlay.querySelector('.live-camera-shutter')?.addEventListener('click', capture);

    overlay.querySelector('.live-camera-switch')?.addEventListener('click', () => {
      facingMode = facingMode === 'user' ? 'environment' : 'user';
      start(facingMode);
    });

    // Kick it off.
    await start(facingMode);
  });
}

/**
 * IP Prime OS — Local High-Speed System & Hardware Runtime Bridge
 * Connects DOAP to IP-Verse-Mafia's local room_server.py (WebSocket / HTTP bridge on port 8765)
 * Enables 0ms local code execution & native Windows automation.
 */

class LocalSystemConnector {
  constructor() {
    this.wsUrl = 'ws://127.0.0.1:8765';
    this.httpUrl = 'http://127.0.0.1:8765';
    this.isConnected = false;
    this.socket = null;
    this.subscribers = new Set();
    this.checkConnection();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback({ isConnected: this.isConnected, url: this.wsUrl });
    return () => this.subscribers.delete(callback);
  }

  notify() {
    for (const sub of this.subscribers) {
      sub({ isConnected: this.isConnected, url: this.wsUrl });
    }
  }

  checkConnection() {
    if (typeof window === 'undefined') return;
    // Only attempt WebSocket connection if explicitly enabled or opted into
    // This prevents red net::ERR_CONNECTION_REFUSED in browser DevTools on default page loads
    const isBridgeEnabled = typeof localStorage !== 'undefined' && localStorage.getItem('doap_enable_local_bridge') === 'true';
    if (!isBridgeEnabled) {
      this.isConnected = false;
      this.notify();
      return;
    }

    try {
      const ws = new WebSocket(this.wsUrl);

      const timer = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          try { ws.close(); } catch (e) {}
          this.isConnected = false;
          this.notify();
        }
      }, 1500);

      ws.onopen = () => {
        clearTimeout(timer);
        this.isConnected = true;
        this.socket = ws;
        this.notify();
      };

      ws.onclose = () => {
        this.isConnected = false;
        this.socket = null;
        this.notify();
      };

      ws.onerror = () => {
        this.isConnected = false;
        this.notify();
      };
    } catch (e) {
      this.isConnected = false;
      this.notify();
    }
  }

  enableAndConnect() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('doap_enable_local_bridge', 'true');
      }
    } catch {}
    this.checkConnection();
  }

  disableBridge() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('doap_enable_local_bridge');
      }
    } catch {}
    if (this.socket) {
      try { this.socket.close(); } catch (e) {}
      this.socket = null;
    }
    this.isConnected = false;
    this.notify();
  }

  /**
   * Execute code on the user's native Windows machine via IP Prime OS shell
   */
  async executeLocalCode(language, code) {
    // 1. Try WebSocket if active
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return new Promise((resolve) => {
        const reqId = 'run_' + Date.now();
        const handler = (event) => {
          try {
            const res = JSON.parse(event.data);
            if (res.reqId === reqId) {
              this.socket.removeEventListener('message', handler);
              resolve({
                stdout: res.stdout || '',
                stderr: res.stderr || '',
                exitCode: res.exitCode ?? 0,
                duration: res.duration || '0.04s',
                runtime: 'IP Prime OS (Local Machine)'
              });
            }
          } catch (e) {}
        };

        this.socket.addEventListener('message', handler);
        this.socket.send(JSON.stringify({
          action: 'execute_code',
          reqId,
          language,
          code
        }));

        setTimeout(() => {
          this.socket.removeEventListener('message', handler);
          resolve(null);
        }, 8000);
      });
    }

    // 2. Try HTTP API fallback on port 8765
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(`${this.httpUrl}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ language, code })
      });

      clearTimeout(timeout);
      if (res.ok) {
        const data = await res.json();
        return {
          stdout: data.stdout || '',
          stderr: data.stderr || '',
          exitCode: data.exitCode ?? 0,
          duration: data.duration || '0.05s',
          runtime: 'IP Prime OS (Local Native)'
        };
      }
    } catch (err) {}

    return null; // Signals to fall back to Cloud Judge0
  }

  /**
   * Send desktop autopilot actions to IP Prime OS
   */
  async sendDesktopCommand(command, params = {}) {
    if (!this.isConnected && !this.socket) {
      return { success: false, error: 'IP Prime OS is not running locally on port 8765' };
    }

    try {
      this.socket.send(JSON.stringify({
        action: 'system_command',
        command,
        params,
        timestamp: Date.now()
      }));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}

export const localConnector = new LocalSystemConnector();

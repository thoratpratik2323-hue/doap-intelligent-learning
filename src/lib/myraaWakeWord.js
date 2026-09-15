/**
 * MYRAA Wake Word Detector
 * Zero-dependency, continuous Web Speech API listening for "Hey Myraa" / "Hey Ziv"
 */

export class MyraaWakeWordDetector {
  constructor() {
    this.recognition = null;
    this.isActive = false;
    this.phrase = "hey myraa";
    this.sensitivity = 60;
    this.onTriggered = null;
    this.onState = null;
    this.lastTriggerTime = 0;
  }

  start({ phrase = "hey myraa", sensitivity = 60, onTriggered, onState }) {
    if (typeof window === 'undefined') return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn('[Myraa Wake Word] Web Speech API not supported in this browser.');
      if (onState) onState('error');
      return;
    }

    this.phrase = phrase.toLowerCase().trim();
    this.sensitivity = sensitivity;
    this.onTriggered = onTriggered;
    this.onState = onState;
    this.isActive = true;

    try {
      this.recognition = new SpeechRec();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        if (this.onState) this.onState('listening');
      };

      this.recognition.onresult = (event) => {
        if (!this.isActive) return;
        const now = Date.now();
        // Cooldown window between triggers (default 3 seconds)
        if (now - this.lastTriggerTime < 3000) return;

        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript.toLowerCase();
        }

        if (transcript.includes(this.phrase) || transcript.includes('hey ziv') || transcript.includes('myra')) {
          this.lastTriggerTime = now;
          if (this.onState) this.onState('triggered');
          if (this.onTriggered) this.onTriggered();
        }
      };

      this.recognition.onerror = (e) => {
        if (e.error !== 'no-speech' && this.onState) {
          this.onState('error');
        }
      };

      this.recognition.onend = () => {
        // Auto-restart if still active
        if (this.isActive) {
          try {
            this.recognition.start();
          } catch (e) {}
        } else {
          if (this.onState) this.onState('stopped');
        }
      };

      this.recognition.start();
    } catch (err) {
      console.warn('[Myraa Wake Word] Failed to start speech recognition:', err);
      if (this.onState) this.onState('error');
    }
  }

  stop() {
    this.isActive = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.recognition = null;
    }
    if (this.onState) this.onState('stopped');
  }
}

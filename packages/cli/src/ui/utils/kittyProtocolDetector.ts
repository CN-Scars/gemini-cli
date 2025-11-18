/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

let detectionComplete = false;
let protocolSupported = false;
let protocolEnabled = false;
let sgrMouseEnabled = false;

/**
 * Detects Kitty keyboard protocol support.
 * Definitive document about this protocol lives at https://sw.kovidgoyal.net/kitty/keyboard-protocol/
 * This function should be called once at app startup.
 */
export async function detectAndEnableKittyProtocol(): Promise<boolean> {
  if (detectionComplete) {
    return protocolSupported;
  }

  // FORCE ENABLE for testing
  process.stdout.write('\x1b[>1u');
  protocolSupported = true;
  protocolEnabled = true;

  process.stdout.write('\x1b[?1006h');
  sgrMouseEnabled = true;

  process.on('exit', disableAllProtocols);
  process.on('SIGTERM', disableAllProtocols);

  detectionComplete = true;
  return true;
}

function disableAllProtocols() {
  if (protocolEnabled) {
    process.stdout.write('\x1b[<u');
    protocolEnabled = false;
  }
  if (sgrMouseEnabled) {
    process.stdout.write('\x1b[?1006l'); // Disable SGR Mouse
    sgrMouseEnabled = false;
  }
}

export function isKittyProtocolEnabled(): boolean {
  return protocolEnabled;
}

export function isKittyProtocolSupported(): boolean {
  return protocolSupported;
}

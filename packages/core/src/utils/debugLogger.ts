/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { format } from 'node:util';
import { coreEvents } from './events.js';

/**
 * A simple, centralized logger for developer-facing debug messages.
 *
 * WHY USE THIS?
 * - It makes the INTENT of the log clear (it's for developers, not users).
 * - It provides a single point of control for debug logging behavior.
 * - We can lint against direct `console.*` usage to enforce this pattern.
 *
 * HOW IT WORKS:
 * This is a thin wrapper around the native `console` object. The `ConsolePatcher`
 * will intercept these calls and route them to the debug drawer UI.
 */

const enableDebugLogger = true;
class DebugLogger {
  log(...args: unknown[]): void {
    if (enableDebugLogger) {
      coreEvents.emitConsoleLog('log', format(...args));
    }
  }

  warn(...args: unknown[]): void {
    if (enableDebugLogger) {
      coreEvents.emitConsoleLog('warn', format(...args));
    }
  }

  error(...args: unknown[]): void {
    if (enableDebugLogger) {
      coreEvents.emitConsoleLog('error', format(...args));
    }
  }

  debug(...args: unknown[]): void {
    if (enableDebugLogger) {
      coreEvents.emitConsoleLog('debug', format(...args));
    }
  }
}

export const debugLogger = new DebugLogger();

// Monday 23 November 2026 front page. The masthead names that day.
// Six figures, a seven-region bar (Africa 0), three illustrated leads — Huang and the
// Nasdaq, drones on two Russian refineries, three mined Hormuz tankers — then ten cards,
// a pin map, also-on stories 14–39, a UTC strip, and a date-check of Sunday 22 November
// 2026 and earlier days, left out of the Monday news.
// The program copies that image to $MAKEFUN_OUTPUT_DIR/entry.png, or to /output.

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
const buf = readFileSync(src);
if (buf.length >= 1048576) throw new Error('entry.png is 1 MiB or larger');
if (buf.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('entry.png is not a PNG');
if (buf.subarray(12, 16).toString('ascii') !== 'IHDR') throw new Error('entry.png has no IHDR');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width !== 1024 || height !== 1024) throw new Error(`entry.png is ${width}x${height}`);

copyFileSync(src, join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));

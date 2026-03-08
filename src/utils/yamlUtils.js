// src/utils/yamlUtils.js

/**
 * Schema-aware YAML serializer for src/data/scenarios.yaml.
 * Produces output fully compatible with the existing file format —
 * single-quoted scalars, literal block scalars (|) for multiline text,
 * two-space indentation throughout.
 *
 * No runtime dependency on js-yaml; handles only the known scenario schema.
 */

// ---------------------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------------------

/** Escape single-quotes for YAML single-quoted style */
const escapeSq = (str) => String(str ?? '').replace(/'/g, "''");

/** Wrap a value in YAML single quotes */
const sq = (str) => `'${escapeSq(str)}'`;

/**
 * Render a literal block scalar (|) for multiline text.
 * Empty lines are output as truly empty (no trailing spaces).
 *
 * @param {string} str        — the text content
 * @param {number} indent     — number of spaces to prepend to each content line
 * @returns {string}          — "|\n<indented content>"
 */
const literalBlock = (str, indent) => {
  const pad = ' '.repeat(indent);
  const lines = String(str ?? '').split('\n');
  const body = lines
    .map((line) => (line.trim() ? `${pad}${line}` : ''))
    .join('\n');
  return `|\n${body}`;
};

// ---------------------------------------------------------------------------
// Per-scenario serializer
// ---------------------------------------------------------------------------

const REVEAL_KEYS = [
  'outcome',
  'realStory',
  'comparison',
  'scoring',
  'context',
  'lesson',
];

const serializeScenario = (scenario) => {
  const lines = [];

  // ── Top-level scalar fields ────────────────────────────────────────────
  lines.push(`  - month: ${scenario.month}`);
  lines.push(`    title: ${sq(scenario.title)}`);

  // narrative — multiline literal block, content at 6-space indent
  lines.push(`    narrative: ${literalBlock(scenario.narrative, 6)}`);
  lines.push('');

  // ── Intel ─────────────────────────────────────────────────────────────
  lines.push('    intel:');
  (scenario.intel ?? []).forEach((item) => {
    lines.push(`      - headline: ${sq(item.headline)}`);
    lines.push(`        body: ${sq(item.body)}`);
  });
  lines.push('');

  // ── Options ───────────────────────────────────────────────────────────
  lines.push('    options:');
  (scenario.options ?? []).forEach((opt) => {
    lines.push(`      - text: ${sq(opt.text)}`);
    lines.push(`        meta:`);
    lines.push(`          points: ${opt.meta.points}`);
    lines.push(`          risk: ${sq(opt.meta.risk)}`);
    lines.push(`          ethics: ${sq(opt.meta.ethics)}`);
    lines.push(`          time: ${sq(opt.meta.time)}`);
    lines.push(`          reality: ${sq(opt.meta.reality)}`);
  });
  lines.push('');

  // ── Reveal ────────────────────────────────────────────────────────────
  lines.push('    reveal:');
  REVEAL_KEYS.forEach((key) => {
    const value = scenario.reveal?.[key] ?? '';
    lines.push(`      ${key}: ${literalBlock(value, 8)}`);
    lines.push('');
  });

  return lines.join('\n');
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Serialize the full scenarios array to a YAML string that can be saved
 * as src/data/scenarios.yaml.
 *
 * @param {Array} scenarios — array of scenario objects (unsorted is fine)
 * @returns {string}
 */
export const scenariosToYaml = (scenarios) => {
  const header = [
    '# src/data/scenarios.yaml',
    '# Each scenario follows the same structure.',
    '# Multiline text uses the YAML literal block scalar (|) to preserve line breaks.',
    '# The leading/trailing blank lines within narrative blocks are intentional —',
    '# they match the original spacing used in Play.jsx.',
    '',
    'scenarios:',
  ].join('\n');

  const body = [...scenarios]
    .sort((a, b) => a.month - b.month)
    .map(serializeScenario)
    .join('\n');

  return `${header}\n${body}`;
};

/**
 * Trigger a browser download of the YAML file.
 *
 * @param {Array}  scenarios — array of scenario objects
 * @param {string} filename  — defaults to 'scenarios.yaml'
 */
export const downloadScenariosYaml = (
  scenarios,
  filename = 'scenarios.yaml',
) => {
  const content = scenariosToYaml(scenarios);
  const blob = new Blob([content], { type: 'text/yaml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};

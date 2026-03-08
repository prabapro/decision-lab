// src/utils/jsImportUtils.js

/**
 * Parses a `.js` file that exports a `const scenarios = [...]` array.
 *
 * Strategy: use the Function constructor to evaluate the file content in an
 * isolated scope, then return the `scenarios` binding.  This handles template
 * literals, nested objects, and multi-line strings that would break JSON.parse.
 *
 * @param {File} file — the JS File object from an <input type="file"> element
 * @returns {Promise<Array>} — resolves with the parsed scenarios array
 * @throws {Error} — if the file cannot be read or doesn't contain a valid
 *                   `scenarios` array
 */
export const parseJSScenariosFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const source = e.target.result;

        // Evaluate the file in an isolated function scope and return `scenarios`
        const fn = new Function(`${source}\nreturn scenarios;`);
        const result = fn();

        if (!Array.isArray(result)) {
          throw new Error(
            'Parsed value is not an array. Make sure the file contains `const scenarios = [...]`.',
          );
        }

        if (result.length === 0) {
          throw new Error('The scenarios array is empty.');
        }

        validateScenarios(result);
        resolve(result);
      } catch (err) {
        reject(new Error(`Failed to parse JS file: ${err.message}`));
      }
    };

    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.readAsText(file);
  });
};

// ---------------------------------------------------------------------------
// Internal validation — catches obvious structural issues early
// ---------------------------------------------------------------------------

const REQUIRED_TOP_KEYS = [
  'month',
  'title',
  'narrative',
  'intel',
  'options',
  'reveal',
];
const REQUIRED_REVEAL_KEYS = [
  'outcome',
  'realStory',
  'comparison',
  'scoring',
  'context',
  'lesson',
];

/**
 * Lightweight structural check — not exhaustive, but catches missing top-level
 * keys and reveal blocks before the data reaches the store.
 *
 * @param {Array} scenarios
 * @throws {Error}
 */
const validateScenarios = (scenarios) => {
  scenarios.forEach((s, i) => {
    const label = `Scenario at index ${i}`;

    REQUIRED_TOP_KEYS.forEach((key) => {
      if (!(key in s)) {
        throw new Error(`${label} is missing required key: "${key}"`);
      }
    });

    if (!Array.isArray(s.intel) || s.intel.length === 0) {
      throw new Error(`${label} must have a non-empty "intel" array.`);
    }

    if (!Array.isArray(s.options) || s.options.length === 0) {
      throw new Error(`${label} must have a non-empty "options" array.`);
    }

    REQUIRED_REVEAL_KEYS.forEach((key) => {
      if (!(key in s.reveal)) {
        throw new Error(`${label} reveal block is missing key: "${key}"`);
      }
    });
  });
};

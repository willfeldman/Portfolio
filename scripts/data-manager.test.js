const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const DataManager = require('./data-manager');

test('adding an entry refuses invalid or exhausted IDs without changing data', async () => {
  for (const id of ['7', 'invalid', NaN, Infinity, -1, Number.MAX_SAFE_INTEGER]) {
    const manager = Object.create(DataManager.prototype);
    manager.currentData = { awards: [{ id }] };
    manager.pause = async () => {};
    manager.showMainMenu = async () => {};
    manager.prompt = async () => assert.fail('must not collect or save an invalid entry');
    await manager.addEntry('awards');
    assert.deepEqual(manager.currentData.awards, [{ id }]);
  }
});

test('validation reports malformed URL elements without aborting the remaining checks', () => {
  const manager = Object.create(DataManager.prototype);
  const entry = { id: 0, positions: [], company: 'Example', location: 'Chicago' };
  const issues = manager.validateDataType('experiences', [
    { ...entry, url: [null, 42, {}, '', 'ftp://example.com', 'https://example.com'] },
    { ...entry, id: 'bad', company: '' },
  ]);
  assert.equal(issues.filter(issue => issue.includes('url[')).length, 5);
  assert.ok(issues.some(issue => issue.includes('ID must be')));
  assert.ok(issues.some(issue => issue.includes("Missing required field 'company'")));
  assert.deepEqual(manager.validateDataType('experiences', [{ ...entry, url: [] }]), []);
});

test('confirmed new entries receive the next ID and survive a fresh load', async () => {
  const cwd = process.cwd();
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-add-test-'));
  try {
    process.chdir(fixture);
    fs.mkdirSync('src/data', { recursive: true });
    for (const [file, type] of Object.entries({ experience: 'experiences', project: 'projects', organization: 'organizations', award: 'awards' })) {
      fs.writeFileSync(`src/data/${file}.js`, `module.exports = { ${type}: [] };`);
    }
    const manager = new DataManager();
    manager.currentData.awards = [{ id: 4, name: 'Existing', issuer: 'Example', date: '2025' }];
    const answers = ['New award', 'Example', '2026', '', 'y'];
    manager.prompt = async () => answers.shift();
    manager.pause = async () => {};
    manager.showMainMenu = async () => {};
    await manager.addEntry('awards');
    assert.equal(answers.length, 0);
    const reloaded = new DataManager();
    assert.deepEqual(reloaded.currentData.awards, [
      { id: 4, name: 'Existing', issuer: 'Example', date: '2025' },
      { id: 5, name: 'New award', issuer: 'Example', date: '2026' },
    ]);
    assert.equal((await manager.processTags(' React, , JavaScript, ')).map(tag => tag.name).join(','), 'React,JavaScript');
  } finally {
    process.chdir(cwd);
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});

test('project saves preserve tag definitions and refuse unreadable originals', async () => {
  const cwd = process.cwd();
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-data-test-'));
  try {
    process.chdir(fixture);
    fs.mkdirSync('src/data', { recursive: true });
    const tags = 'var projectTags = [{ name: "Original" }];';
    const lookup = 'function getProjectTagByName(name) {\n  return projectTags.find(tag => tag.name === name);\n}';
    fs.writeFileSync('src/data/project.js', `${tags}\n${lookup}\nmodule.exports = { projects: [] };`);
    const manager = Object.create(DataManager.prototype);
    manager.currentData = { projects: [{ id: 0, title: 'Saved', description: 'Example' }] };
    await manager.saveData('projects');
    const saved = fs.readFileSync('src/data/project.js', 'utf8');
    assert.ok(saved.includes(tags));
    assert.ok(saved.includes(lookup));
    assert.deepEqual(require(path.join(fixture, 'src/data/project.js')).projects, manager.currentData.projects);
    fs.renameSync('src/data/project.js', 'src/data/original.js');
    await assert.rejects(manager.saveData('projects'), { code: 'ENOENT' });
    assert.equal(fs.existsSync('src/data/project.js'), false);
    assert.equal(fs.readFileSync('src/data/original.js', 'utf8'), saved);
  } finally {
    process.chdir(cwd);
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});

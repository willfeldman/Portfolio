#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DATA_FILES = {
  experiences: './src/data/experience.js',
  projects: './src/data/project.js',
  organizations: './src/data/organization.js',
  awards: './src/data/award.js'
};

const SCHEMAS = {
  experiences: {
    required: ['id', 'positions', 'company', 'location'],
    optional: ['url', 'linkedin', 'headerImage', 'logo', 'additionalInformation', 'fullDates'],
    nested: {
      positions: {
        required: ['title', 'dates', 'type'],
        optional: ['description', 'summary']
      }
    }
  },
  projects: {
    required: ['id', 'title', 'description'],
    optional: ['github', 'url', 'code', 'tags', 'images', 'additionalInformation'],
    nested: {
      tags: {
        required: ['name', 'color', 'background'],
        optional: []
      }
    }
  },
  organizations: {
    required: ['id', 'name', 'yearsActive'],
    optional: ['role', 'summary', 'description', 'logo', 'headerImage'],
    nested: {
      role: {
        required: ['title', 'years'],
        optional: []
      }
    }
  },
  awards: {
    required: ['id', 'name', 'issuer', 'date'],
    optional: ['description'],
    nested: {}
  }
};

class DataManager {
  constructor() {
    this.currentData = {};
    this.loadAllData();
  }

  loadAllData() {
    for (const [type, filePath] of Object.entries(DATA_FILES)) {
      try {
        delete require.cache[require.resolve(path.resolve(filePath))];
        const data = require(path.resolve(filePath));
        this.currentData[type] = data[type] || [];
      } catch (error) {
        console.error(`Error loading ${type}:`, error.message);
        this.currentData[type] = [];
      }
    }
  }

  async showMainMenu() {
    console.clear();
    console.log('🚀 Portfolio Data Manager');
    console.log('========================');
    console.log('1. View Data');
    console.log('2. Add New Entry');
    console.log('3. Edit Entry');
    console.log('4. Delete Entry');
    console.log('5. Validate Data');
    console.log('6. Export Data');
    console.log('7. Exit');
    console.log('');

    const choice = await this.prompt('Select an option (1-7): ');
    await this.handleMainMenuChoice(choice);
  }

  async handleMainMenuChoice(choice) {
    switch (choice.trim()) {
      case '1':
        await this.viewDataMenu();
        break;
      case '2':
        await this.addEntryMenu();
        break;
      case '3':
        await this.editEntryMenu();
        break;
      case '4':
        await this.deleteEntryMenu();
        break;
      case '5':
        await this.validateAllData();
        break;
      case '6':
        await this.exportDataMenu();
        break;
      case '7':
        console.log('Goodbye! 👋');
        process.exit(0);
        break;
      default:
        console.log('Invalid option. Please try again.');
        await this.pause();
        await this.showMainMenu();
    }
  }

  async viewDataMenu() {
    console.clear();
    console.log('📊 View Data');
    console.log('============');
    console.log('1. Experiences');
    console.log('2. Projects');
    console.log('3. Organizations');
    console.log('4. Awards');
    console.log('5. Summary (All)');
    console.log('6. Back to Main Menu');
    console.log('');

    const choice = await this.prompt('Select data type (1-6): ');
    
    switch (choice.trim()) {
      case '1':
        await this.displayData('experiences');
        break;
      case '2':
        await this.displayData('projects');
        break;
      case '3':
        await this.displayData('organizations');
        break;
      case '4':
        await this.displayData('awards');
        break;
      case '5':
        await this.displaySummary();
        break;
      case '6':
        await this.showMainMenu();
        return;
      default:
        console.log('Invalid option. Please try again.');
        await this.pause();
        await this.viewDataMenu();
        return;
    }
    
    await this.pause();
    await this.viewDataMenu();
  }

  displayData(type) {
    console.clear();
    const data = this.currentData[type];
    const title = type.charAt(0).toUpperCase() + type.slice(1);
    
    console.log(`📋 ${title}`);
    console.log('='.repeat(title.length + 3));
    console.log(`Total entries: ${data.length}\n`);

    if (data.length === 0) {
      console.log('No entries found.');
      return;
    }

    data.forEach((item, index) => {
      console.log(`${index + 1}. ${this.getItemTitle(item, type)}`);
      console.log(`   ID: ${item.id}`);
      
      if (type === 'experiences') {
        console.log(`   Company: ${item.company}`);
        console.log(`   Positions: ${item.positions.length}`);
        if (item.fullDates) {
          console.log(`   Duration: ${item.fullDates}`);
        } else if (item.positions[0]) {
          console.log(`   Duration: ${item.positions[0].dates}`);
        }
      } else if (type === 'projects') {
        console.log(`   Description: ${item.description.substring(0, 80)}${item.description.length > 80 ? '...' : ''}`);
        if (item.tags) {
          console.log(`   Tags: ${item.tags.map(tag => tag.name).join(', ')}`);
        }
      } else if (type === 'organizations') {
        console.log(`   Duration: ${item.yearsActive}`);
        if (item.role && item.role.length > 0) {
          console.log(`   Latest Role: ${item.role[0].title}`);
        }
      } else if (type === 'awards') {
        console.log(`   Issuer: ${item.issuer}`);
        console.log(`   Date: ${item.date}`);
      }
      
      console.log('');
    });
  }

  displaySummary() {
    console.clear();
    console.log('📈 Data Summary');
    console.log('===============');
    console.log(`Experiences: ${this.currentData.experiences.length} entries`);
    console.log(`Projects: ${this.currentData.projects.length} entries`);
    console.log(`Organizations: ${this.currentData.organizations.length} entries`);
    console.log(`Awards: ${this.currentData.awards.length} entries`);
    console.log(`Total entries: ${Object.values(this.currentData).reduce((sum, arr) => sum + arr.length, 0)}`);
    console.log('');

    // Data consistency check
    console.log('🔍 Quick Consistency Check:');
    const issues = this.quickValidation();
    if (issues.length === 0) {
      console.log('✅ No obvious issues found');
    } else {
      issues.forEach(issue => console.log(`⚠️  ${issue}`));
    }
  }

  quickValidation() {
    const issues = [];
    
    // Check for duplicate IDs within each type
    for (const [type, data] of Object.entries(this.currentData)) {
      const ids = data.map(item => item.id);
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
      if (duplicateIds.length > 0) {
        issues.push(`Duplicate IDs in ${type}: ${[...new Set(duplicateIds)].join(', ')}`);
      }
    }

    // Check for missing required fields
    for (const [type, data] of Object.entries(this.currentData)) {
      const schema = SCHEMAS[type];
      data.forEach((item, index) => {
        schema.required.forEach(field => {
          if (!item.hasOwnProperty(field) || item[field] === undefined || item[field] === '') {
            issues.push(`${type}[${index}] missing required field: ${field}`);
          }
        });
      });
    }

    return issues;
  }

  async addEntryMenu() {
    console.clear();
    console.log('➕ Add New Entry');
    console.log('================');
    console.log('1. Experience');
    console.log('2. Project');
    console.log('3. Organization');
    console.log('4. Award');
    console.log('5. Back to Main Menu');
    console.log('');

    const choice = await this.prompt('Select entry type (1-5): ');
    
    const typeMap = {
      '1': 'experiences',
      '2': 'projects',
      '3': 'organizations',
      '4': 'awards'
    };

    if (choice === '5') {
      await this.showMainMenu();
      return;
    }

    const type = typeMap[choice.trim()];
    if (!type) {
      console.log('Invalid option. Please try again.');
      await this.pause();
      await this.addEntryMenu();
      return;
    }

    await this.addEntry(type);
  }

  async addEntry(type) {
    console.clear();
    const schema = SCHEMAS[type];
    const newEntry = {};
    
    console.log(`➕ Add New ${type.slice(0, -1).charAt(0).toUpperCase() + type.slice(0, -1).slice(1)}`);
    console.log('='.repeat(15 + type.length));

    // Get next ID
    const existingIds = this.currentData[type].map(item => item.id);
    const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 0;
    newEntry.id = nextId;
    console.log(`ID: ${nextId} (auto-assigned)\n`);

    // Collect required fields
    for (const field of schema.required.filter(f => f !== 'id')) {
      if (field === 'positions' && type === 'experiences') {
        newEntry[field] = await this.collectPositions();
      } else if (field === 'role' && type === 'organizations') {
        newEntry[field] = await this.collectRoles();
      } else if (Array.isArray(this.getFieldExample(type, field))) {
        const value = await this.prompt(`${field} (comma-separated): `);
        newEntry[field] = value.split(',').map(v => v.trim()).filter(v => v);
      } else {
        newEntry[field] = await this.prompt(`${field}: `);
      }
    }

    // Ask for optional fields
    console.log('\nOptional fields (press Enter to skip):');
    for (const field of schema.optional) {
      if (field === 'tags' && type === 'projects') {
        const tagsInput = await this.prompt(`${field} (comma-separated tag names): `);
        if (tagsInput.trim()) {
          newEntry[field] = await this.processTags(tagsInput);
        }
      } else if (Array.isArray(this.getFieldExample(type, field))) {
        const value = await this.prompt(`${field} (comma-separated): `);
        if (value.trim()) {
          newEntry[field] = value.split(',').map(v => v.trim()).filter(v => v);
        }
      } else {
        const value = await this.prompt(`${field}: `);
        if (value.trim()) {
          newEntry[field] = value;
        }
      }
    }

    // Preview the entry
    console.log('\n📋 Preview:');
    console.log(JSON.stringify(newEntry, null, 2));
    
    const confirm = await this.prompt('\nSave this entry? (y/n): ');
    if (confirm.toLowerCase().startsWith('y')) {
      this.currentData[type].push(newEntry);
      await this.saveData(type);
      console.log('✅ Entry saved successfully!');
    } else {
      console.log('❌ Entry cancelled.');
    }

    await this.pause();
    await this.showMainMenu();
  }

  async collectPositions() {
    const positions = [];
    let addAnother = true;

    while (addAnother) {
      console.log(`\nPosition ${positions.length + 1}:`);
      const position = {};
      
      position.title = await this.prompt('  Title: ');
      position.dates = await this.prompt('  Dates: ');
      position.type = await this.prompt('  Type (Full-time/Part-time/Internship): ');
      
      const description = await this.prompt('  Description (comma-separated bullet points): ');
      if (description.trim()) {
        position.description = description.split(',').map(d => d.trim()).filter(d => d);
      }
      
      const summary = await this.prompt('  Summary (optional): ');
      if (summary.trim()) {
        position.summary = summary;
      }

      positions.push(position);

      const more = await this.prompt('Add another position? (y/n): ');
      addAnother = more.toLowerCase().startsWith('y');
    }

    return positions;
  }

  async collectRoles() {
    const roles = [];
    let addAnother = true;

    while (addAnother) {
      console.log(`\nRole ${roles.length + 1}:`);
      const role = {};
      
      role.title = await this.prompt('  Title: ');
      role.years = await this.prompt('  Years: ');

      roles.push(role);

      const more = await this.prompt('Add another role? (y/n): ');
      addAnother = more.toLowerCase().startsWith('y');
    }

    return roles;
  }

  async processTags(tagsInput) {
    // This would ideally integrate with the existing tag system from project.js
    // For now, we'll create basic tag objects
    return tagsInput.split(',').map(tagName => {
      const name = tagName.trim();
      return {
        name,
        color: "rgb(193, 198, 255)", // Default color
        background: "rgba(75, 77, 99, 0.85)" // Default background
      };
    });
  }

  async editEntryMenu() {
    console.clear();
    console.log('✏️  Edit Entry');
    console.log('==============');
    console.log('1. Experiences');
    console.log('2. Projects');
    console.log('3. Organizations');
    console.log('4. Awards');
    console.log('5. Back to Main Menu');
    console.log('');

    const choice = await this.prompt('Select data type (1-5): ');
    
    const typeMap = {
      '1': 'experiences',
      '2': 'projects',
      '3': 'organizations',
      '4': 'awards'
    };

    if (choice === '5') {
      await this.showMainMenu();
      return;
    }

    const type = typeMap[choice.trim()];
    if (!type) {
      console.log('Invalid option. Please try again.');
      await this.pause();
      await this.editEntryMenu();
      return;
    }

    await this.selectAndEditEntry(type);
  }

  async selectAndEditEntry(type) {
    console.clear();
    const data = this.currentData[type];
    
    if (data.length === 0) {
      console.log(`No ${type} found to edit.`);
      await this.pause();
      await this.editEntryMenu();
      return;
    }

    console.log(`✏️  Select ${type.slice(0, -1)} to Edit`);
    console.log('='.repeat(25));

    data.forEach((item, index) => {
      console.log(`${index + 1}. ${this.getItemTitle(item, type)} (ID: ${item.id})`);
    });
    console.log(`${data.length + 1}. Back to Edit Menu`);
    console.log('');

    const choice = await this.prompt(`Select entry (1-${data.length + 1}): `);
    const index = parseInt(choice) - 1;

    if (index === data.length) {
      await this.editEntryMenu();
      return;
    }

    if (index >= 0 && index < data.length) {
      await this.editEntry(type, index);
    } else {
      console.log('Invalid selection. Please try again.');
      await this.pause();
      await this.selectAndEditEntry(type);
    }
  }

  async editEntry(type, index) {
    console.clear();
    const entry = this.currentData[type][index];
    const schema = SCHEMAS[type];
    
    console.log(`✏️  Editing: ${this.getItemTitle(entry, type)}`);
    console.log('='.repeat(40));
    console.log('Current values shown in [brackets]. Press Enter to keep current value.\n');

    const allFields = [...schema.required, ...schema.optional];
    
    for (const field of allFields) {
      if (field === 'id') continue; // Skip ID editing
      
      const currentValue = entry[field];
      let displayValue = '';
      
      if (Array.isArray(currentValue)) {
        if (field === 'positions' || field === 'role') {
          displayValue = `${currentValue.length} items`;
        } else {
          displayValue = currentValue.join(', ');
        }
      } else if (typeof currentValue === 'object' && currentValue !== null) {
        displayValue = 'complex object';
      } else {
        displayValue = currentValue || 'not set';
      }

      console.log(`${field} [${displayValue}]:`);
      
      if (field === 'positions' && type === 'experiences') {
        const editPositions = await this.prompt('Edit positions? (y/n): ');
        if (editPositions.toLowerCase().startsWith('y')) {
          entry[field] = await this.editPositions(currentValue || []);
        }
      } else if (field === 'role' && type === 'organizations') {
        const editRoles = await this.prompt('Edit roles? (y/n): ');
        if (editRoles.toLowerCase().startsWith('y')) {
          entry[field] = await this.editRoles(currentValue || []);
        }
      } else if (field === 'tags' && type === 'projects') {
        const editTags = await this.prompt('Edit tags? (y/n): ');
        if (editTags.toLowerCase().startsWith('y')) {
          const tagsInput = await this.prompt('Enter tag names (comma-separated): ');
          if (tagsInput.trim()) {
            entry[field] = await this.processTags(tagsInput);
          }
        }
      } else {
        const newValue = await this.prompt('> ');
        if (newValue.trim()) {
          if (Array.isArray(currentValue)) {
            entry[field] = newValue.split(',').map(v => v.trim()).filter(v => v);
          } else {
            entry[field] = newValue;
          }
        }
      }
    }

    console.log('\n📋 Updated Entry:');
    console.log(JSON.stringify(entry, null, 2));
    
    const confirm = await this.prompt('\nSave changes? (y/n): ');
    if (confirm.toLowerCase().startsWith('y')) {
      await this.saveData(type);
      console.log('✅ Changes saved successfully!');
    } else {
      console.log('❌ Changes cancelled.');
      this.loadAllData(); // Reload original data
    }

    await this.pause();
    await this.showMainMenu();
  }

  async editPositions(positions) {
    // Implementation for editing positions array
    console.log('Position editing - simplified for now');
    return positions;
  }

  async editRoles(roles) {
    // Implementation for editing roles array
    console.log('Role editing - simplified for now');
    return roles;
  }

  async deleteEntryMenu() {
    console.clear();
    console.log('🗑️  Delete Entry');
    console.log('================');
    console.log('1. Experiences');
    console.log('2. Projects');
    console.log('3. Organizations');
    console.log('4. Awards');
    console.log('5. Back to Main Menu');
    console.log('');

    const choice = await this.prompt('Select data type (1-5): ');
    
    const typeMap = {
      '1': 'experiences',
      '2': 'projects',
      '3': 'organizations',
      '4': 'awards'
    };

    if (choice === '5') {
      await this.showMainMenu();
      return;
    }

    const type = typeMap[choice.trim()];
    if (!type) {
      console.log('Invalid option. Please try again.');
      await this.pause();
      await this.deleteEntryMenu();
      return;
    }

    await this.selectAndDeleteEntry(type);
  }

  async selectAndDeleteEntry(type) {
    console.clear();
    const data = this.currentData[type];
    
    if (data.length === 0) {
      console.log(`No ${type} found to delete.`);
      await this.pause();
      await this.deleteEntryMenu();
      return;
    }

    console.log(`🗑️  Select ${type.slice(0, -1)} to Delete`);
    console.log('='.repeat(25));

    data.forEach((item, index) => {
      console.log(`${index + 1}. ${this.getItemTitle(item, type)} (ID: ${item.id})`);
    });
    console.log(`${data.length + 1}. Back to Delete Menu`);
    console.log('');

    const choice = await this.prompt(`Select entry (1-${data.length + 1}): `);
    const index = parseInt(choice) - 1;

    if (index === data.length) {
      await this.deleteEntryMenu();
      return;
    }

    if (index >= 0 && index < data.length) {
      const entry = data[index];
      console.log(`\n⚠️  You are about to delete: ${this.getItemTitle(entry, type)}`);
      console.log('This action cannot be undone!');
      
      const confirm = await this.prompt('\nAre you sure? Type "DELETE" to confirm: ');
      if (confirm === 'DELETE') {
        this.currentData[type].splice(index, 1);
        await this.saveData(type);
        console.log('✅ Entry deleted successfully!');
      } else {
        console.log('❌ Deletion cancelled.');
      }
      
      await this.pause();
      await this.deleteEntryMenu();
    } else {
      console.log('Invalid selection. Please try again.');
      await this.pause();
      await this.selectAndDeleteEntry(type);
    }
  }

  async validateAllData() {
    console.clear();
    console.log('🔍 Data Validation');
    console.log('==================');

    const allIssues = [];

    for (const [type, data] of Object.entries(this.currentData)) {
      console.log(`\nValidating ${type}...`);
      const issues = this.validateDataType(type, data);
      
      if (issues.length === 0) {
        console.log(`✅ ${type}: No issues found`);
      } else {
        console.log(`⚠️  ${type}: ${issues.length} issues found`);
        issues.forEach(issue => {
          console.log(`   - ${issue}`);
          allIssues.push(`${type}: ${issue}`);
        });
      }
    }

    console.log('\n' + '='.repeat(40));
    if (allIssues.length === 0) {
      console.log('🎉 All data is valid!');
    } else {
      console.log(`⚠️  Total issues found: ${allIssues.length}`);
    }

    await this.pause();
    await this.showMainMenu();
  }

  validateDataType(type, data) {
    const issues = [];
    const schema = SCHEMAS[type];

    // Check for duplicate IDs
    const ids = data.map(item => item.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      issues.push(`Duplicate IDs: ${[...new Set(duplicateIds)].join(', ')}`);
    }

    // Validate each entry
    data.forEach((item, index) => {
      // Check required fields
      schema.required.forEach(field => {
        if (!item.hasOwnProperty(field) || item[field] === undefined || item[field] === '') {
          issues.push(`Entry ${index} (ID: ${item.id}): Missing required field '${field}'`);
        }
      });

      // Check nested structures
      Object.entries(schema.nested).forEach(([field, nestedSchema]) => {
        if (item[field] && Array.isArray(item[field])) {
          item[field].forEach((nestedItem, nestedIndex) => {
            nestedSchema.required.forEach(nestedField => {
              if (!nestedItem.hasOwnProperty(nestedField) || nestedItem[nestedField] === undefined || nestedItem[nestedField] === '') {
                issues.push(`Entry ${index} (ID: ${item.id}): ${field}[${nestedIndex}] missing required field '${nestedField}'`);
              }
            });
          });
        }
      });

      // Type-specific validations
      if (type === 'experiences' && item.url && Array.isArray(item.url)) {
        item.url.forEach((url, urlIndex) => {
          if (url && !url.startsWith('http')) {
            issues.push(`Entry ${index} (ID: ${item.id}): url[${urlIndex}] should start with http/https`);
          }
        });
      } else if (item.url && typeof item.url === 'string' && !item.url.startsWith('http')) {
        issues.push(`Entry ${index} (ID: ${item.id}): url should start with http/https`);
      }
    });

    return issues;
  }

  async exportDataMenu() {
    console.clear();
    console.log('📤 Export Data');
    console.log('==============');
    console.log('1. Export as JSON');
    console.log('2. Export as CSV (simplified)');
    console.log('3. Back to Main Menu');
    console.log('');

    const choice = await this.prompt('Select export format (1-3): ');
    
    switch (choice.trim()) {
      case '1':
        await this.exportAsJSON();
        break;
      case '2':
        await this.exportAsCSV();
        break;
      case '3':
        await this.showMainMenu();
        return;
      default:
        console.log('Invalid option. Please try again.');
        await this.pause();
        await this.exportDataMenu();
    }
  }

  async exportAsJSON() {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `portfolio-data-export-${timestamp}.json`;
    const exportData = {
      exportDate: new Date().toISOString(),
      data: this.currentData
    };

    try {
      fs.writeFileSync(filename, JSON.stringify(exportData, null, 2));
      console.log(`✅ Data exported to ${filename}`);
    } catch (error) {
      console.log(`❌ Export failed: ${error.message}`);
    }

    await this.pause();
    await this.exportDataMenu();
  }

  async exportAsCSV() {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    
    for (const [type, data] of Object.entries(this.currentData)) {
      const filename = `${type}-${timestamp}.csv`;
      let csv = '';

      if (data.length > 0) {
        // Create CSV headers based on first item
        const headers = Object.keys(data[0]).filter(key => typeof data[0][key] !== 'object' || data[0][key] === null);
        csv += headers.join(',') + '\n';

        // Add data rows
        data.forEach(item => {
          const row = headers.map(header => {
            let value = item[header] || '';
            // Escape commas and quotes in CSV
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              value = '"' + value.replace(/"/g, '""') + '"';
            }
            return value;
          });
          csv += row.join(',') + '\n';
        });

        try {
          fs.writeFileSync(filename, csv);
          console.log(`✅ ${type} exported to ${filename}`);
        } catch (error) {
          console.log(`❌ Export failed for ${type}: ${error.message}`);
        }
      }
    }

    await this.pause();
    await this.exportDataMenu();
  }

  async saveData(type) {
    const filePath = DATA_FILES[type];
    const data = this.currentData[type];
    
    // Generate the JavaScript file content
    const varName = type;
    let content = `var ${varName} = ${JSON.stringify(data, null, 2)};\n\n`;
    content += `module.exports = { ${varName} };\n`;

    // Special handling for projects to include projectTags
    if (type === 'projects') {
      // Read existing file to preserve projectTags
      const existingContent = fs.readFileSync(filePath, 'utf8');
      const projectTagsMatch = existingContent.match(/var projectTags = \[[\s\S]*?\];/);
      const getProjectTagMatch = existingContent.match(/function getProjectTagByName[\s\S]*?^}/m);
      
      if (projectTagsMatch && getProjectTagMatch) {
        content = projectTagsMatch[0] + '\n\n' + getProjectTagMatch[0] + '\n\n' + content;
      }
    }

    try {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${type} saved to ${filePath}`);
    } catch (error) {
      console.log(`❌ Save failed: ${error.message}`);
      throw error;
    }
  }

  getItemTitle(item, type) {
    switch (type) {
      case 'experiences':
        return item.company || 'Unnamed Company';
      case 'projects':
        return item.title || 'Untitled Project';
      case 'organizations':
        return item.name || 'Unnamed Organization';
      case 'awards':
        return item.name || 'Unnamed Award';
      default:
        return 'Unknown Item';
    }
  }

  getFieldExample(type, field) {
    const examples = {
      experiences: {
        company: 'Company Name',
        location: 'City, State',
        url: 'https://company.com',
        description: ['First achievement', 'Second achievement']
      },
      projects: {
        title: 'Project Name',
        description: 'Brief project description',
        tags: [{name: 'React', color: 'rgb(193, 198, 255)', background: 'rgba(75, 77, 99, 0.85)'}],
        images: ['/src/image1.png', '/src/image2.png']
      },
      organizations: {
        name: 'Organization Name',
        yearsActive: 'Start - End',
        description: ['Achievement 1', 'Achievement 2']
      },
      awards: {
        name: 'Award Name',
        issuer: 'Issuing Organization',
        date: 'Month Year'
      }
    };

    return examples[type]?.[field] || '';
  }

  prompt(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  pause() {
    return this.prompt('Press Enter to continue...');
  }
}

// Main execution
async function main() {
  const manager = new DataManager();
  
  try {
    while (true) {
      await manager.showMainMenu();
    }
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = DataManager;
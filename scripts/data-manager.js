#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');
const os = require('os');

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
    console.log('🚀 Portfolio Data Manager v2.0');
    console.log('===============================');
    console.log('1. 📊 Browse & View Data (Enhanced)');
    console.log('2. ➕ Add New Entry');
    console.log('3. ✏️  Edit Entry');
    console.log('4. 🗑️  Delete Entry');
    console.log('5. 🔍 Validate Data');
    console.log('6. 📤 Export Data');
    console.log('7. 🚪 Exit');
    console.log('');
    console.log('💡 Enhanced features: Detailed viewing, HTML formatting, advanced editing');
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
        await this.browseData('experiences');
        break;
      case '2':
        await this.browseData('projects');
        break;
      case '3':
        await this.browseData('organizations');
        break;
      case '4':
        await this.browseData('awards');
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

  async browseData(type) {
    while (true) {
      console.clear();
      const data = this.currentData[type];
      const title = type.charAt(0).toUpperCase() + type.slice(1);
      
      console.log(`📋 Browse ${title}`);
      console.log('='.repeat(title.length + 9));
      console.log(`Total entries: ${data.length}\n`);

      if (data.length === 0) {
        console.log('No entries found.');
        return;
      }

      data.forEach((item, index) => {
        console.log(`${index + 1}. ${this.getItemTitle(item, type)} (ID: ${item.id})`);
      });
      
      console.log(`${data.length + 1}. Back to View Menu`);
      console.log('');

      const choice = await this.prompt(`Select entry to view in detail (1-${data.length + 1}): `);
      const index = parseInt(choice) - 1;

      if (index === data.length) {
        return; // Back to view menu
      }

      if (index >= 0 && index < data.length) {
        await this.displayDetailedEntry(type, index);
      } else {
        console.log('Invalid selection. Please try again.');
        await this.pause();
      }
    }
  }

  async displayDetailedEntry(type, index) {
    const entry = this.currentData[type][index];
    const title = this.getItemTitle(entry, type);
    
    console.clear();
    console.log(`🔍 Detailed View: ${title}`);
    console.log('='.repeat(50));
    console.log('');

    await this.formatAndDisplayEntry(entry, type);

    console.log('\n' + '='.repeat(50));
    console.log('Options:');
    console.log('1. Edit this entry');
    console.log('2. Delete this entry');
    console.log('3. Back to list');
    console.log('');

    const choice = await this.prompt('Select action (1-3): ');
    
    switch (choice.trim()) {
      case '1':
        await this.editEntry(type, index);
        break;
      case '2':
        await this.confirmDeleteEntry(type, index);
        break;
      case '3':
      default:
        return;
    }
  }

  async formatAndDisplayEntry(entry, type) {
    // Display basic information
    console.log(`📋 Basic Information`);
    console.log(`ID: ${entry.id}`);
    
    if (type === 'experiences') {
      console.log(`Company: ${entry.company}`);
      console.log(`Location: ${entry.location}`);
      if (entry.fullDates) {
        console.log(`Full Duration: ${entry.fullDates}`);
      }
      if (entry.url) {
        if (Array.isArray(entry.url)) {
          console.log(`URLs: ${entry.url.join(', ')}`);
        } else {
          console.log(`URL: ${entry.url}`);
        }
      }
      if (entry.linkedin) {
        console.log(`LinkedIn: ${entry.linkedin}`);
      }
      
      console.log('\n📍 Positions:');
      entry.positions.forEach((position, idx) => {
        console.log(`\n  Position ${idx + 1}:`);
        console.log(`    Title: ${position.title}`);
        console.log(`    Type: ${position.type}`);
        console.log(`    Dates: ${position.dates}`);
        if (position.summary) {
          console.log(`    Summary: ${position.summary}`);
        }
        if (position.description && position.description.length > 0) {
          console.log(`    Description:`);
          position.description.forEach(desc => {
            console.log(`      • ${desc}`);
          });
        }
      });
      
    } else if (type === 'projects') {
      console.log(`Title: ${entry.title}`);
      console.log(`Description: ${entry.description}`);
      
      if (entry.github) {
        console.log(`GitHub: ${entry.github}`);
      }
      if (entry.url) {
        console.log(`URL: ${entry.url}`);
      }
      if (entry.code) {
        console.log(`Code: ${entry.code}`);
      }
      
      if (entry.tags && entry.tags.length > 0) {
        console.log('\n🏷️  Tags:');
        entry.tags.forEach(tag => {
          console.log(`    • ${tag.name} (${tag.color})`);
        });
      }
      
      if (entry.images && entry.images.length > 0) {
        console.log('\n🖼️  Images:');
        entry.images.forEach((image, idx) => {
          console.log(`    ${idx + 1}. ${image}`);
        });
      }
      
    } else if (type === 'organizations') {
      console.log(`Name: ${entry.name}`);
      console.log(`Years Active: ${entry.yearsActive}`);
      
      if (entry.summary) {
        console.log(`Summary: ${entry.summary}`);
      }
      
      if (entry.role && entry.role.length > 0) {
        console.log('\n👥 Roles:');
        entry.role.forEach((role, idx) => {
          console.log(`  ${idx + 1}. ${role.title} (${role.years})`);
        });
      }
      
      if (entry.description && entry.description.length > 0) {
        console.log('\n📝 Description:');
        entry.description.forEach(desc => {
          console.log(`  • ${desc}`);
        });
      }
      
    } else if (type === 'awards') {
      console.log(`Name: ${entry.name}`);
      console.log(`Issuer: ${entry.issuer}`);
      console.log(`Date: ${entry.date}`);
    }
    
    // Display images info
    if (entry.headerImage) {
      console.log(`\n🖼️  Header Image: ${entry.headerImage}`);
    }
    if (entry.logo) {
      console.log(`🏢 Logo: ${entry.logo}`);
    }
    
    // Display additional information with HTML formatting
    if (entry.additionalInformation) {
      console.log('\n📄 Additional Information:');
      console.log('-'.repeat(30));
      await this.displayFormattedHTML(entry.additionalInformation);
    }

    // Display description for awards
    if (type === 'awards' && entry.description) {
      console.log('\n📄 Description:');
      console.log('-'.repeat(30));
      await this.displayFormattedHTML(entry.description);
    }
  }

  async displayFormattedHTML(htmlContent) {
    if (!htmlContent) {
      console.log('(No content)');
      return;
    }

    try {
      // Convert HTML to readable text with basic formatting
      let formatted = htmlContent
        // Remove extra whitespace and normalize line breaks
        .replace(/\s+/g, ' ')
        .replace(/\n\s*/g, '\n')
        // Convert common HTML tags to readable format
        .replace(/<div[^>]*>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<p[^>]*>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<h[1-6][^>]*>/gi, '\n\n=== ')
        .replace(/<\/h[1-6]>/gi, ' ===\n')
        .replace(/<b[^>]*>/gi, '**')
        .replace(/<\/b>/gi, '**')
        .replace(/<strong[^>]*>/gi, '**')
        .replace(/<\/strong>/gi, '**')
        .replace(/<i[^>]*>/gi, '*')
        .replace(/<\/i>/gi, '*')
        .replace(/<em[^>]*>/gi, '*')
        .replace(/<\/em>/gi, '*')
        .replace(/<ul[^>]*>/gi, '\n')
        .replace(/<\/ul>/gi, '\n')
        .replace(/<ol[^>]*>/gi, '\n')
        .replace(/<\/ol>/gi, '\n')
        .replace(/<li[^>]*>/gi, '  • ')
        .replace(/<\/li>/gi, '\n')
        .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi, '[')
        .replace(/<\/a>/gi, ']')
        // Remove any remaining HTML tags
        .replace(/<[^>]+>/g, '')
        // Clean up extra whitespace
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .replace(/^\s+|\s+$/g, '')
        .trim();

      // Split into lines and format nicely
      const lines = formatted.split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          // Wrap long lines
          if (line.length > 80) {
            const words = line.split(' ');
            let currentLine = '';
            for (const word of words) {
              if (currentLine.length + word.length + 1 <= 80) {
                currentLine += (currentLine ? ' ' : '') + word;
              } else {
                if (currentLine) {
                  console.log(currentLine);
                  currentLine = word;
                } else {
                  console.log(word);
                }
              }
            }
            if (currentLine) {
              console.log(currentLine);
            }
          } else {
            console.log(line);
          }
        } else {
          console.log('');
        }
      });
    } catch (error) {
      console.log('Error formatting HTML content:');
      console.log(htmlContent);
    }
  }

  async confirmDeleteEntry(type, index) {
    const entry = this.currentData[type][index];
    const title = this.getItemTitle(entry, type);
    
    console.log(`\n⚠️  You are about to delete: ${title}`);
    console.log('This action cannot be undone!');
    
    const confirm = await this.prompt('\nAre you sure? Type "DELETE" to confirm: ');
    if (confirm === 'DELETE') {
      this.currentData[type].splice(index, 1);
      await this.saveData(type);
      console.log('✅ Entry deleted successfully!');
      await this.pause();
    } else {
      console.log('❌ Deletion cancelled.');
      await this.pause();
    }
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

  async editTagsDetailed(tags) {
    console.log('Current tags:');
    if (tags.length === 0) {
      console.log('  (No tags)');
    } else {
      tags.forEach((tag, idx) => {
        console.log(`  ${idx + 1}. ${tag.name}`);
      });
    }
    
    const editChoice = await this.prompt('\n1. Replace all tags\n2. Keep current tags\nChoice: ');
    
    if (editChoice === '1') {
      const tagsInput = await this.prompt('Enter tag names (comma-separated): ');
      if (tagsInput.trim()) {
        return await this.processTags(tagsInput);
      }
    }
    
    return tags;
  }
  
  async editHTMLContent(content) {
    console.log('Current HTML content:');
    console.log('-'.repeat(40));
    await this.displayFormattedHTML(content);
    console.log('-'.repeat(40));
    
    const editChoice = await this.prompt('\n1. Edit in external editor\n2. Replace with new content\n3. Keep current\nChoice: ');
    
    if (editChoice === '1') {
      return await this.editInExternalEditor(content, 'html');
    } else if (editChoice === '2') {
      console.log('\nEnter new HTML content (type "END" on a new line to finish):');
      return await this.collectMultilineInput();
    }
    
    return content;
  }
  
  async editArrayField(array, fieldName) {
    while (true) {
      console.clear();
      console.log(`✏️  Edit ${fieldName}`);
      console.log('='.repeat(20));
      
      if (array.length === 0) {
        console.log(`No ${fieldName} found.`);
      } else {
        array.forEach((item, idx) => {
          const preview = typeof item === 'string' && item.length > 50 
            ? item.substring(0, 50) + '...' 
            : item;
          console.log(`${idx + 1}. ${preview}`);
        });
      }
      
      console.log(`\n${array.length + 1}. Add new item`);
      console.log(`${array.length + 2}. Done editing`);
      if (array.length > 0) {
        console.log(`${array.length + 3}. Remove an item`);
      }
      console.log('');
      
      const maxChoice = array.length > 0 ? array.length + 3 : array.length + 2;
      const choice = await this.prompt(`Select option (1-${maxChoice}): `);
      const choiceNum = parseInt(choice) - 1;
      
      if (choiceNum >= 0 && choiceNum < array.length) {
        const newValue = await this.prompt(`Edit item ${choiceNum + 1} [${array[choiceNum]}]: `);
        if (newValue.trim()) {
          array[choiceNum] = newValue;
        }
      } else if (choiceNum === array.length) {
        const newItem = await this.prompt('New item: ');
        if (newItem.trim()) {
          array.push(newItem.trim());
        }
      } else if (choiceNum === array.length + 1) {
        break;
      } else if (choiceNum === array.length + 2 && array.length > 0) {
        const removeIdx = await this.prompt(`Remove item number (1-${array.length}): `);
        const removeIndex = parseInt(removeIdx) - 1;
        if (removeIndex >= 0 && removeIndex < array.length) {
          array.splice(removeIndex, 1);
        }
      } else {
        console.log('Invalid option.');
        await this.pause();
      }
    }
    
    return array;
  }
  
  async editSimpleField(currentValue, fieldName) {
    console.log(`Current ${fieldName}: ${currentValue || '[not set]'}`);
    const newValue = await this.prompt(`New ${fieldName}: `);
    return newValue.trim() || currentValue;
  }
  
  async editInExternalEditor(content, fileType = 'txt') {
    const tempFile = path.join(os.tmpdir(), `portfolio-edit-${Date.now()}.${fileType}`);
    
    try {
      fs.writeFileSync(tempFile, content || '');
      
      console.log(`\nOpening ${tempFile} in external editor...`);
      console.log('Save and close the file when done editing.');
      
      const editor = process.env.EDITOR || 'nano';
      execSync(`${editor} "${tempFile}"`, { stdio: 'inherit' });
      
      const editedContent = fs.readFileSync(tempFile, 'utf8');
      fs.unlinkSync(tempFile);
      
      return editedContent;
    } catch (error) {
      console.log('Error with external editor:', error.message);
      console.log('Falling back to manual input.');
      return await this.collectMultilineInput();
    }
  }
  
  async collectMultilineInput() {
    const lines = [];
    let line;
    
    while ((line = await this.prompt('> ')) !== 'END') {
      lines.push(line);
    }
    
    return lines.join('\n');
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
    const entry = this.currentData[type][index];
    const title = this.getItemTitle(entry, type);
    
    while (true) {
      console.clear();
      console.log(`✏️  Editing: ${title}`);
      console.log('='.repeat(50));
      console.log('Select field to edit:\n');
      
      const schema = SCHEMAS[type];
      const allFields = [...schema.required, ...schema.optional].filter(f => f !== 'id');
      
      allFields.forEach((field, idx) => {
        const currentValue = entry[field];
        let preview = this.getFieldPreview(currentValue, field, type);
        console.log(`${idx + 1}. ${field}: ${preview}`);
      });
      
      console.log(`${allFields.length + 1}. Preview entire entry`);
      console.log(`${allFields.length + 2}. Save changes`);
      console.log(`${allFields.length + 3}. Cancel and return`);
      console.log('');
      
      const choice = await this.prompt(`Select option (1-${allFields.length + 3}): `);
      const choiceNum = parseInt(choice) - 1;
      
      if (choiceNum >= 0 && choiceNum < allFields.length) {
        const field = allFields[choiceNum];
        await this.editField(entry, field, type);
      } else if (choiceNum === allFields.length) {
        await this.previewEntry(entry, type);
      } else if (choiceNum === allFields.length + 1) {
        // Save changes
        await this.saveData(type);
        console.log('✅ Changes saved successfully!');
        await this.pause();
        return;
      } else if (choiceNum === allFields.length + 2) {
        // Cancel
        console.log('❌ Changes cancelled.');
        this.loadAllData(); // Reload original data
        await this.pause();
        return;
      } else {
        console.log('Invalid option. Please try again.');
        await this.pause();
      }
    }
  }
  
  getFieldPreview(value, field, type) {
    if (!value) return '[not set]';
    
    if (field === 'additionalInformation' || field === 'description') {
      if (typeof value === 'string' && value.includes('<')) {
        const textOnly = value.replace(/<[^>]+>/g, '').trim();
        return `[HTML: ${textOnly.substring(0, 50)}${textOnly.length > 50 ? '...' : ''}]`;
      }
    }
    
    if (Array.isArray(value)) {
      if (field === 'positions' || field === 'role') {
        return `[${value.length} items]`;
      } else if (field === 'tags') {
        return `[${value.map(t => t.name || t).join(', ')}]`;
      } else {
        return `[${value.join(', ')}]`;
      }
    }
    
    if (typeof value === 'string' && value.length > 60) {
      return `[${value.substring(0, 60)}...]`;
    }
    
    return `[${value}]`;
  }
  
  async previewEntry(entry, type) {
    console.clear();
    console.log('🔍 Entry Preview');
    console.log('='.repeat(20));
    await this.formatAndDisplayEntry(entry, type);
    await this.pause();
  }
  
  async editField(entry, field, type) {
    console.clear();
    console.log(`✏️  Editing Field: ${field}`);
    console.log('='.repeat(30));
    
    const currentValue = entry[field];
    
    if (field === 'positions' && type === 'experiences') {
      entry[field] = await this.editPositionsDetailed(currentValue || []);
    } else if (field === 'role' && type === 'organizations') {
      entry[field] = await this.editRolesDetailed(currentValue || []);
    } else if (field === 'tags' && type === 'projects') {
      entry[field] = await this.editTagsDetailed(currentValue || []);
    } else if (field === 'additionalInformation' || (field === 'description' && typeof currentValue === 'string' && currentValue.includes('<'))) {
      entry[field] = await this.editHTMLContent(currentValue || '');
    } else if (Array.isArray(currentValue)) {
      entry[field] = await this.editArrayField(currentValue || [], field);
    } else {
      entry[field] = await this.editSimpleField(currentValue, field);
    }
  }

  async editPositionsDetailed(positions) {
    while (true) {
      console.clear();
      console.log('✏️  Edit Positions');
      console.log('='.repeat(20));
      
      if (positions.length === 0) {
        console.log('No positions found.');
      } else {
        positions.forEach((pos, idx) => {
          console.log(`${idx + 1}. ${pos.title} (${pos.dates})`);
        });
      }
      
      console.log(`\n${positions.length + 1}. Add new position`);
      console.log(`${positions.length + 2}. Done editing positions`);
      console.log('');
      
      const choice = await this.prompt(`Select option (1-${positions.length + 2}): `);
      const choiceNum = parseInt(choice) - 1;
      
      if (choiceNum >= 0 && choiceNum < positions.length) {
        positions[choiceNum] = await this.editSinglePosition(positions[choiceNum]);
      } else if (choiceNum === positions.length) {
        const newPosition = await this.createNewPosition();
        if (newPosition) {
          positions.push(newPosition);
        }
      } else if (choiceNum === positions.length + 1) {
        break;
      } else {
        console.log('Invalid option.');
        await this.pause();
      }
    }
    
    return positions;
  }
  
  async editSinglePosition(position) {
    console.clear();
    console.log('✏️  Edit Position');
    console.log('='.repeat(20));
    
    console.log('Current values shown in [brackets]. Press Enter to keep current value.\n');
    
    const newTitle = await this.prompt(`Title [${position.title}]: `);
    if (newTitle.trim()) position.title = newTitle;
    
    const newDates = await this.prompt(`Dates [${position.dates}]: `);
    if (newDates.trim()) position.dates = newDates;
    
    const newType = await this.prompt(`Type [${position.type}]: `);
    if (newType.trim()) position.type = newType;
    
    const newSummary = await this.prompt(`Summary [${position.summary || 'not set'}]: `);
    if (newSummary.trim()) {
      position.summary = newSummary;
    } else if (newSummary === '' && position.summary) {
      delete position.summary;
    }
    
    console.log('\nCurrent description:');
    if (position.description && position.description.length > 0) {
      position.description.forEach((desc, idx) => {
        console.log(`  ${idx + 1}. ${desc}`);
      });
    } else {
      console.log('  (No description items)');
    }
    
    const editDesc = await this.prompt('\nEdit description items? (y/n): ');
    if (editDesc.toLowerCase().startsWith('y')) {
      position.description = await this.editArrayField(position.description || [], 'description items');
    }
    
    return position;
  }
  
  async createNewPosition() {
    console.clear();
    console.log('➕ Add New Position');
    console.log('='.repeat(20));
    
    const position = {};
    
    position.title = await this.prompt('Title: ');
    if (!position.title.trim()) {
      console.log('Title is required.');
      await this.pause();
      return null;
    }
    
    position.dates = await this.prompt('Dates: ');
    if (!position.dates.trim()) {
      console.log('Dates are required.');
      await this.pause();
      return null;
    }
    
    position.type = await this.prompt('Type (Full-time/Part-time/Internship): ');
    if (!position.type.trim()) {
      console.log('Type is required.');
      await this.pause();
      return null;
    }
    
    const summary = await this.prompt('Summary (optional): ');
    if (summary.trim()) {
      position.summary = summary;
    }
    
    const addDesc = await this.prompt('Add description items? (y/n): ');
    if (addDesc.toLowerCase().startsWith('y')) {
      position.description = await this.editArrayField([], 'description items');
    }
    
    return position;
  }
  
  async editRolesDetailed(roles) {
    while (true) {
      console.clear();
      console.log('✏️  Edit Roles');
      console.log('='.repeat(15));
      
      if (roles.length === 0) {
        console.log('No roles found.');
      } else {
        roles.forEach((role, idx) => {
          console.log(`${idx + 1}. ${role.title} (${role.years})`);
        });
      }
      
      console.log(`\n${roles.length + 1}. Add new role`);
      console.log(`${roles.length + 2}. Done editing roles`);
      console.log('');
      
      const choice = await this.prompt(`Select option (1-${roles.length + 2}): `);
      const choiceNum = parseInt(choice) - 1;
      
      if (choiceNum >= 0 && choiceNum < roles.length) {
        const newTitle = await this.prompt(`Title [${roles[choiceNum].title}]: `);
        if (newTitle.trim()) roles[choiceNum].title = newTitle;
        
        const newYears = await this.prompt(`Years [${roles[choiceNum].years}]: `);
        if (newYears.trim()) roles[choiceNum].years = newYears;
      } else if (choiceNum === roles.length) {
        const title = await this.prompt('New role title: ');
        const years = await this.prompt('Years: ');
        if (title.trim() && years.trim()) {
          roles.push({ title: title.trim(), years: years.trim() });
        }
      } else if (choiceNum === roles.length + 1) {
        break;
      } else {
        console.log('Invalid option.');
        await this.pause();
      }
    }
    
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
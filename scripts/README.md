# Portfolio Data Manager CLI

A comprehensive command-line tool for managing your portfolio's static data files through an interactive interface.

## 🚀 Quick Start

```bash
# Launch the interactive data manager
npm run data

# Alternative direct usage
node scripts/data-manager.js
```

## 📋 Features

### 1. **View Data**
- Browse all data types (experiences, projects, organizations, awards)
- View detailed entries with formatted output
- Get data summary with counts and quick consistency checks

### 2. **Add New Entry**
- Interactive prompts for all required and optional fields
- Automatic ID assignment
- Schema validation
- Preview before saving

### 3. **Edit Entry**
- Select entries from a list
- Edit individual fields while preserving existing values
- Support for complex nested structures (positions, roles, tags)
- Preview changes before saving

### 4. **Delete Entry**
- Safe deletion with confirmation prompts
- Permanent deletion warning
- List-based selection interface

### 5. **Data Validation**
- Comprehensive schema validation
- Duplicate ID detection
- Missing required field checks
- URL format validation
- Nested structure validation

### 6. **Data Export**
- JSON export with timestamps
- CSV export for simplified analysis
- Preserves data integrity

## 📊 Data Types Supported

### Experiences
- **Required**: `id`, `positions`, `company`, `location`
- **Optional**: `url`, `linkedin`, `headerImage`, `logo`, `additionalInformation`, `fullDates`
- **Nested**: `positions` (title, dates, type, description, summary)

### Projects
- **Required**: `id`, `title`, `description`
- **Optional**: `github`, `url`, `code`, `tags`, `images`, `additionalInformation`
- **Nested**: `tags` (name, color, background)

### Organizations
- **Required**: `id`, `name`, `yearsActive`
- **Optional**: `role`, `summary`, `description`, `logo`, `headerImage`
- **Nested**: `role` (title, years)

### Awards
- **Required**: `id`, `name`, `issuer`, `date`
- **Optional**: `description`

## 🔧 Usage Examples

### Adding a New Experience
```bash
npm run data
# Select option 2 (Add New Entry)
# Select option 1 (Experience)
# Follow the interactive prompts
```

### Quick Data Validation
The CLI performs automatic validation including:
- Duplicate ID detection across all entries
- Missing required fields
- Proper URL formatting
- Nested structure integrity

### Bulk Operations
- View all data with summary statistics
- Export all data types simultaneously
- Validate entire dataset at once

## ⚠️ Safety Features

### Data Backup
- All edits are validated before saving
- Original data is preserved until confirmed
- Automatic reload on cancellation

### Deletion Protection
- Requires typing "DELETE" to confirm
- Multiple confirmation prompts
- No accidental deletions

### File Integrity
- Preserves JavaScript module structure
- Maintains existing formatting where possible
- Handles complex data types (arrays, objects)

## 🛠️ Technical Details

### File Structure
```
scripts/
├── data-manager.js       # Main CLI application
└── README.md            # This documentation

src/data/                # Data files managed by CLI
├── experience.js
├── project.js
├── organization.js
└── award.js
```

### Schema Validation
The CLI uses predefined schemas to ensure data consistency:

```javascript
const SCHEMAS = {
  experiences: {
    required: ['id', 'positions', 'company', 'location'],
    optional: ['url', 'linkedin', 'headerImage', 'logo', 'additionalInformation'],
    nested: {
      positions: {
        required: ['title', 'dates', 'type'],
        optional: ['description', 'summary']
      }
    }
  }
  // ... other schemas
};
```

### Export Formats

#### JSON Export
- Complete data structure preservation
- Includes export metadata (timestamp, etc.)
- Suitable for backups and migration

#### CSV Export  
- Flattened structure for analysis
- Separate files per data type
- Handles complex fields appropriately

## 🔍 Validation Rules

1. **ID Uniqueness**: No duplicate IDs within each data type
2. **Required Fields**: All schema-required fields must be present and non-empty
3. **URL Format**: URLs must start with `http://` or `https://`
4. **Nested Validation**: Complex structures validated recursively
5. **Type Consistency**: Array and object types maintained

## 📝 Best Practices

### Data Entry
1. Use consistent date formats (e.g., "Jan. 2023 - Present")
2. Keep descriptions as arrays of strings for bullet points
3. Use full URLs including protocol (https://)
4. Maintain consistent company/organization naming

### Editing Workflow
1. Always run validation after major changes
2. Preview entries before saving
3. Use the summary view to check overall data health
4. Export data regularly for backups

### Tags and Categories
- Projects: Use existing tag system with consistent naming
- Keep tag colors and backgrounds consistent with existing palette
- Add new tags thoughtfully to maintain visual consistency

## 🚨 Troubleshooting

### Common Issues

**CLI won't start**
```bash
# Ensure the script is executable
chmod +x scripts/data-manager.js

# Check Node.js version (requires Node.js 12+)
node --version
```

**Data not saving**
- Check file permissions on `src/data/` directory
- Ensure no syntax errors in existing data files
- Verify the data structure matches the schema

**Validation errors**
- Run the validation tool to identify specific issues
- Check for missing required fields
- Verify URL formats include protocol

### Recovery
If data becomes corrupted:
1. Check git history for previous versions
2. Use exported JSON files to restore data
3. Manually fix syntax errors in data files

## 🔄 Integration

The CLI integrates seamlessly with your existing workflow:

- **Development**: Use during development to quickly add/edit content
- **Content Updates**: Ideal for regular portfolio updates
- **Data Maintenance**: Regular validation ensures data quality
- **Backup/Export**: Easy data export for backup purposes

## 🎯 Future Enhancements

Potential future features:
- Batch import from CSV/JSON
- Data migration tools
- Advanced search/filtering
- Template-based entry creation
- Integration with git for automatic commits

---

This CLI tool makes managing your portfolio data efficient, safe, and user-friendly while maintaining the flexibility of your existing data structure.
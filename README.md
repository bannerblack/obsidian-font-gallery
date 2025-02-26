# Font Gallery for Obsidian (Automatically Generated Until Major Release)

![Font Gallery Banner](https://example.com/font-gallery-banner.png)

## Overview

Font Gallery is a powerful Obsidian plugin that helps you visualize, organize, and explore all the fonts installed on your system. It creates beautifully formatted preview notes for each font, allowing you to see how your text would look in different typefaces without installing additional software.

**Version:** 1.0.0  
**Compatibility:** Obsidian v0.15.0+  
**License:** MIT  
**Author:** Font Gallery Team

---

## 🚀 Features

### Core Functionality

- **Font Discovery**: Automatically detects and lists all fonts installed on your system using the Local Font Access API
- **Preview Generation**: Creates individual markdown notes with comprehensive font previews
- **Table of Contents**: Generates a master "Fonts MOC" (Map of Content) with links to all font previews
- **Font Metadata**: Captures and displays detailed font information including family name, style, and PostScript name
- **Template Customization**: Fully customizable font preview template with variables for font properties
- **Organization Options**: Specify output folder for font previews and control metadata format

### Preview Elements

Each font preview includes:
- Font name in large display text
- Text samples at various sizes (48px, 30px, 16px, 10px)
- Style variations (bold, italic, underlined, strikethrough)
- Letter spacing examples
- Line spacing examples
- Multi-column text layout
- Lorem ipsum text in the font for extended reading samples

### Metadata Options

Store font metadata in one of three formats:
- **YAML Properties**: Structured front matter at the top of each note
- **Tags**: Hashtags for font name and style
- **Links**: Wiki-style links to related font concepts

---

## 📋 Requirements

- **Obsidian**: v0.15.0 or higher

---

## 🔧 Installation

### Manual Installation

1. Download the latest release from the [GitHub repository](https://github.com/yourusername/obsidian-font-gallery/releases)
2. Extract the ZIP file
3. Move the extracted folder to your Obsidian vault's `.obsidian/plugins/` directory
4. Enable the plugin in Obsidian's Community Plugins settings

---

## 🎮 Usage

### Quick Start

1. Click the "Font Gallery" icon in the left ribbon, or use the command palette to run "Create Font Preview Notes"
2. Configure your preferences in the modal that appears
3. Click "Create Font Preview Notes" to generate the font previews in the selected folder

### Detailed Workflow

#### Step 1: Configure Settings

Before generating font previews, you can configure several options:

- **Create Table of Contents**: Toggle to generate a master "Fonts MOC" file
- **TOC Font Size**: Adjust the display size of font names in the Table of Contents
- **Include Metadata**: Toggle to include or exclude font metadata in notes
- **Metadata Location**: Choose between Tags, Links, or YAML Properties
- **Output Folder**: Specify where font preview notes should be saved
- **Font Preview Template**: Customize the HTML template used for previews

#### Step 2: Generate Previews

After configuring your settings, click "Create Font Preview Notes" to start the process. The plugin will:

1. Scan your system for available fonts
2. Create individual preview notes for each font
3. Generate a Table of Contents (if enabled - "Fonts MOC")
4. Display a notification when the process is complete

#### Step 3: Explore Your Fonts

- Navigate to the output folder you specified
- Open the "Fonts MOC.md" file to see all your fonts in one place
- Click on any font name to open its detailed preview

### Command Palette

The plugin adds the following command to Obsidian's command palette:

- **Create Font Preview Notes**: Opens the main Font Gallery modal

---

## ⚙️ Configuration

### Plugin Settings

Access the plugin settings through Obsidian's settings panel:

- **Include Metadata**: Toggle to include or exclude font metadata in notes
- **Metadata Location**: Choose between Tags, Links, or YAML Properties
- **Output Folder**: Specify where font preview notes should be saved
- **Create Table of Contents**: Toggle to generate a master "Fonts MOC" file
- **TOC Font Size**: Adjust the display size of font names in the Table of Contents
- **Font Preview Template**: Customize the HTML template used for previews

### Template Customization

The Font Gallery plugin provides three template options:

1. **Classic Layout**: A simple, traditional layout that displays font samples in various sizes and styles.
2. **Modern Layout**: A comprehensive, well-structured layout with sections for different typographic elements.
3. **Custom Template**: Create and edit your own HTML template to customize how font previews are displayed.

The template can be selected from:
- The main Font Gallery modal when creating font previews
- The plugin settings in Obsidian's settings panel

The Font Preview Template can be customized using the following variables:

- `{fontFamily}`: The font's family name
- `{fontName}`: Sanitized version of the font name (used for filenames)
- `{fullName}`: The font's full name (falls back to family name if not available)
- `{style}`: The font's style (falls back to "Regular" if not available)
- `{postscriptName}`: The font's PostScript name (if available)

To edit the custom template:
1. Select "Custom Template" from the template dropdown
2. Click "Edit Template" or "Edit Custom Template" 
3. Modify the HTML in the editor
4. Click "Save Template" to apply changes

You can also reset to the default template at any time by clicking "Reset to Default" in the template editor.

---

## 🔍 Technical Details

### Local Font Access API

Font Gallery uses the [Local Font Access API](https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API), a modern web API that provides access to the user's locally installed fonts. This API:

- Requires explicit user permission
- Provides detailed metadata about each font
- Is only available in compatible browsers

### Font Processing

The plugin processes fonts in batches to maintain performance:

1. Retrieves the complete list of system fonts
2. Deduplicates fonts by family name
3. Processes fonts in batches of 10
4. Generates HTML content using the template
5. Creates or updates markdown notes for each font

### Note Structure

Each font preview note includes:

- Optional YAML frontmatter with font metadata
- Optional tags or links for metadata
- HTML content based on the template
- Various text samples in the specified font

### Table of Contents

The Table of Contents (Fonts MOC) includes:

- A header with the title "Font Gallery"
- A description of the collection
- Alphabetically sorted links to all font preview notes
- Each font name displayed in its actual typeface

---

## 🔄 Updates and Maintenance

### Updating the Plugin

- **From Community Plugins**: Updates will appear in the Community Plugins section of Obsidian settings
- **Manual Updates**: Download the latest release and replace the plugin folder

### Data Management

- Font preview notes are standard markdown files and can be managed like any other notes
- Deleting the plugin will not remove any generated notes
- To completely remove all generated content, delete the output folder and the "Fonts MOC.md" file

### Recent Updates

#### Enhanced Typography Templates
- **Template Selector**: Choose between different template styles - Classic, Modern, or Custom
- **Improved Font MOC**: The Table of Contents now includes a descriptive paragraph explaining the font collection and its purpose.
- **New Font Preview Template**: A completely redesigned font preview template with modern layout and comprehensive typography samples:
  - Font overview with alphabet and symbol displays
  - Typography scale showing different text sizes
  - Font style variations (normal, bold, italic)
  - Paragraph examples with different line heights and spacing
  - Multi-column layout demonstration
  - Pangram collection for testing character sets

---

## 🐛 Troubleshooting

### Common Issues

#### No Fonts Found

**Symptom**: The plugin reports "No system fonts found"  
**Possible Causes**:
- Local Font Access API not supported in your browser
- Permission to access fonts was denied
- No fonts are installed on your system

**Solution**: Ensure you're using a compatible browser and grant permission when prompted.

#### Permission Errors

**Symptom**: Error message about permissions when creating notes  
**Possible Causes**:
- The specified output folder doesn't exist
- Obsidian doesn't have permission to write to the location

**Solution**: Choose a different output folder or ensure proper permissions.

#### Template Issues

**Symptom**: Font previews don't look as expected  
**Possible Causes**:
- Template variables are incorrect
- HTML in the template is malformed

**Solution**: Reset to the default template and make incremental changes.

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/yourusername/obsidian-font-gallery/issues) for similar problems
2. Submit a new issue with detailed information about your problem
3. Include your Obsidian version, operating system, and steps to reproduce the issue

---

## 🤝 Contributing

Contributions to Font Gallery are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

### Development Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Build the plugin with `npm run build`
4. Copy the built files to your Obsidian plugins folder for testing

---

## 📜 License

Font Gallery is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Thanks to the Obsidian team for creating an amazing platform
- Thanks to all contributors and testers
- Font information is provided by the Local Font Access API

---

*Font Gallery - Explore your typography universe in Obsidian* 
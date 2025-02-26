# Font Gallery for Obsidian (Automatically Generated Until Major Release)

![Screenshot of single note view](https://github.com/user-attachments/assets/b5f2efb8-0dd5-4a5e-b7e3-a18c9689152b)
![Screenshot of Font Gallery](https://github.com/user-attachments/assets/745a53ec-f63f-434f-8be8-003324cbe427)

## Overview

Font Gallery is anObsidian plugin that helps you visualize, organize, and explore all the fonts installed on your system. It creates formatted preview notes for each font, allowing you to see how your text would look in different typefaces without installing additional software.

---

## 🚀 Features

### Core Functionality

- **Font Discovery**: Automatically detects and lists all fonts installed on your system using the Local Font Access API
- **Preview Generation**: Creates individual markdown notes with comprehensive font previews
- **Table of Contents**: Generates a master "Fonts MOC" (Map of Content) with links to all font previews
- **Font Metadata**: Captures and displays detailed font information including family name, style, and PostScript name
- **Template Customization**: Fully customizable font preview template with variables for font properties
- **Organization Options**: Specify output folder for font previews and control metadata format

### Metadata Options (WIP)

Store font metadata in one of three formats:
- **YAML Properties**: Structured front matter at the top of each note
- **Tags**: Hashtags for font name and style
- **Links**: Wiki-style links to related font concepts

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

1. Use the command palette to run "Create Font Preview Notes"
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

### Template Customization (WIP)

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

## Recent Updates

### Enhanced Typography Templates
The Font Gallery plugin now includes a **Template Selector** feature that allows you to choose between different template styles:

- **Classic Layout**: A simple, clean layout for font previews
- **Modern Layout**: A more comprehensive layout with additional typography samples
- **Custom Template**: Create your own template with full customization options

You can select your preferred template style from both the Font Gallery modal and the plugin settings.

### Improved Code Organization
The plugin's codebase has been reorganized for better maintainability:

- **String Literals Separated**: All text strings have been moved to a dedicated `strings.ts` file, making it easier to edit and maintain text content
- **Template Constants**: Font preview templates are stored as constants, allowing for easy modification
- **Improved Logging**: Debug logging has been enhanced to help troubleshoot any issues

### Customization Options
The plugin now offers more customization options:

- **Template Editor**: Edit your custom template with a built-in editor
- **Template Variables**: Use variables like `{fontFamily}`, `{fontName}`, etc. to customize your template
- **Reset to Default**: Easily reset to the default template if needed
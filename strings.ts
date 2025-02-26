/*=======================================================
 *                    STRING LITERALS
 *=======================================================*/

// Modal strings
export const MODAL_STRINGS = {
	// Titles and headers
	PLUGIN_TITLE: "Font Gallery",
	MODAL_TITLE: "Font Gallery",
	TEMPLATE_EDITOR_TITLE: "Font Preview Template",

	// Descriptions
	MODAL_DESCRIPTION:
		"This will create preview notes for system fonts using the Local Font Access API. This feature requires a compatible browser.",
	TEMPLATE_EDITOR_DESCRIPTION:
		"This template will be used to generate font preview notes.",

	// Button labels
	CREATE_BUTTON: "Create Font Preview Notes",
	EDIT_TEMPLATE_BUTTON: "Edit Template",
	RESET_BUTTON: "Reset to Default",
	SAVE_TEMPLATE_BUTTON: "Save Template",
	BROWSE_BUTTON: "Browse",

	// Option labels
	TEMPLATE_STYLE_LABEL: "Template Style:",
	TOC_LABEL: "Create Table of Contents (Fonts MOC)",
	TOC_FONT_SIZE_LABEL: "TOC Font Size (em):",
	INCLUDE_METADATA_LABEL: "Include Metadata in Notes:",
	METADATA_LOCATION_LABEL: "Store Font Metadata as:",
	OUTPUT_FOLDER_LABEL: "Output Folder:",
	CUSTOM_TEMPLATE_LABEL: "Custom Template:",

	// Template style names
	CLASSIC_LAYOUT: "Classic Layout",
	MODERN_LAYOUT: "Modern Layout",
	CUSTOM_TEMPLATE: "Custom Template",

	// Notifications
	TEMPLATE_SAVED: "Template saved successfully",
	TEMPLATE_SAVE_ERROR: "Error saving template: ",
	RESET_CONFIRM: "Are you sure you want to reset to the default template?",
	INCLUDE_METADATA_UPDATED: "Include metadata setting updated",
	METADATA_LOCATION_UPDATED: "Metadata location updated",
	TOC_SETTING_UPDATED: "Table of contents setting updated",
	TOC_FONT_SIZE_UPDATED: "TOC font size updated",
	TEMPLATE_STYLE_UPDATED: "Template style updated to ",
	CUSTOM_TEMPLATE_FIRST:
		"Please select 'Custom Template' from the Template Style dropdown first.",

	// Variables info
	VARIABLES_TITLE: "Available Template Variables:",
	VARIABLES: [
		"{fontFamily} - The font's family name",
		"{fontName} - Sanitized version of the font name (used for filenames)",
		"{fullName} - The font's full name (falls back to family name if not available)",
		"{style} - The font's style (falls back to 'Regular' if not available)",
		"{postscriptName} - The font's PostScript name (if available)",
	],

	// Progress messages
	GETTING_FONTS: "Getting system fonts...",
	NO_FONTS_FOUND:
		"No system fonts found. The Local Font Access API may not be available in your browser.",
	PROCESSING_FONTS: "Processing {0} fonts...",
	FOUND_FONTS: "Found {0} fonts, processing {1} unique font families...",
	FINISHED_PROCESSING: "Finished processing {0} fonts, {1} failed.",
	FINISHED_WITH_TOC:
		"Finished processing {0} fonts, {1} failed. Table of Contents created.",
	FINISHED_WITHOUT_TOC:
		"Finished processing {0} fonts, {1} failed. Failed to create Table of Contents.",
	PROCESSING_ERROR: "An error occurred while processing fonts.",

	// Settings tab
	SETTINGS_INCLUDE_METADATA: "Include Metadata",
	SETTINGS_INCLUDE_METADATA_DESC: "Include font metadata in notes",
	SETTINGS_METADATA_LOCATION: "Metadata Location",
	SETTINGS_METADATA_LOCATION_DESC: "Where to store font metadata",
	SETTINGS_OUTPUT_FOLDER: "Output Folder",
	SETTINGS_OUTPUT_FOLDER_DESC:
		"Folder where font notes will be created (leave empty for vault root)",
	SETTINGS_CREATE_TOC: "Create Table of Contents",
	SETTINGS_CREATE_TOC_DESC: "Create a table of contents for font notes",
	SETTINGS_TOC_FONT_SIZE: "TOC Font Size",
	SETTINGS_TOC_FONT_SIZE_DESC: "Font size for table of contents",
	SETTINGS_TEMPLATE_STYLE: "Template Style",
	SETTINGS_TEMPLATE_STYLE_DESC:
		"Choose the template style for font preview notes",
	SETTINGS_FONT_PREVIEW_TEMPLATE: "Font Preview Template",
	SETTINGS_FONT_PREVIEW_TEMPLATE_DESC:
		"Customize the HTML template used for font preview notes",
	SETTINGS_CUSTOM_TEMPLATE_DESC:
		"Select 'Custom Template' from the Template Style dropdown to enable template editing.",

	// Metadata options
	METADATA_TAGS: "Tags",
	METADATA_LINKS: "Links",
	METADATA_PROPERTIES: "Note Properties (YAML)",

	// Debug messages
	DEBUG_CONSTRUCTOR_CALLED: "FontGalleryModal - Constructor called",
	DEBUG_SETTINGS_FOUND: "FontGalleryModal - Plugin settings found",
	DEBUG_NO_SETTINGS:
		"FontGalleryModal - No plugin settings found, using defaults",
	DEBUG_USING_CLASSIC: "FontGalleryModal - Using classic template",
	DEBUG_USING_MODERN: "FontGalleryModal - Using modern template",
	DEBUG_USING_CUSTOM:
		"FontGalleryModal - Using custom template from settings",
	DEBUG_USING_DEFAULT: "FontGalleryModal - Using default template (fallback)",
	DEBUG_TEMPLATE_SELECTION: "FontGalleryModal - Template selection: {0}",
	DEBUG_TEMPLATE_CONTENT: "FontGalleryModal - Template content: {0}",
	DEBUG_TEMPLATE_EDITOR_SELECTION:
		"TemplateEditorModal - Current template selection: {0}",
	DEBUG_TEMPLATE_EDITOR_CONTENT:
		"TemplateEditorModal - Current template content: {0}",
	DEBUG_ORIGINAL_TEMPLATE:
		"TemplateEditorModal - Original template set to: {0}",
	DEBUG_SAVE_BUTTON_CLICKED: "TemplateEditorModal - Save button clicked",
	DEBUG_NEW_TEMPLATE_VALUE: "TemplateEditorModal - New template value: {0}",
	DEBUG_SAVING_SETTINGS: "TemplateEditorModal - Saving to plugin settings",
	DEBUG_SETTINGS_SAVED: "TemplateEditorModal - Settings saved successfully",
	DEBUG_NO_PLUGIN_SETTINGS:
		"TemplateEditorModal - No plugin settings available, closing without saving",
	DEBUG_SETTINGS_EDITOR_SELECTION:
		"TemplateEditorSettingsModal - Current template selection: {0}",
	DEBUG_SETTINGS_EDITOR_CONTENT:
		"TemplateEditorSettingsModal - Current template content: {0}",
	DEBUG_SETTINGS_ORIGINAL_TEMPLATE:
		"TemplateEditorSettingsModal - Original template set to: {0}",
	DEBUG_SETTINGS_SAVE_CLICKED:
		"TemplateEditorSettingsModal - Save button clicked",
	DEBUG_SETTINGS_NEW_VALUE:
		"TemplateEditorSettingsModal - New template value: {0}",
	DEBUG_SETTINGS_SAVING:
		"TemplateEditorSettingsModal - Settings saved successfully",
	DEBUG_SETTINGS_SAVE_ERROR:
		"TemplateEditorSettingsModal - Error saving settings: {0}",
};

// CSS styles for modals
export const MODAL_STYLES = `
    .font-gallery-modal {
        padding: 20px;
    }
    
    .modal-header {
        margin-bottom: 24px;
        text-align: center;
    }
    
    .modal-title {
        margin-bottom: 8px;
        font-size: 24px;
    }
    
    .font-gallery-description {
        opacity: 0.8;
        margin-bottom: 16px;
    }
    
    .font-gallery-options-container {
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .font-gallery-option {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: var(--background-secondary);
        border-radius: 8px;
    }
    
    .option-label {
        flex: 1;
        margin-right: 10px;
        font-weight: 500;
    }
    
    .font-gallery-button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    
    .font-gallery-create-button {
        padding: 8px 16px;
        font-size: 16px;
        font-weight: 500;
    }
    
    .font-gallery-edit-template-button {
        padding: 6px 12px;
        background-color: var(--interactive-accent);
        color: var(--text-on-accent);
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }
    
    .font-gallery-edit-template-button:hover {
        background-color: var(--interactive-accent-hover);
    }
    
    .folder-input-container {
        display: flex;
        flex: 1;
        gap: 8px;
    }
    
    .font-gallery-folder-input {
        flex: 1;
        padding: 4px 8px;
    }
    
    .font-gallery-folder-browse {
        padding: 4px 8px;
        background-color: var(--interactive-accent);
        color: var(--text-on-accent);
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }
`;

// Template editor styles
export const TEMPLATE_EDITOR_STYLES = `
    .font-gallery-modal {
        padding: 20px;
    }
    
    .modal-header {
        margin-bottom: 24px;
        text-align: center;
    }
    
    .modal-title {
        margin-bottom: 8px;
        font-size: 24px;
    }
    
    .font-gallery-description {
        opacity: 0.8;
        margin-bottom: 16px;
    }
    
    .font-gallery-button-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    
    .font-gallery-create-button {
        padding: 8px 16px;
        font-size: 16px;
        font-weight: 500;
    }
    
    .font-gallery-template-editor {
        width: 100%;
        min-height: 300px;
        font-family: monospace;
        padding: 10px;
        border-radius: 4px;
        background-color: var(--background-primary);
        border: 1px solid var(--background-modifier-border);
    }
`;

// TOC template content
export const TOC_TEMPLATE = `<h1 style="font-size: 4em;">Font Gallery</h1>
<h4 style="text-align: left; font-weight: normal; font-size: 1.5rem; font-style:italic; margin-top: -20px">A collection of fonts installed on your system.</h4>
<p style="margin-top: 1em; margin-bottom: 2em;">This gallery showcases all the fonts available through the Local Font Access API on your system. Each font has its own dedicated page with typography samples and visual characteristics.</p>
<hr>

`;

// Helper function to format strings with placeholders
export function formatString(str: string, ...args: any[]): string {
	return str.replace(/{(\d+)}/g, (match, number) => {
		return typeof args[number] !== "undefined" ? args[number] : match;
	});
}

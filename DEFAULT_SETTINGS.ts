// Define the settings interface directly here to avoid circular imports
export interface FontGallerySettings {
	mySetting: string;
	metadataLocation: "tags" | "links" | "properties";
	createTableOfContents: boolean;
	tocFontSize: number;
	fontTemplate: string;
	includeMetadata: boolean;
	outputFolder: string;
	templateSelection: "classic" | "modern" | "custom";
}

// Define template constants
const CLASSIC_TEMPLATE =
	`<body style="font-family: '{fontFamily}'; font-gallery">
<!-- Headline -->
<h1 style="font-family: '{fontFamily}'; font-size: 4em;">{fontName}<h1>
<h4 style="font-family: '{fontFamily}'; text-align: left; font-weight: normal; font-size: 1.5rem; font-style:italic; margin-top: -20px">A brief introduction to a font.</h4>
<hr>
<!-- Font Sizes -->
<p style="font-family: '{fontFamily}'; font-size: 48px;">A Sensationalist Headline!</p>
<p style="font-family: '{fontFamily}'; font-size: 30px;">A Quarterly Concern</p>
<p style="font-family: '{fontFamily}'; font-size: 16px;">A simple blog post</p>
<p style="font-family: '{fontFamily}'; font-size: 10px;">The comment you want no one to see.</p>
<hr>
<!-- Weights and Decorations -->
<p style="font-family: '{fontFamily}'; font-weight: bold;">Bold Text Sample</p>
<p style="font-family: '{fontFamily}'; font-style: italic;">Italic Text Sample</p>
<p style="font-family: '{fontFamily}'; text-decoration: underline;">Underlined Text Sample</p>
<p style="font-family: '{fontFamily}'; text-decoration: line-through;">Strikethrough Text Sample</p>
<p style="font-family: '{fontFamily}'; letter-spacing: 2px;">Spaced Out Text Sample</p>
<hr>
<!-- All caps and line spacing -->
<h2 style="font-family: '{fontFamily}';">NO ONE WILL EVER SEE THIS!</h2>
<p style="font-family: '{fontFamily}'; line-height: 2;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<p style="font-family: '{fontFamily}';">Etiam ac ipsum ut nisi blandit ultrices ut imperdiet magna. Sed egestas ligula quam, sollicitudin ultrices erat sagittis ut. Curabitur sed magna orci. Vestibulum semper rhoncus dignissim. Mauris eget finibus elit, a posuere enim. Nulla eget dignissim sapien, vel finibus ipsum. Donec odio nulla, lobortis et porttitor vel, aliquet quis dolor. Sed nec faucibus leo. </p>
<hr>
<!-- Columns -->
<div style="font-family: '{fontFamily}'; column-count: 2;"><h1 style="font-family: '{fontFamily}';">Columnar & Du</h1>
<p style="font-family: '{fontFamily}';">There once was an animal so grotesk, so devilish, I couldn't think about anything but sinking my teeth into its pulsing neck. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p style="font-family: '{fontFamily}';">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>
</body>`.trim();

const MODERN_TEMPLATE =
	`<div class="font-showcase" style="max-width: 800px; margin: 0 auto; font-family: '{fontFamily}';">
<!-- Header Section -->
<header style="text-align: center; margin-bottom: 2em; border-bottom: 1px solid #ccc; padding-bottom: 1em;">
<h1 style="font-size: 4em; margin-bottom: 0.2em;">{fontFamily}</h1>
<p style="font-style: italic; opacity: 0.8; margin-top: 0;">
{style} • {fullName} • {postscriptName}
</p>
</header>
<!-- Font Overview -->
<section style="margin-bottom: 2em;">
<h2 style="font-size: 1.8em; border-bottom: 1px solid #eee; padding-bottom: 0.5em;">Font Overview</h2>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 1em;">
<div style="flex: 1; min-width: 200px; margin-right: 1em;">
<h3>Alphabet</h3>
<p style="font-size: 1.5em; line-height: 1.5;">
ABCDEFGHIJKLM<br>
NOPQRSTUVWXYZ<br>
abcdefghijklm<br>
nopqrstuvwxyz
</p>
</div>
<div style="flex: 1; min-width: 200px;">
<h3>Numerals & Symbols</h3>
<p style="font-size: 1.5em; line-height: 1.5;">
0123456789<br>
!@#$%^&*()_+<br>
[]{};:'",.<>/?<br>
|\`~-=
</p>
</div>
</div>
</section>
<!-- Typography Scales -->
<section style="margin-bottom: 2em;">
<h2 style="font-size: 1.8em; border-bottom: 1px solid #eee; padding-bottom: 0.5em;">Typography Scale</h2>
<p style="font-size: 3em; margin: 0.5em 0;">The quick brown fox (3em)</p>
<p style="font-size: 2.5em; margin: 0.5em 0;">The quick brown fox (2.5em)</p>
<p style="font-size: 2em; margin: 0.5em 0;">The quick brown fox (2em)</p>
<p style="font-size: 1.5em; margin: 0.5em 0;">The quick brown fox (1.5em)</p>
<p style="font-size: 1em; margin: 0.5em 0;">The quick brown fox (1em)</p>
<p style="font-size: 0.8em; margin: 0.5em 0;">The quick brown fox (0.8em)</p>
</section>
<!-- Font Styles -->
<section style="margin-bottom: 2em;">
<h2 style="font-size: 1.8em; border-bottom: 1px solid #eee; padding-bottom: 0.5em;">Font Styles</h2>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1em; margin-top: 1em;">
<div>
<h3>Normal</h3>
<p>The quick brown fox jumps over the lazy dog.</p>
</div>
<div>
<h3>Bold</h3>
<p style="font-weight: bold;">The quick brown fox jumps over the lazy dog.</p>
</div>
<div>
<h3>Italic</h3>
<p style="font-style: italic;">The quick brown fox jumps over the lazy dog.</p>
</div>
<div>
<h3>Bold Italic</h3>
<p style="font-weight: bold; font-style: italic;">The quick brown fox jumps over the lazy dog.</p>
</div>
</div>
</section>
<!-- Paragraph Examples -->
<section style="margin-bottom: 2em;">
<h2 style="font-size: 1.8em; border-bottom: 1px solid #eee; padding-bottom: 0.5em;">Paragraph Examples</h2>
<h3>Normal Line Height</h3>
<p style="margin-bottom: 1.5em;">
Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.
</p>
<h3>Increased Line Height (1.8)</h3>
<p style="line-height: 1.8; margin-bottom: 1.5em;">
Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.
</p>
<h3>Letter Spacing</h3>
<p style="letter-spacing: 1px;">
Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.
</p>
</section>
<!-- Columns Layout -->
<section style="margin-bottom: 2em;">
<h2 style="font-size: 1.8em; border-bottom: 1px solid #eee; padding-bottom: 0.5em;">Multi-Column Layout</h2>
<div style="column-count: 2; column-gap: 2em; margin-top: 1em;">
<p>Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.</p>
<p>Type design is a closely related craft, sometimes considered part of typography; most typographers do not design typefaces, and some type designers do not consider themselves typographers. In modern times, typography has been practiced by printers, typesetters, compositors, graphic designers, art directors, manga artists, comic book artists, and graffiti artists.</p>
</div>
</section>
<!-- Pangrams -->
<section style="margin-bottom: 2em;">
<h2 style="font-size: 1.8em; border-bottom: 1px solid #eee; padding-bottom: 0.5em;">Pangrams</h2>
<ul style="list-style-type: none; padding: 0;">
<li style="margin-bottom: 0.8em;">The quick brown fox jumps over the lazy dog.</li>
<li style="margin-bottom: 0.8em;">Pack my box with five dozen liquor jugs.</li>
<li style="margin-bottom: 0.8em;">How vexingly quick daft zebras jump!</li>
<li style="margin-bottom: 0.8em;">Sphinx of black quartz, judge my vow.</li>
<li style="margin-bottom: 0.8em;">Amazingly few discotheques provide jukeboxes.</li>
</ul>
</section>
</div>`.trim();

export const DEFAULT_SETTINGS: FontGallerySettings = {
	mySetting: "default",
	metadataLocation: "properties",
	createTableOfContents: true,
	tocFontSize: 1.5,
	outputFolder: "",
	fontTemplate: MODERN_TEMPLATE,
	includeMetadata: true,
	templateSelection: "modern",
};

// Export template constants for use elsewhere
export { CLASSIC_TEMPLATE, MODERN_TEMPLATE };

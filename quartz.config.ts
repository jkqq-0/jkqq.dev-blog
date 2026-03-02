import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "James Keys",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "jkqq.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "Jetbrains Mono",
      },
      colors: {
        lightMode: {
          light: 'rgb(255, 252, 240)',
          lightgray: 'rgb(230, 228, 217)',
          gray: 'rgb(183, 181, 172)',
          darkgray: 'rgb(111, 110, 105)',
          dark: 'rgb(16, 15, 15)',
          secondary: 'rgb(16, 15, 15)',
          tertiary: 'rgb(111, 110, 105)',
          highlight: 'rgb(230, 228, 217)',
          textHighlight: 'rgb(241, 214, 126)',
      },
        darkMode: {
          light: 'rgb(16, 15, 15)',
          lightgray: 'rgb(40, 39, 38)',
          gray: 'rgb(87, 86, 83)',
          darkgray: 'rgb(135, 133, 128)',
          dark: 'rgb(206, 205, 195)',
          secondary: 'rgb(206, 205, 195)',
          tertiary: 'rgb(135, 133, 128)',
          highlight: 'rgb(40, 39, 38)',
          textHighlight: 'rgb(67, 133, 190)',
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssSlug: "index",
        filter: (details) => !details.filePath.endsWith("index.md")
      }),
      Plugin.ContentIndex({
        enableSiteMap: false,
        enableRSS: true,
        rssSlug: "posts",
        includeInIndex: false,
        filter: (details) => 
          details.filePath.startsWith("Posts/") &&
          !details.filePath.endsWith("index.md"),
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

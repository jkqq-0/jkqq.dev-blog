import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ConditionalRender({
      component: Component.RecentNotes({
        filter: (page) => !(page.relativePath.endsWith("index.md") ?? false) && (page.relativePath?.startsWith("Posts") ?? false),
        showTags: false,
        limit: 5,
        title: "Recent Posts"
      }),
      condition: (page) => page.fileData.slug == "index",
    })
  ],
  footer: Component.Footer({
    links: {
      // GitHub: "https://github.com/jackyzha0/quartz",
      // RSS: "https://jkqq.dev/index.xml"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
     Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
        condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [
    // Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
      ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Breadcrumbs(), 
    Component.ArticleTitle(), 
    Component.ContentMeta(),
  ],
  left: [
    // Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    
  ],
  right: [],
}

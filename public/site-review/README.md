# Site Review Widget

Framework-light review overlay for editing visible copy, adding element, image, and section notes, previewing image swaps, saving locally, syncing notes to Cloudflare D1/R2, and exporting a Markdown report.

## Static Usage

```html
<script src="/site-review/site-review.js"></script>
<script>
  window.SiteReview.mount({
    title: "Project Site Review",
    subtitle: "Click page elements to draft edits and comments.",
    projectName: "Project Name",
    storageKey: "siteReview::project-name::" + location.pathname,
    exportFilenamePrefix: "project-site-review",
    cssHref: "/site-review/site-review.css",
    enableCloudSync: true,
    syncEndpoint: "/api/site-review/notes",
    authEndpoint: "/api/site-review/auth"
  });
</script>
```

## Don Diego Usage

The Next loader mounts the widget only when the URL contains:

```text
?review=1
```

Example:

```text
/es?review=1
```

Copy edits, completed/open status, and image previews are stored in `localStorage` per pathname and are re-applied after refresh. Notes are stored locally first and sync to Cloudflare D1 when the reviewer unlocks cloud sync with an editor password or a configured reviewer access code. Images attached to notes are uploaded to R2 and linked from the D1 note record. Image swaps are stored as browser-local previews; the Markdown export records the target selector and replacement file name so the asset can be updated in code.

Reviewer access codes can be configured with:

```text
SITE_REVIEW_ACCESS_CODES=ana:Ana,diego:Diego,client-01:Client 01
```

Keyboard shortcuts:

- `Option+N` toggles Add note mode.
- `Option+E` toggles Edit copy mode.
- `Option+I` toggles Swap image mode.
- `Esc` exits the active mode.

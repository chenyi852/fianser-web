/// <reference path="../.astro/types.astro" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

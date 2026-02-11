/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<{
  SUBSCRIBERS_KV: KVNamespace;
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
}>;

declare namespace App {
  interface Locals extends Runtime {}
}

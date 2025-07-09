/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL?: string;
  readonly VITE_VNLP_CORE_URL?: string;
  readonly VITE_APP_NAME?: string;
  readonly VITE_STORM_API_KEY?: string;
  readonly VITE_AGRO_API_KEY?: string;
  readonly VITE_PLANT_API_KEY?: string;
  readonly VITE_MAPBOX_ACESS_TOKEN?: string;
  readonly VITE_STRIPE_PUBLISH_KEY?: string;
  readonly VITE_STRIPE_SECRET_KEY?: string;
  readonly VITE_PLANT_NET_API_KEY?: string;
  readonly VITE_GOOEY_API_KEY?: string;
  readonly VITE_SERVER_BASE_URL?: string;
  readonly VITE_CLIENT_BASE_URL?: string;
  readonly VITE_CLIENT_NGROK_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

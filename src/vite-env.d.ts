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
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

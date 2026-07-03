export type Category =
  | 'national'
  | 'industry'
  | 'security'
  | 'vendor-default'
  | 'community'
  | 'company';

export type ArtifactType =
  | 'openapi'
  | 'asyncapi'
  | 'arazzo'
  | 'graphql'
  | 'json-schema'
  | 'apis-json'
  | 'overlay';

export type AdoptMethod = 'extends' | 'npm' | 'copy';

export interface Provenance {
  owner: string;
  url: string;
}

export interface AdoptVia {
  method: AdoptMethod;
  value: string;
  note?: string;
}

export interface Ruleset {
  id: string;
  name: string;
  publisher: string;
  category: Category;
  description: string;
  provenance: Provenance;
  sourceUrl: string;
  adoptVia: AdoptVia;
  artifactTypes: ArtifactType[];
  governed: boolean;
  notes?: string;
}

export interface Registry {
  name: string;
  description: string;
  version: string;
  url?: string;
  source?: string;
  categories?: Record<string, string>;
  rulesets: Ruleset[];
}

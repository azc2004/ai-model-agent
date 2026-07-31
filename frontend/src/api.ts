import type { ModelSpec, Provider, GPUSpec, TCOInput, TCOComparisonResult } from './types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export async function fetchProviders(): Promise<Provider[]> {
  const res = await fetch(`${API_BASE_URL}/providers`);
  if (!res.ok) throw new Error('Failed to fetch providers');
  return res.json();
}

export async function fetchModels(params?: {
  provider_id?: string;
  tier?: string;
  is_open_weight?: boolean;
  search?: string;
}): Promise<ModelSpec[]> {
  const query = new URLSearchParams();
  if (params?.provider_id) query.append('provider_id', params.provider_id);
  if (params?.tier) query.append('tier', params.tier);
  if (params?.is_open_weight !== undefined) query.append('is_open_weight', String(params.is_open_weight));
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${API_BASE_URL}/models?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch models');
  return res.json();
}

export async function fetchModelDetail(id: string): Promise<ModelSpec> {
  const res = await fetch(`${API_BASE_URL}/models/${id}`);
  if (!res.ok) throw new Error('Failed to fetch model details');
  return res.json();
}

export async function compareModels(ids: string[]): Promise<ModelSpec[]> {
  const res = await fetch(`${API_BASE_URL}/compare?ids=${ids.join(',')}`);
  if (!res.ok) throw new Error('Failed to compare models');
  return res.json();
}

export async function fetchGPUSpecs(): Promise<GPUSpec[]> {
  const res = await fetch(`${API_BASE_URL}/gpus`);
  if (!res.ok) throw new Error('Failed to fetch GPU specs');
  return res.json();
}

export async function simulateTCO(input: TCOInput): Promise<TCOComparisonResult> {
  const res = await fetch(`${API_BASE_URL}/simulate/tco`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  if (!res.ok) throw new Error('Failed to simulate TCO');
  return res.json();
}

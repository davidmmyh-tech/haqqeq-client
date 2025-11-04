import type { ProfileFormData } from '@/schemas/validation';
import api from './api';

export async function updateProfile(form: ProfileFormData) {
  return api.put('/api/user/update', form);
}

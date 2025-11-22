import type { Profile } from 'cv-graphql';

export function formatUserName(profile?: Profile | null, email?: string | null): string {
  if (profile?.first_name && profile?.last_name) {
    return `${profile.first_name} ${profile.last_name}`;
  }
  return profile?.first_name || email || '';
}

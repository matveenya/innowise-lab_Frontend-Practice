export const USERS_TABLE_COLUMNS = [
  { field: 'profile.first_name', header: 'First Name' },
  { field: 'profile.last_name', header: 'Last Name' },
  { field: 'email', header: 'Email' },
  { field: 'department_name', header: 'Department' },
  { field: 'position_name', header: 'Position' },
] as const;

export const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const MAX_AVATAR_SIZE = 0.5;

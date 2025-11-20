import type { Cv } from 'cv-graphql';
import type { ColumnDef } from '~/components/cvs/Table.vue';

export const CVS_TABLE_COLUMNS: ColumnDef<Cv>[] = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    style: 'width: 35%',
    bodyClass: 'cv-row__cell cv-row__cell--name',
  },
  {
    field: 'education',
    header: 'Education',
    sortable: true,
  },
  {
    field: 'user.email',
    header: 'Employee',
    sortable: true,
  },
];

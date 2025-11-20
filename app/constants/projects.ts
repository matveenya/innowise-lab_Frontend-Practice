import type { CvProject } from 'cv-graphql';
import type { ColumnDef } from '~/components/cvs/Table.vue';

export const PROJECTS_TABLE_COLUMNS: ColumnDef<CvProject>[] = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    slotName: 'name',
    style: 'width: 30%',
  },
  {
    field: 'domain',
    header: 'Domain',
    sortable: true,
    style: 'width: 20%',
  },
  {
    field: 'start_date',
    header: 'Start Date',
    sortable: true,
    slotName: 'date',
    style: 'width: 20%',
  },
  {
    field: 'end_date',
    header: 'End Date',
    sortable: true,
    slotName: 'date',
    style: 'width: 20%',
  },
];

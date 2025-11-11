import type { Cv, CreateCvInput } from 'cv-graphql';

export interface CreateCvArgs {
  cv: Omit<CreateCvInput, 'userId'>;
}

export interface CreateCvResult {
  createCv: Cv;
}

export interface GetCvsResult {
  cvs: Cv[];
}

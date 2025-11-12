import type { Cv, CreateCvInput } from 'cv-graphql';

export interface CreateCvArgs {
  cv: CreateCvInput;
}

export interface CreateCvResult {
  createCv: Cv;
}

export interface GetCvsResult {
  cvs: Cv[];
}

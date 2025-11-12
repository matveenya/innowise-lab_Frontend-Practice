import type { Cv, CreateCvInput, UpdateCvInput } from 'cv-graphql';

export interface CreateCvArgs {
  cv: CreateCvInput;
}

export interface CreateCvResult {
  createCv: Cv;
}

export interface GetCvsResult {
  cvs: Cv[];
}

export interface DeleteCvInput {
  cvId: string;
}

export interface DeleteCvArgs {
  cv: DeleteCvInput;
}

export interface DeleteCvResult {
  deleteCv: {
    affected: number;
  };
}

export interface UpdateCvArgs {
  cv: UpdateCvInput;
}

export interface UpdateCvResult {
  updateCv: Cv;
}

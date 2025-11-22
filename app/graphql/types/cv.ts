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

export interface AddCvProjectInput {
  cvId: string;
  projectId: string;
  start_date: string;
  end_date?: string | null;
  roles: string[];
  responsibilities: string[];
}

export interface AddCvProjectArgs {
  project: AddCvProjectInput;
}

export interface AddCvProjectResult {
  addCvProject: Cv;
}

export interface RemoveCvProjectInput {
  cvId: string;
  projectId: string;
}

export interface RemoveCvProjectArgs {
  project: RemoveCvProjectInput;
}

export interface RemoveCvProjectResult {
  removeCvProject: Cv;
}

export interface UpdateCvProjectInput {
  cvId: string;
  projectId: string;
  start_date: string;
  end_date?: string | null;
  roles: string[];
  responsibilities: string[];
}

export interface UpdateCvProjectArgs {
  project: UpdateCvProjectInput;
}

export interface UpdateCvProjectResult {
  updateCvProject: Cv;
}

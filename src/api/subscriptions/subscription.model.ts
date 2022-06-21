export interface IPrivCreate {
  id: number;
  pass: string;
  idRoom: number;
  idAdd: Array<number>;
}

export interface IPersCreate {
  id_u1: number;
  pass: string;
  id_u2: number;
}

export interface IGet {
  name: string
}
export class BookModel{
  Title: string;
  Author: string;
  Year: number;
  Id: string;
  Progress: ProgressModel[];
  constructor(){

  }
}

export class ProgressModel {
  ReportedOn: Date;
  Units: number;
  constructor() {

  }
}

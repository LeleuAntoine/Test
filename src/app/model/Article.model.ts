export class Article {
  photo: string;

  constructor(public title: string, public categorie: string,
              public description: string, public prixDeDepart: number,
              public debutEnchere: Date, public finEnchere: Date, public retrait: string,
              public pseudoUser: string, public userId: string, public meilleurOffre: number, public acheteur: string) {
  }
}

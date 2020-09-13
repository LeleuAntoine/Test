export class UserModel {
  constructor(public pseudo: string, public nom: string, public prenom: string,
              public email: string, public telephone: number, public rue: string,
              public codePostal: number, public ville: string, public password: string) {
  }
}

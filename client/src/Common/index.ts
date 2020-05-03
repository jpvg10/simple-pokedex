export interface IPokedex {
  id: string;
  name: string;
}

export interface IPokemonBasic {
  id: string;
  name: string;
}

export interface IPokedexDetail {
  name: string;
  pokemon: IPokemonBasic[];
}

export interface IPokemonPicture {
  name: string;
  pictureUrl: string;
}

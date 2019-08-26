interface Likes {
  name: string,
  id: string,
}


export interface LoginFacebookInput {
  id_facebook: string;
  nome: string;
  email: string;
  foto_perfil: string;
  genero: string,
  likes: Likes[],
  data_nascimento: string,
}


interface Likes {
  id: string,
}

interface Comentarios {
  texto: string,
  id: string,
}


export interface LoginFacebookInput {
  id_facebook: string;
  nome: string;
  email: string;
  foto_perfil: string;
  genero: string,
  likes: Likes[],
  comentarios: Comentarios[],
  data_nascimento: string,
}


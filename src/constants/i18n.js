const haiku = [
  {
    jp: "古池や蛙飛びこむ水の音",
    en: "an ancient pond / a frog jumps in / the splash of water",
    fr: "Paix du vieil étang / Une grenouille plonge / Bruit de l'eau",
  },
  {
    jp: "雲をりをり人を休むる月見哉",
    en: "The clouds come and go / providing a rest for all / the moon viewers",
    fr: "Les nuages parfois / viennent reposer les gens / d'admirer la lune",
  },
  {
    jp: "閑さや岩にしみ入る蝉の声",
    en: "Tranquility / Penetrating the very rock / A cicada’s voice",
    fr: "Silence / le chant des cigales / pénètre les rocs",
  },
];

module.exports = {
  en: {
    about: {
      title: "The About",
      description: "This is the About page description",
    },
    contact: {
      title: "Contact",
      description: "Hey hire me",
    },
    index: {
      title: "The Index",
      description: "This is the Home page description",
    },
    404: {
      title: "This page doesn't seem to exist sorry",
      description: "Your mom",
      haiku: haiku,
    },
  },
  fr: {
    about: {
      title: "A Propos",
      description: "Ceci est la page A Propos",
    },
    contact: {
      title: "Contact",
      description: "Yo embauchez-moi",
    },
    index: {
      title: "Page d'accueil",
      description: "Bienvenue à l'accueil",
    },
    404: {
      title: "Cette page ne semble pas exister désolé",
      description: "Ta mere",
      haiku: haiku,
    },
  },
};

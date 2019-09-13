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
      title: "About",
      description: "This is the About page description",
      tldr:"<h2>TL;DR</h2><p>I am Thomas Prost, a full stack web developer born in France and living in Tokyo. I have been enjoying creating websites for about 10 years, you can find some of my [work here] or [articles] I have written about development and other topics. I have been lucky enough to live and work in many awesome places like San Francisco, London, Tokyo and Lyon, France. I always focus on helping companies delivering great quality websites with a user first vision. You can contact me in English, French or Japanese through the following form or directly on LinkedIn and Twitter.</p>",
      indepth: "<h2>In depth</h2><p>After studying in France and London, I obtained my Master in Computer Science and worked in San Francisco for 2 years, first as a Python back-end developer then as a full-stack Asp.net one. Before moving to Tokyo, I worked for 2 years in Lyon, France as a C# and Sharepoint developer. Living and working in different countries with diverse cultures pushed me to adapt to a wide range of projects and difficulties and I always focus on code quality with a long term view in mind.</p><p>I learn from the community a lot over the years and always try to help back in my own small way. I make some open source projects that you can play with and write articles about development and, sometimes,  about wider topics. I mostly work with JavaScript, PHP(Symfony & Wordpress), CSS3, HTML5 and I always love to learn about new technologies and test how I could implement them for my clients.</p><p>I am a proud husband and dad of two small boys living in the north of Tokyo. Whenever I have some time, I like to play with them, read books and cook new recipes. When I arrived in Japan a few years ago, I didn't know much about Japanese cuisine or what to buy at the supermarket so I try to give some tips and recipes I have collected along the way. I also enjoy playing and watching basketball. Oh and I love reading about Yokai (Japanese ghosts folklore) and eating Kimchi.</p><p>I work a lot with these two amazing designers, don’t hesitate to contact Yoren and Visun. They are not only top-notch designers, they are also great human beings (which is important when working with somebody).</p>",
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

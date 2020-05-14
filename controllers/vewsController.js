module.exports = {
  indexPage: (req, res) => {
    res.status(200).render('index', {
      title: 'Welcome to News Blog',
    });
  },

  postPage: (req, res) => {
    res.status(200).render('post', {
      title: 'Post Title',
    });
  },

  authPage: (req, res) => {
    res.status(200).render('auth', {
      title: 'Login or Register',
    });
  },

  polotics: (req, res) => {
    res.status(200).render('politics', {
      title: 'Politics',
    });
  },

  tech: (req, res) => {
    res.status(200).render('tech', {
      title: 'Technology',
    });
  },

  entertainment: (req, res) => {
    res.status(200).render('entertainment', {
      title: 'Entertainment',
    });
  },

  travel: (req, res) => {
    res.status(200).render('travel', {
      title: 'Travel',
    });
  },

  sports: (req, res) => {
    res.status(200).render('sports', {
      title: 'Sports',
    });
  },
};

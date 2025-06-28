export const changeLang = (req, res, next) => {
  const thirtyDays = 1000 * 60 * 60 * 24 * 30;
  const locale = req.params.locale;
  res.cookie('nodeap-locale', locale, {
    maxAge: thirtyDays,
  });
  res.redirect('back');
};

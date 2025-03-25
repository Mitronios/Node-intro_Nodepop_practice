export function index(req, res, next) {
  res.render("home");
}

export function postWithBody(req, res, next) {
  const name = req.body.name;
  const owner = req.body.owner;
  const price = req.body.price;
  const image = req.body.image;
  console.log(req.body);
  res.send(ok);
}

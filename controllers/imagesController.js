const { uploadImage, downloadImage } = require('../services/imageService');

module.exports.uploadImage = async (req, res, next) => {
  const file = req.file;
 console.log(req);
  const result = await uploadImage(file);

  let body = req.body;
  let title = body.title;
  let stage = body.stage;
  let description = body.description;
  let goal = JSON.parse(body.goal);
  let minimum_stake = +body.minimum_stake;
  let category = body.category;
  let funding_type = body.funding_type;
  let owners = JSON.parse(body.owners);
  
  

  let address = body.address;
  body = {
    title: title,
    description: description,
    goal: goal,
    stage,
    minimum_stake: minimum_stake,
    category: category,
    funding_type: funding_type,
    owners: owners,
    address,
     
  };

  body = { ...body, imageUrl: result.Location };

  req.body = body;
  next();
};

module.exports.downloadImage = async (req, res) => {
    const { key } = req.params; 
    const readStream = await downloadImage(key); 

    const result = readStream.pipe(res);
    return result;
}
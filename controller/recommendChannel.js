const RecommendedChannel = require('../model/recommendedChannel');

const recommendForm = require('../form/recommendChannel');
const formErrorTransformer = require('../helper/formErrorTransformer');

module.exports = async (req, res) => {
  req.checkBody(recommendForm);

  const validation = await req.getValidationResult();

  if (!validation.isEmpty()) {
    res.error(400, formErrorTransformer(validation.array()));
    return;
  }

  const { channel } = req.body;

  try {
    const recommendedChannel = new RecommendedChannel({ channel });
    await recommendedChannel.save();

    res.success({ status: true });
  } catch (err) {
    console.log(err);
    res.error(500, 'Sunucu hatası.');
  }
};

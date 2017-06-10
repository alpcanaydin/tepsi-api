const Category = require('../model/category');
const Video = require('../model/video');
require('../model/channel');

module.exports = async (req, res) => {
  const { category: categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      res.error(404, 'Kategori bulunamadı.');
      return;
    }

    const videoId = await Video.aggregate(
      { $match: { category: category._id } },
      { $sample: { size: 1 } },
      { $project: { _id: 1 } }
    );

    const video = await Video.findById(videoId).populate([
      {
        path: 'channel',
        select: 'name',
        model: 'Channel',
      },
      {
        path: 'category',
        select: 'id name',
      },
    ]);

    res.success({ video });
  } catch (error) {
    console.log(error);
    res.error(500, 'Sunucu hatası');
  }
};

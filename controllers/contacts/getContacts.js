const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query; // get queries
  const skip = (page - 1) * limit; // skip = (page - 1)  *  limit

  let contacts = null;

  if (favorite) {
    contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit), // .find() - 2nd arg - paggination (skip - how many pages to skip, limit - how many per page)
    }).populate("owner", "_id, email");
  } else {
    contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit), // .find() - 2nd arg - paggination (skip - how many pages to skip, limit - how many per page)
    }).populate("owner", "_id, email");
  }

  res.json({
    data: {
      contacts,
    },
  });
};

module.exports = getAll;

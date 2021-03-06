module.exports = class DbSet {

  Model;

  constructor(model) {
    this.Model = model;
  }

  async all(school) {
    return school
      ? this.Model.find({ school, deleted: { $in: [false, null] } }).lean()
      : this.Model.find({ deleted: { $in: [false, null] } }).lean();
  }

  find(selection, projection, options) {
    return this.Model.find(selection, projection, options).lean();
  }

  findOne(selection, projection, options) {
    return this.Model.findOne(selection, projection, options).lean();
  }

  one(id, projection) {
    return this.Model.findById(id, projection).lean();
  }

  count(filter) {
    return this.Model.countDocuments(filter);
  }

  async add(data) {
    return this.Model.create(data);
  }

  async update(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  async delete(id) {
    return this.Model.findByIdAndDelete(id);
  }
};

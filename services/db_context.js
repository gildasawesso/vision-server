module.exports = class DbContext {
  constructor(model) {
    this.Model = model;
  }

  async all(school) {
    return school
      ? this.Model.find({ school, deleted: { $in: [false, null] } })
      : this.Model.find({ deleted: { $in: [false, null] } });
  }

  async find(selection, projection, options) {
    return this.Model.find(selection, projection, options);
  }

  one(id) {
    return this.Model.findById(id);
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

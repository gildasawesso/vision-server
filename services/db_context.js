module.exports = class DbContext {
  constructor(model) {
    this.Model = model;
  }

  async all() {
    return this.Model.find();
  }

  async find(options) {
    return this.Model.find(options);
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

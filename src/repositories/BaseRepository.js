class BaseRepository {
  constructor(factory, daoType, dto) {
    this.factory = factory;
    this.daoType = daoType;
    this.dto = dto;
  }

  async getById(id) {
    const dao = this.factory.get(this.daoType);
    if (id) {
      let response = await dao.getById(id);
      if (this.dto) {
        response = new this.dto(response);
      }
      return response;
    } else {
      let response = await dao.getAll();
      if (this.dto) {
        response = response.map((entity) => new this.dto(entity));
      }
      return response;
    }
  }

  async find(findObj) {
    const dao = this.factory.get(this.daoType);
    return await dao.find(findObj);
  }

  async create(newEntity) {
    const dao = this.factory.get(this.daoType);
    return await dao.save(newEntity);
  }

  async update(id, updatedEntity) {
    const dao = this.factory.get(this.daoType);
    return await dao.updateById(id, updatedEntity);
  }

  async delete(id) {
    const dao = this.factory.get(this.daoType);
    return await dao.deleteById(id, updatedEntity);
  }
}

export default BaseRepository;

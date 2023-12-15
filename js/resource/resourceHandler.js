'use strict'

class ResourceHandler {

  #resourcePool = {};

  /**
   *
   * @returns {ResourceHandler}
   */
  constructor() {
    this.resourceLoader = new ResourceLoader();
  }

  /**
   *
   * @param category
   * @param filename
   * @param fileType
   * @param filePath
   * @param lowerLimit
   * @param upperLimit
   * @returns {Promise<Awaited<*>[]>}
   */
  fetchResourceBatch = async ({
    category,
    filename,
    fileType,
    filePath,
    lowerLimit,
    upperLimit
  }) =>{
    return await this.resourceLoader.fetchResourceBatch({
      category,
      filename,
      fileType,
      filePath,
      lowerLimit,
      upperLimit
    })
  }

  /**
   *
   * @param resourceObject
   * @returns {Promise<*>}
   */
  fetchResource = async (resourceObject)=>{
    let requestedResource;
    if (this.#resourcePool.hasOwnProperty(resourceObject.id)){
      requestedResource = this.#resourcePool[resourceObject.id];
    } else {
      requestedResource = await this.resourceLoader.fetchResource(resourceObject);
      this.#resourcePool[requestedResource.id] = requestedResource;
    }

    return requestedResource;
  }
}
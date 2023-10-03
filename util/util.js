class Util {

  static instance = new this();


  // objects

  /**
   *
   * @param obj
   * @returns {Map<string, unknown>|null}
   */
  static nestedObjectToFlattenedMap  = function (obj) {
    const flattenedMap = {};

    function flattenObject(object) {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const value = object[key];
          if (typeof value === 'object' && value !== null) {
            flattenObject(value);
          } else {
            flattenedMap[key] = value;
          }
        }
      }
    }

    flattenObject(obj);
    if (Object.keys(flattenedMap).length > 0) {
      return new Map(Object.entries(flattenedMap));
    }

    return null; // No nested object found
  };


  // numbers


  /**
   *
   * @param range
   * @param offset
   * @returns {number}
   */
  static randomIntInRange = (range, offset=0) =>
  Math.floor(Math.random() * range + offset);



  // graphics


  /**
   *
   * @param rgb
   * @returns {*}
   */
  static createRandomRGB = (rgb)=>{
    // Check if the input array has at least 3 elements
    if (rgb && rgb.length >= 3) {
      return rgb; // If yes, return the input array
    } else {
      // If not, generate a random RGB value and push it into the array
      if (!rgb) {
        rgb = []; // Initialize the array if it doesn't exist
      }
      rgb.push(Util.randomIntInRange(256)); // Random value between 0 and 255
      return this.createRandomRGB(rgb); // Recursively call the function with the updated array
    }
  }
}
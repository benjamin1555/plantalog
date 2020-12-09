const shallowEquality = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
};

const diseaseUpdateEquality = (reqBody, updatedDisease) => {
  return (
    reqBody.name === updatedDisease.name
    && reqBody.symptoms === updatedDisease.symptoms
    && reqBody.treatment === updatedDisease.treatment
  );
};

// ### Objects to fake database data and request object
// Request objects
const createDiseaseReq = {
  body: {
    name: 'disease name',
    symptoms: 'disease symptoms',
    images: {
      regular: 'regular_imageUrl',
      thumbnail: 'thumbnail_imageUrl',
      icon: 'icon_imageUrl'
    },
    treatment: 'disease treatment'
  }
};

const updateDiseaseReq = {
  params: {
    diseaseId: 'fakeId'
  },
  body: {
    name: 'updated disease name',
    symptoms: 'updated disease symptoms',
    images: {
      regular: 'updated_regular_imageUrl',
      thumbnail: 'updated_thumbnail_imageUrl',
      icon: 'updated_icon_imageUrl'
    },
    treatment: 'updated disease treatment'
  }
};

const findDiseaseReq = {
  params: {
    diseaseId: 'fakeId'
  }
};

// Databse objects
const foundDiseaseObj = {
  name: 'disease name',
  symptoms: 'disease symptoms',
  imagesUrl: {
    regular: 'regular_imageUrl',
    thumbnail: 'thumbnail_imageUrl',
    icon: 'icon_imageUrl'
  },
  treatment: 'disease treatment'
};

module.exports = {
  shallowEquality,
  diseaseUpdateEquality,
  createDiseaseReq,
  updateDiseaseReq,
  findDiseaseReq,
  foundDiseaseObj
};

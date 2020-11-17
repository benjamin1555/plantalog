// Preview user image before upload
const previewImage = (function() {
  const makePreview = function(fileInput, img) {
    const reader = new FileReader();

    reader.onload = e => {
      img.src =  e.target.result;
    };

    fileInput.addEventListener('change', e => {
      const file = e.target.files[0];
      reader.readAsDataURL(file);
    });
  };

  return {
    makePreview
  };
})();

// Get All Plants
(function getPlants() {
  const getPlantsBtn = document.getElementById('get-plants-btn');

  const fetchPlants = async () => {
    const result = await fetch('http://localhost:3000/catalog/plants');
    const data = await result.json();
    console.log(data);
  };

  getPlantsBtn.addEventListener('click', fetchPlants);
})();

// Create/update/delete Plant
(function updatePlant() {
  const species = document.getElementById('species');
  const variety = document.getElementById('variety');
  const image = document.getElementById('image');
  const plantationType = document.getElementById('plantationType');
  const plantationDate = document.getElementById('plantationDate');
  const harvestDate = document.getElementById('harvestDate');
  const beneficialInteractions = document.getElementById('beneficialInteractions');
  const harmfulInteractions = document.getElementById('harmfulInteractions');
  const diseases = document.getElementById('diseases');
  const createPlantBtn = document.getElementById('create-plant-btn');
  const updatePlantBtn = document.getElementById('update-plant-btn');
  const deletePlantBtn = document.getElementById('delete-plant-btn');
  const previewImg = document.getElementById('img-plant-preview');

  const createFormData = () => {
    const formData = new FormData();
    formData.append('species', species.value);
    formData.append('variety', variety.value);
    formData.append('image', image.files[0]);
    formData.append('plantationType', plantationType.value);
    formData.append('plantationDate', plantationDate.value);
    formData.append('harvestDate', harvestDate.value);
    formData.append('beneficialInteractions', beneficialInteractions.value);
    formData.append('harmfulInteractions', harmfulInteractions.value);
    formData.append('diseases', diseases.value);
    return formData;
  };

  const deletePlant = async () => {
    const query = document.getElementById('plantIdUpdate').value || '5fb565bda5ea25645ca10f8f';
    const result = await fetch(`http://localhost:3000/catalog/plants/${query}`, {
        method: 'DELETE'
      }
    );
    const data = await result.json();
    console.log(data);
  };

  const updatePlant = async () => {
    const formData = createFormData();
    const query = document.getElementById('plantIdUpdate').value || '5fb565bda5ea25645ca10f8f';
    const result = await fetch(`http://localhost:3000/catalog/plants/${query}`, {
        method: 'PUT',
        body: formData
      }
    );
    const data = await result.json();
    console.log(data);
  }

  const postNewPlant = async () => {
    const formData = createFormData();
    const result = await fetch('http://localhost:3000/catalog/plants', {
        method: 'POST',
        body: formData
      }
    );
    const data = await result.json();
    console.log(data);
  };

  previewImage.makePreview(image, previewImg);
  
  createPlantBtn.addEventListener('click', postNewPlant);
  updatePlantBtn.addEventListener('click', updatePlant);
  deletePlantBtn.addEventListener('click', deletePlant);
})();

// Get a Plant
(function getPlant() {
  const query = document.getElementById('plantId');
  const getPlantBtn = document.getElementById('get-plant-btn');

  const fetchPlant = async () => {
    const plantId = query.value || '5fb565bda5ea25645ca10f8f'; // Random ObjectId if input is empty
    const result = await fetch(`http://localhost:3000/catalog/plants/${plantId}`);
    const data = await result.json();
    console.log(data);
  };

  getPlantBtn.addEventListener('click', fetchPlant);
})();

// Get All Diseases
(function getDiseases() {
  const getDiseasesBtn = document.getElementById('get-diseases-btn');

  const fetchDiseases = async () => {
    const result = await fetch('http://localhost:3000/catalog/diseases');
    const data = await result.json();
    console.log(data);
  };

  getDiseasesBtn.addEventListener('click', fetchDiseases);
})();

// Create/update/delete Disease
(function updateDisease() {
  const name = document.getElementById('name');
  const symptoms = document.getElementById('symptoms');
  const diseaseImage = document.getElementById('diseaseImage');
  const treatment = document.getElementById('treatment');
  const createDiseaseBtn = document.getElementById('create-disease-btn');
  const updateDiseaseBtn = document.getElementById('update-disease-btn');
  const deleteDiseaseBtn = document.getElementById('delete-disease-btn');
  const previewImg = document.getElementById('img-disease-preview');

  const createFormData = () => {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('symptoms', symptoms.value);
    formData.append('image', diseaseImage.files[0]);
    formData.append('treatment', treatment.value);
    return formData;
  };

  const deleteDisease = async () => {
    const query = document.getElementById('diseaseIdUpdate').value || '5fb565bda5ea25645ca10f8f';
    const result = await fetch(`http://localhost:3000/catalog/diseases/${query}`, {
        method: 'DELETE'
      }
    );
    const data = await result.json();
    console.log(data);
  };

  const updateDisease = async () => {
    const formData = createFormData();
    const query = document.getElementById('diseaseIdUpdate').value || '5fb565bda5ea25645ca10f8f';
    const result = await fetch(`http://localhost:3000/catalog/diseases/${query}`, {
        method: 'PUT',
        body: formData
      }
    );
    const data = await result.json();
    console.log(data);
  };

  const postNewDisease = async () => {
    const formData = createFormData();

    const result = await fetch('http://localhost:3000/catalog/diseases', {
        method: 'POST',
        body: formData
      }
    );
    const data = await result.json();
    console.log(data);
  };

  previewImage.makePreview(diseaseImage, previewImg);

  createDiseaseBtn.addEventListener('click', postNewDisease);
  updateDiseaseBtn.addEventListener('click', updateDisease);
  deleteDiseaseBtn.addEventListener('click', deleteDisease);
})();

// Get a Disease
(function getDisease() {
  const query = document.getElementById('diseaseId');
  const getDiseaseBtn = document.getElementById('get-disease-btn');

  const fetchDisease = async () => {
    const diseaseId = query.value || '5fb565bda5ea25645ca10f8f'; // Random ObjectId if input is empty
    const result = await fetch(`http://localhost:3000/catalog/diseases/${diseaseId}`);
    const data = await result.json();
    console.log(data);
  };

  getDiseaseBtn.addEventListener('click', fetchDisease);
})();


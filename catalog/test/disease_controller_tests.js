const expect = require('chai').expect;
const sinon = require('sinon');

const Disease = require('../models/disease');
const diseaseController = require('../controllers/disease');
const testUtil = require('./test_util');
const imagesUtil = require('../util/clear-images');

describe('==== Disease Controller ====', function() {
  describe('getDiseases()', function() {
    let status, json, res;
    beforeEach(function() {
      sinon.stub(Disease, 'find');
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function() {
      sinon.restore();
    });

    afterEach(function() {
      sinon.restore();
    });

    it('test_return_200_on_success', async function() {
      await diseaseController.getDiseases({}, res, () => {});
      expect(status.args[0][0]).to.equal(200);
    });

    it('test_body_contains_message_and_disease_objects', async function() {
      Disease.find.returns(['Diseases data']);
      await diseaseController.getDiseases({}, res, () => {});
      expect(json.args[0][0].message).to.equal('Diseases fetched.');
      expect(json.args[0][0].diseases).to.equal(Disease.find());
    });

    it('test_no_diseases_in_database', async function() {
      Disease.find.returns([]);
      await diseaseController.getDiseases({}, res, () => {});
      expect(json.args[0][0].message).to.equal('Diseases fetched.');
      expect(json.args[0][0].diseases).to.equal(Disease.find());
    });

    it('test_pass_error_on_failure', async function() {
      const next = sinon.spy();
      Disease.find.throws();
      await diseaseController.getDiseases({}, res, next);
      expect(next.args[0][0]).to.be.an.instanceof(Error);
    });
  });

  describe('createDisease()', function() {
    let status, json, req, res, savedDisease, saveDiseaseStub;
    beforeEach(async function() {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      req = testUtil.createDiseaseReq;
      savedDisease = {
        name: req.body.name,
        symptoms: req.body.symptoms,
        imagesUrl: req.body.images,
        treatment: req.body.treatment
      };
      saveDiseaseStub = sinon.stub(Disease.prototype, 'save').returns(savedDisease);
    });

    afterEach(function() {
      sinon.restore();
    });

    it('test_return_201_on_success', async function() {
      await diseaseController.createDisease(req, res, () => {});
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
    });

    it('test_new_disease_object_is_created', async function() {
      await diseaseController.createDisease(req, res, () => {});
      const responseDiseaseObj = json.args[0][0].savedDisease;
      expect(testUtil.shallowEquality(savedDisease, responseDiseaseObj)).to.be.true;
    });

    it('test_body_contains_message_and_disease_object', async function() {
      await diseaseController.createDisease(req, res, () => {});
      expect(json.args[0][0]).to.have.property('message', 'Disease successfully created.');
      expect(json.args[0][0]).to.have.property('savedDisease', savedDisease);
    });

    it('test_pass_error_on_failure', async function() {
      saveDiseaseStub.throws();
      const next = sinon.spy();
      await diseaseController.createDisease(req, res, next);
      expect(next.args[0][0]).to.be.an.instanceof(Error);
    });
  });

  describe('getDisease()', function() {
    let status, json, req, res, foundDisease, findDiseaseStub;
    beforeEach(async function() {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      req = testUtil.findDiseaseReq;
      foundDisease = testUtil.foundDiseaseObj;
      findDiseaseStub = sinon.stub(Disease, 'findById').returns(foundDisease);
    });

    afterEach(function() {
      sinon.restore();
    });

    it('test_return_200_on_success', async function() {
      await diseaseController.getDisease(req, res, () => {});
      expect(status.args[0][0]).to.equal(200);
    });

    it('test_body_contains_message_and_a_disease_object', async function() {
      await diseaseController.getDisease(req, res, () => {});
      expect(json.args[0][0]).to.have.property('message', 'Disease fetched.');
      expect(json.args[0][0]).to.have.property('disease', foundDisease);
    });

    it('test_disease_doesnt_exist_in_database', async function() {
      const next = sinon.spy();
      findDiseaseStub.returns(null);
      await diseaseController.getDisease(req, res, next);
      expect(next.args[0][0]).to.be.an.instanceof(Error);
      expect(next.args[0][0]).to.have.property('message', 'Cannot find a disease with that ID.');
      expect(next.args[0][0]).to.have.property('statusCode', 404);
    });

    it('test_pass_error_on_failure', async function() {
      const next = sinon.spy();
      findDiseaseStub.throws();
      await diseaseController.getDisease(req, res, next);
      expect(next.args[0][0]).to.be.an.instanceof(Error);
    });
  });

  describe('updateDisease()', function() {
    let status, json, req, res, diseaseToUpdate, findDiseaseStub, saveDiseaseStub;
    beforeEach(async function() {
      sinon.stub(imagesUtil, 'clearImages');
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      req = testUtil.updateDiseaseReq;
      diseaseToUpdate = new Disease(testUtil.foundDiseaseObj);
      updatedDisease = new Disease({
        name: req.body.name,
        symptoms: req.body.symptoms,
        imagesUrl: req.body.images,
        treatment: req.body.treatment
      });
      findDiseaseStub = sinon.stub(Disease, 'findById').returns(diseaseToUpdate);
      saveDiseaseStub = sinon.stub(Disease.prototype, 'save').returns(updatedDisease);
    });

    afterEach(function() {
      sinon.restore();
    });

    it('test_return_200_on_success', async function() {
      await diseaseController.updateDisease(req, res, () => {});
      expect(status.args[0][0]).to.equal(200);
    });

    it('test_disease_object_is_updated', async function() {
      const imagesUrlBeforeUpdate = diseaseToUpdate.imagesUrl;
      await diseaseController.updateDisease(req, res, () => {});
      expect(imagesUtil.clearImages.calledWith(imagesUrlBeforeUpdate)).to.be.true;
      expect(testUtil.diseaseUpdateEquality(req.body, updatedDisease)).to.be.true;
    });

    it('test_body_contains_message_and_disease_object', async function() {
      await diseaseController.updateDisease(req, res, () => {});
      expect(json.args[0][0]).to.have.property('message', 'Disease successfully updated.');
      expect(json.args[0][0]).to.have.property('updatedDisease', updatedDisease);
    });

    it('test_disease_doesnt_exist_in_database', async function() {
      const next = sinon.spy();
      findDiseaseStub.returns(null);
      await diseaseController.updateDisease(req, res, next);
      expect(next.args[0][0]).to.be.an.instanceof(Error);
      expect(next.args[0][0]).to.have.property('message', 'Cannot find a disease with that ID.');
      expect(next.args[0][0]).to.have.property('statusCode', 404);
    });

    it('test_disease_doesnt_exist_in_database', async function() {
      const next = sinon.spy();
      findDiseaseStub.throws();
      await diseaseController.updateDisease(req, res, next);
      expect(next.args[0][0]).to.be.an.instanceof(Error);
    });
  });

  describe('deleteDisease()', function() {
    let status, json, req, res, foundDisease, findDiseaseStub;
    beforeEach(async function() {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      req = testUtil.findDiseaseReq;
      foundDisease = testUtil.foundDiseaseObj;
      findDiseaseStub = sinon.stub(Disease, 'findById').returns(foundDisease);
      sinon.stub(Disease, 'findByIdAndRemove');
      sinon.stub(imagesUtil, 'clearImages');
    });

    afterEach(function() {
      sinon.restore();
    });

    it('test_return_200_on_success', async function() {
      await diseaseController.deleteDisease(req, res, () => {});
      expect(status.args[0][0]).to.equal(200);
    });

    it('test_body_contains_message', async function() {
      await diseaseController.deleteDisease(req, res, () => {});
      expect(json.args[0][0]).to.have.property('message', 'Disease successfully deleted.');
    });

    it('test_disease_is_removed', async function() {
      await diseaseController.deleteDisease(req, res, () => {});
      expect(Disease.findByIdAndRemove.calledOnce).to.be.true;
    });

    it('test_images_are_removed', async function() {
      await diseaseController.deleteDisease(req, res, () => {});
      expect(imagesUtil.clearImages.calledWith(foundDisease.imagesUrl)).to.be.true;
    });

    it('test_pass_error_on_failure', async function() {
      const next = sinon.spy();
      findDiseaseStub.throws();
      await diseaseController.deleteDisease(req, res, next);
      expect(next.args[0][0]).to.be.an.instanceof(Error);
    });
  });

  describe('deleteDisease()', function() {
    let status, json, req, res, foundDisease, findDiseaseStub;
    beforeEach(async function() {
      findDiseaseStub = sinon.stub(Disease, 'findById');
      sinon.stub(Disease, 'findByIdAndRemove');
      sinon.stub(imagesUtil, 'clearImages');
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      req = {
        params: {
          diseaseId: 'fakeId'
        }
      };
      foundDisease = {
        name: 'disease name',
        symptoms: 'disease symptoms',
        imagesUrl: {
          regular: 'regular_imageUrl',
          thumbnail: 'thumbnail_imageUrl',
          icon: 'icon_imageUrl'
        },
        treatment: 'disease treatment'
      };
    });

    afterEach(function() {
      sinon.restore();
    });

    it('test_return_200_on_success', async function() {
      findDiseaseStub.returns(foundDisease);
      await diseaseController.deleteDisease(req, res, () => {});
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
    });

    it('test_body_contains_message', async function() {
      findDiseaseStub.returns(foundDisease);
      await diseaseController.deleteDisease(req, res, () => {});
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0]).to.have.property('message', 'Disease successfully deleted.');
    });

    it('test_disease_is_removed', async function() {
      findDiseaseStub.returns(foundDisease);
      await diseaseController.deleteDisease(req, res, () => {});
      expect(Disease.findByIdAndRemove.calledOnce).to.be.true;
    });

    it('test_images_are_removed', async function() {
      findDiseaseStub.returns(foundDisease);
      await diseaseController.deleteDisease(req, res, () => {});
      expect(imagesUtil.clearImages.calledWith(foundDisease.imagesUrl)).to.be.true;
    });

    it('test_pass_error_on_failure', async function() {
      const next = sinon.spy();
      findDiseaseStub.throws;
      await diseaseController.deleteDisease(req, res, next);
      expect(next.calledOnce).to.be.true;
      expect(next.args[0][0]).to.be.an.instanceof(Error);
    });
  });
});


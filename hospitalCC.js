'use strict';

const { Contract } = require('fabric-contract-api');

const Patient = require('./lib/patient');
const HospitalD = require('./lib/hospital');
const Pharmacy = require('./lib/pharmacy');

class Hospital extends Contract {

    async addPatientDetails(ctx, patientDetails) {
        const patientModule = new Patient();
        return patientModule.addPatientDetails(ctx, patientDetails);
    }

    async getPatientlByIdNew(ctx, patientId) {
        const patientModule = new Patient();
        return patientModule.getPatientlByIdNew(ctx, patientId);
    }

    async addHospitalDetails(ctx, hospitalDetails) {
        const hospitalModule = new HospitalD();
        return hospitalModule.addHospitalDetails(ctx, hospitalDetails);
    }

    async getHospitalDetailsById(ctx, hospitalId) {
        const hospitalModule = new HospitalD();
        return hospitalModule.getHospitalDetailsById(ctx, hospitalId);
    }

    async addPharmacyDetails(ctx, pharmacyDetails) {
        const pharmacyModule = new Pharmacy();
        return pharmacyModule.addPharmacyDetails(ctx, pharmacyDetails);
    }

    async getPharmacyDetailsById(ctx, pharmacyId) {
        const pharmacyModule = new Pharmacy();
        return pharmacyModule.getPharmacyDetailsById(ctx, pharmacyId);
    }

    async createAppointment(ctx, createAppointmentDetails) {
        const patientModule = new Patient();
        return patientModule.createAppointment(ctx, createAppointmentDetails);
    }

    async getAppointmentDetailsById(ctx, appointmentId) {
        const patientModule = new Patient();
        return patientModule.getAppointmentDetailsById(ctx, appointmentId);
    }

    async updateAppointment(ctx, appointmentData) {
        const hospitalModule = new HospitalD();
        return hospitalModule.updateAppointment(ctx, appointmentData);
    }
}

module.exports = Hospital;
module.exports.Contract = [Hospital];
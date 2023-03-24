'use strict';

const { Contract } = require('fabric-contract-api');

const Patient = require('./lib/patient');
const HospitalD = require('./lib/hospital');
const Pharmacy = require('./lib/pharmacy');

class Hospital extends Contract {

    async addPatientDetails(ctx, patientId, firstName, lastName, email, userType, createdAt, city, address, state) {
        const patientModule = new Patient();
        return patientModule.addPatientDetails(ctx, patientId, firstName, lastName, email, userType, createdAt, city, address, state);
    }

    async getPatientlByIdNew(ctx, patientId) {
        const patientModule = new Patient();
        return patientModule.getPatientlByIdNew(ctx, patientId);
    }

    async addHospitalDetails(ctx, hospitalId, name, email, userType, createdAt, type, doctor) {
        const hospitalModule = new HospitalD();
        return hospitalModule.addHospitalDetails(ctx, hospitalId, name, email, userType, createdAt, type, doctor);
    }

    async getHospitalDetailsById(ctx, hospitalId) {
        const hospitalModule = new HospitalD();
        return hospitalModule.getHospitalDetailsById(ctx, hospitalId);
    }

    async addPharmacyDetails(ctx, pharmcyId, name, email, userType, createdAt, mobileNumber, city, state) {
        const pharmacyModule = new Pharmacy();
        return pharmacyModule.addPharmacyDetails(ctx, pharmcyId, name, email, userType, createdAt, mobileNumber, city, state);
    }

    async getPharmacyDetailsById(ctx, pharmcyId) {
        const pharmacyModule = new Pharmacy();
        return pharmacyModule.getPharmacyDetailsById(ctx, pharmcyId);
    }

    async createAppointment(ctx, appointmentId, patientId, createDate) {
        const patientModule = new Patient();
        return patientModule.createAppointment(ctx, appointmentId, patientId, createDate);
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
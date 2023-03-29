const { Contract } = require('fabric-contract-api');

class Patient extends Contract {

    async addPatientDetails(ctx, patientDetails) {
        try {
            let parsePatientDetails = JSON.parse(patientDetails);
            console.log(patientDetails, "--patientDetails--");
            let getPatientBytes = await ctx.stub.getPrivateData('PatientOrgMSPPrivateCollection', parsePatientDetails.patientId);

            if (getPatientBytes.toString() != "") {
                throw Error(`Patient ${parsePatientDetails.patientId} already exists`);
            }

            const addpatientDetails = {
                patientDetails: parsePatientDetails
            }
            await ctx.stub.putPrivateData('PatientOrgMSPPrivateCollection', parsePatientDetails.patientId, Buffer.from(JSON.stringify(addpatientDetails)));
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async getPatientlByIdNew(ctx, patientId) {
        try {
            const patientBytes = await ctx.stub.getPrivateData('PatientOrgMSPPrivateCollection', patientId);
            if (!patientBytes.toString()) {
                throw new Error(`Patient ID ${patientId} does not exist`);
            }
            const patient = JSON.parse(patientBytes.toString());
            return patient;
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async createAppointment(ctx, createAppointmentDetails) {
        try {
            let parseAppointmentDetails = JSON.parse(createAppointmentDetails);
            console.log("-------------------");
            console.log(parseAppointmentDetails, "---------parseAppointmentDetails-----------");
            let getmspId = ctx.clientIdentity.getMSPID();
            console.log(getmspId, "Current working mspID");
            if (getmspId != "PatientOrgMSP") {
                throw Error("Do not have  the permission to create a client appointment")
            }

            const getpatientBytes = await ctx.stub.getPrivateData('PatientOrgMSPPrivateCollection', parseAppointmentDetails.patientId);
            if (!getpatientBytes.toString()) {
                throw Error(`Patient ${parseAppointmentDetails.patientId} does not exists`)
            }
            let { patientId, appointmentId } = parseAppointmentDetails
            delete parseAppointmentDetails.patientId
            delete parseAppointmentDetails.appointmentId

            const appointment = {
                patientId,
                appointmentId,
                appointmentData: parseAppointmentDetails
            };
            console.log(appointment, "appointment");
            console.log(parseAppointmentDetails, "before putstate");
            await ctx.stub.putState(appointmentId, Buffer.from(JSON.stringify(appointment)));
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async getAppointmentDetailsById(ctx, appointmentId) {
        try {
            const getAppointmentBytes = await ctx.stub.getState(appointmentId);

            if (!getAppointmentBytes || !getAppointmentBytes.toString()) {
                throw Error(`appointment ${appointmentId} does not exists`)
            }
            return getAppointmentBytes.toString();
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
}

module.exports = Patient;
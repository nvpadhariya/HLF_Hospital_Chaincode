const { Contract } = require('fabric-contract-api');

// class Patient {
class Patient extends Contract {

    async addPatientDetails(ctx, patientId, firstName, lastName, email, userType, createdAt, city, address, state) {
        try {
            let getPatientBytes = await ctx.stub.getPrivateData('PatientOrgMSPPrivateCollection', patientId);

            if (getPatientBytes.toString() != "") {
                throw Error(`Patient ${patientId} already exists`);
            }
            const patient = {
                PatientId: patientId,
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                UserType: userType,
                CreatedAt: createdAt,
                City: city,
                Address: address,
                State: state
            }
            await ctx.stub.putPrivateData('PatientOrgMSPPrivateCollection', patient.PatientId, Buffer.from(JSON.stringify(patient)));
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

    async createAppointment(ctx, appointmentId, patientId, createDate) {
        try {
            let getmspId = ctx.clientIdentity.getMSPID();
            console.log(getmspId, "Current working mspID");
            if (getmspId != "PatientOrgMSP") {
                throw Error("Do not have  the permission to create a client appointment")
            }

            const getpatientBytes = await ctx.stub.getPrivateData('PatientOrgMSPPrivateCollection', patientId);
            if (!getpatientBytes.toString()) {
                throw Error(`Patient ${patientId} does not exists`)
            }

            const appointment = {
                appointmentId,
                PatientId: patientId,
                details: "",
                prescription: "",
                currentOwner: "",
                status: "",
                CreateDate: createDate,
                updateDate: ""
            };
            await ctx.stub.putState(appointment.appointmentId, Buffer.from(JSON.stringify(appointment)));
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
const { Contract } = require('fabric-contract-api');

// class HospitalD {
class HospitalD extends Contract {
    async addHospitalDetails(ctx, hospitalId, name, email, userType, createdAt, type, doctor) {
        try {
            console.log("---------------------------");
            console.log(doctor);
            console.log("---------------------------");
            let getHospitalBytes = await ctx.stub.getState(hospitalId);

            if (getHospitalBytes.toString() != "") {
                throw Error(`Hospital ${hospitalId} already exists`);
            }
            const hospitalDetails = {
                HospitalId: hospitalId,
                Name: name,
                Email: email,
                UserType: userType,
                CreatedAt: createdAt,
                Type: type,
                Doctor: doctor
            }
            await ctx.stub.putState(hospitalId, Buffer.from(JSON.stringify(hospitalDetails)));
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async getHospitalDetailsById(ctx, hospitalId) {
        try {
            const hospitalBytes = await ctx.stub.getState(hospitalId);

            console.log(hospitalBytes.toString());

            if (!hospitalBytes || !hospitalBytes.toString()) {
                throw new Error(`Hospital ID ${hospitalId} does not exist`);
            }
            return hospitalBytes.toString();
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async updateAppointment(ctx, appointmentData) {
        try {
            let getmspId = ctx.clientIdentity.getMSPID();
            console.log(getmspId, "Current working mspID");

            if (getmspId != "HospitalOrgMSP") {
                throw Error("Do not have the permission to update the client appointment");
            }

            console.log("-----------------------------");
            console.log(typeof appointmentData);
            console.log(appointmentData.appointmentId);
            console.log(JSON.stringify(appointmentData));
            let parseData = (JSON.parse(appointmentData));
            console.log(appointmentData);
            console.log("-----------------------------");


            let findAppointmentBytes = await ctx.stub.getState(parseData.appointmentId);
            if (!findAppointmentBytes || findAppointmentBytes.length === 0) {
                throw Error(`Appointment ${appointmentData.appointmentId} does not exist`);
            }

            let appointmentDetailsinJSON = JSON.parse(findAppointmentBytes.toString())

            let updateData = {
                appointmentId: appointmentDetailsinJSON.appointmentId,
                PatientId: appointmentDetailsinJSON.PatientId,
                appointmentData: parseData,
            }

            await ctx.stub.putState(updateData.appointmentId, Buffer.from(JSON.stringify(updateData)));
            return updateData;
        }
        catch (error) {
            console.log(error.message);
            throw Error(error.message);
        }
    }
}

module.exports = HospitalD;
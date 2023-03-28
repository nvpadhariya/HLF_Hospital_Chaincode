const { Contract } = require('fabric-contract-api');

// class HospitalD {
class HospitalD extends Contract {
    async addHospitalDetails(ctx, hospitalDetails) {
        try {
            let parseHospitalDetails = JSON.parse(hospitalDetails);

            let getHospitalBytes = await ctx.stub.getState(parseHospitalDetails.hospitalId);

            if (getHospitalBytes.toString() != "") {
                throw Error(`Hospital ${parseHospitalDetails.hospitalId} already exists`);
            }

            const addhospitalDetails = {
                hospitalDetails: parseHospitalDetails
            }

            await ctx.stub.putState(parseHospitalDetails.hospitalId, Buffer.from(JSON.stringify(addhospitalDetails)));
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

            let parseData = (JSON.parse(appointmentData));
            console.log(parseData, "parseData");

            let findAppointmentBytes = await ctx.stub.getState(parseData.appointmentId);
            if (!findAppointmentBytes || findAppointmentBytes.length === 0) {
                throw Error(`Appointment ${appointmentData.appointmentId} does not exist`);
            }

            let appointmentDetails = JSON.parse(findAppointmentBytes.toString())
            let statusArray = appointmentDetails.appointmentData.status
            // console.log(statusArray);
            statusArray.push(parseData.status);
            let removeFields = parseData.removeFields
            for (let i of removeFields) {
                delete parseData[i]
            }
            console.log(appointmentDetails, "appointmentDetailsinJSON");
            console.log(parseData, "parseData after removing fields");
            appointmentDetails.appointmentData = parseData
            appointmentDetails.appointmentData.status = statusArray
            console.log(appointmentDetails.appointmentData, "line 69");
            // console.log(appointmentDetails.appointmentData, "line 70");
            // let updateData = {
            //     appointmentId: appointmentDetailsinJSON.appointmentId,
            //     PatientId: appointmentDetailsinJSON.patientId,
            //     appointmentData: parseData,
            // }
            // console.log(updateData, "updateData");
            // console.log(updateData.appointmentId, "updateData");

            await ctx.stub.putState(appointmentDetails.appointmentId, Buffer.from(JSON.stringify(appointmentDetails)));
            return appointmentDetails;
        }
        catch (error) {
            console.log(error.message);
            throw Error(error.message);
        }
    }
}

module.exports = HospitalD;
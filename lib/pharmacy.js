const { Contract } = require('fabric-contract-api');

class Pharmacy extends Contract {

    async addPharmacyDetails(ctx, pharmcyId, name, email, userType, createdAt, mobileNumber, city, state) {
        try {
            let getPharmacyBytes = await ctx.stub.getState(pharmcyId);

            if (getPharmacyBytes.toString() != "") {
                throw Error(`Pharmacy ${pharmcyId} already exists`);
            }
            const pharmacyDetails = {
                PharmacyId: pharmcyId,
                Name: name,
                Email: email,
                UserType: userType,
                CreatedAt: createdAt,
                MobileNumber: mobileNumber,
                City: city,
                State: state
            }
            await ctx.stub.putState(pharmcyId, Buffer.from(JSON.stringify(pharmacyDetails)));
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async getPharmacyDetailsById(ctx, pharmcyId) {
        try {
            const pharmacyBytes = await ctx.stub.getState(pharmcyId);
            if (!pharmacyBytes || !pharmacyBytes.toString()) {
                throw new Error(`Hospital ID ${pharmcyId} does not exist`);
            }
            return pharmacyBytes.toString();
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
}

module.exports = Pharmacy;
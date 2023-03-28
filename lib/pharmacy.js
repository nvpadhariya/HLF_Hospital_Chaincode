const { Contract } = require('fabric-contract-api');

class Pharmacy extends Contract {

    async addPharmacyDetails(ctx, pharmacyDetails) {
        try {
            let parsePharmacyDetails = JSON.parse(pharmacyDetails);
            let getPharmacyBytes = await ctx.stub.getState(parsePharmacyDetails.pharmacyId);

            if (getPharmacyBytes.toString() != "") {
                throw Error(`Pharmacy ${parsePharmacyDetails.pharmacyId} already exists`);
            }
            const addpharmacyDetails = {
                pharmacyDetails: parsePharmacyDetails
            }
            await ctx.stub.putState(parsePharmacyDetails.pharmacyId, Buffer.from(JSON.stringify(addpharmacyDetails)));
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }

    async getPharmacyDetailsById(ctx, pharmacyId) {
        try {
            const pharmacyBytes = await ctx.stub.getState(pharmacyId);
            if (!pharmacyBytes || !pharmacyBytes.toString()) {
                throw new Error(`Hospital ID ${pharmacyId} does not exist`);
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
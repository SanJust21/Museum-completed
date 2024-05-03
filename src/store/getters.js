export default {
    getMobile(state) {
        return state.mobile;
    },
    getDetails(state) {
        return state.details
    },
    getCategory(state) {
        return state.category;
    },
    getPayment(state) {
        return state.payment_id;
    },
    getSlots(state) {
        return state.activeSlots;  
    },
    getSelectedSlot(state) {
        return state.selectedSlots; 
    },
    getDate(state) {
        return state.date;
    },
    getBdate(state) {
        return state.bookDate;
    },
    getRazor(state) {
        return state.razordetails;
    },
    getPricing(state) {
        return state.pricing;
    },
    getPublic(state) {
        return state.pubPrice
    },
    getForeign(state) {
        return state.forPrice
    },
    getInstitute(state) {
        return state.instPrice
    },
    getQR(state) {
        return state.qrDetails
    },
    getsession(state) {
        return state.session
    },
    getSenior(state) {
        return state.snrPrice;
    },
    getTax(state) {
        return state.tax;
    },
    getctg(state) {
        return state.ctg;
    },
    getCapacity(state) {
        return state.capacity;
    },
    getUrl(state) {
        return state.base_url;
    },
    getOrigDate(state) {
        const origDateStr = state.origDate;
        if (origDateStr) {
            return new Date(origDateStr);
        } else {
            return null;
        }
    },
    getCapacityId(state) {
        return state.capacityId;
    }
};

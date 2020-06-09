class Api {
    constructor(){
        this.baseUrl = "http://localhost:3001"
    }

    addRepair = () => {
        return fetch(this.baseUrl + "/repairs/addrepair")
    }

    getAllRepairs = () => {

    }
}

export default Api
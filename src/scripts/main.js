import { fetchRequests, fetchPlumbers, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")
const renderHTML = () => {
    mainContainer.innerHTML = SinkRepair()
}


const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(renderHTML)

    // fetchRequests().then(
    //     fetchPlumbers().then(
    //         fetchCompletions().then(
    //             renderHTML
    //         )
    //     )
    // )
}

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

render()
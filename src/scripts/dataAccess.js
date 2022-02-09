const applicationState = {
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumbers) => {
                // Store the external state in application state
                applicationState.plumbers = plumbers
            }
        )
}

// export const fetchAll = () => {
//     return fetchRequests()
//         .then(
//             fetchPlumbers()
//         )       
// }

const mainContainer = document.querySelector("#container")
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(completion)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                // Store the external state in application state
                applicationState.completions = completions
            }
        )
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}))
}

export const getRequests = () => {
    const completions = getCompletions()
    const requests = applicationState.requests.map(request => ({...request}))
    const sortedRequests = requests.sort((x, y) => {
        const xCompleted = completions.find(completion => completion.requestId === x.id)
        const yCompleted = completions.find(completion => completion.requestId === y.id)
        return (xCompleted === yCompleted)? 0 : xCompleted? -1 : 1;
    }) 
    sortedRequests.reverse()

    const taggedRequests = sortedRequests.map(request => {
        if(completions.find(completion => completion.requestId === request.id)){
            request.completed = true
        } else {
            request.completed = false
        }
        return request
    })

    return taggedRequests
}
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}
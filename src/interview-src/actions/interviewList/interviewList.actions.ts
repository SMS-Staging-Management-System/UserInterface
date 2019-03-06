export const interviewListTypes = {
    GET_PAGES :'GET_PAGES'
}

export const getInterviewPages = (
    ordeyBy?: string, 
    direction? : string, 
    pageNumber? : number, 
    pageSize? : number) => (dispatch) => {
        // Build fetch request with params.
        // Example : *:*/interviews?orderBy="id"?direction="ASC"?pageNumber=0?pageSize=5

        // Parse response

        return {
            payload : {
                listOfInterviews : [{}] //put the liste of interviews in there
            },
            type: interviewListTypes.GET_PAGES
        }
}
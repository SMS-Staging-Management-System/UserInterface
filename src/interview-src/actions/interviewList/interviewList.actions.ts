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

export const getNumberOfPages = (pageSize : number) => (dispatch) => {
    // Send fetch to get number of pages.

    // Parse response

     return {
         payload : {
             numberOfPages : 0 // Put result here.
         },
         type: interviewListTypes.GET_NUM_OF_PAGES
     }
}
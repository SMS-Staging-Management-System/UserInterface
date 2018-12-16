import { managerTypes } from '../actions/manager/manager.actions';
import { IManagerState } from '.';
import { toast } from "react-toastify";

const FAKE_COHORTS = [
  {
  "cohortId"	: 1,
	"name"	: "1810",
	"userList": [
		{
      "city"  :     "Arlington",
      "email"	: "Blake@Revature",
      "firstname"	: "Blake",
      "lastname"	: "Blake",
      "mobile"    : "12312313",
      "role"		: "associate",
      "state":      "Texas", 
      "timezone":  "-2",
      "userId"	: 1,
      "zip":      "76013"
    },
    {
      "city"  :     "Arlington",
      "email"	: "Calvin@Revature",
      "firstname"	: "Calvin",
      "lastname"	: "Calvin",
      "mobile"    : "12312313",
      "role"		: "associate",
      "state":      "Texas", 
      "timezone":  "-2",
      "userId"	: 2,
      "zip":      "76013"
    },
    {
      "city"  :     "Arlington",
      "email"	: "Drew@Revature",
      "firstname"	: "Drew",
      "lastname"	: "Drew",
      "mobile"    : "12312313",
      "role"		: "associate",
      "state":      "Texas", 
      "timezone":  "-2",
      "userId"	: 3,
      "zip":      "76013"
    }
    
	]
},
{
  "cohortId"	: 2,
	"name"	: "5000",
	"userList": [
		{
      "city"  :     "Arlington",
      "email"	: "James@Revature",
      "firstname"	: "James",
      "lastname"	: "James",
      "mobile"    : "12312313",
      "role"		: "associate",
      "state":      "Texas", 
      "timezone":  "-2",
      "userId"	: 1,
      "zip":      "76013"
    },
    {
      "city"  :     "Arlington",
      "email"	: "Nigel@Revature",
      "firstname"	: "Nigel",
      "lastname"	: "Nigel",
      "mobile"    : "12312313",
      "role"		: "associate",
      "state":      "Texas", 
      "timezone":  "-2",
      "userId"	: 2,
      "zip":      "76013"
    }
    
	]
}
]

const FAKE_CURRENT_COHORT = {
  "cohortId"	: 1,
	"name"	: "1810",
	"userList": [
		{
      "city"  :     "Arlington",
      "email"	: "Blake@Revature",
      "firstname"	: "Blake",
      "lastname"	: "Blake",
      "mobile"    : "12312313",
      "role"		: "associate",
      "state":      "Texas", 
      "timezone":  "-2",
      "userId"	: 1,
      "zip":      "76013"
    },
    {
      "city"  :     "Arlington",
      "email"	: "Calvin@Revature",
      "firstname"	: "Calvin",
      "lastname"	: "Calvin",
      "mobile"    : "12312313",
      "role"		: "associate",
      "state":      "Texas", 
      "timezone":  "-2",
      "userId"	: 2,
      "zip":      "76013"
    },
    {
      "city"  :     "Arlington",
      "email"	:     "Drew@Revature",
      "firstname"	: "Drew",
      "lastname"	: "Drew",
      "mobile"    : "12312313",
      "role"		: "associate",
      "state":      "Texas", 
      "timezone":  "-2",
      "userId"	: 3,
      "zip":      "76013"
    }
    
	]
}

const initialState: IManagerState = {
  associates: [],
  checkIns:   [],
  cohorts:    FAKE_COHORTS,
  currentCohort: FAKE_CURRENT_COHORT,
  isShowCohort: false
}

export const managerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case managerTypes.ADD_CHECK_INS:
      let checkIns = state.checkIns;
      checkIns += action.payload.checkIns;
      return {
        ...state,
        checkIns
      }
    case managerTypes.ADD_COHORTS:
      let cohorts = state.cohorts;
      cohorts += action.payload.cohorts;
      toast.success("Cohort added");
      return {
        ...state,
        cohorts
      }
    case managerTypes.FILTER_CHECK_IN_LIST:
      return {
        ...state,
        checkIns: action.payload.checkIns
      }
    case managerTypes.SELECT_COHORT:
      return {
        ...state,
        cohorts: action.payload.cohorts
      }
    case managerTypes.SELECT_COHORT:
      return {
        ...state,
        isShowCohort: action.payload.isShowCohort
      }
  }
  return state;
}
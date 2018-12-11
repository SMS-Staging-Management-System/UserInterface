import { managerTypes } from '../actions/manager/manager.actions';
import { IManagerState } from '.';
import { toast } from "react-toastify";

const FAKE_COHORTS = [
  {
  "cohortId"	: 1,
	"name"	: "1810",
	"userList": [
		{
      "email"	: "Blake@Revature",
      "firstname"	: "Blake",
      "lastname"	: "Blake",
      "role"		: "associate",
      "userId"	: 1
    },
    {
      "email"	: "Calvin@Revature",
      "firstname"	: "Calvin",
      "lastname"	: "Calvin",
      "role"		: "associate",
      "userId"	: 2
    },
    {
      "email"	: "Drew@Revature",
      "firstname"	: "Drew",
      "lastname"	: "Drew",
      "role"		: "associate",
      "userId"	: 3
    }
    
	]
},
{
  "cohortId"	: 2,
	"name"	: "5000",
	"userList": [
		{
      "email"	: "James@Revature",
      "firstname"	: "James",
      "lastname"	: "James",
      "role"		: "associate",
      "userId"	: 1
    },
    {
      "email"	: "Nigel@Revature",
      "firstname"	: "Nigel",
      "lastname"	: "Nigel",
      "role"		: "associate",
      "userId"	: 2
    }
    
	]
}
]

const FAKE_CURRENT_COHORT = {
  "cohortId"	: 1,
	"name"	: "1810",
	"userList": [
		{
      "email"	: "Blake@Revature",
      "firstname"	: "Blake",
      "lastname"	: "Blake",
      "role"		: "associate",
      "userId"	: 1
    },
    {
      "email"	: "Calvin@Revature",
      "firstname"	: "Calvin",
      "lastname"	: "Calvin",
      "role"		: "associate",
      "userId"	: 2
    },
    {
      "email"	: "Drew@Revature",
      "firstname"	: "Drew",
      "lastname"	: "Drew",
      "role"		: "associate",
      "userId"	: 3
    }
    
	]
} 

const initialState: IManagerState = {
  checkIns: [],
  cohorts:  FAKE_COHORTS,
  currentCheckIns: [],
  currentCohort: FAKE_CURRENT_COHORT
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
        currentCheckIns: action.payload.currentCheckIns
      }
    case managerTypes.SELECT_COHORT:
      return {
        ...state,
        currentCohort: action.payload.currentCohort
      }
  }
  return state;
}
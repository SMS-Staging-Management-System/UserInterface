import * as React from 'react';
import '../../include/bootstrap';
import '../../App.css';


export class RegisterComponent extends React.PureComponent<any, {}, {}>{


   public render(){
      return(
         <>
           <div>
              <form>
                 <div className="card reg-form">
                     <div className="card-header bg-dark"> 
                        <h2> Registration Form </h2>  
                     </div>
                     <div className="card-body form-group">
                        <div className="form-group row">
                           <div className="col"> 
                              <label> First Name *</label>
                              <input type="text"className="form-control" placeholder="" required/>
                           </div>
                           <div className="col">
                              <label> Last Name *</label>
                              <input type ="text"className="form-control" placeholder="" required/>
                           </div>
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Email *</label>
                               <input type ="email"className="form-control" placeholder="" required/>
                           </div>   
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Password *</label>
                               <input type ="password"className="form-control" placeholder="" required/>
                           </div>   
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Confirm password *</label>
                               <input type ="password"className="form-control" placeholder="" required/>
                           </div>   
                        </div>
                     </div>
                     <div className="card-footer bg-dark">
                        <button type ="submit"className="btn btn-primary rev-btn"> Register </button>
                     </div>
                  </div>
              </form>
           </div>
      </>
      );
   }
}
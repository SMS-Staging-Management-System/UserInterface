import * as React from 'react';
import '../../include/bootstrap';
import '../../App.css';

/**
 * Registration Component.
 */
export class RegisterComponent extends React.PureComponent<any, {}, {}>{
   
   constructor(props: any){  
      super(props);
      this.state = {
         email: '',
         firstname: '',
         lastname: '',
         password: '',
         passwordConfirm:''  
      }
   }
   
   public firstnameChange = (e) => {
      this.setState({
        
        firstname: e.target.value
      })
   }
    public lastnameChange = (e) => {
      this.setState({
        lastname: e.target.value
      })
   }
    
   public emailChange = (e) => {
      this.setState({
        email: e.target.value
      })
   }

   public passwordChange = (e) => {
      this.setState({
        password: e.target.value
      })
   }

   public passwordConfirmChange = (e) => {
      this.setState({
        passwordConfirm: e.target.value
      })
   }

   public render(){
      return(
         <>
           <div className="reg-form">
              <form>
                 <div className="card mt-2">
                     <div className="card-header text-center"> 
                        <h1> Registration Form </h1>  
                     </div>
                     <div className="card-body form-group">
                        <div className="form-group row">
                           <div className="col"> 
                              <label> First Name *</label>
                              <input type="text" className="form-control" placeholder="" required
                              onChange={ e => this.firstnameChange(e) }
                              />
                           </div>
                           <div className="col">
                              <label> Last Name *</label>
                              <input type ="text" className="form-control" placeholder="" required
                              onChange={ e => this.lastnameChange(e) }/>
                           </div>
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Email *</label>
                               <input type ="email" className="form-control" placeholder="" required
                                onChange={ e => this.emailChange(e)}/>
                           </div>   
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Password *</label>
                               <input type ="password" className="form-control" placeholder="" required
                               onChange={ e => this.passwordConfirmChange(e) }/>
                           </div>   
                        </div>
                        <div className="form-group row">
                           <div className="col">
                              <label> Confirm password *</label>
                               <input type ="password" className="form-control" placeholder="" required
                               onChange={ e => this.passwordChange(e) }/>
                           </div>   
                        </div>
                     </div>
                     <div className="card-footer col-xs-12 text-center"id="reg-form-footer">
                        <button type ="submit" className="btn  rev-btn"> Register </button>
                     </div> 
                  </div>
              </form>
           </div>
         </>
      );
   }
}
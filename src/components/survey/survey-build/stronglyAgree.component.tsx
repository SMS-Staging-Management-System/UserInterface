import React from 'react';

export class StronglyAgree extends React.Component<any, any> {
  constructor(props) {
    super(props);

  
  }

  render() {

    return (

      <div>
        <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="agree" className="form-control" > Strongly Agree-Strongly Disagree </label>

          <div className="new" id="t3">
         
            <input name="questionText" type="text" placeholder="Question Title (i.e. Product is easy to use )" style={{ width: '100%' }}   ></input>
                <input name="answerText" value="Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree" readOnly hidden />
                
         </div>
       

         <hr/>

      </div>

    );
  }
}


export default StronglyAgree;
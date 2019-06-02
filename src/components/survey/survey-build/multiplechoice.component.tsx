import React from 'react';

export class MultipleChoice extends React.Component<any, any> {
  constructor(props) {
    super(props);

   

  }

  render() {

    return (

      <div>
        <label htmlFor="" style={{ marginBottom: 0, textAlign:'center' }} id="multi" className="form-control" > Multiple Choice </label>
     
          <div className="new" id="t1">

            <input name="questionText" type="text" placeholder="Question Title (i.e. What do you like best? )" style={{ marginLeft: "0px" ,width: '100%' }}   ></input>
           <br/>
            <input name="answerText" type="text" placeholder="answerText (i.e. apples, pie, chicken, ... )" style={{ marginLeft: "0px", width: '100%' }}   ></input>

          </div>
         
   <hr/>
        <div className="yuay">

        </div>
        
      </div>

    );
  }
}


export default MultipleChoice;
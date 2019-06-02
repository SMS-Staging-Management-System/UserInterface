import React from 'react';

export class CheckBox extends React.Component<any, any> {
  constructor(props) {
    super(props);

  }

  render() {

    return (

      <div>
        <label htmlFor="" id="checkbox" style={{ marginBottom: 0, textAlign:'center' }} className="form-control" > Checkboxes for Multiple Answers </label>

        <div className="new" id="t6">

          <input name="questionText" type="text" placeholder="Question Title (i.e. Choose one or more response: Which of these objects is white? )" style={{ marginLeft: "0px%", width: '100%' }}   ></input>
          <br></br>
          <input name="answerText" type="text" placeholder="answerText (i.e. the moon, rice, cotton, blueberries, lemons )" style={{ marginLeft: "0px", width: '100%' }}   ></input>

        </div>
        <hr />
        <div className="yuay">

        </div>

      </div>

    );
  }
}


export default CheckBox;
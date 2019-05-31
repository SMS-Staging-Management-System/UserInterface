import React from 'react';


export class FeedBack extends React.Component<any, any> {
  constructor(props) {
    super(props);

  }

  render() {

    return (

      <div>

        <label htmlFor="" style={{ marginBottom: 0, textAlign:'center' }} id="feedback" className="form-control" > Feedback </label>

          <div className="new" id="t5">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Please give your feedback)" style={{ width: '100%' }}    >
            </input>

          </div>
          <hr/>
      </div>

    );
  }
}


export default FeedBack;
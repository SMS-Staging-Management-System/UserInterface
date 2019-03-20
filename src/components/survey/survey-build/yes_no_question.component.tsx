import React from 'react';

export class YesNoMaybe extends React.Component<any, any> {
  constructor(props) {
    super(props);


  }

  render() {

    return (

      <div>

        <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="yn" className="form-control" > Yes/No </label>

           <div className="new" id="t2">

            <input name="questionText" type="text" placeholder="Question Title (i.e. Do you like apples?) " style={{ width: '100%' }}   ></input>
            <input name="answerText" value="Yes, No, Maybe" readOnly hidden />
          </div>
 
          <hr/>
      </div>

    );
  }
}


export default YesNoMaybe;
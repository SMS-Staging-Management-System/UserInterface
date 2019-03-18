import React from 'react';

export class Rating extends React.Component<any, any> {
    constructor(props) {
        super(props);

    }

    render() {

        return (

            <div>

                <label htmlFor="" style={{ marginBottom: 0, textAlign: 'center' }} id="rating" className="form-control" > Rating </label>

                <div className="new" id="t4">

                    <input name="questionText" type="text" placeholder="Question Title (i.e. How likely are you to recommend our product to a friend? )" style={{ width: '100%' }}   ></input>
                    <input name="answerText" value="1, 2, 3, 4, 5" readOnly hidden />

                </div>

                <hr />

            </div>

        );
    }
}


export default Rating;
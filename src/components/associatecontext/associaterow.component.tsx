import * as React from 'react';

export class AssociateRow extends React.Component {

    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div>
                {/* Chech-In, Chechneya, or chicken depending on how hungry you are */}
                <div id="rowboxthing">
                    <div id="accordion">

                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                        <div className="container" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <div className="row">
                            <div className="col-sm">
                            first
                            </div>
                            <div className="col-sm">
                            last
                            </div>
                            <div className="col-sm">
                            date
                            </div>
                            <div className="col-sm">
                            cohort
                            </div>
                        </div>
                        </div>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                    </div>

                    {/* <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                        <div className="container" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <div className="row">
                            <div className="col-sm">
                            first
                            </div>
                            <div className="col-sm">
                            last
                            </div>
                            <div className="col-sm">
                            date
                            </div>
                            <div className="col-sm">
                            cohort
                            </div>
                        </div>
                        </div>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                    </div> */}

                    {/* <div className="card">
                    <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                        <div className="container" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <div className="row">
                            <div className="col-sm">
                            first
                            </div>
                            <div className="col-sm">
                            last
                            </div>
                            <div className="col-sm">
                            date
                            </div>
                            <div className="col-sm">
                            cohort
                            </div>
                        </div>
                        </div>
                        </h5>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                    </div> */}
                </div>
                </div>
                {/* End Chechneya */}
            </div>
        );
    }

}
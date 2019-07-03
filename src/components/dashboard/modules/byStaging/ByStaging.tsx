import React, { Component } from 'react'
import { IState } from '../../../../reducers';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IUser } from '../../../../model/user.model';
import {getUserListStaging} from '../../../../actions/dashboardActions/byStaging.actions'
import { Bar } from 'react-chartjs-2';


interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any,
    byStagingUserList:IUser[],
    getUserListStaging:any
}
class ByStaging extends Component<myProps,any> {
    state = {
        virtual:0,
        notVirtual:0,
        chartData:{
            labels:['Virtual','NotVirtual'],
            datasets:[
                {
                    label:['Associates'],
                    backgroundColor:'rgb(243,165,93,0.6)',
                    data:[0,0]
                },
            ]
        }
    }
    componentDidMount(){
            this.props.getUserListStaging();
        
    
       
        
        
        
        
    }
    componentDidUpdate(){
        if(this.props.byStagingUserList[0] != null && this.state.virtual ==0 && this.state.notVirtual==0 )
        {
            console.log('this is the props::',this.props);
            let virtual = this.props.byStagingUserList.reduce((count,user)=>{
                console.log(user.userStatus.virtual)
                if (user.userStatus.virtual) return count+1;
                return count;
    
            },0);
            let notVirtual = this.props.byStagingUserList.reduce((count,user)=>{
                console.log(user.userStatus.virtual)
                if (!user.userStatus.virtual) return count+1;
                return count;
    
            },0);
            console.log('this is the information for virtual',virtual ,notVirtual)
            this.setState({...this.state,
                virtual:virtual,
                notVirtual:notVirtual,
                chartData:{...this.state.chartData,
                    datasets:[{...this.state.chartData.datasets[0],
                        data:[virtual,notVirtual,0]
                    }]}
            });
        }
        
    }


    render() {
        
        return (
            <div className='container border border-gray p-3'>
                <Bar 
                data = {this.state.chartData}
                options = {{
                    maintainAspectRatio:false
                }}
                
                />
            </div>
        )
    }
}
export const mapDispatchProps = {
    getUserListStaging,
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth,
    byStagingUserList : state.dashboardState.byStagingUserList
});



export default connect(mapStateToProps,mapDispatchProps)(ByStaging);

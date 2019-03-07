import React from 'react';
//import { Draggable, Droppable } from 'react-drag-and-drop'

import './App.css';

import $ from 'jquery'
import Question1 from './question1.component';
import Question2 from './question2.component';
import Question3 from './question3.component';
import Question4 from './question4.component';
import Question5 from './question5.component';

class surveyBuild extends React.Component<any, any>{
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          questionID: 1,
          task: <Question1 />
        },
        {
          questionID: 2,
          task: <Question2 />
        },
        {
          questionID: 3,
          task: <Question3 />
        },
        {
          questionID: 4,
          task: <Question4 />
        },
        {
          questionID: 5,
          task: <Question5 />
        }

      ],
      completedTasks: [],
      draggedTask: {}
    }
  }

  onDrag = (event, todo) => {
    event.preventDefault();
    this.setState({
      draggedTask: todo
    });
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event) => {
    const { completedTasks, draggedTask } = this.state;


    this.setState({
      completedTasks: [...completedTasks, draggedTask],
      // todos: todos.filter(task => task.questionID !== draggedTask.questionID),
      draggedTask: {},
    })
  }

  deleterow = (event, index) => {
    console.log(index);
    let temp: any[];
    temp = this.state.completedTasks;
    temp.splice(index, 1);

    this.setState({
      completedTasks: temp
    })
  }




  handleSubmit = async (event) => {
    event.preventDefault();
    var frmData = $(":input").serializeArray();
    console.log(frmData);
    // We need to the id of the loggedIn user
    //  await this.props.handleSubmit(frmData, this.props.user.userId);
    // this.setState({ redirectTo: '/home' })
  }

  render() {
    const { todos, completedTasks } = this.state;
    return (
      <>
        {/* Used for dragging */}
    

        <div className="container create-survey-container" >

          <div className="jumbo">

            <form onSubmit={this.handleSubmit} >
              <div id="123d" className={'form-group'}>
                <label htmlFor="title">Survey Title</label>
                <input type="title" className="form-control" name="title" required /><br />

                <label htmlFor="description">Survey Description</label>
                <textarea className="form-control" name="description" placeholder="Survey Description" required></textarea><br />




                <label htmlFor="type">Add Question Types</label><br />

                {/* Used for dropping from a drag */}
                <div className="App">

                  <div onDrop={event => this.onDrop(event)} onDragOver={(event => this.onDragOver(event))} className="done">
                    {completedTasks.map((task, index) =>
                      <div key={index}>
                        {task.task}
                        <button onClick={() => this.deleterow(event, index)}>X</button>
                      </div>
                    )
                    }
                  </div>
                </div>
                  <br /><br /><button type="submit" className="btn btn-primary">Create Survey</button>

              </div>

            </form>
            <div className="test">
          <div className="todos" >
            {
              todos.map(todo =>
                <div key={todo.questionID} draggable onDrag={(event) => this.onDrag(event, todo)}>
                  {todo.task}
                </div>

              )
            }
          </div>
        </div>

          </div>
        </div>
      </>



    );
  }
}

export default surveyBuild;

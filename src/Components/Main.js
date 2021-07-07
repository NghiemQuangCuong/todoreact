import React from 'react';
import '../CSS/Main.css';

function Greeting(props){
    const {greeting} = props;
    return (
        <h1>Welcome to TodoReact, {greeting}</h1>
    )
}

class InsertTask extends React.Component{
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    render()
    {
        return (
            <div className='insert-task'>
                <span>Add Task: </span>
                <span>
                    <input type='text' maxLength='120' />
                </span>
                <span>
                    <button type='button'>Add</button>
                </span>
            </div>
        )
    }
}

class Task extends React.Component{
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    render()
    {
        const {
            finished,
            taskName,
            category,
            startTime,
            endTime,
            priority,
            objectId } = this.props.task;

        return (
            <div className='taskRow'>
                <span className='taskName'>
                    {taskName}
                </span>
            </div>
        )
    }
}

class TasksList extends React.Component{
    constructor(props)
    {
        super(props);
        this.props = props;

        this.state = {
            taskList
        }
    }

    render()
    {
        const {taskList} = this.state;

        return (
            <div className='taskList'>
                {taskList.map(task => <Task task={task} key={task.objectId} />)}
            </div>
        )
    }
}

class SearchBox extends React.Component{
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    render()
    {
        return (
            <div className='search-box'>
                <span>Search: </span>
                <span>
                    <input type='text' maxLength='120' />
                </span>
            </div>
        )
    }
}

class Main extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props = props;

        this.state = {
            userName: 'Cuong'
        }
    }

    render()
    {
        const {userName} = this.state;

        return (
            <div>
                <Greeting greeting={userName} />
                <InsertTask />
                <SearchBox />
                <TasksList />
            </div>
            
        )
    }
}

let taskList = [
{
    finished: false,
    taskName: 'Buy Food',
    category: 'Daily',
    startTime: new Date(2021, 6, 7, 6).toLocaleString(),
    endTime: new Date(2021, 6, 7, 8).toLocaleString(),
    priority: '1',
    objectId: '8902ndolasd'
    },
    {
    finished: true,
    taskName: 'Feed Dog',
    category: 'Daily',
    startTime: new Date(2021, 6, 7, 8).toLocaleString(),
    endTime: '',
    priority: '2',
    objectId: '234sdfg42'
    },
    {
    finished: false,
    taskName: 'Read book',
    category: 'Study',
    startTime: '',
    endTime: '',
    priority: '1',
    objectId: '35byq287579'
    }
]

export default Main;
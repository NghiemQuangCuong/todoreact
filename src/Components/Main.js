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
        this.state = {
            taskEntered: ''
        }

        this.onAddClick = this.onAddClick.bind(this);
        
    }

    onAddClick(event){
        event.preventDefault();
        const {taskEntered} = this.state;
        if (taskEntered.trim().length === 0)
            return;
        
        // add task here
        const {parent} = this.props;
        const taskToAdd = {
            finished: false,
            taskName: taskEntered,
            category: '',
            createTime: new Date(Date.now()).toLocaleString(),
            alarm: '',
            priority: '0',
            objectId: Math.random()*100
        }
        taskList.push(taskToAdd)
        parent.setState({taskList})
        this.setState({taskEntered: ''});
        
    }

    render()
    {
        return (
            <div className='input-center'>
                 <div className="input-group input-group-lg add-task">
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                        placeholder='Enter task...'
                        value={this.state.taskEntered}
                        onChange={(event) => {this.setState({taskEntered: event.target.value})}}
                        />
                    <span className="input-group-text noselect" id="inputGroup-sizing-lg" onClick={this.onAddClick}>ADD</span>
                </div>
            </div>
        )
    }
}

class Task extends React.Component{
    constructor(props)
    {
        super(props);
        this.props = props;

        this.state = {
            task: this.props.task
        }

        this.getTaskRow = this.getTaskRow.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.checkalarm = this.checkalarm.bind(this);
    }

    getTaskRow(priority)
    {
        switch (priority)
        {
            case '0':
                return 'taskRow taskRow-low';
            case '1':
                return 'taskRow taskRow-med';
            default:
                return 'taskRow taskRow-high'
        }
    }

    onRowClick(event){
        event.preventDefault();

        console.log('row clicked');
    }

    onEditClick(event){
        event.preventDefault();
        event.stopPropagation()

        console.log('edit clicked');
    }

    onDeleteClick(event){
        event.preventDefault();
        event.stopPropagation()

        console.log('delete clicked');
    }

    checkalarm(alarm){
        const title = 'Task ends at: ' + alarm;
        if (alarm)
            return (
                <div 
                className='material-icons clock' 
                title={title} 
                onClick={(event) => event.stopPropagation()}>
                    schedule
                </div>
            )
    }

    render()
    {
        const {
            finished,
            taskName,
            category,
            startTime,
            alarm,
            priority,
            objectId } = this.state.task;

        // class init
        const taskRow = this.getTaskRow(priority);

        return (
            <div className={taskRow} onClick={this.onRowClick}>
                <div className='taskName noselect' >
                    {taskName}
                </div>
                <div className='icon'>
                    <div className='material-icons edit-button' onClick={this.onEditClick}>
                        edit
                    </div>
                    <div className='material-icons delete-button' onClick={this.onDeleteClick}>
                        remove_circle_outline
                    </div>
                    {this.checkalarm(alarm)}
                </div>
            </div>
        )
    }
}

class TasksList extends React.Component{
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    render()
    {
        let taskList = this.props.taskList;
        taskList.sort(this.props.sortChoose);

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
        this.state = {
            searchTerm: ''
        }

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(event){
        event.preventDefault();

        const {parent} = this.props;
        const searchTerm = event.target.value;
        const _taskList = taskList.filter(task => task.taskName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        parent.setState({taskList: _taskList});

        this.setState({searchTerm: searchTerm});
    }

    render()
    {
        return (
            <div className='input-center'>
                 <div className="input-group input-group-lg search">
                    <input 
                        type="text" 
                        className="form-control" 
                        aria-label="Large" aria-describedby="inputGroup-sizing-sm" 
                        placeholder='Search...'
                        onChange={this.onSearchChange}
                        value={this.state.searchTerm}
                        />
                </div>
            </div>
        )
    }
}

class SortChoose extends React.Component{
    constructor(props)
    {
        super(props);
        this.props = props;

        this.state = {
            sortChoose: 'lately'
        }

        this.setButtonClass = this.setButtonClass.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    setButtonClass(type)
    {
        if (type === this.state.sortChoose)
            return 'btn btn-primary choose-button btn-lg';
        else
            return 'btn btn-outline-primary choose-button';
    }

    onButtonClick(type)
    {
        switch (type)
        {
            case 'lately':
                this.props.parent.setState({sortChoose: latelySort});
                break;
            case 'alarm':
                this.props.parent.setState({sortChoose: timeSort});
                break;
            default:
                this.props.parent.setState({sortChoose: prioritySort});
        }

        this.setState({
            sortChoose: type
        });
    }

    render()
    {
        return (
            <div className='sort-choose-container'>
                <div className='sort-choose'>
                    <button 
                        type="button" 
                        className={this.setButtonClass('lately')}
                        onClick={() => this.onButtonClick('lately')}>
                        Lately
                    </button>

                    <button 
                        type="button" 
                        className={this.setButtonClass('alarm')}
                        onClick={() => this.onButtonClick('alarm')}>
                        Alarm
                    </button>

                    <button 
                        type="button" 
                        className={this.setButtonClass('priority')}
                        onClick={() => this.onButtonClick('priority')}>
                        Priority
                    </button>
                </div>
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
            userName: 'Cuong',
            taskList: taskList,
            sortChoose: latelySort
        }
    }

    render()
    {
        const {userName, taskList} = this.state;

        return (
            <div className='main'>
                <Greeting greeting={userName} />
                <InsertTask parent={this} />
                <SearchBox parent={this}/>
                <SortChoose parent={this}/>
                <TasksList taskList={taskList} sortChoose={this.state.sortChoose}/>
            </div>
        )
    }
}

function timeSort(a, b){
    if (a.alarm && !b.alarm)
        return -1;
    if (!a.alarm && b.alarm)
        return 1;
    if (a.alarm && b.alarm)
    {
        if (a.alarm < b.alarm)
            return -1;
        if (a.alarm > b.alarm)
            return 1;
        return 0;
    }
    if (a.priority > b.priority)
        return -1;
    if (a.priority < b.priority)
        return 1;
    return 0;
}

function latelySort(a, b)
{
    const timeA = Date.parse(a.createTime);
    const timeB = Date.parse(b.createTime);
    if (timeA > timeB)
        return -1;
    if (timeA < timeB)
        return 1;
    return 0;
}

function prioritySort(a, b)
{
    if (a.priority > b.priority)
        return -1;
    if (a.priority < b.priority)
        return 1;
    return timeSort(a, b);
}

let taskList = [
{
    finished: false,
    taskName: 'Buy Food',
    category: 'Daily',
    createTime: new Date(2021, 6, 7, 8).toLocaleString(),
    alarm: new Date(2021, 6, 7, 8).toLocaleString(),
    priority: '0',
    objectId: '8902ndolasd'
    },
    {
    finished: true,
    taskName: 'Feed Dog',
    category: 'Daily',
    createTime: new Date(2021, 6, 7, 9).toLocaleString(),
    alarm: '',
    priority: '1',
    objectId: '234sdfg42'
    },
    {
    finished: false,
    taskName: 'Read book',
    category: 'Study',
    createTime: new Date(2021, 6, 7, 10).toLocaleString(),
    alarm: '',
    priority: '2',
    objectId: '35byq287579'
    },
    {
    finished: true,
    taskName: 'Study',
    category: 'Study',
    createTime: new Date(2021, 6, 7, 11).toLocaleString(),
    alarm: '',
    priority: '2',
    objectId: 'd19nduoeq83'
    },
    {
    finished: false,
    taskName: 'Workout',
    category: 'Study',
    createTime: new Date(2021, 6, 7, 12).toLocaleString(),
    alarm: new Date(2021, 6, 9, 12).toLocaleString(),
    priority: '1',
    objectId: 'ad198o3dni'
    }
]

export default Main;
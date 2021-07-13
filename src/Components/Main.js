import React from 'react';
import '../CSS/Main.css';
import {Modal, Button} from 'react-bootstrap'


function Greeting(props){
    const {greeting} = props;
    return (
        <h1 className='noselect'>Welcome to TodoReact, {greeting}</h1>
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
            task: this.props.task,
        }

        this.month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        this.getTaskRow = this.getTaskRow.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.showDetail = this.showDetail.bind(this);
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

        if (!this.props.mainComponent.state.detailTask)
            this.props.mainComponent.setState({
                detailTask: this.state.task.objectId
            })
        else 
        {
            if (this.props.mainComponent.state.detailTask === this.state.task.objectId)
                this.props.mainComponent.setState({
                    detailTask: ''
                })
            else 
                this.props.mainComponent.setState({
                    detailTask: this.state.task.objectId
                })
        }
    }

    onEditClick(event){
        event.preventDefault();
        event.stopPropagation()

        this.props.mainComponent.setState({
            editBox: this.state.task.objectId
        });
    }

    onDeleteClick(event){
        event.preventDefault();
        event.stopPropagation()

        console.log('delete clicked');
    }

    formatTime(string){
        const date = new Date(Date.parse(string));
        const day = date.getDate();
        const month = this.month[date.getMonth()];
        const hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
        const minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();

        return day + ' ' + month + ', ' + hour + ':' + minute;
    }

    showDetail(){
        let {
            taskName,
            taskDescription,
            category,
            createTime,
            alarm,
            priority,
        } = this.state.task;

        if (priority === '0')
            priority = 'Low';
        else if (priority === '1')
            priority = 'Medium';
        else 
            priority = 'High';

        const detailTask = this.props.mainComponent.state.detailTask;
        if (detailTask === this.state.task.objectId)
            return (
                <div className='detail-box noselect'>
                    <div><span className='task-property'>Task name:</span> {taskName}</div>
                    <div><span className='task-property'>Task Description:</span> {taskDescription}</div>
                    <hr />
                    <div><span className='task-property'>Category:</span> {category}</div>
                    <div><span className='task-property'>Create time:</span> {createTime}</div>
                    <div><span className='task-property'>Alarm:</span> {alarm}</div>
                    <div><span className='task-property'>Priority:</span> {priority}</div>
                </div>
            )
        return ;
    }

    render()
    {
        let {
            taskName,
            alarm,
            priority,
            } = this.state.task;

        // class init
        const taskRow = this.getTaskRow(priority);
        if (alarm)
            alarm = this.formatTime(alarm);

        return (
            <div>
                <div className={taskRow} onClick={this.onRowClick}>
                    <div className='taskName noselect' >
                        {taskName}
                    </div>
                    <div className='taskTime noselect'>
                        {alarm}
                    </div>
                    <div className='icon'>
                        <div className='material-icons edit-button' onClick={this.onEditClick}>
                            edit
                        </div>
                        <div className='material-icons delete-button' onClick={this.onDeleteClick}>
                            remove_circle_outline
                        </div>
                    </div>
                </div>
                {this.showDetail()}
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
                {taskList.map(task => <Task task={task} key={task.objectId} mainComponent={this.props.parent}/>)}
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

class EditBox extends React.Component{
    constructor(props)
    {
        super(props);
        this.props = props;

        this.onClose = this.onClose.bind(this);
        this.setPriority = this.setPriority.bind(this);
        let task = taskList.find(task => task.objectId === this.props.objectId);
        let finalAlarm;
        if (task.alarm)
        {
            const date = new Date(Date.parse(task.alarm));
            const year = date.getFullYear();
            const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
            const month = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            const hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
            const minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
            finalAlarm = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
        }

        this.state = {
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            alarm: finalAlarm,
            priority: task.priority
        }

        this.onTaskNameChange = this.onTaskNameChange.bind(this);
        this.onTaskDescriptionChange = this.onTaskDescriptionChange.bind(this);
        this.onAlarmChange = this.onAlarmChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onTaskNameChange(event)
    {
        this.setState({
            taskName: event.target.value
        });
    }

    onTaskDescriptionChange(event)
    {
        this.setState({
            taskDescription: event.target.value
        })
    }

    onAlarmChange(event)
    {
        this.setState({
            alarm: event.target.value
        })
    }

    onPriorityChange(event)
    {
        this.setState({
            priority: event.target.value
        })
    }

    onSave()
    {
        console.log('Task name: ' + this.state.taskName);
        console.log('Task description: ' + this.state.taskDescription);
        console.log('Alarm: ' + this.state.alarm);
        console.log('Priority: ' + this.state.priority);

        this.onClose();
    }

    onClose()
    {
        this.props.parent.setState({
            editBox: ''
        })
    }

    setPriority(priority)
    {
        if (priority === this.state.priority)
            return 'selected'
        return '';
    }



    render(){
        let {
            taskName,
            taskDescription,
            alarm,
            priority
        } = this.state;

        return (
            <Modal show={true} onHide={this.onClose} centered>
                <Modal.Header>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            <label>Task name:&nbsp;</label>
                            <input type='text' defaultValue={taskName} maxLength='120' onChange={this.onTaskNameChange}></input>
                        </div>
                        <br />
                        <div>
                            <label>Task Description:&nbsp;</label>
                            <br />
                            <textarea type='text' cols='30' rows='3' defaultValue={taskDescription} onChange={this.onTaskDescriptionChange} /> 
                        </div>
                        <br />
                        <div>
                            <label>Alarm:&nbsp;</label>
                            <input type="datetime-local" defaultValue={alarm} onChange={this.onAlarmChange}></input>
                        </div>
                        <br />
                        <div>
                            <label>Priority:&nbsp;</label>
                            <select name='priority' onChange={this.onPriorityChange} defaultValue={priority}>
                                <option value='0'>Low</option>
                                <option value='1'>Medium</option>
                                <option value='2'>High</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick = {() => this.onSave()}>
                        Save Changes
                    </Button>
                    <Button variant='secondary' onClick={() => this.onClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
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
            sortChoose: latelySort,
            detailTask: '',
            editBox: ''
        }
    }

    render()
    {
        const {userName, taskList} = this.state;

        return (
            <div className='main'>
                {this.state.editBox ? <EditBox objectId={this.state.editBox} parent={this} /> : null } 
                <Greeting greeting={userName} />
                <InsertTask parent={this} />
                <SearchBox parent={this}/>
                <SortChoose parent={this}/>
                <TasksList taskList={taskList} sortChoose={this.state.sortChoose} parent={this}/>
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
    taskDescription: 'Buy Food Buy Food Buy Food Buy Food Buy Food Buy Food Buy Food Buy Food',
    category: 'Daily',
    createTime: new Date(2021, 6, 7, 8).toLocaleString(),
    alarm: new Date(2021, 6, 7, 8).toLocaleString(),
    priority: '0',
    objectId: '8902ndolasd'
    },
    {
    finished: true,
    taskName: 'Feed Dog',
    taskDescription: 'Feed Dog Feed Dog Feed Dog Feed Dog Feed Dog Feed Dog Feed Dog Feed Dog',
    category: 'Daily',
    createTime: new Date(2021, 6, 7, 9).toLocaleString(),
    alarm: '',
    priority: '1',
    objectId: '234sdfg42'
    },
    {
    finished: false,
    taskName: 'Read book',
    taskDescription: 'Read book Read book Read book Read book Read book Read book Read book',
    category: 'Study',
    createTime: new Date(2021, 6, 7, 10).toLocaleString(),
    alarm: '',
    priority: '2',
    objectId: '35byq287579'
    },
    {
    finished: true,
    taskName: 'Study',
    taskDescription: 'Study Study Study Study Study Study Study Study Study Study Study Study',
    category: 'Study',
    createTime: new Date(2021, 6, 7, 11).toLocaleString(),
    alarm: '',
    priority: '2',
    objectId: 'd19nduoeq83'
    },
    {
    finished: false,
    taskName: 'Workout',
    taskDescription: 'Workout Workout Workout Workout Workout Workout Workout Workout Workout',
    category: 'Study',
    createTime: new Date(2021, 6, 7, 12).toLocaleString(),
    alarm: new Date(2021, 6, 9, 12).toLocaleString(),
    priority: '1',
    objectId: 'ad198o3dni'
    }
]

export default Main;